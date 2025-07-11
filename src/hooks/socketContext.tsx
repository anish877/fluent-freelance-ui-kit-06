import React, { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Types (matching your server)
interface User {
  id: string;
  name: string;
  type: 'client' | 'freelancer';
  avatar?: string;
}

interface OnlineUser {
  userEmail: string;
  userName: string;
  lastSeen?: string;
}


interface WSMessage {
  type: 'authenticate' | "online_users_list" | "error" | "user_left" | "user_joined" | "user_stop_typing" | "user_typing" | "messages_loaded" | "new_message" | 'authentication_success' | 'connection_established' | 'join_conversation' | 'send_message' | 'typing' | 'stop_typing' | 'user_online' | 'user_offline';
  payload: any;
}

interface Message {
  id: string;
  conversationId: string;
  senderEmail: string;
  // senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image';
}

interface Conversation {
  id: string;
  participants: string[];
  projectName: string;
  lastMessage?: Message;
  createdAt: string;
}

interface TypingUser {
  userEmail: string;
  userName: string;
}

interface WebSocketContextType {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;

  socketRef: React.RefObject<WebSocket | null>;
  
  // Data
  conversations: Conversation[];
  messages: Message[];
  currentConversationId: string | null;
  typingUsers: TypingUser[];
  onlineUsers: OnlineUser[]; // Array for components
  onlineUsersMap: Map<string, OnlineUser>; // Map for advanced usage
  isUserOnline: (userEmail: string) => boolean;
  
  // Actions
  joinConversation: (conversationId: string) => void;
  createConversation: (otherUserEmail: string, projectName?: string, jobId?: string) => Promise<string | null>;
  sendMessage: (content: string, type?: 'text' | 'file' | 'image') => void;
  startTyping: () => void;
  stopTyping: () => void;
  
  // Connection control
  connect: () => void;
  disconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

interface WebSocketProviderProps {
  children: ReactNode;
  wsUrl?: string;
  maxRetries?: number;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ 
  children, 
  wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:5001',
  maxRetries = 5
}) => {
  // Connection state
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth()
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<Map<string, OnlineUser>>(new Map());
  // Data state
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  
  // Refs for cleanup and retry logic
  const socketRef = useRef<WebSocket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef<number>(0);
  const shouldReconnectRef = useRef<boolean>(true);
  const isManualDisconnectRef = useRef<boolean>(false);
  const connectionStateRef = useRef<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [providerId] = useState(() => Math.random().toString(36).substr(2, 9));
  const clearTimeouts = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  }, []);

  const isUserOnline = useCallback((userEmail: string) => {
    return onlineUsers.has(userEmail);
  }, [onlineUsers]);

  const onlineUsersArray = Array.from(onlineUsers.values());

  

  // Message handlers
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const wsMessage: WSMessage = JSON.parse(event.data);
      
      switch (wsMessage.type) {
          
      case 'messages_loaded':
        // Sort messages by timestamp on initial load
        const loadedMessages = wsMessage.payload.messages
          .map(msg => ({
            id: msg.id,
            conversationId: msg.conversationId,
            senderEmail: msg.senderEmail,
            content: String(msg.content || ''),
            timestamp: msg.timestamp || msg.createdAt,
            type: msg.type || 'text'
          }))
          .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        
        setMessages(loadedMessages);
        setCurrentConversationId(wsMessage.payload.conversationId);
        break;

        case 'new_message':
          const newMessage = {
            id: wsMessage.payload.id,
            conversationId: wsMessage.payload.conversationId,
            senderEmail: wsMessage.payload.senderEmail,
            content: String(wsMessage.payload.content || ''),
            timestamp: wsMessage.payload.timestamp || wsMessage.payload.createdAt,
            type: wsMessage.payload.type || 'text'
          };

          // Use functional update with optimized insertion
          setMessages(prevMessages => {
            // Check if message already exists
            const messageExists = prevMessages.some(msg => msg.id === newMessage.id);
            if (messageExists) {
              return prevMessages;
            }

            // Find the correct position to insert the message (binary search could be used for very large arrays)
            const newTimestamp = new Date(newMessage.timestamp);
            let insertIndex = prevMessages.length;
            
            // If the new message is older than the last message, find correct position
            if (prevMessages.length > 0 && newTimestamp.getTime() < new Date(prevMessages[prevMessages.length - 1].timestamp).getTime()) {
              insertIndex = prevMessages.findIndex(msg => new Date(msg.timestamp).getTime() > newTimestamp.getTime());
              if (insertIndex === -1) insertIndex = prevMessages.length;
            }

            // Insert at the correct position
            const updatedMessages = [...prevMessages];
              updatedMessages.splice(insertIndex, 0, newMessage);
              return updatedMessages;
            });
            break;

          case 'user_online':
            setOnlineUsers(prev => {
              const newMap = new Map(prev);
              newMap.set(wsMessage.payload.userEmail, {
                userEmail: wsMessage.payload.userEmail,
                userName: wsMessage.payload.userName,
                lastSeen: wsMessage.payload.lastSeen || new Date().toISOString()
              });
              return newMap;
            });
          break;
          case 'online_users_list':
            console.log("online users received: ", wsMessage.payload.users)
            setOnlineUsers(prev => {
              const newMap = new Map(prev);
              wsMessage.payload.users.forEach((user) => {
                newMap.set(user.userEmail, user)
              })
              return newMap;
            });
          break;

        case 'user_offline':
          setOnlineUsers(prev => {
            const newMap = new Map(prev);
            newMap.delete(wsMessage.payload.userEmail);
            return newMap;
          });
        break;

          
        case 'user_typing':
          setTypingUsers(prev => {
            const exists = prev.find(u => u.userName === wsMessage.payload.userName);
            if (!exists) {
              return [...prev, wsMessage.payload];
            }
            return prev;
          });
          break;
          
        case 'user_stop_typing':
          setTypingUsers(prev => 
            prev.filter(u => u.userName !== wsMessage.payload.userName)
          );
          break;
          
        // case 'user_joined':
        //   console.log(`${wsMessage.payload.userEmail} joined the conversation`);
        //   break;
          
        case 'user_left':
          console.log(`${wsMessage.payload.userEmail} left the conversation`);
          // Remove from typing users if they were typing
          setTypingUsers(prev => 
            prev.filter(u => u.userEmail !== wsMessage.payload.userEmail)
          );
          break;

        case 'connection_established':
          console.log('Connected to server, waiting for authentication...');
          if (socketRef.current && user) {
            console.log("uegfowq")
            socketRef.current.send(JSON.stringify({
              type: 'authenticate',
              payload: {
                userEmail: user.email,
                userName: user.firstName,
                conversationId: currentConversationId,
                type: user.userType,
                avatar: user.avatar
              }
            }))
          }
          break;
          
        case 'authentication_success':
          console.log('User authenticated successfully');
          connectionStateRef.current = 'connected';
          setIsConnected(true);
          setIsConnecting(false);
          setError(null);
          retryCountRef.current = 0; // Reset retry count on successful auth
          break;
          
        case 'error':
          const errorCode = wsMessage.payload.code;
          const errorMessage = wsMessage.payload.message;
          
          // Don't reconnect on authentication/authorization errors (4000-4999)
          if (errorCode >= 4000 && errorCode < 5000) {
            setError(`Authentication error: ${errorMessage}`);
            setIsConnecting(false);
            shouldReconnectRef.current = false; // Stop reconnection attempts
            connectionStateRef.current = 'disconnected';
          } else {
            setError(errorMessage);
          }
          break;
                
        default:
          console.log('Unknown message type:', wsMessage.type);
      }
    } catch (err) {
      console.error('Error parsing WebSocket message:', err);
      setError('Failed to parse server message');
    }
  }, []);

  // Connection handlers
  const handleOpen = useCallback(() => {
    console.log('WebSocket connected, registering user...');
    setIsConnecting(true); // Keep connecting state until authenticated
    setError(null);
    
    // Send user registration
    if (socketRef.current && user) {
      socketRef.current.send(JSON.stringify({
        type: 'authenticate',
        payload: {
          userEmail: user.email,
          userName: user.firstName,
          type: user.userType,
          avatar: user.avatar
        }
      }));
    }
  }, [user]);

  const handleClose = useCallback((event: CloseEvent) => {
    console.log('WebSocket disconnected:', event.code, event.reason);
    
    connectionStateRef.current = 'disconnected';
    setIsConnected(false);
    setIsConnecting(false);
    socketRef.current = null;
    
    // Clear typing users
    setTypingUsers([]);
    
    // Only attempt reconnection if:
    // 1. It wasn't a manual disconnect
    // 2. We haven't exceeded max retries
    // 3. We should still be reconnecting
    const wasManualDisconnect = isManualDisconnectRef.current || 
                               event.code === 1000 || 
                               event.code === 1001;
    const wasAuthError = event.code >= 4000 && event.code < 5000;
    
    if (!wasManualDisconnect && 
        !wasAuthError && 
        shouldReconnectRef.current && 
        retryCountRef.current < maxRetries) {
      
      retryCountRef.current++;
      const retryDelay = Math.min(1000 * Math.pow(2, retryCountRef.current - 1), 10000); // Exponential backoff, max 10s
      
      setError(`Connection lost. Retrying in ${retryDelay / 1000}s... (${retryCountRef.current}/${maxRetries})`);
      
      // FIXED: Uncommented the reconnection logic
      reconnectTimeoutRef.current = setTimeout(() => {
        if (shouldReconnectRef.current && connectionStateRef.current === 'disconnected') {
          console.log(`Reconnection attempt ${retryCountRef.current}/${maxRetries}`);
          connect();
        }
      }, retryDelay);
    } else if (retryCountRef.current >= maxRetries) {
      setError(`Failed to connect after ${maxRetries} attempts. Please check your connection and try again.`);
      shouldReconnectRef.current = false;
    } else if (wasManualDisconnect) {
      console.log('Manual disconnect, not attempting to reconnect');
    }
  }, [maxRetries]);

  const handleError = useCallback((event: Event) => {
    console.error('WebSocket error:', event);
    setError('Connection error occurred');
    setIsConnecting(false);
    connectionStateRef.current = 'disconnected';
  }, []);

  useEffect(() => {
  if (socketRef.current?.readyState === WebSocket.OPEN && user) {
    // WebSocket is already open, and user just became available
    handleOpen(); // or just directly send the authenticate message
  }
}, [user]);

  // Connect function - moved outside to avoid dependency issues
  const connect = useCallback(() => {
    // Don't connect if already connected or connecting
    if (connectionStateRef.current === 'connected' || connectionStateRef.current === 'connecting') {
      console.log(`Already ${connectionStateRef.current}, skipping connection attempt`);
      return;
    }

    // Don't connect if we've exceeded max retries and aren't manually connecting
    if (retryCountRef.current >= maxRetries && shouldReconnectRef.current === false) {
      setError(`Maximum retry attempts (${maxRetries}) exceeded. Please refresh the page or check your connection.`);
      return;
    }

    console.log('Attempting to connect...');
    connectionStateRef.current = 'connecting';
    setIsConnecting(true);
    setError(null);
    isManualDisconnectRef.current = false;
    
    // Clean up existing socket if any
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.addEventListener('open', handleOpen);
      ws.addEventListener('message', handleMessage);
      ws.addEventListener('close', handleClose);
      ws.addEventListener('error', handleError);
      
      socketRef.current = ws;
    } catch (err) {
      console.error('Failed to create WebSocket connection:', err);
      setError('Failed to create connection');
      setIsConnecting(false);
      connectionStateRef.current = 'disconnected';
    }
  }, [wsUrl, maxRetries, handleOpen, handleMessage, handleClose, handleError]);

  // Disconnect function
  const disconnect = useCallback(() => {
    console.log('Manual disconnect initiated');
    
    // Mark as manual disconnect
    isManualDisconnectRef.current = true;
    shouldReconnectRef.current = false;
    connectionStateRef.current = 'disconnected';
    
    // Clear timeouts
    clearTimeouts();
    
    if (socketRef.current) {
      // Remove event listeners to prevent handling close event
      socketRef.current.removeEventListener('open', handleOpen);
      socketRef.current.removeEventListener('message', handleMessage);
      socketRef.current.removeEventListener('close', handleClose);
      socketRef.current.removeEventListener('error', handleError);
      
      if (socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close(1000, 'Manual disconnect');
      }
      
      socketRef.current = null;
    }
    
    setIsConnected(false);
    setIsConnecting(false);
    setError(null);
    setTypingUsers([]);
    
    // Reset retry count for future connections
    retryCountRef.current = 0;
  }, [clearTimeouts, handleOpen, handleMessage, handleClose, handleError]);

  // Manual reconnect function (resets retry count)
  const manualReconnect = useCallback(() => {
    console.log('Manual reconnect initiated');
    retryCountRef.current = 0;
    shouldReconnectRef.current = true;
    isManualDisconnectRef.current = false;
    connectionStateRef.current = 'disconnected';
    connect();
  }, [connect]);

  // Action functions
  const joinConversation = useCallback((conversationId: string) => {
    console.log('🚪 joinConversation called');
    console.log('🔌 WebSocket ready state:', socketRef.current?.readyState);
    console.log('📧 Target conversation ID:', conversationId);
    
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      console.log('✅ Sending join_conversation request');
      const joinPayload = {
        type: 'join_conversation',
        payload: { conversationId }
      };
      console.log('📨 Join payload:', joinPayload);
      
      socketRef.current.send(JSON.stringify(joinPayload));
    } else {
      console.log('❌ Cannot join conversation - WebSocket not open');
    }
  }, []);

  const createConversation = useCallback(async (otherUserEmail: string, projectName?: string, jobId?: string): Promise<string | null> => {
    try {
      const response = await fetch('/api/messages/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          otherUserEmail,
          projectName: projectName || `Project with ${otherUserEmail}`,
          ...(jobId ? { jobId } : {})
        })
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('Conversation created successfully:', data.data.id);
        return data.data.id;
      } else {
        console.error('Failed to create conversation:', data.message);
        return null;
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
      return null;
    }
  }, []);

  const stopTyping = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN && currentConversationId) {
      socketRef.current.send(JSON.stringify({
        type: 'stop_typing',
        payload: { conversationId: currentConversationId }
      }));
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  }, [currentConversationId]);

  const startTyping = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN && currentConversationId) {
      socketRef.current.send(JSON.stringify({
        type: 'typing',
        payload: { conversationId: currentConversationId }
      }));
      
      // Auto-stop typing after 3 seconds
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        stopTyping();
      }, 3000);
    }
  }, [currentConversationId, stopTyping]);

  const sendMessage = useCallback((content: string, type: 'text' | 'file' | 'image' = 'text') => {
    console.log('📤 sendMessage called');
    console.log('🔌 WebSocket ready state:', socketRef.current?.readyState);
    console.log('🔗 Current conversation ID:', currentConversationId);
    console.log('💬 Content:', content);
    
    if (socketRef.current?.readyState === WebSocket.OPEN && currentConversationId && content.trim()) {
      console.log("✅ Sending message via WebSocket");
      const messagePayload = {
        type: 'send_message',
        payload: { 
          conversationId: currentConversationId, 
          content: content.trim(), 
          type 
        }
      };
      console.log('📨 Message payload:', messagePayload);
      
      socketRef.current.send(JSON.stringify(messagePayload));
      
      // Stop typing when message is sent
      stopTyping();
    } else {
      console.log('❌ Cannot send message:');
      console.log('- WebSocket open:', socketRef.current?.readyState === WebSocket.OPEN);
      console.log('- Has conversation ID:', !!currentConversationId);
      console.log('- Has content:', !!content.trim());
    }
  }, [currentConversationId, stopTyping]);

  // Auto-connect when provider mounts
  useEffect(() => {
    console.log('🔌 WebSocketProvider MOUNTED - ID:', providerId);
    shouldReconnectRef.current = true;
    connect();
    
    // Cleanup on unmount
    return () => {
      console.log('🔌 WebSocketProvider UNMOUNTING - ID:', providerId);
      shouldReconnectRef.current = false;
      disconnect();
    };
  }, []); // Empty dependency array - only run on mount/unmount

  // Separate effect for user changes (if user changes, reconnect)
  // useEffect(() => {
  //   if (isConnected && socketRef.current) {
  //     // If user changes while connected, we might need to re-authenticate
  //     // This depends on your server implementation
  //     console.log('User changed while connected');
  //   }
  // }, [user.id, user.name, user.type, isConnected]);

  // Context value
  const contextValue: WebSocketContextType = {
    // Connection state
    isConnected,
    isConnecting,
    error,
    
    // Data
    conversations,
    messages,
    currentConversationId,
    typingUsers,
    socketRef,
    onlineUsers: onlineUsersArray, // Export as array for components
    onlineUsersMap: onlineUsers,   // Export Map for advanced usage
    isUserOnline,
    // Actions
    joinConversation,
    createConversation,
    sendMessage,
    startTyping,
    stopTyping,
    
    // Connection control
    connect: manualReconnect, // Use manual reconnect for external calls
    disconnect
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to use WebSocket context
export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  
  return context;
};

// Export types for use in components
export type { Message, Conversation, User, TypingUser };