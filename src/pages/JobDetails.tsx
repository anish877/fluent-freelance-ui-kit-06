import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, Clock, DollarSign, Star, Users, Calendar, 
  Bookmark, Share2, Flag, CheckCircle, Award, 
  MessageCircle, ThumbsUp, Eye, Send, Paperclip, Edit, X, Download 
} from "lucide-react";

import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import axios from "axios";
import { useToast } from "../hooks/use-toast";
 import { useAuth } from "../hooks/AuthContext";

interface Job {
  id: string;
  title: string;
  description: string;
  budget: 'FIXED' | 'HOURLY';
  minBudget?: number;
  maxBudget?: number;
  duration?: string;
  skills: string[];
  category: string;
  subcategory?: string;
  projectType?: string;
  experienceLevel?: string;
  location?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  visibility: string;
  attachments?: string[]; // URLs to attached files
  createdAt: string;
  updatedAt: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
    location?: string;
    companyName?: string;
    companySize?: string;
    industry?: string;
  };
  _count: {
    proposals: number;
  };
}

interface ExistingProposal {
  id: string;
  coverLetter: string;
  bidAmount: number;
  estimatedDuration: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
  createdAt: string;
  updatedAt: string;
}

const JobDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [proposal, setProposal] = useState("");
  const [proposalBudget, setProposalBudget] = useState("");
  const [proposalBudgetType, setProposalBudgetType] = useState<'hourly' | 'fixed'>('fixed');
  const [proposalDelivery, setProposalDelivery] = useState("");
  const [proposalAttachments, setProposalAttachments] = useState<File[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [existingProposal, setExistingProposal] = useState<ExistingProposal | null>(null);
  const [checkingProposal, setCheckingProposal] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/jobs/${id}`);
        if (response.data.success) {
          setJob(response.data.data);
        } else {
          setError('Failed to fetch job details');
        }
      } catch (err: unknown) {
        console.error('Error fetching job details:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch job details';
        setError(errorMessage);
        toast({
          title: "Error",
          description: "Failed to load job details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    const checkExistingProposal = async () => {
      if (!user || user.userType !== 'FREELANCER' || !id) return;
      
      try {
        setCheckingProposal(true);
        const response = await axios.get(`/proposals/check/${id}`);
        if (response.data.success && response.data.data) {
          setExistingProposal(response.data.data);
          // Pre-fill the form with existing proposal data
          setProposal(response.data.data.coverLetter);
          setProposalBudget(response.data.data.bidAmount.toString());
          setProposalDelivery(response.data.data.estimatedDuration);
        }
      } catch (err: unknown) {
        console.error('Error checking existing proposal:', err);
        // Don't show error toast for this as it's not critical
      } finally {
        setCheckingProposal(false);
      }
    };

    if (id) {
      fetchJobDetails();
      checkExistingProposal();
    }
  }, [id, toast, user]);

  const formatBudget = (job: Job) => {
    if (job.projectType === 'fixed') {
      if (job.minBudget && job.maxBudget && job.minBudget !== job.maxBudget) {
        return `$${job.minBudget.toLocaleString()} - $${job.maxBudget.toLocaleString()}`;
      } else if (job.minBudget) {
        return `$${job.minBudget.toLocaleString()}`;
      } else if (job.maxBudget) {
        return `$${job.maxBudget.toLocaleString()}`;
      }
      return "Budget not specified";
    } else if (job.projectType === 'hourly') {
      if (job.minBudget && job.maxBudget && job.minBudget !== job.maxBudget) {
        return `$${job.minBudget}/hr - $${job.maxBudget}/hr`;
      } else if (job.minBudget) {
        return `$${job.minBudget}/hr`;
      }
      return "Hourly rate not specified";
    }
    return "Budget not specified";
  };

  const formatPostedTime = (createdAt: string) => {
    const now = new Date();
    const posted = new Date(createdAt);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  };

  // Get file extension from URL
  const getFileExtension = (url: string): string => {
    const filename = url.split('/').pop() || '';
    return filename.split('.').pop()?.toUpperCase() || 'FILE';
  };

  // Get filename from URL
  const getFilename = (url: string): string => {
    return url.split('/').pop() || 'attachment';
  };

  const handleProposalSubmit = async () => {
    if (!user || user.userType !== 'FREELANCER') {
      toast({
        title: "Error",
        description: "Only freelancers can submit proposals",
        variant: "destructive"
      });
      return;
    }

    if (!proposal.trim() || !proposalBudget.trim() || !proposalDelivery.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmittingProposal(true);
      
      // Handle file uploads first
      const uploadedAttachments: string[] = [];
      if (proposalAttachments.length > 0) {
        for (const file of proposalAttachments) {
          const formData = new FormData();
          formData.append('file', file);
          
          try {
            const uploadResponse = await axios.post('/upload/single', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            
            if (uploadResponse.data.success) {
              uploadedAttachments.push(uploadResponse.data.data.url);
            }
          } catch (uploadErr) {
            console.error('Error uploading file:', uploadErr);
            toast({
              title: "Warning",
              description: `Failed to upload ${file.name}`,
              variant: "destructive"
            });
          }
        }
      }
      
      const proposalData = {
        jobId: id,
        coverLetter: proposal,
        bidAmount: parseFloat(proposalBudget),
        bidType: job.projectType === 'hourly' ? 'HOURLY' : 'FIXED', // Match job project type
        estimatedDuration: proposalDelivery,
        attachments: uploadedAttachments
      };

      const response = await axios.post('/proposals', proposalData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Proposal submitted successfully!",
        });
        setProposal("");
        setProposalBudget("");
        setProposalBudgetType('fixed');
        setProposalDelivery("");
        setProposalAttachments([]);
        // Refresh the existing proposal data
        const checkResponse = await axios.get(`/proposals/check/${id}`);
        if (checkResponse.data.success && checkResponse.data.data) {
          setExistingProposal(checkResponse.data.data);
        }
      }
    } catch (err: unknown) {
      console.error('Error submitting proposal:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit proposal';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setSubmittingProposal(false);
    }
  };

  const handleProposalUpdate = async () => {
    if (!existingProposal) return;

    if (!proposal.trim() || !proposalBudget.trim() || !proposalDelivery.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmittingProposal(true);
      
      // Handle file uploads first
      const uploadedAttachments: string[] = [];
      if (proposalAttachments.length > 0) {
        for (const file of proposalAttachments) {
          const formData = new FormData();
          formData.append('file', file);
          
          try {
            const uploadResponse = await axios.post('/upload/single', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            
            if (uploadResponse.data.success) {
              uploadedAttachments.push(uploadResponse.data.data.url);
            }
          } catch (uploadErr) {
            console.error('Error uploading file:', uploadErr);
            toast({
              title: "Warning",
              description: `Failed to upload ${file.name}`,
              variant: "destructive"
            });
          }
        }
      }
      
      const proposalData = {
        coverLetter: proposal,
        bidAmount: parseFloat(proposalBudget),
        bidType: proposalBudgetType === 'hourly' ? 'HOURLY' : 'FIXED', // Add bid type (hourly/fixed)
        estimatedDuration: proposalDelivery,
        attachments: uploadedAttachments
      };

      const response = await axios.put(`/proposals/${existingProposal.id}/update`, proposalData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Proposal updated successfully!",
        });
        // Update the existing proposal data
        setExistingProposal(response.data.data);
        setProposalAttachments([]);
      }
    } catch (err: unknown) {
      console.error('Error updating proposal:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update proposal';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setSubmittingProposal(false);
    }
  };

  const handleWithdrawProposal = async () => {
    if (!existingProposal) return;

    try {
      setSubmittingProposal(true);
      
      const response = await axios.put(`/proposals/${existingProposal.id}/withdraw`, {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Proposal withdrawn successfully!",
        });
        // Update the existing proposal data
        setExistingProposal(response.data.data);
        // Clear the form
        setProposal("");
        setProposalBudget("");
        setProposalDelivery("");
      }
    } catch (err: unknown) {
      console.error('Error withdrawing proposal:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to withdraw proposal';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setSubmittingProposal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-4">{error || "The job you're looking for doesn't exist."}</p>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock data for sections that should remain unchanged
  const similarJobs = [
    {
      id: 2,
      title: "React Native Mobile App Development",
      budget: "$2,500 - $4,000",
      proposals: 12
    },
    {
      id: 3,
      title: "Frontend Developer for SaaS Dashboard",
      budget: "$1,800 - $3,200", 
      proposals: 6
    },
    {
      id: 4,
      title: "Full-Stack Developer for Marketplace",
      budget: "$4,000 - $6,500",
      proposals: 15
    }
  ];

  const clientReviews = [
    {
      id: 1,
      freelancer: "Sarah Chen",
      rating: 5,
      review: "Excellent client to work with. Clear requirements, responsive communication, and fair payment terms.",
      project: "Mobile App Development",
      date: "2 weeks ago"
    },
    {
      id: 2,
      freelancer: "Miguel Rodriguez",
      rating: 5,
      review: "Professional and understanding. The project scope was well-defined and the client was available for questions.",
      project: "E-commerce Website",
      date: "1 month ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/jobs" className="hover:text-teal-600">Jobs</Link>
            <span>›</span>
            <span>{job.category}</span>
            <span>›</span>
            <span className="text-gray-900">Job Details</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Posted {formatPostedTime(job.createdAt)}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location || 'Remote'}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {job._count.proposals} proposals
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={isBookmarked ? "text-red-600 border-red-600" : ""}
                  >
                    <Bookmark className={`h-4 w-4 mr-1 ${isBookmarked ? "fill-current" : ""}`} />
                    {isBookmarked ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Flag className="h-4 w-4 mr-1" />
                    Report
                  </Button>
                </div>
              </div>

              {/* Job Meta Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="font-semibold text-gray-900">{formatBudget(job)}</p>
                  <p className="text-xs text-gray-500">{job.projectType === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold text-gray-900">{job.duration || 'Not specified'}</p>
                  <p className="text-xs text-gray-500">{job.projectType || 'Project'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Experience Level</p>
                  <p className="font-semibold text-gray-900">{job.experienceLevel || 'Any level'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Proposals</p>
                  <p className="font-semibold text-gray-900">{job._count.proposals}</p>
                  <p className="text-xs text-gray-500">0 interviews</p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Project Description</h3>
                <div className="prose prose-gray max-w-none">
                  {job.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed break-words whitespace-pre-wrap">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Attachments */}
              {job.attachments && job.attachments.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Attached Files</h3>
                  <div className="space-y-3">
                    {job.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-teal-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium text-teal-600">
                              {getFileExtension(attachment)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {getFilename(attachment)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {attachment.includes('cloudinary') ? 'Cloudinary File' : 'Attachment'}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(attachment, '_blank')}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}






            </div>

            {/* About the Client */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About the Client</h2>
              
              <div className="flex items-start space-x-4 mb-4">
                <img 
                  src={job.client.avatar || "/placeholder.svg"} 
                  alt={`${job.client.firstName} ${job.client.lastName}`}
                  className="w-16 h-16 rounded-full border-2 border-gray-200"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {job.client.firstName} {job.client.lastName}
                    </h3>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      4.8 (47 reviews)
                    </div>
                    <span>{job.client.location || 'Location not specified'}</span>
                    <span className="text-green-600">Online now</span>
                  </div>
                  <p className="text-gray-700 mb-3">
                    {job.client.bio || `${job.client.firstName} ${job.client.lastName} is a client looking for talented freelancers.`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Company</p>
                  <p className="font-semibold text-gray-900">{job.client.companyName || 'Individual'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Company Size</p>
                  <p className="font-semibold text-gray-900">{job.client.companySize || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Industry</p>
                  <p className="font-semibold text-gray-900">{job.client.industry || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-semibold text-gray-900">January 2022</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Payment Verified
                  </span>
                  <span className="text-gray-600">Usually responds within 2 hours</span>
                </div>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Client
                </Button>
              </div>
            </div>

            {/* Client Reviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Client Reviews</h2>
              <div className="space-y-4">
                {clientReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{review.freelancer}</span>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{review.review}</p>
                    <p className="text-sm text-gray-600">Project: {review.project}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Show Edit Job button for the job owner */}
            {user && user.id === job.client.id && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Your Job</h3>
                <p className="text-gray-600 mb-4">
                  You can edit your job posting or view proposals from freelancers.
                </p>
                <div>
                  <Link to={`/edit-job/${job.id}`}>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Job
                    </Button>
                  </Link>
                  <div className="mt-3">
                    <Link to={`/client-jobs/${job.id}`}>
                      <Button variant="outline" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Proposals
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Submit/Edit Proposal - only show for freelancers who are not the job owner */}
            {user && user.userType === 'FREELANCER' && user.id !== job.client.id && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {checkingProposal ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
                    <span className="ml-2 text-gray-600">Checking proposal status...</span>
                  </div>
                ) : existingProposal ? (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Your Proposal</h3>
                    
                    {existingProposal.status === 'PENDING' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Proposal
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border-0">
                          <DialogHeader className="pb-8 border-b border-gray-100">
                            <DialogTitle className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                              Edit Your Proposal
                            </DialogTitle>
                            <p className="text-gray-600 mt-3 text-lg">
                              Refine your approach for <span className="font-semibold text-gray-800">"{job.title}"</span>
                            </p>
                          </DialogHeader>
                          
                          <div className="py-8 space-y-10">
                            {/* Cover Letter Section */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <label className="text-lg font-semibold text-gray-900 flex items-center">
                                  <MessageCircle className="h-5 w-5 mr-2 text-teal-600" />
                                  Cover Letter
                                </label>
                                <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full font-medium">Required</span>
                              </div>
                              <textarea
                                value={proposal}
                                onChange={(e) => setProposal(e.target.value)}
                                className="w-full h-48 px-6 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-300 resize-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                                placeholder="Share your unique approach, relevant experience, and why you're the perfect fit for this project..."
                                required
                              />
                              <p className="text-sm text-gray-500 flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                Be specific about your methodology and past successes
                              </p>
                            </div>
                            
                            {/* Rate Section */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <label className="text-lg font-semibold text-gray-900 flex items-center">
                                  <DollarSign className="h-5 w-5 mr-2 text-teal-600" />
                                  Your Rate
                                </label>
                                <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full font-medium">Required</span>
                              </div>
                              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">
                                      {job.projectType === 'hourly' ? 'Hourly Rate' : 'Fixed Price'}
                                    </span>
                                    <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                                      {job.projectType === 'hourly' ? 'Per Hour' : 'Total Project'}
                                    </Badge>
                                  </div>
                                  <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg">
                                      $
                                    </span>
                                    <input
                                      type="number"
                                      value={proposalBudget}
                                      onChange={(e) => setProposalBudget(e.target.value)}
                                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-300 transition-all duration-300 text-lg font-medium"
                                      placeholder={job.projectType === 'hourly' ? "25" : "3500"}
                                      min="0"
                                      step="0.01"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <input
                                type="hidden"
                                value={job.projectType === 'hourly' ? 'hourly' : 'fixed'}
                                onChange={(e) => setProposalBudgetType(e.target.value as 'hourly' | 'fixed')}
                              />
                            </div>

                            {/* Duration Section */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <label className="text-lg font-semibold text-gray-900 flex items-center">
                                  <Clock className="h-5 w-5 mr-2 text-teal-600" />
                                  Estimated Duration
                                </label>
                                <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full font-medium">Required</span>
                              </div>
                              <select 
                                value={proposalDelivery}
                                onChange={(e) => setProposalDelivery(e.target.value)}
                                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-300 transition-all duration-300 text-lg font-medium bg-white"
                                required
                              >
                                <option value="">Select estimated duration</option>
                                <option value="1 week">1 week</option>
                                <option value="2 weeks">2 weeks</option>
                                <option value="1 month">1 month</option>
                                <option value="2-3 months">2-3 months</option>
                                <option value="3+ months">3+ months</option>
                              </select>
                              <p className="text-sm text-gray-500 flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-blue-500" />
                                Realistic timelines build client trust and confidence
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-4 pt-8 border-t border-gray-100">
                            <Button 
                              variant="outline"
                              className="flex-1 py-4 px-8 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 rounded-xl font-medium text-gray-700"
                              onClick={() => {
                                const closeButton = document.querySelector('[data-radix-dialog-close]') as HTMLButtonElement;
                                closeButton?.click();
                              }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleProposalUpdate} 
                              className="flex-1 py-4 px-8 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                              disabled={submittingProposal}
                            >
                              {submittingProposal ? (
                                <div className="flex items-center">
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                  Updating...
                                </div>
                              ) : (
                                "Update Proposal"
                              )}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    
                    {existingProposal.status !== 'PENDING' && (
                      <div className="text-center py-4">
                        <div className="mb-4">
                          <Badge variant={existingProposal.status === 'ACCEPTED' ? 'default' : 'secondary'}>
                            {existingProposal.status === 'ACCEPTED' ? 'Accepted' : 
                             existingProposal.status === 'REJECTED' ? 'Rejected' : 'Withdrawn'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">
                          Your proposal has been {existingProposal.status.toLowerCase()}.
                        </p>
                        <p className="text-sm text-gray-500">
                          Submitted on {new Date(existingProposal.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}

                    {existingProposal.status === 'PENDING' && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              disabled={submittingProposal}
                              className="w-full"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Withdraw Proposal
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Withdraw Proposal</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p className="text-gray-600">
                                Are you sure you want to withdraw your proposal? This action cannot be undone.
                              </p>
                              <div className="flex gap-3">
                                <Button 
                                  variant="outline" 
                                  onClick={() => setShowWithdrawDialog(false)}
                                  className="flex-1"
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  onClick={() => {
                                    setShowWithdrawDialog(false);
                                    handleWithdrawProposal();
                                  }}
                                  disabled={submittingProposal}
                                  className="flex-1"
                                >
                                  {submittingProposal ? "Withdrawing..." : "Withdraw"}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          You can withdraw your proposal at any time before the client responds.
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit a Proposal</h3>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                          <Send className="h-4 w-4 mr-2" />
                          Send Proposal
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border-0">
                        <DialogHeader className="pb-8 border-b border-gray-100">
                          <DialogTitle className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Submit Your Proposal
                          </DialogTitle>
                          <p className="text-gray-600 mt-3 text-lg">
                            Present your qualifications for <span className="font-semibold text-gray-800">"{job.title}"</span>
                          </p>
                        </DialogHeader>
                        
                        <div className="py-8 space-y-10">
                          {/* Cover Letter Section */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <label className="text-lg font-semibold text-gray-900 flex items-center">
                                <MessageCircle className="h-5 w-5 mr-2 text-teal-600" />
                                Cover Letter
                              </label>
                              <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full font-medium">Required</span>
                            </div>
                            <textarea
                              value={proposal}
                              onChange={(e) => setProposal(e.target.value)}
                              className="w-full h-48 px-6 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-300 resize-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                              placeholder="Share your unique approach, relevant experience, and why you're the perfect fit for this project..."
                              required
                            />
                            <p className="text-sm text-gray-500 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              Be specific about your methodology and past successes
                            </p>
                          </div>
                          
                          {/* Rate Section */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <label className="text-lg font-semibold text-gray-900 flex items-center">
                                <DollarSign className="h-5 w-5 mr-2 text-teal-600" />
                                Your Rate
                              </label>
                              <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full font-medium">Required</span>
                            </div>
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-700">
                                    {job.projectType === 'hourly' ? 'Hourly Rate' : 'Fixed Price'}
                                  </span>
                                  <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                                    {job.projectType === 'hourly' ? 'Per Hour' : 'Total Project'}
                                  </Badge>
                                </div>
                                <div className="relative">
                                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg">
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    value={proposalBudget}
                                    onChange={(e) => setProposalBudget(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-300 transition-all duration-300 text-lg font-medium"
                                    placeholder={job.projectType === 'hourly' ? "25" : "3500"}
                                    min="0"
                                    step="0.01"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <input
                              type="hidden"
                              value={job.projectType === 'hourly' ? 'hourly' : 'fixed'}
                              onChange={(e) => setProposalBudgetType(e.target.value as 'hourly' | 'fixed')}
                            />
                          </div>

                          {/* Duration Section */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <label className="text-lg font-semibold text-gray-900 flex items-center">
                                <Clock className="h-5 w-5 mr-2 text-teal-600" />
                                Estimated Duration
                              </label>
                              <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full font-medium">Required</span>
                            </div>
                            <select 
                              value={proposalDelivery}
                              onChange={(e) => setProposalDelivery(e.target.value)}
                              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-300 transition-all duration-300 text-lg font-medium bg-white"
                              required
                            >
                              <option value="">Select estimated duration</option>
                              <option value="1 week">1 week</option>
                              <option value="2 weeks">2 weeks</option>
                              <option value="1 month">1 month</option>
                              <option value="2-3 months">2-3 months</option>
                              <option value="3+ months">3+ months</option>
                            </select>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-blue-500" />
                              Realistic timelines build client trust and confidence
                            </p>
                          </div>

                          {/* Attachments Section */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <label className="text-lg font-semibold text-gray-900 flex items-center">
                                <Paperclip className="h-5 w-5 mr-2 text-teal-600" />
                                Attachments
                              </label>
                              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">Optional</span>
                            </div>
                            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:border-teal-300 transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100">
                              <input
                                type="file"
                                multiple
                                onChange={(e) => {
                                  const files = Array.from(e.target.files || []);
                                  setProposalAttachments(files);
                                }}
                                className="hidden"
                                id="file-upload"
                                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                              />
                              <label htmlFor="file-upload" className="cursor-pointer">
                                <div className="text-center">
                                  <Paperclip className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                  <p className="text-lg font-medium text-gray-900 mb-2">
                                    Upload files
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    PDF, DOC, images up to 10MB each
                                  </p>
                                </div>
                              </label>
                            </div>
                            
                            {proposalAttachments.length > 0 && (
                              <div className="space-y-3">
                                <p className="text-sm font-medium text-gray-700 flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                  Selected files:
                                </p>
                                {proposalAttachments.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-200 shadow-sm">
                                    <div className="flex items-center space-x-3">
                                      <Paperclip className="h-5 w-5 text-teal-600" />
                                      <span className="text-sm font-medium text-gray-900 truncate">{file.name}</span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => setProposalAttachments(proposalAttachments.filter((_, i) => i !== index))}
                                      className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-8 border-t border-gray-100">
                          <Button 
                            variant="outline"
                            className="flex-1 py-4 px-8 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 rounded-xl font-medium text-gray-700"
                            onClick={() => {
                              const closeButton = document.querySelector('[data-radix-dialog-close]') as HTMLButtonElement;
                              closeButton?.click();
                            }}
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleProposalSubmit} 
                            className="flex-1 py-4 px-8 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                            disabled={submittingProposal}
                          >
                            {submittingProposal ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                Submitting...
                              </div>
                            ) : (
                              "Submit Proposal"
                            )}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <div className="mt-4 text-sm text-gray-600">
                      <p className="mb-2">Tips for a great proposal:</p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Address the client's specific needs</li>
                        <li>Showcase relevant experience</li>
                        <li>Be clear about your timeline</li>
                        <li>Ask clarifying questions</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Show different message for non-freelancers (excluding job owner) */}
            {user && user.userType !== 'FREELANCER' && user.id !== job.client.id && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit a Proposal</h3>
                <p className="text-gray-600 mb-4">
                  Only freelancers can submit proposals for jobs. Please switch to a freelancer account to submit a proposal.
                </p>
                <Button variant="outline" className="w-full" disabled>
                  <Send className="h-4 w-4 mr-2" />
                  Send Proposal
                </Button>
              </div>
            )}

            {/* Show login prompt for non-authenticated users */}
            {!user && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit a Proposal</h3>
                <p className="text-gray-600 mb-4">
                  Please log in as a freelancer to submit a proposal for this job.
                </p>
                <Link to="/login">
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Login to Submit Proposal
                  </Button>
                </Link>
              </div>
            )}

            {/* Job Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Proposals</span>
                  <span className="font-medium">{job._count.proposals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interviews</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Invites sent</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Unanswered invites</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
              <div className="space-y-4">
                {similarJobs.map((similarJob) => (
                  <div key={similarJob.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                    <Link to={`/jobs/${similarJob.id}`} className="block">
                      <h4 className="font-medium text-gray-900 hover:text-teal-600 transition-colors mb-1">
                        {similarJob.title}
                      </h4>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>{similarJob.budget}</span>
                        <span>{similarJob.proposals} proposals</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetails;
