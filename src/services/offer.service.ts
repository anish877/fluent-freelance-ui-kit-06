import api, { handleApiResponse, handleApiError } from './api';
import { 
  Offer,
  PaginatedResponse,
  FilterParams,
  CreateOfferData,
  UpdateOfferData
} from '../types';

export const offerService = {
  // Get all offers for the current user
  getMyOffers: async (params?: FilterParams): Promise<{ success: boolean; data?: PaginatedResponse<Offer>; message?: string }> => {
    try {
      const response = await api.get('/offers/my-offers', { params });
      return handleApiResponse<PaginatedResponse<Offer>>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get my offers error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch your offers' 
      };
    }
  },

  // Get offers by status
  getOffersByStatus: async (status: string): Promise<Offer[]> => {
    try {
      const response = await api.get(`/offers/me?status=${status}`);
      const result = handleApiResponse<Offer[]>(response);
      return result.data || [];
    } catch (error) {
      console.error('❌ [Frontend] Get offers by status error:', error);
      throw new Error('Failed to fetch offers');
    }
  },

  // Get offers sent by the current user
  getSentOffers: async (params?: FilterParams): Promise<{ success: boolean; data?: PaginatedResponse<Offer>; message?: string }> => {
    try {
      const response = await api.get('/offers/sent', { params });
      return handleApiResponse<PaginatedResponse<Offer>>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get sent offers error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch sent offers' 
      };
    }
  },

  // Get a single offer by ID
  getOffer: async (offerId: string): Promise<{ success: boolean; data?: Offer; message?: string }> => {
    try {
      const response = await api.get(`/offers/${offerId}`);
      return handleApiResponse<Offer>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get offer error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch offer details' 
      };
    }
  },

  // Create a new offer
  createOffer: async (offerData: CreateOfferData): Promise<{ success: boolean; data?: Offer; message?: string }> => {
    try {
      const response = await api.post('/offers', offerData);
      return handleApiResponse<Offer>(response);
    } catch (error: any) {
      console.error('❌ [Frontend] Create offer error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to create offer' 
      };
    }
  },

  // Update an existing offer
  updateOffer: async (offerId: string, offerData: UpdateOfferData): Promise<{ success: boolean; data?: Offer; message?: string }> => {
    try {
      const response = await api.put(`/offers/${offerId}`, offerData);
      return handleApiResponse<Offer>(response);
    } catch (error: any) {
      console.error('❌ [Frontend] Update offer error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update offer' 
      };
    }
  },

  // Accept an offer
  acceptOffer: async (offerId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.post(`/offers/${offerId}/accept`);
      const result = handleApiResponse<void>(response);
      return { success: result.success, message: result.message };
    } catch (error: any) {
      console.error('❌ [Frontend] Accept offer error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to accept offer' 
      };
    }
  },

  // Reject an offer
  rejectOffer: async (offerId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.post(`/offers/${offerId}/reject`);
      const result = handleApiResponse<void>(response);
      return { success: result.success, message: result.message };
    } catch (error: any) {
      console.error('❌ [Frontend] Reject offer error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to reject offer' 
      };
    }
  },

  // Withdraw an offer
  withdrawOffer: async (offerId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.post(`/offers/${offerId}/withdraw`);
      const result = handleApiResponse<void>(response);
      return { success: result.success, message: result.message };
    } catch (error: any) {
      console.error('❌ [Frontend] Withdraw offer error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to withdraw offer' 
      };
    }
  },

  // Get offers for a specific conversation
  getConversationOffers: async (conversationId: string): Promise<{ success: boolean; data?: Offer[]; message?: string }> => {
    try {
      const response = await api.get(`/offers/conversation/${conversationId}`);
      return handleApiResponse<Offer[]>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get conversation offers error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch conversation offers' 
      };
    }
  },

  // Get offer payments
  getOfferPayments: async (offerId: string): Promise<{ success: boolean; data?: any[]; message?: string }> => {
    try {
      const response = await api.get(`/offers/${offerId}/payments`);
      return handleApiResponse<any[]>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get offer payments error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch offer payments' 
      };
    }
  },

  // Get offer statistics
  getOfferStats: async (): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      const response = await api.get('/offers/stats');
      return handleApiResponse<any>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get offer stats error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch offer statistics' 
      };
    }
  },

  // Process milestone payment
  processMilestonePayment: async (offerId: string, paymentData: {
    milestoneIndex: number;
    amount: number;
    paymentMethod?: string;
  }): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      const response = await api.post(`/offers/${offerId}/payments`, paymentData);
      return handleApiResponse<any>(response);
    } catch (error: any) {
      console.error('❌ [Frontend] Process milestone payment error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to process payment' 
      };
    }
  },

  // Add milestone to offer
  addMilestone: async (offerId: string, milestoneData: {
    title: string;
    description: string;
    amount: number;
    dueDate: string;
  }): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      const response = await api.post(`/offers/${offerId}/milestones`, milestoneData);
      return handleApiResponse<any>(response);
    } catch (error: any) {
      console.error('❌ [Frontend] Add milestone error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add milestone' 
      };
    }
  }
}; 