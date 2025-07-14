import api, { handleApiResponse, handleApiError } from './api';
import { 
  Proposal, 
  ExistingProposal,
  PaginatedResponse,
  FilterParams,
  CreateProposalData,
  UpdateProposalData
} from '../types';

export const proposalService = {
  // Get all proposals for a job
  getJobProposals: async (jobId: string, params?: FilterParams): Promise<{ success: boolean; data?: PaginatedResponse<Proposal>; message?: string }> => {
    try {
      const response = await api.get(`/jobs/${jobId}/proposals`, { params });
      // Handle backend's response structure
      const responseData = response.data;
      if (responseData.success && responseData.data) {
        return {
          success: true,
          data: {
            data: responseData.data,
            total: responseData.pagination?.total || responseData.data.length,
            totalPages: responseData.pagination?.pages || 1,
            currentPage: responseData.pagination?.page || 1,
            limit: responseData.pagination?.limit || responseData.data.length,
            hasNext: false,
            hasPrev: false
          },
          message: responseData.message
        };
      }
      return handleApiResponse<PaginatedResponse<Proposal>>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get job proposals error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch proposals' 
      };
    }
  },

  // Get proposals for a job as array
  getJobProposalsArray: async (jobId: string): Promise<Proposal[]> => {
    try {
      const response = await api.get(`/proposals/job/${jobId}`);
      const result = handleApiResponse<Proposal[]>(response);
      return result.data || [];
    } catch (error) {
      console.error('❌ [Frontend] Get job proposals array error:', error);
      throw new Error('Failed to fetch proposals');
    }
  },

  // Get proposals submitted by the current user
  getMyProposals: async (params?: FilterParams): Promise<{ success: boolean; data?: PaginatedResponse<Proposal>; message?: string }> => {
    try {
      const response = await api.get('/proposals/my-proposals', { params });
      return handleApiResponse<PaginatedResponse<Proposal>>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get my proposals error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch your proposals' 
      };
    }
  },

  // Get a single proposal by ID
  getProposal: async (proposalId: string): Promise<{ success: boolean; data?: Proposal; message?: string }> => {
    try {
      const response = await api.get(`/proposals/${proposalId}`);
      return handleApiResponse<Proposal>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get proposal error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch proposal details' 
      };
    }
  },

  // Submit a new proposal
  submitProposal: async (proposalData: CreateProposalData): Promise<{ success: boolean; data?: Proposal; message?: string }> => {
    try {
      const formData = new FormData();
      formData.append('jobId', proposalData.jobId);
      formData.append('coverLetter', proposalData.coverLetter);
      formData.append('bidAmount', proposalData.bidAmount.toString());
      formData.append('estimatedDuration', proposalData.estimatedDuration);
      
      if (proposalData.attachments) {
        proposalData.attachments.forEach((file, index) => {
          formData.append(`attachments`, file);
        });
      }

      const response = await api.post('/proposals', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return handleApiResponse<Proposal>(response);
    } catch (error: any) {
      console.error('❌ [Frontend] Submit proposal error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to submit proposal' 
      };
    }
  },

  // Update an existing proposal
  updateProposal: async (proposalId: string, proposalData: UpdateProposalData): Promise<{ success: boolean; data?: Proposal; message?: string }> => {
    try {
      const formData = new FormData();
      
      if (proposalData.coverLetter) {
        formData.append('coverLetter', proposalData.coverLetter);
      }
      if (proposalData.bidAmount) {
        formData.append('bidAmount', proposalData.bidAmount.toString());
      }
      if (proposalData.estimatedDuration) {
        formData.append('estimatedDuration', proposalData.estimatedDuration);
      }
      
      if (proposalData.attachments) {
        proposalData.attachments.forEach((file) => {
          formData.append(`attachments`, file);
        });
      }

      const response = await api.put(`/proposals/${proposalId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return handleApiResponse<Proposal>(response);
    } catch (error: any) {
      console.error('❌ [Frontend] Update proposal error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update proposal' 
      };
    }
  },

  // Withdraw a proposal
  withdrawProposal: async (proposalId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.post(`/proposals/${proposalId}/withdraw`);
      const result = handleApiResponse<void>(response);
      return { success: result.success, message: result.message };
    } catch (error: any) {
      console.error('❌ [Frontend] Withdraw proposal error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to withdraw proposal' 
      };
    }
  },

  // Accept a proposal (client action)
  acceptProposal: async (proposalId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.post(`/proposals/${proposalId}/accept`);
      const result = handleApiResponse<void>(response);
      return { success: result.success, message: result.message };
    } catch (error: any) {
      console.error('❌ [Frontend] Accept proposal error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to accept proposal' 
      };
    }
  },

  // Reject a proposal (client action)
  rejectProposal: async (proposalId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.post(`/proposals/${proposalId}/reject`);
      const result = handleApiResponse<void>(response);
      return { success: result.success, message: result.message };
    } catch (error: any) {
      console.error('❌ [Frontend] Reject proposal error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to reject proposal' 
      };
    }
  },

  // Update proposal status (accept/reject)
  updateProposalStatus: async (proposalId: string, status: 'ACCEPTED' | 'REJECTED'): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.put(`/proposals/${proposalId}/status`, { status });
      const result = handleApiResponse<void>(response);
      return { success: result.success, message: result.message };
    } catch (error: any) {
      console.error('❌ [Frontend] Update proposal status error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update proposal status' 
      };
    }
  },

  // Check if user has already submitted a proposal for a job
  checkExistingProposal: async (jobId: string): Promise<{ success: boolean; data?: ExistingProposal; message?: string }> => {
    try {
      const response = await api.get(`/jobs/${jobId}/my-proposal`);
      return handleApiResponse<ExistingProposal>(response);
    } catch (error: any) {
      if (error.response?.status === 404) {
        // No existing proposal found
        return { success: true, data: undefined };
      }
      console.error('❌ [Frontend] Check existing proposal error:', error);
      return { 
        success: false, 
        message: 'Failed to check existing proposal' 
      };
    }
  },

  // Get proposal statistics
  getProposalStats: async (): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      const response = await api.get('/proposals/stats');
      return handleApiResponse<any>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get proposal stats error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch proposal statistics' 
      };
    }
  }
}; 