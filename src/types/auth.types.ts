import { ReactNode } from 'react';

// Auth-related types used across the application

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'FREELANCER' | 'CLIENT';
  isOnboarded: boolean;
  onboardingStep: number;
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
  skills?: string[];
  hourlyRate?: number;
  portfolio?: string;
  experience?: string;
  education?: string;
  certifications?: string[];
  companyName?: string;
  companySize?: string;
  industry?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'FREELANCER' | 'CLIENT';
  [key: string]: any;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login_google: () => void;
  connect_google_calendar: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; user?: AuthUser, status: number }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message?: string; user?: AuthUser }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<{}>;
  completeOnboarding: (userData: any) => Promise<{ success: boolean; message?: string; user?: AuthUser }>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface ProtectedRouteProps {
  children: ReactNode;
  allowedUserTypes?: ('FREELANCER' | 'CLIENT')[];
  requireOnboarding?: boolean;
} 