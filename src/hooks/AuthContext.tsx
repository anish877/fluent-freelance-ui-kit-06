import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Types based on your backend user model
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'FREELANCER' | 'CLIENT';
  isOnboarded: boolean;
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

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login_google: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; user?: User, status: number }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message?: string; user?: User }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  completeOnboarding: (userData: any) => Promise<{ success: boolean; message?: string; user?: User }>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'FREELANCER' | 'CLIENT';
  [key: string]: any; // for additional optional fields
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to verify authentication with backend
  const checkAuth = async (): Promise<boolean> => {
    try {
      const response = await axios.get('/auth/me');
      
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return true;
      } else {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Auth verification failed:', error);
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string; user?: User; status: number }> => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      
      if (response.data.success) {
        const { user } = response.data;
        
        setUser(user);
        setIsAuthenticated(true);

        return { success: true, message: "Signed In", user, status: 200 };
      } 
      else if(response.status === 401){
        return { success: false, message: response.data.message, status: 401 }
      }
      else {
        return { success: false, message: response.data.message || 'Login failed', status: 400 };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        status: 400,
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  // Register function
  const register = async (userData: RegisterData): Promise<{ success: boolean; message?: string; user?: User }> => {
    try {
      const response = await axios.post('/auth/register', userData);
      
      if (response.data.success) {
        const { user } = response.data;
        
        setUser(user);
        setIsAuthenticated(true);
        
        return { success: true, user };
      } else {
        return { success: false, message: response.data.message || 'Registration failed' };
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout failed:', err);
      // Still clear local state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const login_google = () => {
    window.location.href = "http://localhost:5001/api/auth/google"
  }

  // Complete onboarding function
  const completeOnboarding = async (userData: any): Promise<{ success: boolean; message?: string; user?: User }> => {
    try {
      const response = await axios.post('/onboarding/complete-with-data', userData);
      
      if (response.data.success) {
        const { user } = response.data;
        
        setUser(user);
        setIsAuthenticated(true);
        
        return { success: true, message: "Onboarding completed successfully", user };
      } else {
        return { success: false, message: response.data.message || 'Onboarding completion failed' };
      }
    } catch (error: any) {
      console.error('Onboarding completion error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Onboarding completion failed. Please try again.' 
      };
    }
  };

  // Setup axios defaults
  useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
    axios.defaults.withCredentials = true;
  }, []);

  // Setup axios interceptor for 401 responses
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  // Initialize auth on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      await checkAuth();
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading: loading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
    completeOnboarding,
    login_google

  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};