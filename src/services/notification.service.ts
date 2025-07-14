import { api, handleApiResponse, handleApiError } from './api';
import { Notification } from '../types';

export const notificationService = {
  // Get all notifications for the current user
  getNotifications: async (): Promise<Notification[]> => {
    try {
      const response = await api.get('/notifications');
      const result = handleApiResponse<Notification[]>(response);
      return result.data || [];
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId: string): Promise<void> => {
    try {
      await api.put(`/notifications/${notificationId}/read`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<void> => {
    try {
      await api.put('/notifications/read-all');
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Delete a notification
  deleteNotification: async (notificationId: string): Promise<void> => {
    try {
      await api.delete(`/notifications/${notificationId}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get unread notification count
  getUnreadCount: async (): Promise<number> => {
    try {
      const response = await api.get('/notifications/unread-count');
      return handleApiResponse<number>(response).data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Create a notification (for testing/admin purposes)
  createNotification: async (data: {
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    userId: string;
    relatedId?: string;
    relatedType?: 'job' | 'proposal' | 'offer' | 'message';
  }): Promise<Notification> => {
    try {
      const response = await api.post('/notifications', data);
      return handleApiResponse<Notification>(response).data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}; 