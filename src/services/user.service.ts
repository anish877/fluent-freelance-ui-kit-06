import api, { handleApiResponse, handleApiError } from './api';
import { 
  UserProfile,
  FreelancerData,
  Skill,
  Language,
  Education,
  Certification,
  PortfolioItem,
  WorkExperience,
  UpdateProfileData
} from '../types';

export const userService = {
  // Get current user profile
  getProfile: async (): Promise<{ success: boolean; data?: UserProfile; message?: string }> => {
    try {
      const response = await api.get('/users/profile');
      return handleApiResponse<UserProfile>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get profile error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch profile' 
      };
    }
  },

  // Get user profile by ID
  getUserProfile: async (userId: string): Promise<{ success: boolean; data?: UserProfile; message?: string }> => {
    try {
      const response = await api.get(`/users/${userId}/profile`);
      return handleApiResponse<UserProfile>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get user profile error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch user profile' 
      };
    }
  },

  // Update user profile
  updateProfile: async (profileData: UpdateProfileData): Promise<{ success: boolean; data?: UserProfile; message?: string }> => {
    try {
      const response = await api.put('/users/profile', profileData);
      return handleApiResponse<UserProfile>(response);
    } catch (error: any) {
      console.error('❌ [Frontend] Update profile error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update profile' 
      };
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (file: File): Promise<{ success: boolean; data?: { url: string }; message?: string }> => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await api.post('/users/profile/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return handleApiResponse<{ url: string }>(response);
    } catch (error: any) {
      console.error('❌ [Frontend] Upload profile picture error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to upload profile picture' 
      };
    }
  },

  // Upload cover image
  uploadCoverImage: async (file: File): Promise<{ success: boolean; data?: { url: string }; message?: string }> => {
    try {
      const formData = new FormData();
      formData.append('coverImage', file);

      const response = await api.post('/users/profile/cover', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return handleApiResponse<{ url: string }>(response);
    } catch (error: any) {
      console.error('❌ [Frontend] Upload cover image error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to upload cover image' 
      };
    }
  },

  // Get freelancer data
  getFreelancerData: async (freelancerId: string): Promise<{ success: boolean; data?: FreelancerData; message?: string }> => {
    try {
      const response = await api.get(`/users/${freelancerId}/freelancer-data`);
      return handleApiResponse<FreelancerData>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get freelancer data error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch freelancer data' 
      };
    }
  },

  // Search users/talent
  searchUsers: async (query: string, filters?: any): Promise<{ success: boolean; data?: UserProfile[]; message?: string }> => {
    try {
      const response = await api.get('/users/search', { 
        params: { q: query, ...filters } 
      });
      return handleApiResponse<UserProfile[]>(response);
    } catch (error) {
      console.error('❌ [Frontend] Search users error:', error);
      return { 
        success: false, 
        message: 'Failed to search users' 
      };
    }
  },

  // Get user statistics
  getUserStats: async (): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      const response = await api.get('/users/stats');
      return handleApiResponse<any>(response);
    } catch (error) {
      console.error('❌ [Frontend] Get user stats error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch user statistics' 
      };
    }
  },

  // Delete user account
  deleteAccount: async (): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.delete('/users/account');
      const result = handleApiResponse<void>(response);
      return { success: result.success, message: result.message };
    } catch (error: any) {
      console.error('❌ [Frontend] Delete account error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete account' 
      };
    }
  }
}; 