import { ReactNode } from 'react';

// WebSocket-related types used across the application

export interface WSUser {
  id: string;
  name: string;
  type: 'client' | 'freelancer';
  avatar?: string;
}

export interface OnlineUser {
  userEmail: string;
  userName: string;
  lastSeen?: string;
}

export interface WSMessage {
  type: 'authenticate' | "online_users_list" | "error" | "user_left" | "user_joined" | "user_stop_typing" | "user_typing" | "messages_loaded" | "new_message" | 'authentication_success' | 'connection_established' | 'join_conversation' | 'send_message' | 'typing' | 'stop_typing' | 'user_online' | 'user_offline' | 'interview_scheduled' | 'interview_status_updated' | 'interview_rescheduled' | 'interview_invitation_sent' | 'interview_invitation_updated';
  payload: any;
}

export interface WSMessageData {
  id: string;
  conversationId: string;
  senderEmail: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image' | 'interview' | 'interview_invitation';
}

export interface WSConversation {
  id: string;
  participants: string[];
  projectName: string;
  lastMessage?: WSMessageData;
  createdAt: string;
}

export interface TypingUser {
  userEmail: string;
  userName: string;
}

export interface WebSocketContextType {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;

  socketRef: React.RefObject<WebSocket | null>;
  
  // Data
  conversations: WSConversation[];
  messages: WSMessageData[];
  currentConversationId: string | null;
  typingUsers: TypingUser[];
  onlineUsers: OnlineUser[]; // Array for components
  onlineUsersMap: Map<string, OnlineUser>; // Map for advanced usage
  isUserOnline: (userEmail: string) => boolean;
  
  // Actions
  joinConversation: (conversationId: string) => void;
  createConversation: (otherUserEmail: string, projectName?: string, jobId?: string) => Promise<string | null>;
  sendMessage: (content: string, type?: 'text' | 'file' | 'image') => void;
  sendInterviewMessage: (interviewData: any, conversationId?: string, proposalId?: string) => void;
  startTyping: () => void;
  stopTyping: () => void;
  
  // Connection control
  connect: () => void;
  disconnect: () => void;
}

export interface WebSocketProviderProps {
  children: ReactNode;
  wsUrl?: string;
  maxRetries?: number;
} 