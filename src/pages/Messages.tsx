import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Send, Paperclip, Smile, MoreVertical, Phone, Video, Archive, Star, Circle, Briefcase, FileText, DollarSign, Calendar } from "lucide-react";
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
import { toast } from "sonner";
import { useAuth } from "@/hooks/AuthContext";
import OfferModal from "@/components/modals/OfferModal";
import OfferDetailsModal from "@/components/modals/OfferDetailsModal";
import { 
  messageService, 
  jobService, 
  offerService, 
  jobInvitationsService 
} from "@/services";

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
  const [messageUpdateTrigger, setMessageUpdateTrigger] = useState(0);

  const {
    isConnected,
    conversations: wsConversations,
    messages,
    currentConversationId,
    joinConversation,
    sendMessage,
    sendInterviewMessage,
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

  // Helper function to render last message content
  const renderLastMessageContent = (content: string) => {
    if (!content) return '';
    
    try {
      // Try to parse as JSON
      const parsed = JSON.parse(content);
      
      // Check if it's a job invitation
      if (parsed.type === 'job_invitation' || parsed.jobTitle || parsed.jobId) {
        return (
          <div className="flex items-center space-x-2">
            <Briefcase className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-600 font-medium">
              Job Invitation
            </span>
          </div>
        );
      }
      
      // Check if it's an interview message
      if (parsed.type === 'interview' || parsed.interviewData) {
        return (
          <div className="flex items-center space-x-2">
            <Calendar className="h-3 w-3 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">
              Interview Scheduled
            </span>
          </div>
        );
      }
      
      // Check if it's an offer
      if (parsed.type === 'offer' || parsed.amount) {
        return (
          <div className="flex items-center space-x-2">
            <DollarSign className="h-3 w-3 text-purple-600" />
            <span className="text-xs text-purple-600 font-medium">
              Offer: ${parsed.amount}
            </span>
          </div>
        );
      }
      
      // If it's JSON but we don't recognize the type, show a generic message
      return (
        <div className="flex items-center space-x-2">
          <FileText className="h-3 w-3 text-gray-500" />
          <span className="text-xs text-gray-500 font-medium">
            System Message
          </span>
        </div>
      );
      
    } catch (error) {
      // Not JSON, return as regular text
      return content;
    }
  };

  // Single source of truth for conversations with online status
 const conversations = useMemo(() => {
  const baseConversations = wsConversations.length > 0 ? wsConversations : localConversations;
  
  // Ensure baseConversations is always an array
  if (!Array.isArray(baseConversations)) {
    console.warn('baseConversations is not an array:', baseConversations);
    return [];
  }
  
  const result = baseConversations.map(conv => {
    const otherParticipantEmail = getOtherParticipant(conv);
    const isOnline = onlineUsersMap.has(otherParticipantEmail);
    
    return {
      ...conv,
      isOnline,
      otherParticipantEmail
    };
  });
  
  return result;
}, [wsConversations, localConversations, onlineUsersMap, user?.email]);

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
    console.log('🔍 Filtering messages:', {
      conversationId,
      currentConversationId,
      messagesCount: messages?.length || 0,
      messages: messages,
      messageUpdateTrigger
    });
    
    const filteredMessages = (conversationId === currentConversationId) ? (messages || []) : [];
    
    console.log('🔍 Filtered messages count:', filteredMessages.length);
    console.log('🔍 Filtered messages:', filteredMessages);
    
    // Log any interview invitation messages
    const interviewInvitationMessages = filteredMessages.filter(msg => 
      msg.type === 'interview_invitation' || 
      (msg.content && typeof msg.content === 'string' && msg.content.includes('interview_invitation'))
    );
    if (interviewInvitationMessages.length > 0) {
      console.log('📋 Found interview invitation messages:', interviewInvitationMessages);
    }
    
    return filteredMessages;
  }, [conversationId, currentConversationId, messages, messageUpdateTrigger]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const messagesContainer = document.querySelector('.messages-scroll');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [conversationMessages]);

  // Force re-render when messages change (for real-time updates)
  useEffect(() => {
    setMessageUpdateTrigger(prev => prev + 1);
  }, [messages]);

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
      const result = await messageService.getConversations();
      if (result.success && result.data) {
        // The backend returns { success: true, conversations: [...] }
        // So we need to access result.data.conversations or just result.data
        const conversations = (result.data as any).conversations || result.data;
        setLocalConversations(conversations || []);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // Join conversation when conversationId changes
  useEffect(() => {
    console.log('🔄 Conversation joining effect:', {
      conversationId,
      isConnected,
      currentConversationId,
      shouldJoin: conversationId && isConnected && conversationId !== currentConversationId,
      messagesCount: messages?.length || 0
    });
    
    if (conversationId && isConnected && conversationId !== currentConversationId) {
      console.log('🔄 Joining conversation:', conversationId);
      joinConversation(conversationId);
    }
  }, [conversationId, isConnected, currentConversationId, joinConversation, messages]);

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
      const result = await offerService.getConversationOffers(conversationId);
      if (result.success && result.data) {
        setOffers(result.data);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [conversationId]);

  const handleConversationSelect = (selectedConversationId) => {
    navigate(`/messages/${selectedConversationId}`);
  };

  const handleCreateConversation = async () => {
    if (!newConversationData.otherUserEmail || !newConversationData.jobId) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const result = await messageService.createConversation({
        otherUserEmail: newConversationData.otherUserEmail,
        jobId: newConversationData.jobId,
        projectName: newConversationData.projectName
      });

      if (result.success) {
        toast.success('Conversation created successfully');
        setShowNewConversation(false);
        setNewConversationData({ otherUserEmail: '', jobId: '', projectName: '' });
        fetchConversations();
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast.error('Failed to create conversation');
    }
  };

  const handleInputChange = (e) => {
    setMessageText(e.target.value);
    if (e.target.value.trim()) {
      startTyping();
    } else {
      stopTyping();
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !conversationId) return;
    
    sendMessage(messageText);
    setMessageText("");
    stopTyping();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const fetchClientJobs = async () => {
    if (user?.userType !== 'CLIENT') return;
    
    setLoadingJobs(true);
    try {
      const result = await jobService.getClientJobs();
      setClientJobs(result);
    } catch (error) {
      console.error('Error fetching client jobs:', error);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleJobInvitation = async () => {
    if (!jobInvitationData.jobId || !jobInvitationData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const result = await jobInvitationsService.sendJobInvitation({
        jobId: jobInvitationData.jobId,
        freelancerEmail: selectedConv?.otherParticipantEmail || '',
        message: jobInvitationData.message
      });

      if (result.success) {
        toast.success('Job invitation sent successfully');
        setShowJobInvitation(false);
        setJobInvitationData({ type: 'new', jobId: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending job invitation:', error);
      toast.error('Failed to send job invitation');
    }
  };

  const openJobInvitation = () => {
    if (user?.userType !== 'CLIENT') {
      toast.error('Only clients can send job invitations');
      return;
    }
    fetchClientJobs();
    setShowJobInvitation(true);
  };

  const openOfferModal = () => {
    if (user?.userType !== 'CLIENT') {
      toast.error('Only clients can make offers');
      return;
    }
    if (!selectedConv || !job) {
      toast.error('No job selected for this conversation');
      return;
    }
    setShowOfferModal(true);
  };

  const handleRescheduleSubmit = async (interviewData) => {
    try {
      // Send reschedule message via websocket
      if (socketRef.current?.readyState === WebSocket.OPEN && conversationId) {
        const reschedulePayload = {
          type: 'interview_rescheduled',
          payload: {
            messageId: rescheduleData?.messageId,
            interviewData,
            proposalId: rescheduleData?.proposalId
          }
        };
        
        socketRef.current.send(JSON.stringify(reschedulePayload));
      }

      // Close the reschedule modal
      setShowRescheduleModal(false);
      setRescheduleData(null);

      toast.success('Interview rescheduled successfully');
    } catch (error) {
      console.error('Error rescheduling interview:', error);
      toast.error('Failed to reschedule interview');
    }
  };

  const sendInterviewInvitation = async (invitationData) => {
    try {
      // Send interview invitation message via websocket
      if (socketRef.current?.readyState === WebSocket.OPEN && conversationId) {
        const invitationPayload = {
          type: 'interview_invitation_sent',
          payload: {
            conversationId: conversationId,
            invitationData: invitationData
          }
        };
        
        socketRef.current.send(JSON.stringify(invitationPayload));
      }
      toast.success('Interview invitation sent successfully');
    } catch (error) {
      console.error('Error sending interview invitation:', error);
      toast.error('Failed to send interview invitation');
    }
  };

  function TimelineSidebar({ job, offers }) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Project Timeline</h3>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Job Details */}
          {job && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h4 className="font-medium text-gray-900 mb-3">Job Details</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-700">Title:</span>
                  <p className="text-sm text-gray-900">{job.title}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Budget:</span>
                  <p className="text-sm text-gray-900">
                    ${job.minBudget} - ${job.maxBudget}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                    {job.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Offers */}
          {offers.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h4 className="font-medium text-gray-900 mb-3">Offers</h4>
              <div className="space-y-3">
                {offers.map((offer) => (
                  <div key={offer.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        ${offer.amount}
                      </span>
                      <Badge 
                        variant={
                          offer.status === 'accepted' ? 'default' : 
                          offer.status === 'pending' ? 'secondary' : 'destructive'
                        }
                      >
                        {offer.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{offer.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <Button 
                onClick={openOfferModal}
                size="sm" 
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Make Offer
              </Button>
              <Button 
                onClick={openJobInvitation}
                size="sm" 
                variant="outline"
                className="w-full"
              >
                Send Job Invitation
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <Button 
            onClick={() => setShowNewConversation(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Conversation
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations Sidebar - Fixed */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversations List - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleConversationSelect(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  conversation.id === conversationId ? 'bg-green-50 border-green-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.otherParticipant?.avatar} />
                      <AvatarFallback>
                        {conversation.otherParticipantEmail?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conversation.otherParticipant?.firstName 
                          ? `${conversation.otherParticipant.firstName} ${conversation.otherParticipant.lastName || ''}`.trim()
                          : conversation.otherParticipantEmail
                        }
                      </p>
                      {conversation.lastMessage && (
                        <span className="text-xs text-gray-500">
                          {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex-1 min-w-0">
                        {conversation.lastMessage ? (
                          <div className="text-xs text-gray-600 truncate">
                            {renderLastMessageContent(conversation.lastMessage.content)}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">No messages yet</span>
                        )}
                      </div>
                      
                      {conversation.unreadCount > 0 && (
                        <Badge className="ml-2 bg-green-600 text-white text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area - Fixed height, scrollable content */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedConv ? (
            <>
              {/* Chat Header - Fixed */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedConv.otherParticipant?.avatar} />
                    <AvatarFallback>
                      {selectedConv.otherParticipantEmail?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedConv.otherParticipant?.firstName 
                        ? `${selectedConv.otherParticipant.firstName} ${selectedConv.otherParticipant.lastName || ''}`.trim()
                        : selectedConv.otherParticipantEmail
                      }
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedConv.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Star className="h-4 w-4 mr-2" />
                        Star
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Messages Area - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 messages-scroll">
                {conversationMessages.map((message) => {
                  console.log('�� Processing message in render:', message);
                  
                  // Check if it's an interview message
                  if (message.type === 'interview' || (message.content && typeof message.content === 'string')) {
                    console.log('📨 Message type check passed:', { type: message.type, hasContent: !!message.content });
                    
                    // For interview messages, the content is already JSON
                    if (message.type === 'interview') {
                      console.log('📨 Processing interview message with type interview');
                      try {
                        const parsed = JSON.parse(message.content);
                        console.log('📨 Parsed interview message content:', parsed);
                        
                        const interviewData = parsed;
                        
                        const handleAccept = async () => {
                          try {
                            // Send accept status update via websocket
                            if (socketRef.current?.readyState === WebSocket.OPEN && conversationId) {
                              const statusPayload = {
                                type: 'interview_status_updated',
                                payload: {
                                  messageId: message.id,
                                  status: 'accepted'
                                }
                              };
                              
                              socketRef.current.send(JSON.stringify(statusPayload));
                            }
                            toast.success('Interview accepted');
                          } catch (error) {
                            console.error('Error accepting interview:', error);
                            toast.error('Failed to accept interview');
                          }
                        };

                        const handleDecline = async () => {
                          try {
                            // Send decline status update via websocket
                            if (socketRef.current?.readyState === WebSocket.OPEN && conversationId) {
                              const statusPayload = {
                                type: 'interview_status_updated',
                                payload: {
                                  messageId: message.id,
                                  status: 'declined'
                                }
                              };
                              
                              socketRef.current.send(JSON.stringify(statusPayload));
                            }
                            toast.success('Interview declined');
                          } catch (error) {
                            console.error('Error declining interview:', error);
                            toast.error('Failed to decline interview');
                          }
                        };

                        const handleWithdraw = async () => {
                          try {
                            // Send withdraw status update via websocket
                            if (socketRef.current?.readyState === WebSocket.OPEN && conversationId) {
                              const statusPayload = {
                                type: 'interview_status_updated',
                                payload: {
                                  messageId: message.id,
                                  status: 'withdrawn',
                                  reason: 'Interview was withdrawn by the client'
                                }
                              };
                              
                              socketRef.current.send(JSON.stringify(statusPayload));
                            }
                            toast.success('Interview withdrawn');
                          } catch (error) {
                            console.error('Error withdrawing interview:', error);
                            toast.error('Failed to withdraw interview');
                          }
                        };

                        const handleReschedule = () => {
                          try {
                            // Extract original data for rescheduling with safe defaults
                            const originalData = interviewData.originalData || interviewData;
                            
                            // Ensure we have all required fields with defaults
                            const safeOriginalData = {
                              date: originalData?.date || '',
                              time: originalData?.time || '',
                              duration: originalData?.duration || 30,
                              notes: originalData?.notes || '',
                              jobTitle: originalData?.jobTitle || 'Interview',
                              clientName: originalData?.clientName || 'Client'
                            };
                            
                            // Set reschedule data and open modal
                            setRescheduleData({
                              messageId: message.id,
                              originalData: safeOriginalData
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
                      } catch (error) {
                        console.error('Error parsing interview data:', error);
                        // Fallback to regular message display
                      }
                    }
                    
                    // Check for other JSON messages (legacy format)
                    if (message.content && typeof message.content === 'string') {
                      // First check if it looks like JSON (starts with { or [)
                      if (message.content.trim().startsWith('{') || message.content.trim().startsWith('[')) {
                        try {
                          const parsed = JSON.parse(message.content);
                          console.log('📨 Parsed message content:', parsed);
                          
                          if (parsed.type === 'interview' || parsed.type === 'interview_scheduled' || parsed.interviewData) {
                            console.log('📨 Found interview message:', parsed);
                            const interviewData = parsed.interviewData || parsed;
                          
                            const handleAccept = async () => {
                              try {
                                // Send accept status update via websocket
                                if (socketRef.current?.readyState === WebSocket.OPEN && conversationId) {
                                  const statusPayload = {
                                    type: 'interview_status_updated',
                                    payload: {
                                      messageId: message.id,
                                      status: 'accepted'
                                    }
                                  };
                                  
                                  socketRef.current.send(JSON.stringify(statusPayload));
                                }
                                toast.success('Interview accepted');
                              } catch (error) {
                                console.error('Error accepting interview:', error);
                                toast.error('Failed to accept interview');
                              }
                            };

                            const handleReject = async () => {
                              try {
                                // Send reject status update via websocket
                                if (socketRef.current?.readyState === WebSocket.OPEN && conversationId) {
                                  const statusPayload = {
                                    type: 'interview_status_updated',
                                    payload: {
                                      messageId: message.id,
                                      status: 'rejected'
                                    }
                                  };
                                  
                                  socketRef.current.send(JSON.stringify(statusPayload));
                                }
                                toast.success('Interview rejected');
                              } catch (error) {
                                console.error('Error rejecting interview:', error);
                                toast.error('Failed to reject interview');
                              }
                            };

                            const handleReschedule = () => {
                              setRescheduleData({
                                messageId: message.id,
                                originalData: interviewData
                              });
                              setShowRescheduleModal(true);
                            };

                            return (
                              <div key={message.id} className={`flex ${message.senderEmail === user?.email ? 'justify-end' : 'justify-start'} mb-4`}>
                                <div className={`max-w-xs lg:max-w-md ${message.senderEmail === user?.email ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-4 py-2`}>
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm font-medium">Interview Invitation</span>
                                  </div>
                                  
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">Job:</span> {interviewData.jobTitle || 'N/A'}
                                    </div>
                                    <div>
                                      <span className="font-medium">Date:</span> {interviewData.date || 'TBD'}
                                    </div>
                                    <div>
                                      <span className="font-medium">Time:</span> {interviewData.time || 'TBD'}
                                    </div>
                                    {interviewData.duration && (
                                      <div>
                                        <span className="font-medium">Duration:</span> {interviewData.duration}
                                      </div>
                                    )}
                                    {interviewData.notes && (
                                      <div>
                                        <span className="font-medium">Notes:</span> {interviewData.notes}
                                      </div>
                                    )}
                                    {interviewData.meetLink && (
                                      <div>
                                        <span className="font-medium">Meeting Link:</span>
                                        <a 
                                          href={interviewData.meetLink} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-blue-500 hover:text-blue-600 underline ml-1"
                                        >
                                          Join Meeting
                                        </a>
                                      </div>
                                    )}
                                  </div>

                                  {interviewData.status === 'pending' && user?.userType === 'FREELANCER' && (
                                    <div className="flex space-x-2 mt-3">
                                      <Button
                                        size="sm"
                                        onClick={handleAccept}
                                        className="bg-green-600 hover:bg-green-700 text-white text-xs"
                                      >
                                        Accept
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleReject}
                                        className="text-xs"
                                      >
                                        Decline
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleReschedule}
                                        className="text-xs"
                                      >
                                        Reschedule
                                      </Button>
                                    </div>
                                  )}

                                  {interviewData.status === 'accepted' && (
                                    <div className="mt-2 text-green-600 text-xs">
                                      ✅ Interview Accepted
                                    </div>
                                  )}

                                  {interviewData.status === 'rejected' && (
                                    <div className="mt-2 text-red-600 text-xs">
                                      ❌ Interview Declined
                                    </div>
                                  )}

                                  {interviewData.status === 'withdrawn' && (
                                    <div className="mt-2 text-gray-600 text-xs">
                                      ⏸️ Interview Withdrawn
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }
                          
                          // Check if it's an interview invitation message
                          if (parsed.type === 'interview_invitation' || parsed.invitationData) {
                            console.log('📨 Found interview invitation message:', parsed);
                            const invitationData = parsed.invitationData || parsed;
                          
                            const handleAcceptInvitation = async () => {
                              try {
                                // Send accept invitation update via websocket
                                if (socketRef.current?.readyState === WebSocket.OPEN && conversationId) {
                                  const statusPayload = {
                                    type: 'interview_invitation_updated',
                                    payload: {
                                      messageId: message.id,
                                      status: 'accepted'
                                    }
                                  };
                                  
                                  socketRef.current.send(JSON.stringify(statusPayload));
                                }
                                toast.success('Interview invitation accepted');
                              } catch (error) {
                                console.error('Error accepting interview invitation:', error);
                                toast.error('Failed to accept interview invitation');
                              }
                            };

                            const handleRejectInvitation = async () => {
                              try {
                                // Send reject invitation update via websocket
                                if (socketRef.current?.readyState === WebSocket.OPEN && conversationId) {
                                  const statusPayload = {
                                    type: 'interview_invitation_updated',
                                    payload: {
                                      messageId: message.id,
                                      status: 'rejected'
                                    }
                                  };
                                  
                                  socketRef.current.send(JSON.stringify(statusPayload));
                                }
                                toast.success('Interview invitation rejected');
                              } catch (error) {
                                console.error('Error rejecting interview invitation:', error);
                                toast.error('Failed to reject interview invitation');
                              }
                            };

                            return (
                              <div key={`${message.id}-${message.content}`} className={`flex ${message.senderEmail === user?.email ? 'justify-end' : 'justify-start'} mb-4`}>
                                <div className={`max-w-xs lg:max-w-md ${message.senderEmail === user?.email ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-4 py-2`}>
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm font-medium">Interview Invitation</span>
                                  </div>
                                  
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">Job:</span> {invitationData.jobTitle || 'N/A'}
                                    </div>
                                    <div>
                                      <span className="font-medium">Client:</span> {invitationData.clientName || 'N/A'}
                                    </div>
                                    {invitationData.message && (
                                      <div>
                                        <span className="font-medium">Message:</span> {invitationData.message}
                                      </div>
                                    )}
                                  </div>

                                  {invitationData.status === 'pending' && user?.userType === 'FREELANCER' && (
                                    <div className="flex space-x-2 mt-3">
                                      <Button
                                        size="sm"
                                        onClick={handleAcceptInvitation}
                                        className="bg-green-600 hover:bg-green-700 text-white text-xs"
                                      >
                                        Accept
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleRejectInvitation}
                                        className="text-xs"
                                      >
                                        Decline
                                      </Button>
                                    </div>
                                  )}

                                  {invitationData.status === 'accepted' && (
                                    <div className="mt-2 text-green-600 text-xs">
                                      ✅ Interview Invitation Accepted
                                    </div>
                                  )}

                                  {invitationData.status === 'rejected' && (
                                    <div className="mt-2 text-red-600 text-xs">
                                      ❌ Interview Invitation Declined
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }
                        } catch (error) {
                          console.error('Error parsing interview data:', error);
                          // Fallback to regular message display
                        }
                      }
                    }
                  }

                  // Check for other JSON messages (legacy format)
                  if (message.content && typeof message.content === 'string') {
                    // First check if it looks like JSON (starts with { or [)
                    if (message.content.trim().startsWith('{') || message.content.trim().startsWith('[')) {
                      try {
                        const parsed = JSON.parse(message.content);
                        console.log('📨 Parsed message content:', parsed);
                        
                        if (parsed.type === 'interview' || parsed.type === 'interview_scheduled' || parsed.interviewData) {
                          console.log('📨 Found interview message:', parsed);
                          const interviewData = parsed.interviewData || parsed;
                        
                          const handleAccept = async () => {
                            try {
                              // Send accept status update via websocket
                              if (socketRef.current?.readyState === WebSocket.OPEN && conversationId) {
                                const statusPayload = {
                                  type: 'interview_status_updated',
                                  payload: {
                                    messageId: message.id,
                                    status: 'accepted'
                                  }
                                };
                                
                                socketRef.current.send(JSON.stringify(statusPayload));
                              }
                              toast.success('Interview accepted');
                            } catch (error) {
                              console.error('Error accepting interview:', error);
                              toast.error('Failed to accept interview');
                            }
                          };

                          const handleReject = async () => {
                            try {
                              // Send reject status update via websocket
                              if (socketRef.current?.readyState === WebSocket.OPEN && conversationId) {
                                const statusPayload = {
                                  type: 'interview_status_updated',
                                  payload: {
                                    messageId: message.id,
                                    status: 'rejected'
                                  }
                                };
                                
                                socketRef.current.send(JSON.stringify(statusPayload));
                              }
                              toast.success('Interview rejected');
                            } catch (error) {
                              console.error('Error rejecting interview:', error);
                              toast.error('Failed to reject interview');
                            }
                          };

                          const handleReschedule = () => {
                            setRescheduleData({
                              messageId: message.id,
                              originalData: interviewData
                            });
                            setShowRescheduleModal(true);
                          };

                          return (
                            <div key={message.id} className={`flex ${message.senderEmail === user?.email ? 'justify-end' : 'justify-start'} mb-4`}>
                              <div className={`max-w-xs lg:max-w-md ${message.senderEmail === user?.email ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-4 py-2`}>
                                <div className="flex items-center space-x-2 mb-2">
                                  <Calendar className="h-4 w-4" />
                                  <span className="text-sm font-medium">Interview Invitation</span>
                                </div>
                                
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="font-medium">Job:</span> {interviewData.jobTitle || 'N/A'}
                                  </div>
                                  <div>
                                    <span className="font-medium">Date:</span> {interviewData.date || 'TBD'}
                                  </div>
                                  <div>
                                    <span className="font-medium">Time:</span> {interviewData.time || 'TBD'}
                                  </div>
                                  {interviewData.duration && (
                                    <div>
                                      <span className="font-medium">Duration:</span> {interviewData.duration}
                                    </div>
                                  )}
                                  {interviewData.notes && (
                                    <div>
                                      <span className="font-medium">Notes:</span> {interviewData.notes}
                                    </div>
                                  )}
                                  {interviewData.meetLink && (
                                    <div>
                                      <span className="font-medium">Meeting Link:</span>
                                      <a 
                                        href={interviewData.meetLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-600 underline ml-1"
                                      >
                                        Join Meeting
                                      </a>
                                    </div>
                                  )}
                                </div>

                                {interviewData.status === 'pending' && user?.userType === 'FREELANCER' && (
                                  <div className="flex space-x-2 mt-3">
                                    <Button
                                      size="sm"
                                      onClick={handleAccept}
                                      className="bg-green-600 hover:bg-green-700 text-white text-xs"
                                    >
                                      Accept
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={handleReject}
                                      className="text-xs"
                                    >
                                      Decline
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={handleReschedule}
                                      className="text-xs"
                                    >
                                      Reschedule
                                    </Button>
                                  </div>
                                )}

                                {interviewData.status === 'accepted' && (
                                  <div className="mt-2 text-green-600 text-xs">
                                    ✅ Interview Accepted
                                  </div>
                                )}

                                {interviewData.status === 'rejected' && (
                                  <div className="mt-2 text-red-600 text-xs">
                                    ❌ Interview Declined
                                  </div>
                                )}

                                {interviewData.status === 'withdrawn' && (
                                  <div className="mt-2 text-gray-600 text-xs">
                                    ⏸️ Interview Withdrawn
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        }
                        
                        // Check if it's an interview invitation message
                        if (parsed.type === 'interview_invitation' || parsed.invitationData) {
                          console.log('📨 Found interview invitation message:', parsed);
                          const invitationData = parsed.invitationData || parsed;
                        
                          const handleAcceptInvitation = async () => {
                            try {
                              // Send accept invitation update via websocket
                              if (socketRef.current?.readyState === WebSocket.OPEN && conversationId) {
                                const statusPayload = {
                                  type: 'interview_invitation_updated',
                                  payload: {
                                    messageId: message.id,
                                    status: 'accepted'
                                  }
                                };
                                
                                socketRef.current.send(JSON.stringify(statusPayload));
                              }
                              toast.success('Interview invitation accepted');
                            } catch (error) {
                              console.error('Error accepting interview invitation:', error);
                              toast.error('Failed to accept interview invitation');
                            }
                          };

                          const handleRejectInvitation = async () => {
                            try {
                              // Send reject invitation update via websocket
                              if (socketRef.current?.readyState === WebSocket.OPEN && conversationId) {
                                const statusPayload = {
                                  type: 'interview_invitation_updated',
                                  payload: {
                                    messageId: message.id,
                                    status: 'rejected'
                                  }
                                };
                                
                                socketRef.current.send(JSON.stringify(statusPayload));
                              }
                              toast.success('Interview invitation rejected');
                            } catch (error) {
                              console.error('Error rejecting interview invitation:', error);
                              toast.error('Failed to reject interview invitation');
                            }
                          };

                          return (
                            <div key={message.id} className={`flex ${message.senderEmail === user?.email ? 'justify-end' : 'justify-start'} mb-4`}>
                              <div className={`max-w-xs lg:max-w-md ${message.senderEmail === user?.email ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-4 py-2`}>
                                <div className="flex items-center space-x-2 mb-2">
                                  <Calendar className="h-4 w-4" />
                                  <span className="text-sm font-medium">Interview Invitation</span>
                                </div>
                                
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="font-medium">Job:</span> {invitationData.jobTitle || 'N/A'}
                                  </div>
                                  <div>
                                    <span className="font-medium">Client:</span> {invitationData.clientName || 'N/A'}
                                  </div>
                                  {invitationData.message && (
                                    <div>
                                      <span className="font-medium">Message:</span> {invitationData.message}
                                    </div>
                                  )}
                                </div>

                                {invitationData.status === 'pending' && user?.userType === 'FREELANCER' && (
                                  <div className="flex space-x-2 mt-3">
                                    <Button
                                      size="sm"
                                      onClick={handleAcceptInvitation}
                                      className="bg-green-600 hover:bg-green-700 text-white text-xs"
                                    >
                                      Accept
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={handleRejectInvitation}
                                      className="text-xs"
                                    >
                                      Decline
                                    </Button>
                                  </div>
                                )}

                                {invitationData.status === 'accepted' && (
                                  <div className="mt-2 text-green-600 text-xs">
                                    ✅ Interview Invitation Accepted
                                  </div>
                                )}

                                {invitationData.status === 'rejected' && (
                                  <div className="mt-2 text-red-600 text-xs">
                                    ❌ Interview Invitation Declined
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        }
                      } catch (error) {
                        console.error('Error parsing interview data:', error);
                        // Fallback to regular message display
                      }
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

              {/* Message Input - Fixed */}
              <div className="p-6 border-t border-gray-100 flex-shrink-0 bg-white">
                <div className="flex items-end space-x-3">
                  <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50 flex-shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex-1 min-w-0">
                    <Textarea
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      rows={2}
                      maxLength={1000}
                      className="resize-none border-gray-200 focus:border-green-500 focus:ring-green-500 w-full max-h-32"
                    />
                  </div>
                  
                  <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50 flex-shrink-0">
                    <Smile className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="bg-green-600 hover:bg-green-700 text-white flex-shrink-0"
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
        
        {/* Timeline Sidebar - Fixed */}
        {selectedConv && (
          <div className="w-80 border-l border-gray-200 flex-shrink-0">
            <TimelineSidebar job={job} offers={offers} />
          </div>
        )}
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