import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Send, Paperclip, Smile, MoreVertical, Phone, Video, Archive, Star, Circle, Briefcase, FileText, DollarSign } from "lucide-react";
import InterviewNotification from "../components/ui/interview-notification";
import InterviewRescheduleModal from "../components/modals/InterviewRescheduleModal";
import { useLocation } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Conversation, useWebSocket } from "@/hooks/socketContext";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/AuthContext";
import OfferModal from "@/components/modals/OfferModal";
import OfferDetailsModal from "@/components/modals/OfferDetailsModal";

const Messages = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Simplified state
  const [localConversations, setLocalConversations] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewConversation, setShowNewConversation] = useState(false);
  const [showJobInvitation, setShowJobInvitation] = useState(false);
  const [newConversationData, setNewConversationData] = useState({
    otherUserEmail: '',
    jobId: '',
    projectName: ''
  });
  const [jobInvitationData, setJobInvitationData] = useState({
    type: 'new', // 'new' or 'existing'
    jobId: '',
    message: ''
  });
  const [clientJobs, setClientJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [offers, setOffers] = useState([]);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showOfferDetailsModal, setShowOfferDetailsModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offerPayments, setOfferPayments] = useState({});
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleData, setRescheduleData] = useState(null);

  // Debug clientJobs changes
  useEffect(() => {
    console.log('Client jobs updated:', clientJobs);
  }, [clientJobs]);

  const {
    isConnected,
    conversations: wsConversations,
    messages,
    currentConversationId,
    joinConversation,
    sendMessage,
    startTyping,
    stopTyping,
    onlineUsersMap,
    typingUsers,
    onlineUsers,
    isUserOnline,
    socketRef
  } = useWebSocket();

  // Helper function to get other participant
  const getOtherParticipant = (conversation): string => {
    return conversation.otherParticipant.email || '';
  };

  // Single source of truth for conversations with online status
 const conversations = useMemo(() => {
  console.log('🔄 Recalculating conversations');
  console.log('📧 Online user emails:', Array.from(onlineUsersMap.keys()));
  
  const baseConversations = wsConversations.length > 0 ? wsConversations : localConversations;
  
  const result = baseConversations.map(conv => {
    console.log("conversation: ", conv)
    const otherParticipantEmail = getOtherParticipant(conv);
    const isOnline = onlineUsersMap.has(otherParticipantEmail);
    
    console.log(`🔍 Checking: "${otherParticipantEmail}" vs online users:`, Array.from(onlineUsersMap.keys()));
    console.log(`✅ Has match: ${isOnline}`);
    console.log('🗺️ Map contents:', Object.fromEntries(onlineUsersMap));
    
    return {
      ...conv,
      isOnline,
      otherParticipantEmail
    };
  });
  
  return result;
}, [wsConversations, localConversations, onlineUsersMap, user?.email]);

useEffect(() => {
  console.log('Conversations recalculated:', conversations.map(c => ({ 
    id: c.id, 
    name: c.name, 
    isOnline: c.isOnline,
    email: c.otherParticipantEmail 
  })));
}, [conversations]);

useEffect(() => {
  console.log('Online users changed:', Array.from(onlineUsersMap.keys()));
}, [onlineUsersMap]);

  // Filtered conversations for search
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    
    const query = searchQuery.toLowerCase();
    return conversations.filter(conv => 
      conv.name?.toLowerCase().includes(query) ||
      conv.project?.toLowerCase().includes(query) ||
      conv.otherParticipantEmail?.toLowerCase().includes(query)
    );
  }, [conversations, searchQuery]);

  // Current conversation
  const selectedConv = useMemo(() => 
    conversations.find(conv => conv.id === conversationId),
    [conversations, conversationId]
  );

  // Messages for current conversation
  const conversationMessages = useMemo(() => {
    console.log('🔄 Recalculating conversation messages');
    console.log('📧 Current conversationId:', conversationId);
    console.log('🔗 WebSocket currentConversationId:', currentConversationId);
    console.log('💬 All messages:', messages);
    
    const filteredMessages = (conversationId === currentConversationId) ? (messages || []) : [];
    console.log('📨 Filtered messages for conversation:', filteredMessages);
    
    return filteredMessages;
  }, [conversationId, currentConversationId, messages]);

  // Handle calendar connection redirect
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('calendar_connected') === 'true') {
      toast.success('Google Calendar connected successfully! You can now schedule interviews.');
      // Clean up the URL
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  // Fetch conversations on mount
  const fetchConversations = async () => {
    try {
      const response = await axios.get("/messages/conversations");
      setLocalConversations(response.data.conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // Join conversation when conversationId changes
  useEffect(() => {
    console.log('🔄 Conversation ID changed effect');
    console.log('📧 New conversationId:', conversationId);
    console.log('🔗 Current WebSocket conversationId:', currentConversationId);
    console.log('🔌 WebSocket connected:', isConnected);
    
    if (conversationId && isConnected && conversationId !== currentConversationId) {
      console.log('🚪 Joining conversation:', conversationId);
      joinConversation(conversationId);
    }
  }, [conversationId, isConnected, currentConversationId, joinConversation]);

  // Auto-scroll messages
  useEffect(() => {
    const messagesContainer = document.querySelector('.messages-scroll');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [conversationMessages]);

  // Get job details from conversation
  const job = selectedConv?.job;

  // Fetch offers for current conversation
  const fetchOffers = async () => {
    if (!conversationId) return;
    
    try {
      const response = await axios.get(`/offers/conversation/${conversationId}`);
      if (response.data.success) {
        setOffers(response.data.data);
        
        // Fetch payments for accepted offers
        const acceptedOffers = response.data.data.filter(offer => offer.status === 'ACCEPTED');
        const paymentsPromises = acceptedOffers.map(async (offer) => {
          try {
            const paymentsResponse = await axios.get(`/offers/${offer.id}/payments`);
            if (paymentsResponse.data.success) {
              return { offerId: offer.id, payments: paymentsResponse.data.data };
            }
          } catch (error) {
            console.error('Error fetching payments for offer:', offer.id, error);
          }
          return { offerId: offer.id, payments: [] };
        });
        
        const paymentsResults = await Promise.all(paymentsPromises);
        const paymentsMap = {};
        paymentsResults.forEach(result => {
          paymentsMap[result.offerId] = result.payments;
        });
        setOfferPayments(paymentsMap);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [conversationId]);

  // Handlers
  const handleConversationSelect = (selectedConversationId) => {
    if (selectedConversationId !== conversationId) {
      navigate(`/messages/${selectedConversationId}`);
    }
  };

  const handleCreateConversation = async () => {
    try {
      if (!newConversationData.jobId.trim()) {
        toast.error("Job ID is required");
        return;
      }
      
      const payload = {
        otherUserEmail: newConversationData.otherUserEmail,
        jobId: newConversationData.jobId,
        projectName: newConversationData.projectName || null
      };
      
      const response = await axios.post('/messages/conversations', payload);
      const { success, data, message } = response.data;
      
      if (!success) {
        toast.error("Conversation creation Failed: " + message);
        return;
      }
      
      navigate(`/messages/${data.id}`);
      setShowNewConversation(false);
      setNewConversationData({ otherUserEmail: '', jobId: '', projectName: '' });
      fetchConversations();
    } catch (error) {
      console.error('Error creating conversation:', error.response?.data || error.message);
      toast.error("Failed to create conversation");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessageText(value);
    
    // Simple typing indicator logic
    if (value.trim()) {
      startTyping();
    } else {
      stopTyping();
    }
  };

  const handleSendMessage = () => {
    console.log('📤 Sending message');
    console.log('💬 Message text:', messageText);
    console.log('📧 Conversation ID:', conversationId);
    console.log('🔌 WebSocket connected:', isConnected);
    
    if (messageText.trim() && conversationId) {
      console.log('✅ Sending message via WebSocket');
      sendMessage(messageText.trim());
      setMessageText("");
      stopTyping();
    } else {
      console.log('❌ Cannot send message - missing text or conversation ID');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Fetch client's jobs for job invitation
  const fetchClientJobs = async () => {
    if (user?.userType !== 'CLIENT') return;
    
    try {
      setLoadingJobs(true);
      const response = await axios.get('/jobs/client?status=OPEN');
      console.log('Jobs response:', response.data);
      setClientJobs(response.data.data || []);
    } catch (error) {
      console.error('Error fetching client jobs:', error);
      toast.error('Failed to fetch jobs');
    } finally {
      setLoadingJobs(false);
    }
  };

  // Handle job invitation
  const handleJobInvitation = async () => {
    if (!selectedConv || !user) return;

    try {
      const freelancerEmail = selectedConv.otherParticipantEmail;
      
      if (jobInvitationData.type === 'new') {
        // Open job creation page in new tab
        const jobCreationUrl = `/post-job?invite=${encodeURIComponent(freelancerEmail)}`;
        window.open(jobCreationUrl, '_blank', 'noopener,noreferrer');
        setShowJobInvitation(false);
        toast.success('Job creation page opened in new tab');
      } else {
        // Send existing job invitation
        const response = await axios.post('/api/job-invitations', {
          jobId: jobInvitationData.jobId,
          freelancerEmail,
          message: jobInvitationData.message
        });

        if (response.data.success) {
          toast.success('Job invitation sent successfully!');
          setShowJobInvitation(false);
          setJobInvitationData({ type: 'new', jobId: '', message: '' });
        } else {
          toast.error('Failed to send job invitation');
        }
      }
    } catch (error) {
      console.error('Error sending job invitation:', error);
      toast.error('Failed to send job invitation');
    }
  };

  // Open job invitation modal
  const openJobInvitation = () => {
    if (user?.userType !== 'CLIENT') {
      toast.error('Only clients can send job invitations');
      return;
    }
    console.log('Opening job invitation modal for user:', user.email);
    fetchClientJobs();
    setShowJobInvitation(true);
  };

  // Open offer modal
  const openOfferModal = () => {
    if (user?.userType !== 'CLIENT') {
      toast.error('Only clients can make offers');
      return;
    }
    if (!selectedConv) {
      toast.error('Please select a conversation first');
      return;
    }
    if (!job) {
      toast.error('Job details not available');
      return;
    }
    setShowOfferModal(true);
  };

  // Handle interview reschedule
  const handleRescheduleSubmit = (interviewData) => {
    try {
      // Send WebSocket message for rescheduling
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({
          type: 'interview_rescheduled',
          payload: {
            messageId: rescheduleData.messageId,
            interviewData: interviewData
          }
        }));
        toast.success('Interview rescheduled successfully');
        setShowRescheduleModal(false);
        setRescheduleData(null);
      } else {
        toast.error('Connection lost. Please try again.');
      }
    } catch (error) {
      console.error('Error rescheduling interview:', error);
      toast.error('Failed to reschedule interview');
    }
  };

  // Timeline Sidebar component
  function TimelineSidebar({ job, offers }) {
    return (
      <div className="h-full flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <h3 className="text-xl font-semibold text-gray-900">Timeline</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ height: 'calc(100vh - 200px)' }}>
        
        {/* Make Offer Button */}
        {user?.userType === 'CLIENT' && selectedConv && (
          <div className="flex-shrink-0">
            <Button 
              onClick={openOfferModal}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Make an Offer
            </Button>
          </div>
        )}

        {/* Offers Section */}
        {offers.length > 0 && (
          <div className="flex-shrink-0">
            <h4 className="font-semibold mb-4 text-sm text-gray-700 uppercase tracking-wide">Offers</h4>
            <div className="space-y-3">
              {offers.map((offer) => {
                const offerPaymentsList = offerPayments[offer.id] || [];
                const milestones = offer.milestones || [];
                const totalMilestones = milestones.length;
                const paidMilestones = offerPaymentsList.filter(p => p.status === 'COMPLETED').length;
                
                return (
                  <div key={offer.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-sm">
                          ${offer.amount} {offer.budgetType === 'HOURLY' && '/hr'}
                        </span>
                      </div>
                      <Badge className={`text-xs ${
                        offer.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        offer.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                        offer.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {offer.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{offer.duration}</p>
                    
                    {/* Payment Progress for Accepted Offers */}
                    {offer.status === 'ACCEPTED' && totalMilestones > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Payment Progress</span>
                          <span>{paidMilestones}/{totalMilestones} milestones funded</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(paidMilestones / totalMilestones) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedOffer(offer);
                        setShowOfferDetailsModal(true);
                      }}
                      className="w-full text-xs"
                    >
                      View Offer Details
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Job Details */}
        {job && (
          <div className="border-t border-gray-100 pt-6 flex-shrink-0">
            <h4 className="font-semibold mb-4 text-sm text-gray-700 uppercase tracking-wide">Job Details</h4>
            <div className="mb-4">
              <div className="font-semibold text-gray-900 text-lg mb-2">{job.title}</div>
              <div className="text-sm text-gray-500 mb-3">Status: <span className="font-semibold text-gray-700">{job.status}</span></div>
            </div>
            {job.milestones && Array.isArray(job.milestones) && job.milestones.length > 0 && (
              <div className="mb-4">
                <div className="font-semibold mb-3 text-sm text-gray-700">Milestones</div>
                <ul className="space-y-3">
                  {job.milestones.map((m, i) => (
                    <li key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm">{m.title}</div>
                        <div className="text-xs text-gray-500">{m.duration}</div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">${m.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Budget:</span> 
                <span className="ml-2 font-semibold text-gray-900">
                  {job.budget === 'FIXED' 
                    ? (job.minBudget && job.maxBudget && job.minBudget !== job.maxBudget 
                        ? `$${job.minBudget.toLocaleString()} - $${job.maxBudget.toLocaleString()}`
                        : `$${(job.minBudget || job.maxBudget || 0).toLocaleString()}`)
                    : (job.minBudget && job.maxBudget && job.minBudget !== job.maxBudget 
                        ? `$${job.minBudget}/hr - $${job.maxBudget}/hr`
                        : `$${job.minBudget || job.maxBudget || 0}/hr`)
                  }
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Duration:</span> 
                <span className="ml-2 font-semibold text-gray-900">{job.duration || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] bg-white flex flex-col overflow-hidden">
      <div className="max-w-7xl mx-auto w-full h-full flex">
        <div className="grid grid-cols-12 gap-0 w-full h-full">
          
          {/* Conversations Sidebar */}
          <div className="col-span-3 border-r border-gray-200 flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white" 
                  onClick={() => setShowNewConversation(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto h-0">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer transition-colors border-b border-gray-50 ${
                    conversationId === conversation.id 
                      ? "bg-green-50 border-r-2 border-r-green-600" 
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleConversationSelect(conversation.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback className="bg-gray-200 text-gray-700">
                          {conversation.name?.charAt(0) || '?'}
                        </AvatarFallback>
                      </Avatar>
                      {/* Online indicator */}
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900 truncate text-sm">
                            {conversation.name || conversation.otherParticipantEmail}
                          </h3>
                        </div>
                        <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2 font-medium">{conversation.project}</p>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.lastMessage?.content}
                        </p>
                        {conversation.unread > 0 && (
                          <Badge variant="default" className="bg-green-600 text-xs px-2 py-1">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Conversation Modal */}
          {showNewConversation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-xl w-96 shadow-xl">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Start New Conversation</h3>
                <Input
                  placeholder="Other User Email"
                  value={newConversationData.otherUserEmail}
                  onChange={(e) => setNewConversationData({
                    ...newConversationData, 
                    otherUserEmail: e.target.value
                  })}
                  className="mb-4 border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
                <Input
                  placeholder="Job ID *"
                  value={newConversationData.jobId}
                  onChange={(e) => setNewConversationData({
                    ...newConversationData, 
                    jobId: e.target.value
                  })}
                  className="mb-4 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
                <Input
                  placeholder="Project Name (optional)"
                  value={newConversationData.projectName}
                  onChange={(e) => setNewConversationData({
                    ...newConversationData, 
                    projectName: e.target.value
                  })}
                  className="mb-6 border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewConversation(false)}
                    className="border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateConversation}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    disabled={!newConversationData.otherUserEmail.trim() || !newConversationData.jobId.trim()}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Job Invitation Modal */}
          {showJobInvitation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-xl w-96 max-h-[80vh] overflow-y-auto shadow-xl">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Invite to Job</h3>
                
                {/* Invitation Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Invitation Type</label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="invitationType"
                        value="new"
                        checked={jobInvitationData.type === 'new'}
                        onChange={(e) => setJobInvitationData({
                          ...jobInvitationData,
                          type: e.target.value
                        })}
                        className="text-green-600"
                      />
                      <span className="text-sm font-medium text-gray-700">Create New Job</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="invitationType"
                        value="existing"
                        checked={jobInvitationData.type === 'existing'}
                        onChange={(e) => setJobInvitationData({
                          ...jobInvitationData,
                          type: e.target.value
                        })}
                        className="text-green-600"
                      />
                      <span className="text-sm font-medium text-gray-700">Send Existing Job</span>
                    </label>
                  </div>
                </div>

                {/* Existing Job Selection */}
                {jobInvitationData.type === 'existing' && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Select Job</label>
                    {loadingJobs ? (
                      <div className="text-sm text-gray-500">Loading jobs...</div>
                    ) : clientJobs.length > 0 ? (
                      <select
                        value={jobInvitationData.jobId}
                        onChange={(e) => setJobInvitationData({
                          ...jobInvitationData,
                          jobId: e.target.value
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select a job...</option>
                        {clientJobs.map((job) => (
                          <option key={job.id} value={job.id}>
                            {job.title} - {
                              job.budget === 'FIXED' 
                                ? (job.minBudget && job.maxBudget && job.minBudget !== job.maxBudget 
                                    ? `$${job.minBudget.toLocaleString()} - $${job.maxBudget.toLocaleString()}`
                                    : `$${(job.minBudget || job.maxBudget || 0).toLocaleString()}`)
                                : (job.minBudget && job.maxBudget && job.minBudget !== job.maxBudget 
                                    ? `$${job.minBudget}/hr - $${job.maxBudget}/hr`
                                    : `$${job.minBudget || job.maxBudget || 0}/hr`)
                            }
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-sm text-gray-500">No active jobs found</div>
                    )}
                  </div>
                )}

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {jobInvitationData.type === 'new' ? 'Message (Optional)' : 'Message'}
                  </label>
                  <Textarea
                    placeholder={jobInvitationData.type === 'new' 
                      ? "Add a personal message for the freelancer..." 
                      : "Why should this freelancer work on your job?"
                    }
                    value={jobInvitationData.message}
                    onChange={(e) => setJobInvitationData({
                      ...jobInvitationData,
                      message: e.target.value
                    })}
                    rows={3}
                    className="resize-none border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowJobInvitation(false)}
                    className="border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleJobInvitation}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    disabled={jobInvitationData.type === 'existing' && !jobInvitationData.jobId}
                  >
                    {jobInvitationData.type === 'new' ? 'Create Job' : 'Send Invitation'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className={`${selectedConv ? 'col-span-6' : 'col-span-9'} flex flex-col h-full`}>
            {selectedConv ? (
              <>
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={selectedConv.avatar} alt={selectedConv.name} />
                        <AvatarFallback className="bg-gray-200 text-gray-700">
                          {selectedConv.name?.charAt(0) || '?'}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConv.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {selectedConv.name || selectedConv.otherParticipantEmail}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">
                        {selectedConv.isOnline ? 'Online' : 'Offline'}  {selectedConv.project}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                      <Video className="h-4 w-4" />
                    </Button>
                    {user?.userType === 'CLIENT' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={openJobInvitation}
                        className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                      >
                        <Briefcase className="h-4 w-4 mr-1" />
                        Invite to Job
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Star className="h-4 w-4 mr-2" />
                          Star Conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3 h-0 messages-scroll scrollbar-hide">
                  {conversationMessages.map((message) => {
                    // Handle interview messages
                    if (message.type === 'interview') {
                      try {
                        const interviewData = JSON.parse(message.content);
                        const isCurrentUserSender = message.senderEmail === user?.email;
                        
                        // Handle interview actions
                        const handleAccept = () => {
                          try {
                            // Send WebSocket message for real-time update
                            if (socketRef.current?.readyState === WebSocket.OPEN) {
                              socketRef.current.send(JSON.stringify({
                                type: 'interview_status_updated',
                                payload: {
                                  messageId: message.id,
                                  status: 'accepted'
                                }
                              }));
                              toast.success('Interview accepted successfully');
                            } else {
                              toast.error('Connection lost. Please try again.');
                            }
                          } catch (error) {
                            console.error('Error accepting interview:', error);
                            toast.error('Failed to accept interview');
                          }
                        };

                        const handleDecline = () => {
                          try {
                            // Send WebSocket message for real-time update
                            if (socketRef.current?.readyState === WebSocket.OPEN) {
                              socketRef.current.send(JSON.stringify({
                                type: 'interview_status_updated',
                                payload: {
                                  messageId: message.id,
                                  status: 'declined'
                                }
                              }));
                              toast.success('Interview declined');
                            } else {
                              toast.error('Connection lost. Please try again.');
                            }
                          } catch (error) {
                            console.error('Error declining interview:', error);
                            toast.error('Failed to decline interview');
                          }
                        };

                        const handleWithdraw = () => {
                          try {
                            // Send WebSocket message for real-time update
                            if (socketRef.current?.readyState === WebSocket.OPEN) {
                              socketRef.current.send(JSON.stringify({
                                type: 'interview_status_updated',
                                payload: {
                                  messageId: message.id,
                                  status: 'withdrawn',
                                  reason: 'Interview was withdrawn by the client'
                                }
                              }));
                              toast.success('Interview withdrawn successfully');
                            } else {
                              toast.error('Connection lost. Please try again.');
                            }
                          } catch (error) {
                            console.error('Error withdrawing interview:', error);
                            toast.error('Failed to withdraw interview');
                          }
                        };

                        const handleReschedule = () => {
                          try {
                            // Extract original data for rescheduling
                            const originalData = interviewData.originalData || interviewData;
                            
                            // Set reschedule data and open modal
                            setRescheduleData({
                              messageId: message.id,
                              originalData: originalData
                            });
                            setShowRescheduleModal(true);
                          } catch (error) {
                            console.error('Error opening reschedule modal:', error);
                            toast.error('Failed to open reschedule modal');
                          }
                        };

                        return (
                          <div 
                            key={message.id} 
                            className={`flex ${message.senderEmail === user?.email ? "justify-end" : "justify-start"} my-1`}
                          >
                            <div className="w-80">
                              <InterviewNotification
                                interviewData={interviewData}
                                onJoinInterview={() => window.open(interviewData.meetLink, '_blank')}
                                onAccept={handleAccept}
                                onDecline={handleDecline}
                                onWithdraw={handleWithdraw}
                                onReschedule={handleReschedule}
                                status={interviewData.status || "pending"}
                                currentUserEmail={user?.email}
                                senderEmail={message.senderEmail}
                              />
                            </div>
                          </div>
                        );

                        return (
                          <div 
                            key={message.id} 
                            className={`flex ${message.senderEmail === user?.email ? "justify-end" : "justify-start"} my-1`}
                          >
                            <div className="w-80">
                              <InterviewNotification
                                interviewData={interviewData}
                                onJoinInterview={() => window.open(interviewData.meetLink, '_blank')}
                                onAccept={handleAccept}
                                onDecline={handleDecline}
                                onWithdraw={handleWithdraw}
                                onReschedule={handleReschedule}
                                status={interviewData.status || "pending"}
                                currentUserEmail={user?.email}
                                senderEmail={message.senderEmail}
                              />
                            </div>
                          </div>
                        );
                      } catch (error) {
                        console.error('Error parsing interview data:', error);
                        // Fallback to regular message display
                      }
                    }

                    // Regular message display
                    return (
                      <div 
                        key={message.id} 
                        className={`flex ${message.senderEmail === user?.email ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${
                          message.senderEmail === user?.email
                            ? "bg-green-600 text-white" 
                            : "bg-gray-100 text-gray-900"
                        }`}>
                          <p className="text-sm leading-relaxed">{message.content}</p> 
                          <p className={`text-xs mt-2 ${
                            message.senderEmail === user?.email ? "text-green-100" : "text-gray-500"
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })} 
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Typing Indicator */}
                  {typingUsers.length > 0 && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-xl">
                        <p className="text-sm">
                          {typingUsers.map(user => user.userName).join(', ')} 
                          {typingUsers.length === 1 ? ' is' : ' are'} typing...
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-100 flex-shrink-0">
                  <div className="flex items-end space-x-3">
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex-1">
                      <Textarea
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        rows={2}
                        className="resize-none border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                      <Smile className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Timeline Sidebar - Only show when conversation is selected */}
          {selectedConv && (
            <div className="col-span-3 border-l border-gray-200 h-full overflow-hidden">
              <TimelineSidebar job={job} offers={offers} />
            </div>
          )}
        </div>
      </div>

      {/* Offer Modal */}
      {showOfferModal && selectedConv && job && (
        <OfferModal
          isOpen={showOfferModal}
          onClose={() => setShowOfferModal(false)}
          conversationId={conversationId}
          freelancerId={selectedConv.otherParticipant?.id}
          freelancerName={selectedConv.otherParticipantEmail}
          jobId={selectedConv.jobId}
          jobTitle={job.title}
          jobDescription={job.description}
          jobBudget={job.budget}
          jobMinBudget={job.minBudget}
          jobMaxBudget={job.maxBudget}
          onOfferCreated={fetchOffers}
        />
      )}

      {/* Offer Details Modal */}
      {showOfferDetailsModal && selectedOffer && (
        <OfferDetailsModal
          isOpen={showOfferDetailsModal}
          onClose={() => {
            setShowOfferDetailsModal(false);
            setSelectedOffer(null);
          }}
          offer={selectedOffer}
          onStatusChange={() => {
            fetchOffers();
            // Update the selected offer with new data
            if (selectedOffer) {
              const updatedOffer = offers.find(o => o.id === selectedOffer.id);
              if (updatedOffer) {
                setSelectedOffer(updatedOffer);
              }
            }
          }}
        />
      )}

      {/* Interview Reschedule Modal */}
      {showRescheduleModal && rescheduleData && (
        <InterviewRescheduleModal
          isOpen={showRescheduleModal}
          onClose={() => {
            setShowRescheduleModal(false);
            setRescheduleData(null);
          }}
          originalData={rescheduleData.originalData}
          onReschedule={handleRescheduleSubmit}
        />
      )}
    </div>
  );
};

export default Messages;