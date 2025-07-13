import api, { handleApiResponse, handleApiError } from './api';

export interface Conversation {
  id: string;
  name?: string;
  project?: string;
  otherParticipant?: {
    email: string;
  };
  lastMessage?: {
    content: string;
    timestamp: string;
  };
  timestamp?: string;
  unread?: number;
}

export interface CreateConversationData {
  otherUserEmail: string;
  jobId: string;
  projectName?: string;
}

export const messagesService = {
  // Get all conversations
  getConversations: async (): Promise<{ success: boolean; data?: Conversation[]; message?: string }> => {
    try {
      const response = await api.get('/messages/conversations');
      return handleApiResponse<Conversation[]>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get conversations error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch conversations' 
      };
    }
  },

  // Create a new conversation
  createConversation: async (conversationData: CreateConversationData): Promise<{ success: boolean; data?: Conversation; message?: string }> => {
    try {
      const response = await api.post('/messages/conversations', conversationData);
      return handleApiResponse<Conversation>(response);
    } catch (error: any) {
      console.error('❌ [Frontend] Create conversation error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to create conversation' 
      };
    }
  }
}; 