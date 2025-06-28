import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, Clock, DollarSign, Star, Users, Calendar, 
  Bookmark, Share2, Flag, CheckCircle, Award, 
  MessageCircle, ThumbsUp, Eye, Send, Paperclip 
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
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
  hourlyRate?: number;
  duration?: string;
  skills: string[];
  category: string;
  subcategory?: string;
  projectType?: string;
  experienceLevel?: string;
  workingHours?: string;
  timezone?: string;
  communicationPreferences: string[];
  location?: string;
  isRemote: boolean;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  isUrgent: boolean;
  visibility: string;
  applicationDeadline?: string;
  requirements: string[];
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

const JobDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [proposal, setProposal] = useState("");
  const [proposalBudget, setProposalBudget] = useState("");
  const [proposalDelivery, setProposalDelivery] = useState("");
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submittingProposal, setSubmittingProposal] = useState(false);

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

    if (id) {
      fetchJobDetails();
    }
  }, [id, toast]);

  const formatBudget = (job: Job) => {
    if (job.budget === 'FIXED') {
      if (job.minBudget && job.maxBudget && job.minBudget !== job.maxBudget) {
        return `$${job.minBudget.toLocaleString()} - $${job.maxBudget.toLocaleString()}`;
      } else if (job.minBudget) {
        return `$${job.minBudget.toLocaleString()}`;
      } else if (job.maxBudget) {
        return `$${job.maxBudget.toLocaleString()}`;
      }
      return "Budget not specified";
    } else if (job.budget === 'HOURLY') {
      if (job.minBudget && job.maxBudget && job.minBudget !== job.maxBudget) {
        return `$${job.minBudget}/hr - $${job.maxBudget}/hr`;
      } else if (job.hourlyRate) {
        return `$${job.hourlyRate}/hr`;
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
      
      const proposalData = {
        jobId: id,
        coverLetter: proposal,
        bidAmount: parseFloat(proposalBudget.replace(/[^0-9.]/g, '')),
        estimatedDuration: proposalDelivery,
        attachments: []
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
        setProposalDelivery("");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
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
        <Navbar />
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
      <Navbar />
      
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
                  <p className="text-xs text-gray-500">{job.budget === 'FIXED' ? 'Fixed Price' : 'Hourly Rate'}</p>
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

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                  <div className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-teal-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Communication Preferences */}
              {job.communicationPreferences && job.communicationPreferences.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Communication Preferences</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.communicationPreferences.map((pref, index) => (
                      <Badge key={index} variant="outline">
                        {pref}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Working Details */}
              {(job.workingHours || job.timezone) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Working Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {job.workingHours && (
                      <div>
                        <p className="text-sm text-gray-600">Working Hours</p>
                        <p className="font-medium text-gray-900">{job.workingHours}</p>
                      </div>
                    )}
                    {job.timezone && (
                      <div>
                        <p className="text-sm text-gray-600">Timezone</p>
                        <p className="font-medium text-gray-900">{job.timezone}</p>
                      </div>
                    )}
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
            {/* Submit Proposal */}
            {user && user.userType === 'FREELANCER' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit a Proposal</h3>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      <Send className="h-4 w-4 mr-2" />
                      Send Proposal
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Submit Your Proposal</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Proposal
                        </label>
                        <textarea
                          value={proposal}
                          onChange={(e) => setProposal(e.target.value)}
                          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Describe your approach to this project..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Budget
                          </label>
                          <input
                            type="text"
                            value={proposalBudget}
                            onChange={(e) => setProposalBudget(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="$3,500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Delivery Time
                          </label>
                          <select 
                            value={proposalDelivery}
                            onChange={(e) => setProposalDelivery(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          >
                            <option value="">Select duration</option>
                            <option value="1 week">1 week</option>
                            <option value="2 weeks">2 weeks</option>
                            <option value="1 month">1 month</option>
                            <option value="2-3 months">2-3 months</option>
                          </select>
                        </div>
                      </div>
                      <Button 
                        onClick={handleProposalSubmit} 
                        className="w-full"
                        disabled={submittingProposal}
                      >
                        {submittingProposal ? "Submitting..." : "Submit Proposal"}
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
              </div>
            )}

            {/* Show different message for non-freelancers */}
            {user && user.userType !== 'FREELANCER' && (
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
