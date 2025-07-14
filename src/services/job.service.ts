import api, { handleApiResponse, handleApiError } from './api';
import { 
  Job, 
  JobFormData, 
  JobInvitation,
  PaginatedResponse,
  FilterParams,
  SearchParams 
} from '../types';

export const jobService = {
  // Get all jobs with optional filtering
  getJobs: async (params?: SearchParams & FilterParams): Promise<{ success: boolean; data?: PaginatedResponse<Job>; message?: string }> => {
    try {
      const response = await api.get('/jobs', { params });
      // Handle backend's pagination structure
      const responseData = response.data;
      if (responseData.success && responseData.data) {
        return {
          success: true,
          data: {
            data: responseData.data,
            total: responseData.pagination?.total || 0,
            totalPages: responseData.pagination?.pages || 0,
            currentPage: responseData.pagination?.page || 1,
            limit: responseData.pagination?.limit || 10,
            hasNext: responseData.pagination?.page < responseData.pagination?.pages,
            hasPrev: responseData.pagination?.page > 1
          },
          message: responseData.message
        };
      }
      return handleApiResponse<PaginatedResponse<Job>>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get jobs error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch jobs' 
      };
    }
  },

  // Get a single job by ID
  getJob: async (jobId: string): Promise<{ success: boolean; data?: Job; message?: string }> => {
    try {
      const response = await api.get(`/jobs/${jobId}`);
      return handleApiResponse<Job>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get job error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch job details' 
      };
    }
  },

  // Create a new job
  createJob: async (jobData: JobFormData): Promise<{ success: boolean; data?: Job; message?: string }> => {
    try {
      const response = await api.post('/jobs', jobData);
      return handleApiResponse<Job>(response);
    } catch (error: any) {
      console.error('❌ [Frontend] Create job error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to create job' 
      };
    }
  },

  // Update an existing job
  updateJob: async (jobId: string, jobData: Partial<JobFormData>): Promise<{ success: boolean; data?: Job; message?: string }> => {
    try {
      const response = await api.put(`/jobs/${jobId}`, jobData);
      return handleApiResponse<Job>(response);
    } catch (error: any) {
      console.error('❌ [Frontend] Update job error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update job' 
      };
    }
  },

  // Delete a job
  deleteJob: async (jobId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.delete(`/jobs/${jobId}`);
      const result = handleApiResponse<void>(response);
      return { success: result.success, message: result.message };
    } catch (error: any) {
      console.error('❌ [Frontend] Delete job error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete job' 
      };
    }
  },

  // Get jobs posted by the current user
  getMyJobs: async (params?: FilterParams): Promise<{ success: boolean; data?: PaginatedResponse<Job>; message?: string }> => {
    try {
      const response = await api.get('/jobs/my-jobs', { params });
      return handleApiResponse<PaginatedResponse<Job>>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get my jobs error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch your jobs' 
      };
    }
  },

  // Get jobs for client dashboard
  getClientJobs: async (): Promise<Job[]> => {
    try {
      const response = await api.get('/jobs/client/me');
      const result = handleApiResponse<Job[]>(response);
      return result.data || [];
    } catch (error) {
      console.error('❌ [Frontend] Get client jobs error:', error);
      throw new Error('Failed to fetch client jobs');
    }
  },

  // Get job invitations for the current user
  getJobInvitations: async (): Promise<{ success: boolean; data?: JobInvitation[]; message?: string }> => {
    try {
      const response = await api.get('/job-invitations');
      return handleApiResponse<JobInvitation[]>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get job invitations error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch job invitations' 
      };
    }
  },

  // Accept a job invitation
  acceptJobInvitation: async (invitationId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.post(`/job-invitations/${invitationId}/accept`);
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

  // Reject a job invitation
  rejectJobInvitation: async (invitationId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.post(`/job-invitations/${invitationId}/reject`);
      const result = handleApiResponse<void>(response);
      return { success: result.success, message: result.message };
    } catch (error: any) {
      console.error('❌ [Frontend] Reject invitation error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to reject invitation' 
      };
    }
  },

  // Send job invitation to a freelancer
  sendJobInvitation: async (jobId: string, freelancerId: string, message?: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.post('/job-invitations', {
        jobId,
        freelancerId,
        message
      });
      const result = handleApiResponse<void>(response);
      return { success: result.success, message: result.message };
    } catch (error: any) {
      console.error('❌ [Frontend] Send invitation error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to send invitation' 
      };
    }
  },

  // Search jobs
  searchJobs: async (query: string, filters?: FilterParams): Promise<{ success: boolean; data?: PaginatedResponse<Job>; message?: string }> => {
    try {
      const response = await api.get('/jobs/search', { 
        params: { q: query, ...filters } 
      });
      return handleApiResponse<PaginatedResponse<Job>>(response);
    } catch (error) {
      console.error('❌ [Frontend] Search jobs error:', error);
      return { 
        success: false, 
        message: 'Failed to search jobs' 
      };
    }
  },

  // Get job categories
  getJobCategories: async (): Promise<{ success: boolean; data?: any[]; message?: string }> => {
    try {
      const response = await api.get('/jobs/categories');
      return handleApiResponse<any[]>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get categories error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch job categories' 
      };
    }
  }
}; 