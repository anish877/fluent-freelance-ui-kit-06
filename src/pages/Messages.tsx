import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Send, Paperclip, Smile, MoreVertical, Phone, Video, Archive, Star, Circle, Briefcase, FileText } from "lucide-react";

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

const Messages = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
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

  // Debug clientJobs changes
  useEffect(() => {
    console.log('Client jobs updated:', clientJobs);
  }, [clientJobs]);

  const {
    isConnected,
    conversations: wsConversations,
    messages: wsMessages,
    currentConversationId,
    joinConversation,
    sendMessage,
    startTyping,
    stopTyping,
    onlineUsersMap,
    typingUsers,
    onlineUsers,
    isUserOnline
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
  const messages = useMemo(() => {
    return (conversationId === currentConversationId) ? (wsMessages || []) : [];
  }, [conversationId, currentConversationId, wsMessages]);

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
    if (conversationId && isConnected && conversationId !== currentConversationId) {
      joinConversation(conversationId);
    }
  }, [conversationId, isConnected, currentConversationId, joinConversation]);

  // Auto-scroll messages
  useEffect(() => {
    const messagesContainer = document.querySelector('.messages-scroll');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  // Handlers
  const handleConversationSelect = (selectedConversationId) => {
    if (selectedConversationId !== conversationId) {
      navigate(`/messages/${selectedConversationId}`);
    }
  };

  const handleCreateConversation = async () => {
    try {
      const payload = {
        otherUserEmail: newConversationData.otherUserEmail,
        jobId: newConversationData.jobId || null,
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
    if (messageText.trim() && conversationId) {
      sendMessage(messageText.trim());
      setMessageText("");
      stopTyping();
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

  return (
    <div className="h-screen bg-gray-50 flex flex-col">

      
      <div className="max-w-6xl mx-auto w-full flex-1 flex min-h-0 p-4">
        <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
          
          {/* Conversations Sidebar */}
          <div className="col-span-4 bg-white rounded-lg border flex flex-col min-h-0">
            <div className="p-4 border-b flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Conversations</h2>
                <Button 
                  size="sm" 
                  className="bg-teal-600 hover:bg-teal-700" 
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
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    conversationId === conversation.id ? "bg-teal-50 border-r-4 border-r-teal-600" : ""
                  }`}
                  onClick={() => handleConversationSelect(conversation.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback>{conversation.name?.charAt(0) || '?'}</AvatarFallback>
                      </Avatar>
                      {/* Online indicator */}
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900 truncate">
                            {conversation.name || conversation.otherParticipantEmail}
                          </h3>
                          {/* {conversation.isOnline && (
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                          )} */}
                          
                        </div>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-1">{conversation.project}</p>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.lastMessage?.content}
                        </p>
                        {conversation.unread > 0 && (
                          <Badge variant="default" className="bg-teal-600 text-xs px-2 py-1">
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
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold mb-4">Start New Conversation</h3>
                <Input
                  placeholder="Other User Email"
                  value={newConversationData.otherUserEmail}
                  onChange={(e) => setNewConversationData({
                    ...newConversationData, 
                    otherUserEmail: e.target.value
                  })}
                  className="mb-3"
                />
                <Input
                  placeholder="Job ID (optional)"
                  value={newConversationData.jobId}
                  onChange={(e) => setNewConversationData({
                    ...newConversationData, 
                    jobId: e.target.value
                  })}
                  className="mb-3"
                />
                <Input
                  placeholder="Project Name (optional)"
                  value={newConversationData.projectName}
                  onChange={(e) => setNewConversationData({
                    ...newConversationData, 
                    projectName: e.target.value
                  })}
                  className="mb-4"
                />
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewConversation(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateConversation}
                    className="bg-teal-600 hover:bg-teal-700"
                    disabled={!newConversationData.otherUserEmail.trim()}
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
              <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Invite to Job</h3>
                
                {/* Invitation Type Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invitation Type</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="invitationType"
                        value="new"
                        checked={jobInvitationData.type === 'new'}
                        onChange={(e) => setJobInvitationData({
                          ...jobInvitationData,
                          type: e.target.value
                        })}
                        className="text-teal-600"
                      />
                      <span className="text-sm">Create New Job</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="invitationType"
                        value="existing"
                        checked={jobInvitationData.type === 'existing'}
                        onChange={(e) => setJobInvitationData({
                          ...jobInvitationData,
                          type: e.target.value
                        })}
                        className="text-teal-600"
                      />
                      <span className="text-sm">Send Existing Job</span>
                    </label>
                  </div>
                </div>

                {/* Existing Job Selection */}
                {jobInvitationData.type === 'existing' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Job</label>
                    {loadingJobs ? (
                      <div className="text-sm text-gray-500">Loading jobs...</div>
                    ) : clientJobs.length > 0 ? (
                      <select
                        value={jobInvitationData.jobId}
                        onChange={(e) => setJobInvitationData({
                          ...jobInvitationData,
                          jobId: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Select a job...</option>
                        {clientJobs.map((job) => (
                          <option key={job.id} value={job.id}>
                            {job.title} - ${job.minBudget || job.maxBudget || job.hourlyRate || 'TBD'}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-sm text-gray-500">No active jobs found</div>
                    )}
                  </div>
                )}

                {/* Message */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowJobInvitation(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleJobInvitation}
                    className="bg-teal-600 hover:bg-teal-700"
                    disabled={jobInvitationData.type === 'existing' && !jobInvitationData.jobId}
                  >
                    {jobInvitationData.type === 'new' ? 'Create Job' : 'Send Invitation'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="col-span-8 bg-white rounded-lg border flex flex-col min-h-0">
            {selectedConv ? (
              <>
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConv.avatar} alt={selectedConv.name} />
                        <AvatarFallback>{selectedConv.name?.charAt(0) || '?'}</AvatarFallback>
                      </Avatar>
                      {selectedConv.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">
                          {selectedConv.name || selectedConv.otherParticipantEmail}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        {selectedConv.isOnline ? 'Online' : 'Offline'} • {selectedConv.project}
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
                    {user?.userType === 'CLIENT' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={openJobInvitation}
                        className="bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100"
                      >
                        <Briefcase className="h-4 w-4 mr-1" />
                        Invite to Job
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
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
                <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 messages-scroll">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.senderEmail === user?.email ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderEmail === user?.email
                          ? "bg-teal-600 text-white" 
                          : "bg-gray-100 text-gray-900"
                      }`}>
                        <p className="text-sm">{message.content}</p> 
                        <p className={`text-xs mt-1 ${
                          message.senderEmail === user?.email ? "text-teal-100" : "text-gray-500"
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })} 
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {typingUsers.length > 0 && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                        <p className="text-sm">
                          {typingUsers.map(user => user.userName).join(', ')} 
                          {typingUsers.length === 1 ? ' is' : ' are'} typing...
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t flex-shrink-0">
                  <div className="flex items-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex-1">
                      <Textarea
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        rows={2}
                        className="resize-none"
                      />
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p>Choose a conversation from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;