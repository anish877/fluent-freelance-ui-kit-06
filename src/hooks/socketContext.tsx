import React, { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from 'react';

// Types (matching your server)
interface User {
  id: string;
  name: string;
  type: 'client' | 'freelancer';
  avatar?: string;
}

interface WSMessage {
  type: 'register_user' | "error" | "conversations_loaded" | "user_left" | "user_joined" | "user_stop_typing" | "user_typing" | "messages_loaded" | "new_message" | 'authentication_success' | 'connection_established' | 'join_conversation' | 'send_message' | 'typing' | 'stop_typing' | 'user_online' | 'user_offline';
  payload: any;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
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
  userId: string;
  userName: string;
}

interface WebSocketContextType {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  
  // Data
  conversations: Conversation[];
  messages: Message[];
  currentConversationId: string | null;
  typingUsers: TypingUser[];
  
  // Actions
  joinConversation: (conversationId: string) => void;
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
  userId: string;
  user: User;
  wsUrl?: string;
  maxRetries?: number;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ 
  children, 
  userId, 
  user,
  wsUrl = 'ws://localhost:8080',
  maxRetries = 5
}) => {
  // Connection state
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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

  // Message handlers
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const wsMessage: WSMessage = JSON.parse(event.data);
      
      switch (wsMessage.type) {
        case 'conversations_loaded':
          setConversations(wsMessage.payload.conversations);
          break;
          
        case 'messages_loaded':
          setMessages(wsMessage.payload.messages);
          setCurrentConversationId(wsMessage.payload.conversationId);
          break;
          
        case 'new_message':
          setMessages(prev => [...prev, wsMessage.payload]);
          // Update conversation's last message
          setConversations(prev => prev.map(conv => 
            conv.id === wsMessage.payload.conversationId 
              ? { ...conv, lastMessage: wsMessage.payload }
              : conv
          ));
          break;
          
        case 'user_typing':
          setTypingUsers(prev => {
            const exists = prev.find(u => u.userId === wsMessage.payload.userId);
            if (!exists) {
              return [...prev, wsMessage.payload];
            }
            return prev;
          });
          break;
          
        case 'user_stop_typing':
          setTypingUsers(prev => 
            prev.filter(u => u.userId !== wsMessage.payload.userId)
          );
          break;
          
        case 'user_joined':
          console.log(`${wsMessage.payload.userName} joined the conversation`);
          break;
          
        case 'user_left':
          console.log(`${wsMessage.payload.userName} left the conversation`);
          // Remove from typing users if they were typing
          setTypingUsers(prev => 
            prev.filter(u => u.userId !== wsMessage.payload.userId)
          );
          break;

        case 'connection_established':
        console.log('Connected to server, waiting for authentication...');
        break;
        
        case 'authentication_success':
        console.log('User authenticated successfully');
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
    
    // Send user registration instead of user_online
    if (socketRef.current && user) {
        socketRef.current.send(JSON.stringify({
        type: 'register_user',
        payload: {
            userId: user.id,
            name: user.name,
            type: user.type,
            avatar: user.avatar
        }
        }));
    }
}, [user]);

  const handleClose = useCallback((event: CloseEvent) => {
    console.log('WebSocket disconnected:', event.code, event.reason);
    
    setIsConnected(false);
    setIsConnecting(false);
    setSocket(null);
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
    !wasAuthError && // Add this line
    shouldReconnectRef.current && 
    retryCountRef.current < maxRetries) {
      
      retryCountRef.current++;
      const retryDelay = Math.min(1000 * Math.pow(2, retryCountRef.current - 1), 10000); // Exponential backoff, max 10s
      
      setError(`Connection lost. Retrying in ${retryDelay / 1000}s... (${retryCountRef.current}/${maxRetries})`);
      
      reconnectTimeoutRef.current = setTimeout(() => {
        if (shouldReconnectRef.current) {
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
  }, []);

  // Connect function
  const connect = useCallback(() => {
    // Don't connect if already connected or connecting
    if (socketRef.current?.readyState === WebSocket.OPEN || isConnecting) {
      return;
    }

    // Don't connect if we've exceeded max retries and aren't manually connecting
    if (retryCountRef.current >= maxRetries && shouldReconnectRef.current === false) {
      setError(`Maximum retry attempts (${maxRetries}) exceeded. Please refresh the page or check your connection.`);
      return;
    }

    setIsConnecting(true);
    setError(null);
    isManualDisconnectRef.current = false;
    
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.addEventListener('open', handleOpen);
      ws.addEventListener('message', handleMessage);
      ws.addEventListener('close', handleClose);
      ws.addEventListener('error', handleError);
      
      socketRef.current = ws;
      setSocket(ws);
    } catch (err) {
      console.error('Failed to create WebSocket connection:', err);
      setError('Failed to create connection');
      setIsConnecting(false);
    }
  }, [wsUrl, isConnecting, maxRetries, handleOpen, handleMessage, handleClose, handleError]);

  // Disconnect function
  const disconnect = useCallback(() => {
    console.log('Manual disconnect initiated');
    
    // Mark as manual disconnect
    isManualDisconnectRef.current = true;
    shouldReconnectRef.current = false;
    
    // Clear any pending reconnection attempts
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    
    if (socketRef.current) {
      socketRef.current.removeEventListener('open', handleOpen);
      socketRef.current.removeEventListener('message', handleMessage);
      socketRef.current.removeEventListener('close', handleClose);
      socketRef.current.removeEventListener('error', handleError);
      
      if (socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close(1000, 'Manual disconnect');
      }
      
      socketRef.current = null;
    }
    
    setSocket(null);
    setIsConnected(false);
    setIsConnecting(false);
    setError(null);
    setTypingUsers([]);
    
    // Reset retry count for future connections
    retryCountRef.current = 0;
  }, [handleOpen, handleMessage, handleClose, handleError]);

  // Manual reconnect function (resets retry count)
  const manualReconnect = useCallback(() => {
    console.log('Manual reconnect initiated');
    retryCountRef.current = 0;
    shouldReconnectRef.current = true;
    isManualDisconnectRef.current = false;
    connect();
  }, [connect]);

  // Action functions
  const joinConversation = useCallback((conversationId: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'join_conversation',
        payload: { conversationId }
      }));
    }
  }, []);

  const sendMessage = useCallback((content: string, type: 'text' | 'file' | 'image' = 'text') => {
    if (socketRef.current?.readyState === WebSocket.OPEN && currentConversationId && content.trim()) {
      socketRef.current.send(JSON.stringify({
        type: 'send_message',
        payload: { 
          conversationId: currentConversationId, 
          content: content.trim(), 
          type 
        }
      }));
      
      // Stop typing when message is sent
      stopTyping();
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
  }, [currentConversationId]);

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

  // Auto-connect when provider mounts
  useEffect(() => {
    shouldReconnectRef.current = true;
    connect();
    
    // Cleanup on unmount
    return () => {
      shouldReconnectRef.current = false;
      disconnect();
    };
  }, [connect, disconnect]);

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
    
    // Actions
    joinConversation,
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