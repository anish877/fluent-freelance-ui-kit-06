import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./hooks/AuthContext";
import { WebSocketProvider } from "./hooks/socketContext";
import Navbar from "./components/layout/Navbar";

// Import all pages
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ClientJobView from "./pages/ClientJobView";
import FreelancerProfile from "./pages/FreelancerProfile";
import Dashboard from "./pages/Dashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Login from "./pages/Login";

import Onboarding from "./pages/Onboarding";
import PostJob from "./pages/PostJob";
import EditJob from "./pages/EditJob";
import Proposals from "./pages/Proposals";
import Talent from "./pages/Talent";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Contracts from "./pages/Contracts";
import Reports from "./pages/Reports";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./hooks/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
          
            <BrowserRouter>
        <AuthProvider>
              <WebSocketProvider>
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <main>
                    <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Navigate to="/onboarding" replace />} />
                    
                    {/* Semi-public routes - accessible but may show different content based on auth */}
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/:id" element={<JobDetails />} />
                    <Route path="/freelancer/:id" element={<FreelancerProfile />} />
                    <Route path="/talent" element={<Talent />} />
                    
                    {/* Public onboarding route - accessible to everyone */}
                    <Route path="/onboarding" element={<Onboarding />} />
                    
                    {/* Client-only routes */}
                    <Route 
                      path="/post-job" 
                      element={
                        <ProtectedRoute allowedUserTypes={['CLIENT']}>
                          <PostJob />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/edit-job/:id" 
                      element={
                        <ProtectedRoute allowedUserTypes={['CLIENT']}>
                          <EditJob />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/client-jobs/:id" 
                      element={
                        <ProtectedRoute allowedUserTypes={['CLIENT']}>
                          <ClientJobView />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/client-dashboard" 
                      element={
                        <ProtectedRoute allowedUserTypes={['CLIENT']}>
                          <ClientDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Freelancer-only routes */}
                    <Route 
                      path="/dashboard" 
                      element={
                        <ProtectedRoute allowedUserTypes={['FREELANCER']}>
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/proposals" 
                      element={
                        <ProtectedRoute allowedUserTypes={['FREELANCER']}>
                          <Proposals />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Protected routes for all authenticated users */}
                    <Route 
                      path="/profile" 
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/messages" 
                      element={
                        <ProtectedRoute>
                          <Messages />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/messages/:conversationId" 
                      element={
                        <ProtectedRoute>
                          <Messages />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/contracts" 
                      element={
                        <ProtectedRoute>
                          <Contracts />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/reports" 
                      element={
                        <ProtectedRoute>
                          <Reports />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/settings" 
                      element={
                        <ProtectedRoute>
                          <Settings />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/help" 
                      element={
                        <ProtectedRoute>
                          <Help />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Catch-all route - must be last */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  </main>
                </div>

              </WebSocketProvider>
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