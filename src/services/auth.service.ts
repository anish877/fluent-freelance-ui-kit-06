import { api, handleApiResponse, handleApiError } from './api';
import { AuthResponse, RefreshTokenResponse, RegisterData, AuthUser, ApiResponse } from '../types';

export const authService = {
  // Get current user
  getCurrentUser: async (): Promise<ApiResponse<AuthUser>> => {
    try {
      const response = await api.get('/auth/me');
      return handleApiResponse<AuthUser>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Login user
  login: async (email: string, password: string): Promise<{ success: boolean; message?: string; user?: AuthUser, status: number }> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const result = handleApiResponse<AuthUser>(response);
      return {
        success: result.success,
        message: result.message,
        user: result.data,
        status: 200
      };
    } catch (error) {
      const errorResult = handleApiError(error);
      return {
        success: false,
        message: errorResult.message,
        status: errorResult.status
      };
    }
  },

  // Register user
  register: async (userData: RegisterData): Promise<{ success: boolean; message?: string; user?: AuthUser }> => {
    try {
      const response = await api.post('/auth/register', userData);
      const result = handleApiResponse<AuthUser>(response);
      return {
        success: result.success,
        message: result.message,
        user: result.data
      };
    } catch (error) {
      const errorResult = handleApiError(error);
      return {
        success: false,
        message: errorResult.message
      };
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Complete onboarding
  completeOnboarding: async (userData: any): Promise<{ success: boolean; message?: string; user?: AuthUser }> => {
    try {
      const response = await api.post('/onboarding/complete-with-data', userData);
      const result = handleApiResponse<AuthUser>(response);
      return {
        success: result.success,
        message: result.message,
        user: result.data
      };
    } catch (error) {
      const errorResult = handleApiError(error);
      return {
        success: false,
        message: errorResult.message
      };
    }
  },

  // Refresh token
  refreshToken: async (): Promise<ApiResponse<RefreshTokenResponse>> => {
    try {
      const response = await api.post('/auth/refresh');
      return handleApiResponse<RefreshTokenResponse>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }
}; 