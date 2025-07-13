import React, { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { 
  WSUser,
  OnlineUser,
  WSMessage,
  WSMessageData as Message,
  WSConversation as Conversation,
  TypingUser,
  WebSocketContextType,
  WebSocketProviderProps
} from '../types';

const WebSocketContext = createContext<WebSocketContextType | null>(null);

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

        case 'interview_scheduled':
          console.log('📅 Received interview_scheduled message:', wsMessage.payload);
          console.log('📅 Current conversation ID:', currentConversationId);
          console.log('📅 Message conversation ID:', wsMessage.payload.conversationId);
          
          const interviewMessage = {
            id: wsMessage.payload.id,
            conversationId: wsMessage.payload.conversationId,
            senderEmail: wsMessage.payload.senderEmail,
            content: JSON.stringify(wsMessage.payload.interviewData || wsMessage.payload.content),
            timestamp: wsMessage.payload.timestamp || wsMessage.payload.createdAt,
            type: 'interview' as const
          };

          console.log('📅 Processed interview message:', interviewMessage);

          setMessages(prevMessages => {
            console.log('📅 Current messages before adding interview:', prevMessages.length);
            console.log('📅 Current conversation ID in setMessages:', currentConversationId);
            console.log('📅 Message conversation ID:', interviewMessage.conversationId);
            
            const messageExists = prevMessages.some(msg => msg.id === interviewMessage.id);
            if (messageExists) {
              console.log('📅 Interview message already exists, updating content');
              return prevMessages.map(msg =>
                msg.id === interviewMessage.id ? interviewMessage : msg
              );
            }

            const newTimestamp = new Date(interviewMessage.timestamp);
            let insertIndex = prevMessages.length;
            
            if (prevMessages.length > 0 && newTimestamp.getTime() < new Date(prevMessages[prevMessages.length - 1].timestamp).getTime()) {
              insertIndex = prevMessages.findIndex(msg => new Date(msg.timestamp).getTime() > newTimestamp.getTime());
              if (insertIndex === -1) insertIndex = prevMessages.length;
            }

            const updatedMessages = [...prevMessages];
            updatedMessages.splice(insertIndex, 0, interviewMessage);
            console.log('📅 Added interview message, total messages:', updatedMessages.length);
            return updatedMessages;
          });
        break;

        case 'interview_status_updated':
          const updatedInterviewMessage = {
            id: wsMessage.payload.id,
            conversationId: wsMessage.payload.conversationId,
            senderEmail: wsMessage.payload.senderEmail,
            content: wsMessage.payload.content || JSON.stringify(wsMessage.payload.interviewData),
            timestamp: wsMessage.payload.timestamp || wsMessage.payload.createdAt,
            type: 'interview' as const
          };
          
          // Update the existing interview message with new content
          setMessages(prevMessages => {
            return prevMessages.map(msg => 
              msg.id === updatedInterviewMessage.id ? updatedInterviewMessage : msg
            );
          });
        break;

        case 'interview_rescheduled':
          const rescheduledInterviewMessage = {
            id: wsMessage.payload.id,
            conversationId: wsMessage.payload.conversationId,
            senderEmail: wsMessage.payload.senderEmail,
            content: wsMessage.payload.content || JSON.stringify(wsMessage.payload.interviewData),
            timestamp: wsMessage.payload.timestamp || wsMessage.payload.createdAt,
            type: 'interview' as const
          };
          
          // Update the existing interview message with new content
          setMessages(prevMessages => {
            return prevMessages.map(msg => 
              msg.id === rescheduledInterviewMessage.id ? rescheduledInterviewMessage : msg
            );
          });
        break;

        case 'interview_invitation_sent':
          const interviewInvitationMessage = {
            id: wsMessage.payload.id,
            conversationId: wsMessage.payload.conversationId,
            senderEmail: wsMessage.payload.senderEmail,
            content: JSON.stringify(wsMessage.payload.invitationData || wsMessage.payload.content),
            timestamp: wsMessage.payload.timestamp || wsMessage.payload.createdAt,
            type: 'interview_invitation' as const
          };

          setMessages(prevMessages => {
            const messageExists = prevMessages.some(msg => msg.id === interviewInvitationMessage.id);
            if (messageExists) {
              // Update existing message with new content
              return prevMessages.map(msg =>
                msg.id === interviewInvitationMessage.id ? interviewInvitationMessage : msg
              );
            }
            // Add new message
            const newTimestamp = new Date(interviewInvitationMessage.timestamp);
            let insertIndex = prevMessages.length;
            if (prevMessages.length > 0 && newTimestamp.getTime() < new Date(prevMessages[prevMessages.length - 1].timestamp).getTime()) {
              insertIndex = prevMessages.findIndex(msg => new Date(msg.timestamp).getTime() > newTimestamp.getTime());
              if (insertIndex === -1) insertIndex = prevMessages.length;
            }
            const updatedMessages = [...prevMessages];
            updatedMessages.splice(insertIndex, 0, interviewInvitationMessage);
            return updatedMessages;
          });
        break;

        case 'interview_invitation_updated':
          const updatedInterviewInvitationMessage = {
            id: wsMessage.payload.id,
            conversationId: wsMessage.payload.conversationId,
            senderEmail: wsMessage.payload.senderEmail,
            content: wsMessage.payload.content || JSON.stringify(wsMessage.payload.invitationData),
            timestamp: wsMessage.payload.timestamp || wsMessage.payload.createdAt,
            type: 'interview_invitation' as const
          };
          setMessages(prevMessages => {
            const messageExists = prevMessages.some(msg => msg.id === updatedInterviewInvitationMessage.id);
            if (messageExists) {
              return prevMessages.map(msg =>
                msg.id === updatedInterviewInvitationMessage.id ? updatedInterviewInvitationMessage : msg
              );
            }
            // Add new message if not found (shouldn't happen, but for safety)
            return [...prevMessages, updatedInterviewInvitationMessage];
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
          
        case 'user_joined':
          break;
          
        case 'user_left':
          // Remove from typing users if they were typing
          setTypingUsers(prev => 
            prev.filter(u => u.userEmail !== wsMessage.payload.userEmail)
          );
          break;

        case 'connection_established':
          if (socketRef.current && user) {
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
          console.error('Unknown message type:', wsMessage.type);
      }
    } catch (err) {
      console.error('Error parsing WebSocket message:', err);
      setError('Failed to parse server message');
    }
  }, []);

  // Connection handlers
  const handleOpen = useCallback(() => {
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
          connect();
        }
      }, retryDelay);
    } else if (retryCountRef.current >= maxRetries) {
      setError(`Failed to connect after ${maxRetries} attempts. Please check your connection and try again.`);
      shouldReconnectRef.current = false;
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
      return;
    }

    // Don't connect if we've exceeded max retries and aren't manually connecting
    if (retryCountRef.current >= maxRetries && shouldReconnectRef.current === false) {
      setError(`Maximum retry attempts (${maxRetries}) exceeded. Please refresh the page or check your connection.`);
      return;
    }

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
    retryCountRef.current = 0;
    shouldReconnectRef.current = true;
    isManualDisconnectRef.current = false;
    connectionStateRef.current = 'disconnected';
    connect();
  }, [connect]);

  // Action functions
  const joinConversation = useCallback((conversationId: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const joinPayload = {
        type: 'join_conversation',
        payload: { conversationId }
      };
      
      socketRef.current.send(JSON.stringify(joinPayload));
    } else {
      console.error('❌ Cannot join conversation - WebSocket not open');
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
    if (socketRef.current?.readyState === WebSocket.OPEN && currentConversationId && content.trim()) {
      const messagePayload = {
        type: 'send_message',
        payload: { 
          conversationId: currentConversationId, 
          content: content.trim(), 
          type 
        }
      };
      
      socketRef.current.send(JSON.stringify(messagePayload));
      
      // Stop typing when message is sent
      stopTyping();
    } else {
      console.error('❌ Cannot send message - WebSocket not open or missing conversation/content');
    }
  }, [currentConversationId, stopTyping]);

  const sendInterviewMessage = useCallback((interviewData: any, conversationId?: string, proposalId?: string) => {
    const targetConversationId = conversationId || currentConversationId;
    
    if (socketRef.current?.readyState === WebSocket.OPEN && targetConversationId) {
      const interviewPayload = {
        type: 'interview_scheduled',
        payload: { 
          conversationId: targetConversationId, 
          interviewData,
          proposalId
        }
      };
      
      socketRef.current.send(JSON.stringify(interviewPayload));
    } else {
      console.error('❌ Cannot send interview message - WebSocket not open or missing conversation');
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
    sendInterviewMessage,
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
export type { Message, Conversation, WSUser as User, TypingUser };