import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

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
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user type is allowed
  if (!allowedUserTypes.includes(user.userType)) {
    // Redirect to appropriate dashboard based on user type
    const dashboardPath = user.userType === 'FREELANCER' ? '/dashboard' : '/client-dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  // Check if onboarding is required and user is not onboarded
  if (requireOnboarding && !user.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 