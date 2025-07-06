import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: ('FREELANCER' | 'CLIENT')[];
  requireOnboarding?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  allowedUserTypes = ['FREELANCER', 'CLIENT'],
  requireOnboarding = true 
}: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [isOAuthCallback, setIsOAuthCallback] = useState(false);
  const [oauthWaitTime, setOauthWaitTime] = useState(0);

  // Check if this is an OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromOAuth = urlParams.get('from') === 'oauth';
    
    if (fromOAuth) {
      setIsOAuthCallback(true);
      
      // Wait up to 3 seconds for auth to complete
      const timer = setTimeout(() => {
        setIsOAuthCallback(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [location.search]);

  // Count OAuth wait time
  useEffect(() => {
    if (isOAuthCallback) {
      const interval = setInterval(() => {
        setOauthWaitTime(prev => prev + 100);
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isOAuthCallback]);

  // If we're waiting for OAuth callback, show loading
  if (isOAuthCallback && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
        <p className="mt-4 text-gray-600">Completing sign in...</p>
        <p className="mt-2 text-sm text-gray-400">
          {Math.round(oauthWaitTime / 1000)}s
        </p>
      </div>
    );
  }

  // Show loading spinner while checking authentication (non-OAuth)
  if (isLoading && !isOAuthCallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated (and not waiting for OAuth)
  if (!isAuthenticated || !user) {
    if (isOAuthCallback) {
      // OAuth failed, redirect to login with error
      return <Navigate to="/login?error=oauth_failed" replace />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If we were waiting for OAuth and now we're authenticated, clear the OAuth flag
  if (isOAuthCallback && isAuthenticated) {
    setIsOAuthCallback(false);
    
    // Clean up the URL
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('from');
    const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }

  // Check if user type is allowed
  if (!allowedUserTypes.includes(user.userType)) {
    // Redirect to appropriate dashboard based on user type
    const dashboardPath = user.userType === 'FREELANCER' ? '/dashboard' : '/client-dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  // Allow access to onboarding page when user is not onboarded
  if (location.pathname === '/onboarding') {
    return <>{children}</>;
  }

  // For other pages, check if onboarding is required and user is not onboarded
  if (requireOnboarding && !user.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;