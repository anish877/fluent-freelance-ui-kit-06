
import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Send, Paperclip, Smile, MoreVertical, Phone, Video, Archive, Star, Circle } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { useWebSocket } from "@/hooks/socketContext";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/AuthContext";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
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
  conversations: wsConversations,
  messages: wsMessages,
  currentConversationId,
  joinConversation,
  sendMessage,
  startTyping,
  stopTyping,
  typingUsers
} = useWebSocket();

const conversations = useMemo(() => {
  // Merge or prioritize WebSocket conversations over local ones
  return wsConversations.length > 0 ? wsConversations : localConversations;
}, [wsConversations, localConversations]);

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
  if (currentConversationId) {
    setSelectedConversation(currentConversationId);
  }
}, [currentConversationId]);

const handleConversationSelect = (conversationId: string) => {
  setSelectedConversation(conversationId);
  joinConversation(conversationId); // This will trigger WebSocket to load messages
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
      
      // Join the new conversation via WebSocket
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

  const messages = wsMessages || [];

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
  if (messageText.trim() && selectedConversation) {
    sendMessage(messageText.trim()); // Use WebSocket sendMessage
    setMessageText("");
  }
};

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
      <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Communicate with clients and freelancers</p>
        </div>

        <div className="grid grid-cols-12 gap-6 h-[800px]">
          {/* Conversations Sidebar */}
          <div className="col-span-4 bg-white rounded-lg border overflow-hidden">
            <div className="p-4 border-b">
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

            <div className="overflow-y-auto max-h-[700px]">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.id ? "bg-teal-50 border-r-4 border-r-teal-600" : ""
                  }`}
                  onClick={() => handleConversationSelect(conversation.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-1">{conversation.project}</p>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage.content}</p>
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
          <div className="col-span-8 bg-white rounded-lg border flex flex-col">
            {selectedConv ? (
              <>
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConv.avatar} alt={selectedConv.name} />
                        <AvatarFallback>{selectedConv.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {selectedConv.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedConv.name}</h3>
                      <p className="text-sm text-gray-500">{selectedConv.project}</p>
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
                <div className="flex-1 overflow-y-auto p-4 space-y-4">

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
                <div className="p-4 border-t">
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
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Circle className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Messages;
