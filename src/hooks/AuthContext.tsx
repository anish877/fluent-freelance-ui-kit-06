import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  AuthUser,
  AuthContextType,
  AuthProviderProps,
  RegisterData
} from '../types';

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to verify authentication with backend
  const checkAuth = async () => {
    try {
      const response = await axios.get('/auth/me');
      
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return {
          success: true,
          user: response.data.user
        };
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return {
          success: false
        };
      }
    } catch (error: any) {
      console.error('❌ [Frontend] Auth verification failed:', error.response?.data || error.message);
      setUser(null);
      setIsAuthenticated(false);
      return {
          success: false
      };
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string; user?: AuthUser; status: number }> => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      
      if (response.data.success) {
        const { user } = response.data;
        setUser(user);
        setIsAuthenticated(true);
        return { success: true, message: "Signed In", user, status: 200 };
      } 
      else if(response.status === 401){
        console.error('❌ [Frontend] Login failed: Unauthorized');
        return { success: false, message: response.data.message, status: 401 }
      }
      else {
        console.error('❌ [Frontend] Login failed:', response.data.message);
        return { success: false, message: response.data.message || 'Login failed', status: 400 };
      }
    } catch (error: any) {
      console.error('❌ [Frontend] Login error:', error.response?.data || error.message);
      return { 
        success: false, 
        status: error.response?.status || 400,
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  // Register function
  const register = async (userData: RegisterData): Promise<{ success: boolean; message?: string; user?: AuthUser }> => {
    try {
      const response = await axios.post('/auth/register', userData);
      
      if (response.data.success) {
        const { user } = response.data;
        setUser(user);
        setIsAuthenticated(true);
        return { success: true, user };
      } else {
        console.error('❌ [Frontend] Registration failed:', response.data.message);
        return { success: false, message: response.data.message || 'Registration failed' };
      }
    } catch (error: any) {
      console.error('❌ [Frontend] Registration error:', error.response?.data || error.message);
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
    } catch (err: any) {
      console.error('❌ [Frontend] Logout failed:', err.response?.data || err.message);
      // Still clear local state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
    }
  };



  // Google OAuth login
  const login_google = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/auth/google`;
  };

  // Google Calendar OAuth connection
  const connect_google_calendar = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/auth/google`;
  };

  // Complete onboarding function
  const completeOnboarding = async (userData: any): Promise<{ success: boolean; message?: string; user?: AuthUser }> => {
    try {
      const response = await axios.post('/onboarding/complete-with-data', userData);
      
      if (response.data.success) {
        const { user } = response.data;
        setUser(user);
        setIsAuthenticated(true);
        return { success: true, message: "Onboarding completed successfully", user };
      } else {
        console.error('❌ [Frontend] Onboarding failed:', response.data.message);
        return { success: false, message: response.data.message || 'Onboarding completion failed' };
      }
    } catch (error: any) {
      console.error('❌ [Frontend] Onboarding error:', error.response?.data || error.message);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Onboarding completion failed. Please try again.' 
      };
    }
  };

  // Setup axios defaults
  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
    
    axios.defaults.baseURL = baseURL;
    axios.defaults.withCredentials = true;
    
    // Add request interceptor for logging
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        console.error('📤 [Frontend] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for logging
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error(`📥 [Frontend] ${error.response?.status} ${error.config?.url}`, error.response?.data);
        
        if (error.response?.status === 401) {
          setUser(null);
          setIsAuthenticated(false);
        }
        
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Initialize auth on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      // Check for OAuth callback parameters
      const urlParams = new URLSearchParams(window.location.search);
      const oauthError = urlParams.get('error');
      
      if (oauthError) {
        console.error('❌ [Frontend] OAuth error detected:', oauthError);
        // Handle OAuth error (show notification, etc.)
        // You might want to show a toast notification here
      }
      
      await checkAuth();
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Handle OAuth callback redirects
 useEffect(() => {
  const handleOAuthCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromOAuth = urlParams.get('from') === 'oauth';
    const fromCalendarOAuth = urlParams.get('from') === 'calendar_oauth';
    const path = window.location.pathname;
    
    // Handle calendar connection OAuth callback
    if (fromCalendarOAuth) {
      // Clean up URL first (remove the from parameter)
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Check authentication status
      const {success, user: userOauth} = await checkAuth();

      if (success && userOauth) {
        // Redirect back to messages page with success parameter
        navigate('/messages?calendar_connected=true', { replace: true });
      } else {
        console.error('❌ [Frontend] Calendar OAuth failed, redirecting to login');
        navigate('/login?error=oauth_failed', { replace: true });
      }
      return;
    }
    
    // Handle regular OAuth login callback
    if (fromOAuth) {
      // Clean up URL first (remove the oauth parameter)
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Check authentication status
      const {success, user: userOauth} = await checkAuth();

      if (success && userOauth) {
        // Redirect based on onboarding status using React Router
        if (userOauth.isOnboarded) {
          if (path !== '/dashboard') {
            navigate('/dashboard', { replace: true });
          }
        } else {
          if (path !== '/onboarding') {
            navigate('/onboarding', { replace: true });
          }
        }
      } else {
        console.error('❌ [Frontend] OAuth failed, redirecting to login');
        navigate('/login?error=oauth_failed', { replace: true });
      }
    }
  };

  handleOAuthCallback();
}, [user]); 

  const value: AuthContextType = {
    user,
    isLoading: loading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
    completeOnboarding,
    login_google,
    connect_google_calendar
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