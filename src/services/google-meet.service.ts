import { api, handleApiResponse, handleApiError } from './api';
import { GoogleMeetData } from '../types';

export const googleMeetService = {
  // Create a new Google Meet
  createMeet: async (data: {
    summary: string;
    description?: string;
    startTime: string;
    duration: number;
  }): Promise<GoogleMeetData> => {
    try {
      const response = await api.post('/google-meet/create-meet', data);
      return handleApiResponse<GoogleMeetData>(response).data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get meet details
  getMeet: async (meetId: string): Promise<GoogleMeetData> => {
    try {
      const response = await api.get(`/google-meet/${meetId}`);
      return handleApiResponse<GoogleMeetData>(response).data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Update meet details
  updateMeet: async (meetId: string, data: {
    summary?: string;
    description?: string;
    startTime?: string;
    endTime?: string;
    attendees?: string[];
  }): Promise<GoogleMeetData> => {
    try {
      const response = await api.put(`/google-meet/${meetId}`, data);
      return handleApiResponse<GoogleMeetData>(response).data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}; 