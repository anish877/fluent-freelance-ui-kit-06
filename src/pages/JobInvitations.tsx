import { useState, useEffect } from "react";
import { Check, X, Clock, Briefcase, DollarSign, Calendar, MapPin, Star, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../hooks/AuthContext";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import Footer from "../components/layout/Footer";

interface JobInvitation {
  id: string;
  jobId: string;
  clientId: string;
  freelancerEmail: string;
  message?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  job: {
    id: string;
    title: string;
    description: string;
    budget: string;
    skills: string[];
    category: string;
    client: {
      id: string;
      firstName: string;
      lastName: string;
      companyName?: string;
      avatar?: string;
    };
  };
  client: {
    id: string;
    firstName: string;
    lastName: string;
    companyName?: string;
    avatar?: string;
  };
}

const JobInvitations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState<JobInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.userType !== 'FREELANCER') {
      navigate('/');
      return;
    }
    fetchInvitations();
  }, [user, navigate]);

  const fetchInvitations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/job-invitations/freelancer');
      setInvitations(response.data.data || []);
    } catch (error) {
      console.error('Error fetching invitations:', error);
      toast.error('Failed to fetch job invitations');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      setProcessingId(invitationId);
      const response = await axios.put(`/api/job-invitations/${invitationId}/accept`);
      
      if (response.data.success) {
        toast.success('Job invitation accepted! Proposal created successfully.');
        fetchInvitations(); // Refresh the list
      } else {
        toast.error('Failed to accept invitation');
      }
    } catch (error) {
      console.error('Error accepting invitation:', error);
      toast.error('Failed to accept invitation');
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectInvitation = async (invitationId: string) => {
    try {
      setProcessingId(invitationId);
      const response = await axios.put(`/api/job-invitations/${invitationId}/reject`);
      
      if (response.data.success) {
        toast.success('Job invitation declined');
        fetchInvitations(); // Refresh the list
      } else {
        toast.error('Failed to decline invitation');
      }
    } catch (error) {
      console.error('Error rejecting invitation:', error);
      toast.error('Failed to decline invitation');
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'ACCEPTED':
        return <Badge variant="default" className="bg-green-100 text-green-800">Accepted</Badge>;
      case 'REJECTED':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (user?.userType !== 'FREELANCER') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">Only freelancers can view job invitations.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading job invitations...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Invitations</h1>
          <p className="text-lg text-gray-600">
            Review and respond to job invitations from clients
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {invitations.filter(inv => inv.status === 'PENDING').length}
                  </div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Check className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {invitations.filter(inv => inv.status === 'ACCEPTED').length}
                  </div>
                  <div className="text-sm text-gray-600">Accepted</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <X className="h-8 w-8 text-red-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {invitations.filter(inv => inv.status === 'REJECTED').length}
                  </div>
                  <div className="text-sm text-gray-600">Declined</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invitations List */}
        <div className="space-y-6">
          {invitations.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No job invitations yet</h3>
                <p className="text-gray-500">
                  When clients invite you to work on their projects, they'll appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            invitations.map((invitation) => (
              <Card key={invitation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={invitation.client.avatar} alt={invitation.client.firstName} />
                        <AvatarFallback>
                          {invitation.client.firstName?.charAt(0)}{invitation.client.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {invitation.client.firstName} {invitation.client.lastName}
                          </h3>
                          {invitation.client.companyName && (
                            <span className="text-sm text-gray-500">
                              • {invitation.client.companyName}
                            </span>
                          )}
                          {getStatusBadge(invitation.status)}
                        </div>
                        <p className="text-sm text-gray-500">
                          Invited you {formatDate(invitation.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Job Details */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">{invitation.job.title}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {invitation.job.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {invitation.job.budget}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {invitation.job.category}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        Remote
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {invitation.job.skills.slice(0, 5).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {invitation.job.skills.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{invitation.job.skills.length - 5}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Client Message */}
                  {invitation.message && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Client message:</span> {invitation.message}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  {invitation.status === 'PENDING' && (
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => handleAcceptInvitation(invitation.id)}
                        disabled={processingId === invitation.id}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        {processingId === invitation.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ) : (
                          <Check className="h-4 w-4 mr-2" />
                        )}
                        Accept & Create Proposal
                      </Button>
                      <Button
                        onClick={() => handleRejectInvitation(invitation.id)}
                        disabled={processingId === invitation.id}
                        variant="outline"
                        className="flex-1"
                      >
                        {processingId === invitation.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                        ) : (
                          <X className="h-4 w-4 mr-2" />
                        )}
                        Decline
                      </Button>
                    </div>
                  )}

                  {invitation.status === 'ACCEPTED' && (
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-green-600 font-medium">
                        ✓ Proposal created successfully
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/jobs/${invitation.jobId}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Job
                      </Button>
                    </div>
                  )}

                  {invitation.status === 'REJECTED' && (
                    <div className="text-sm text-gray-500">
                      You declined this invitation
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobInvitations; 