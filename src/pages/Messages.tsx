
import { useState } from "react";
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

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const { connect } = useWebSocket();
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for conversations
  const conversations = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      lastMessage: "Thanks for the quick delivery! The website looks amazing.",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      project: "E-commerce Website Development",
      type: "client"
    },
    {
      id: "2", 
      name: "Tech Solutions Inc",
      avatar: "/placeholder.svg",
      lastMessage: "When can we schedule the next milestone review?",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      project: "Mobile App Development",
      type: "client"
    },
    {
      id: "3",
      name: "Mike Chen",
      avatar: "/placeholder.svg", 
      lastMessage: "I've submitted the proposal for your review",
      timestamp: "3 hours ago",
      unread: 1,
      online: true,
      project: "Logo Design Project",
      type: "freelancer"
    },
    {
      id: "4",
      name: "DataCorp Analytics",
      avatar: "/placeholder.svg",
      lastMessage: "The data analysis report is ready for download",
      timestamp: "Yesterday",
      unread: 0,
      online: false,
      project: "Market Research Analysis",
      type: "client"
    }
  ];

  // Mock data for messages
  const messages = [
    {
      id: "1",
      senderId: "sarah",
      senderName: "Sarah Johnson",
      content: "Hi! I wanted to discuss the final revisions for the website.",
      timestamp: "10:30 AM",
      type: "text",
      isOwn: false
    },
    {
      id: "2", 
      senderId: "me",
      senderName: "You",
      content: "Sure! I'm available to discuss the changes. What specific areas need revision?",
      timestamp: "10:32 AM", 
      type: "text",
      isOwn: true
    },
    {
      id: "3",
      senderId: "sarah",
      senderName: "Sarah Johnson", 
      content: "The homepage layout needs some adjustments, and we need to update the product gallery section.",
      timestamp: "10:35 AM",
      type: "text"
    },
    {
      id: "4",
      senderId: "me",
      senderName: "You",
      content: "I can have those changes completed by tomorrow. I'll send you a preview link once they're ready.",
      timestamp: "10:38 AM",
      type: "text"
    },
    {
      id: "5",
      senderId: "sarah", 
      senderName: "Sarah Johnson",
      content: "Thanks for the quick delivery! The website looks amazing.",
      timestamp: "2 min ago",
      type: "text"
    }
  ];

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

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
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
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
                  onClick={() => setSelectedConversation(conversation.id)}
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
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
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
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn 
                          ? "bg-teal-600 text-white" 
                          : "bg-gray-100 text-gray-900"
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? "text-teal-100" : "text-gray-500"
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
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
                        onChange={(e) => setMessageText(e.target.value)}
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
