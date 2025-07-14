import api, { handleApiResponse, handleApiError } from './api';

export interface JobInvitationData {
  jobId: string;
  freelancerEmail: string;
  message?: string;
}

export const jobInvitationsService = {
  // Send job invitation
  sendJobInvitation: async (invitationData: JobInvitationData): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.post('/job-invitations', invitationData);
      const result = handleApiResponse<void>(response);
      return { success: result.success, message: result.message };
    } catch (error: any) {
      console.error('❌ [Frontend] Send job invitation error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to send job invitation' 
      };
    }
  },

  // Get freelancer invitations
  getFreelancerInvitations: async (): Promise<any[]> => {
    try {
      const response = await api.get('/job-invitations/freelancer');
      const result = handleApiResponse<any[]>(response);
      return result.data || [];
    } catch (error) {
      console.error('❌ [Frontend] Get freelancer invitations error:', error);
      throw new Error('Failed to fetch job invitations');
    }
  },

  // Accept job invitation
  acceptInvitation: async (invitationId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.put(`/job-invitations/${invitationId}/accept`);
      const result = handleApiResponse<void>(response);
      return { success: result.success, message: result.message };
    } catch (error: any) {
      console.error('❌ [Frontend] Accept invitation error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to accept invitation' 
      };
    }
  },

  // Reject job invitation
  rejectInvitation: async (invitationId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.put(`/job-invitations/${invitationId}/reject`);
      const result = handleApiResponse<void>(response);
      return { success: result.success, message: result.message };
    } catch (error: any) {
      console.error('❌ [Frontend] Reject invitation error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to reject invitation' 
      };
    }
  }
}; 