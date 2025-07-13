// API-related types used across the application

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

export interface ApiSuccess<T = any> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiFailure {
  success: false;
  error: string;
  message?: string;
}

export type ApiResult<T = any> = ApiSuccess<T> | ApiFailure;

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SearchParams {
  q?: string;
  category?: string;
  location?: string;
  budget?: string;
  experience?: string;
  skills?: string[];
  availability?: string;
  rating?: number;
  verified?: boolean;
}

export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  category?: string;
  jobType?: string;
  experience?: string;
  budget?: string;
  duration?: string;
  status?: string;
  location?: string;
  skills?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

export interface GoogleMeetData {
  id: string;
  summary: string;
  description?: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  meetUrl: string;
  joinUrl: string;
  meetLink: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  needsGoogleAuth?: boolean;
  success?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  status: 'read' | 'unread';
  createdAt: string;
  userId: string;
  relatedId?: string;
  relatedType?: 'job' | 'proposal' | 'offer' | 'message';
}

export type NotificationStatus = 'read' | 'unread';

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: 'CLIENT' | 'FREELANCER';
    avatar?: string;
    verified: boolean;
  };
  token: string;
  refreshToken?: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken?: string;
}

// WebSocket types for messages
export interface WSConversation {
  id: string;
  participants: string[];
  projectName: string;
  lastMessage?: WSMessageData;
  createdAt: string;
}

export interface WSMessageData {
  id: string;
  conversationId: string;
  senderEmail: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image' | 'interview' | 'interview_invitation';
} 