import { api, handleApiResponse, handleApiError } from './api';
import { UploadResponse } from '../types';

export const uploadService = {
  // Upload a single file
  uploadFile: async (file: File): Promise<UploadResponse> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return handleApiResponse<UploadResponse>(response).data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Upload multiple files
  uploadFiles: async (files: File[]): Promise<UploadResponse[]> => {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`files`, file);
      });
      
      const response = await api.post('/upload/multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return handleApiResponse<UploadResponse[]>(response).data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Delete a file
  deleteFile: async (filename: string): Promise<void> => {
    try {
      await api.delete(`/upload/${filename}`);
    } catch (error) {
      throw handleApiError(error);
    }
  }
}; 