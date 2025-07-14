import { api, handleApiResponse, handleApiError } from './api';
import { WSConversation, WSMessageData } from '../types';

export const messageService = {
  // Get all conversations for the current user
  getConversations: async (): Promise<{ success: boolean; data?: WSConversation[]; message?: string }> => {
    try {
      const response = await api.get('/messages/conversations');
      // Handle backend's response structure
      const responseData = response.data;
      if (responseData.success && responseData.conversations) {
        return {
          success: true,
          data: responseData.conversations,
          message: responseData.message
        };
      }
      return handleApiResponse<WSConversation[]>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Create a new conversation
  createConversation: async (data: any): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      const response = await api.post('/messages/conversations', data);
      return handleApiResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Send a message
  sendMessage: async (conversationId: string, content: string): Promise<any> => {
    try {
      const response = await api.post(`/messages`, { conversationId, content });
      return handleApiResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get messages for a conversation
  getMessages: async (conversationId: string): Promise<WSMessageData[]> => {
    try {
      const response = await api.get(`/messages/conversations/${conversationId}/messages`);
      const result = handleApiResponse<WSMessageData[]>(response);
      return result.data || [];
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Reschedule interview
  rescheduleInterview: async (messageId: string, data: any): Promise<any> => {
    try {
      const response = await api.put(`/messages/interview/${messageId}/reschedule`, data);
      return handleApiResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Send interview message
  sendInterviewMessage: async (conversationId: string, content: string): Promise<any> => {
    try {
      const response = await api.post(`/messages`, { conversationId, content });
      return handleApiResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }
}; 