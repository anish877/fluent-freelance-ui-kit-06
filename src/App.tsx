
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./hooks/AuthContext";
import { WebSocketProvider } from "./hooks/socketContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Import all pages
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ClientJobView from "./pages/ClientJobView";
import FreelancerProfile from "./pages/FreelancerProfile";
import Dashboard from "./pages/Dashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import PostJob from "./pages/PostJob";
import Proposals from "./pages/Proposals";
import Talent from "./pages/Talent";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Contracts from "./pages/Contracts";
import Reports from "./pages/Reports";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [userId, setUserId] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
          
            <BrowserRouter>
        <AuthProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Job-related routes */}
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route 
                  path="/post-job" 
                  element={
                    <ProtectedRoute allowedUserTypes={['CLIENT']}>
                      <PostJob />
                    </ProtectedRoute>
                  } 
                />
                
                {/* User routes */}
                <Route path="/freelancer/:id" element={<FreelancerProfile />} />
                <Route path="/talent" element={<Talent />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/onboarding" element={<Onboarding />} />
                
                {/* Dashboard routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/client-dashboard" element={<ClientDashboard />} />
                
                {/* Application features */}
                <Route path="/proposals" element={<Proposals />} />
                <Route path="/messages" element={<WebSocketProvider><Messages /></WebSocketProvider>} />
                <Route path="/contracts" element={<Contracts />} />
                <Route path="/reports" element={<Reports />} />
                
                {/* Settings and support */}
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
                
                {/* Catch-all route - must be last */}
                <Route path="*" element={<NotFound />} />
              </Routes>
        </AuthProvider>
            </BrowserRouter>
        
        {/* Toast notifications */}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
