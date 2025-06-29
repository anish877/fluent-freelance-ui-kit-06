
import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Send, Paperclip, Smile, MoreVertical, Phone, Video, Archive, Star, Circle } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
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
  const selectedConversation = conversationId || null;
  const [localConversations, setLocalConversations] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useAuth()
  const [showNewConversation, setShowNewConversation] = useState(false);
  const [newConversationData, setNewConversationData] = useState({
    otherUserEmail: '',
    jobId: '',
    projectName: ''
  });
  const {
  isConnected,
  conversations: wsConversations,
  messages: wsMessages,
  currentConversationId,
  joinConversation,
  sendMessage,
  startTyping,
  stopTyping,
  typingUsers,
  socketRef,
  onlineUsers, // Add this line
  isUserOnline // Add this line
} = useWebSocket();

const getOtherParticipant = (conversation: Conversation) => {
  // Assuming conversation has participants array with emails
  // and you want to show the other participant (not current user)
  return conversation.participants?.find(email => email !== user?.email) || '';
};
console.log("Online users: ", onlineUsers)
const conversations = useMemo(() => {
  const baseConversations = wsConversations.length > 0 ? wsConversations : localConversations;
  
  // Map conversations and add online status
  return baseConversations.map(conv => {
    const otherParticipantEmail = getOtherParticipant(conv);
    const isOnline = isUserOnline(otherParticipantEmail);
    
    return {
      ...conv,
      online: isOnline,
      otherParticipantEmail // Store for reference if needed
    };
  });
}, [wsConversations, localConversations, onlineUsers, user?.email]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get("/messages/conversations");
      setLocalConversations(response.data.conversations);
      // Don't set conversations directly here anymore
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };
  useEffect(() => {
    fetchConversations()
  }, [])

useEffect(() => {
  if (conversationId) {
    console.log("Join triggered")
    joinConversation(conversationId);
  }
}, [conversationId, currentConversationId, joinConversation]);

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
    
    // Navigate to the new conversation instead of setting state
    navigate(`/messages/${data.id}`);
    joinConversation(data.id);
    setShowNewConversation(false);
    
    // Refresh local conversations
    fetchConversations();
  } catch (error) {
    console.error('Error creating conversation:', error.response?.data || error.message);
  }
};

  const handleInputChange = (e) => {
  setMessageText(e.target.value);
  
  if (e.target.value.trim() && !isTyping) {
    startTyping();
    setIsTyping(true);
  } else if (!e.target.value.trim() && isTyping) {
    stopTyping();
    setIsTyping(false);
  }
};;

  const handleInputBlur = () => {
    stopTyping();
    setIsTyping(false);
  };

useEffect(() => {

  const messagesContainer = document.querySelector('.overflow-y-auto');
  if (messagesContainer) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}, [wsMessages]);

  const messages = (conversationId === currentConversationId) ? (wsMessages || []) : [];



  const selectedConv = conversations.find(conv => conv.id === selectedConversation);
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

const handleSendMessage = () => {
  if (messageText.trim() && conversationId) {
    sendMessage(messageText.trim());
    setMessageText("");
  }
};

useEffect(() => {
  console.log('🔗 Conversation join effect triggered:', {
    conversationId,
    isConnected,
    currentConversationId,
    socketReadyState: socketRef.current?.readyState // You'll need to expose this from WebSocket context
  });

  // Only join if:
  // 1. We have a conversationId from URL
  // 2. WebSocket is connected and authenticated
  // 3. We're not already in this conversation
  if (conversationId && 
      isConnected && 
      conversationId !== currentConversationId) {
    
    console.log('🔗 Auto-joining conversation:', conversationId);
    joinConversation(conversationId);
  }
}, [conversationId, isConnected, currentConversationId, joinConversation]);


// // Add this before your return statement:
// if (!isConnected) {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="text-center">
//           <p>Connecting to chat server...</p>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

  return (
      <div className="h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="max-w-6xl mx-auto w-full flex-1 flex min-h-0 p-4">
        <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
          {/* Conversations Sidebar */}
          <div className="col-span-4 bg-white rounded-lg border flex flex-col min-h-0">
            <div className="p-4 border-b flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Conversations</h2>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={() => setShowNewConversation(true)}>
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

            <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
              {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors flex-shrink-0 ${
                      conversationId === conversation.id ? "bg-teal-50 border-r-4 border-r-teal-600" : ""
                    }`}
                    onClick={() => handleConversationSelect(conversation.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {/* Online indicator dot */}
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                            {/* Small online dot next to name */}
                            {conversation.online && (
                              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-1">{conversation.project}</p>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 truncate">
                            {conversation.lastMessage && conversation.lastMessage.content}
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

          {showNewConversation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold mb-4">Start New Conversation</h3>
                <Input
                  placeholder="Other User Email"
                  value={newConversationData.otherUserEmail}
                  onChange={(e) => setNewConversationData({...newConversationData, otherUserEmail: e.target.value})}
                  className="mb-3"
                />
                <Input
                  placeholder="Job ID (optional)"
                  value={newConversationData.jobId}
                  onChange={(e) => setNewConversationData({...newConversationData, jobId: e.target.value})}
                  className="mb-3"
                />
                <Input
                  placeholder="Project Name (optional)"
                  value={newConversationData.projectName}
                  onChange={(e) => setNewConversationData({...newConversationData, projectName: e.target.value})}
                  className="mb-4"
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowNewConversation(false)}>Cancel</Button>
                  <Button onClick={()=>{
                    handleCreateConversation()
                  }
                  } className="bg-teal-600 hover:bg-teal-700">Create</Button>
                </div>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="col-span-8 bg-white rounded-lg border flex flex-col min-h-0">
            {selectedConv && (
              <>
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConv.avatar} alt={selectedConv.name} />
                      <AvatarFallback>{selectedConv.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {/* Header online indicator dot */}
                    {selectedConv.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{selectedConv.name}</h3>
                      {/* Small online dot in header */}
                      {selectedConv.online && (
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{selectedConv.project}</p>
                  </div>
                </div>
                  
                  {/* Rest of your header buttons remain the same */}
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
                <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">

                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.senderEmail === user.email ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs lg:max-md px-4 py-2 rounded-lg ${
                      message.senderEmail === user.email
                        ? "bg-teal-600 text-white" 
                        : "bg-gray-100 text-gray-900"
                    }`}>
                      <p className="text-sm">{message.content}</p> 
                      <p className={`text-xs mt-1 ${
                        message.senderEmail === user.email ? "text-teal-100" : "text-gray-500"
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString()} 
                      </p>
                    </div>
                  </div>
                ))}
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
                        onBlur={handleInputBlur}
                        rows={2}
                        className="resize-none"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
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
            ) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
