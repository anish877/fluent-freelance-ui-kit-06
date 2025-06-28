import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  completeOnboarding: (userData: any) => Promise<{ success: boolean; message?: string }>;
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
  const navigate = useNavigate();
  const location = useLocation();

  // Routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/forgot-password', '/', '/onboarding'];

  
  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(location.pathname);
  

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
  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      
      if (response.data.success) {
        const { user } = response.data;
        
        setUser(user);
        setIsAuthenticated(true);

        if(user.isOnboarded){
            // Redirect based on user type
            const dashboardPath = user.userType === 'FREELANCER' ? '/dashboard' : '/client-dashboard';
            const from = location.state?.from?.pathname || dashboardPath;
            navigate(from, { replace: true });
            return { success: true, message: "Signed In" };
        } else {
            navigate("/onboarding")
            return { success: true, message: "Signed In" };
        }

      } else {
        return { success: false, message: response.data.message || 'Login failed' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  // Register function
  const register = async (userData: RegisterData): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await axios.post('/auth/register', userData);
      
      if (response.data.success) {
        const { user } = response.data;

        
        setUser(user);
        setIsAuthenticated(true);
        
        // Redirect based on user type
        const dashboardPath = user.userType === 'FREELANCER' ? '/dashboard' : '/client-dashboard';
        navigate(dashboardPath, { replace: true });
        
        return { success: true };
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

        navigate('/login', { replace: true });
    } catch (err) {
        console.error('Logout failed:', err);
    }
    };

    useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
    axios.defaults.withCredentials = true;
    }, []);

  // Setup interceptor with access to logout
    useEffect(() => {
      const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout(); // This works because we're inside the component
        }
        return Promise.reject(error);
      }
    );

    // Cleanup
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  // Initialize auth on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      if(!isPublicRoute){
        const isAuthenticated = await checkAuth();
      
        // If user is not authenticated and trying to access protected route
        if (!isAuthenticated) {
            navigate('/login', { 
            replace: true, 
            state: { from: location } 
            });
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, [location.pathname]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // For protected routes, only render children if authenticated
  if (!isPublicRoute && !isAuthenticated) {
    return null; // Will redirect to login
  }

  // Complete onboarding function
  const completeOnboarding = async (userData: any): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await axios.post('/onboarding/complete-with-data', userData);
      
      if (response.data.success) {
        const { user } = response.data;
        
        setUser(user);
        setIsAuthenticated(true);

        // Redirect based on user type
        const dashboardPath = user.userType === 'FREELANCER' ? '/dashboard' : '/client-dashboard';
        navigate(dashboardPath, { replace: true });
        
        return { success: true, message: "Onboarding completed successfully" };
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

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
    completeOnboarding,
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

// Protected Route Component (optional, for extra protection)
export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { 
        replace: true, 
        state: { from: location } 
      });
    }
  }, [isAuthenticated, loading, navigate, location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};