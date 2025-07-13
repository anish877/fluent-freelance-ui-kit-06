import axios from 'axios';
import { ApiResponse, ApiError } from '../types';

// Create axios instance with the same configuration as AuthContext
const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:5001/api',
  withCredentials: true, // Important for cookies
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging (same as AuthContext)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('📤 [Frontend] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and auth handling (same as AuthContext)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(`📥 [Frontend] ${error.response?.status} ${error.config?.url}`, error.response?.data);
    
    // Handle 401 unauthorized
    if (error.response?.status === 401) {
      // Clear auth state - this will be handled by AuthContext
      // The AuthContext will handle the redirect logic
    }
    
    return Promise.reject(error);
  }
);

// Helper function to handle API responses consistently
export const handleApiResponse = <T>(response: any): ApiResponse<T> => {
  return {
    success: response.data.success || false,
    data: response.data.data || response.data,
    message: response.data.message,
    error: response.data.error,
    total: response.data.total,
    totalPages: response.data.totalPages,
    currentPage: response.data.currentPage,
  };
};

// Helper function to handle API errors consistently
export const handleApiError = (error: any): ApiError => {
  return {
    message: error.response?.data?.message || error.message || 'An error occurred',
    status: error.response?.status || 500,
    code: error.response?.data?.code,
    details: error.response?.data,
  };
};

export { api };
export default api; 