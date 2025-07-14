import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, Eye, Edit, Trash2, Clock, Users, DollarSign, 
  TrendingUp, Star, MessageCircle, CheckCircle, AlertCircle,
  Filter, Search, Calendar, BarChart3, PieChart, Loader2,
  User, CalendarDays, FileText, Target
} from "lucide-react";
import axios from "axios";

import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useAuth } from "../hooks/AuthContext";

// Types for backend data
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
  workingHours?: string;
  timezone?: string;
  communicationPreferences: string[];
  location?: string;
  isRemote: boolean;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  isUrgent: boolean;
  visibility: string;
  applicationDeadline?: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    proposals: number;
  };
}

interface Proposal {
  id: string;
  jobId: string;
  freelancerId: string;
  coverLetter: string;
  bidAmount: number;
  bidType: 'FIXED' | 'HOURLY';
  estimatedDuration: string;
  attachments: string[];
  questionResponses: Array<{
    question: string;
    answer: string;
  }>;
  milestones: Array<{
    title: string;
    description: string;
    amount: number;
    dueDate: string;
  }>;
  originalBudget?: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
  clientNotes?: string;
  rating?: number;
  interview?: {
    scheduled: boolean;
    date?: string;
    notes?: string;
  };
  isShortlisted?: boolean;
  clientViewed?: boolean;
  createdAt: string;
  updatedAt: string;
  freelancer: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
    location?: string;
    skills: string[];
    hourlyRate?: number;
    portfolio?: string[];
    experience?: string;
    education?: string;
    certifications?: string[];
    languages?: string[];
    topSkills?: string[];
    experienceLevel?: string;
    totalEarnings?: number;
    successRate?: number;
    completedJobs?: number;
    onTime?: number;
    responseTime?: number;
    lastActive?: string;
    topRatedPlus?: boolean;
    verified?: boolean;
    email: string;
  };
  job: {
    id: string;
    title: string;
    description: string;
    client: {
      id: string;
      firstName: string;
      lastName: string;
      companyName?: string;
    };
  };
}

interface Offer {
  id: string;
  conversationId: string;
  clientId: string;
  freelancerId: string;
  jobId: string;
  budgetType: 'FIXED' | 'HOURLY';
  amount: number;
  duration: string;
  milestones: Array<{
    title: string;
    description: string;
    amount: number;
    dueDate: string;
    status?: 'pending' | 'in_progress' | 'completed';
  }>;
  terms?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'WITHDRAWN';
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    companyName?: string;
  };
  freelancer: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    email: string;
  };
  job: {
    id: string;
    title: string;
    description: string;
  };
  conversation: {
    id: string;
    projectName?: string;
  };
}

const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState<string | null>(null);

  // Proposals state
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [proposalsLoading, setProposalsLoading] = useState(true);
  const [proposalsError, setProposalsError] = useState<string | null>(null);
  const [proposalsByJob, setProposalsByJob] = useState<Record<string, Proposal[]>>({});

  // Offers state
  const [offers, setOffers] = useState<Offer[]>([]);
  const [offersLoading, setOffersLoading] = useState(true);
  const [offersError, setOffersError] = useState<string | null>(null);

  // Mock data for client dashboard
  const stats = {
    totalJobs: 24,
    activeJobs: 8,
    totalProposals: 156,
    avgProposalsPerJob: 6.5,
    totalSpent: 45600,
    avgJobValue: 1900,
    hiredFreelancers: 18,
    repeatHires: 7
  };

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      setJobsLoading(true);
      setJobsError(null);
      
      const response = await axios.get('/jobs/client/me');
      
      if (response.data.success) {
        setJobs(response.data.data);
      } else {
        setJobsError('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobsError(error.response?.data?.message || 'Failed to fetch jobs');
    } finally {
      setJobsLoading(false);
    }
  };

  // Fetch accepted offers from backend
  const fetchAcceptedOffers = async () => {
    try {
      setOffersLoading(true);
      setOffersError(null);
      
      const response = await axios.get('/offers/me?status=ACCEPTED');
      
      if (response.data.success) {
        setOffers(response.data.data);
      } else {
        setOffersError('Failed to fetch offers');
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
      setOffersError(error.response?.data?.message || 'Failed to fetch offers');
    } finally {
      setOffersLoading(false);
    }
  };

  // Fetch proposals for all jobs
  const fetchProposals = async () => {
    try {
      setProposalsLoading(true);
      setProposalsError(null);
      
      const allProposals: Proposal[] = [];
      const proposalsByJobMap: Record<string, Proposal[]> = {};
      
      // Fetch proposals for each job
      for (const job of jobs) {
        try {
          const response = await axios.get(`/proposals/job/${job.id}`);
          
          if (response.data.success) {
            const jobProposals = response.data.data;
            allProposals.push(...jobProposals);
            proposalsByJobMap[job.id] = jobProposals;
          }
        } catch (error) {
          console.error(`Error fetching proposals for job ${job.id}:`, error);
        }
      }
      
      setProposals(allProposals);
      setProposalsByJob(proposalsByJobMap);
    } catch (error) {
      console.error('Error fetching proposals:', error);
      setProposalsError('Failed to fetch proposals');
    } finally {
      setProposalsLoading(false);
    }
  };

  // Update proposal status (accept/reject)
  const updateProposalStatus = async (proposalId: string, status: 'ACCEPTED' | 'REJECTED') => {
    try {
      const response = await axios.put(`/proposals/${proposalId}/status`, { status });
      
      if (response.data.success) {
        // Update the proposal in state
        setProposals(prevProposals => 
          prevProposals.map(proposal => 
            proposal.id === proposalId 
              ? { ...proposal, status } 
              : proposal
          )
        );
        
        // Update proposals by job
        setProposalsByJob(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(jobId => {
            updated[jobId] = updated[jobId].map(proposal => 
              proposal.id === proposalId 
                ? { ...proposal, status } 
                : proposal
            );
          });
          return updated;
        });
      }
    } catch (error) {
      console.error('Error updating proposal status:', error);
    }
  };

  // Update proposal (client notes, rating, etc.)
  const updateProposal = async (proposalId: string, updateData: {
    clientNotes?: string;
    rating?: number;
    interview?: any;
    isShortlisted?: boolean;
    clientViewed?: boolean;
  }) => {
    try {
      const response = await axios.put(`/proposals/${proposalId}`, updateData);
      
      if (response.data.success) {
        // Update the proposal in state
        setProposals(prevProposals => 
          prevProposals.map(proposal => 
            proposal.id === proposalId 
              ? { ...proposal, ...updateData } 
              : proposal
          )
        );
        
        // Update proposals by job
        setProposalsByJob(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(jobId => {
            updated[jobId] = updated[jobId].map(proposal => 
              proposal.id === proposalId 
                ? { ...proposal, ...updateData } 
                : proposal
            );
          });
          return updated;
        });
      }
    } catch (error) {
      console.error('Error updating proposal:', error);
    }
  };

  // Delete job
  const deleteJob = async (jobId: string) => {
    try {
      const response = await axios.delete(`/jobs/${jobId}`);
      
      if (response.data.success) {
        // Remove the job from state
        setJobs(jobs.filter(job => job.id !== jobId));
      } else {
        console.error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  // Calculate progress for offers with milestones
  const calculateProgress = (offer: Offer): number => {
    if (!offer.milestones || offer.milestones.length === 0) {
      return 0;
    }
    
    const completedMilestones = offer.milestones.filter(m => m.status === 'completed').length;
    return Math.round((completedMilestones / offer.milestones.length) * 100);
  };

  // Filter jobs based on search term and status
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === "all" || 
                         (activeFilter === "active" && job.status === "OPEN") ||
                         (activeFilter === "in_progress" && job.status === "IN_PROGRESS") ||
                         (activeFilter === "completed" && job.status === "COMPLETED") ||
                         (activeFilter === "cancelled" && job.status === "CANCELLED");
    
    return matchesSearch && matchesFilter;
  });

  // Load data on component mount
  useEffect(() => {
    if (user?.userType === 'CLIENT') {
      fetchJobs();
      fetchAcceptedOffers();
    }
  }, [user]);

  // Fetch proposals when jobs are loaded
  useEffect(() => {
    if (jobs.length > 0) {
      fetchProposals();
    }
  }, [jobs]);

  // Format budget display
  const formatBudget = (job: Job) => {
    if (job.projectType === 'fixed') {
      if (job.minBudget && job.maxBudget && job.minBudget !== job.maxBudget) {
        return `$${job.minBudget.toLocaleString()} - $${job.maxBudget.toLocaleString()}`;
      } else if (job.minBudget) {
        return `$${job.minBudget.toLocaleString()}`;
      }
    } else if (job.projectType === 'hourly') {
      if (job.minBudget && job.maxBudget && job.minBudget !== job.maxBudget) {
        return `$${job.minBudget}/hour - $${job.maxBudget}/hour`;
      } else if (job.minBudget) {
        return `$${job.minBudget}/hour`;
      }
    }
    return 'Budget not specified';
  };

  // Convert backend status to frontend status
  const getFrontendStatus = (status: string) => {
    switch (status) {
      case 'OPEN': return 'active';
      case 'IN_PROGRESS': return 'in_progress';
      case 'COMPLETED': return 'completed';
      case 'CANCELLED': return 'cancelled';
      default: return status.toLowerCase();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-gray-100 text-gray-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      case "shortlisted": return "bg-purple-100 text-purple-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active";
      case "in_progress": return "In Progress";
      case "completed": return "Completed";
      case "paused": return "Paused";
      case "shortlisted": return "Shortlisted";
      case "cancelled": return "Cancelled";
      default: return status;
    }
  };

  const recentJobs = [
    {
      id: 1,
      title: "Full-Stack React Developer for E-commerce Platform",
      status: "active",
      budget: "$3,000 - $5,000",
      proposals: 12,
      postedDate: "2024-01-15",
      deadline: "2024-03-15",
      category: "Web Development",
      views: 245
    },
    {
      id: 2,
      title: "Mobile App UI/UX Designer",
      status: "in_progress",
      budget: "$2,500 - $4,000",
      proposals: 8,
      postedDate: "2024-01-10",
      deadline: "2024-02-28",
      category: "Design",
      views: 189,
      assignedTo: "Sarah Chen"
    },
    {
      id: 3,
      title: "WordPress Plugin Development",
      status: "completed",
      budget: "$1,200 - $2,000",
      proposals: 15,
      postedDate: "2023-12-20",
      deadline: "2024-01-20",
      category: "Web Development",
      views: 156,
      completedDate: "2024-01-18",
      rating: 5
    },
    {
      id: 4,
      title: "Content Writer for Tech Blog",
      status: "paused",
      budget: "$800 - $1,500",
      proposals: 6,
      postedDate: "2024-01-08",
      deadline: "2024-02-15",
      category: "Writing",
      views: 98
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your jobs, proposals, and freelancer relationships</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={()=>navigate('/post-job')}>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
                  <p className="text-xs text-green-600">+2 this month</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
                  <p className="text-xs text-blue-600">{stats.totalProposals} proposals</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Avg: ${stats.avgJobValue}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hired</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.hiredFreelancers}</p>
                  <p className="text-xs text-purple-600">{stats.repeatHires} repeat hires</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="contracts">Active Contracts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>My Posted Jobs</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {jobsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                    <span className="ml-2 text-gray-600">Loading jobs...</span>
                  </div>
                ) : jobsError ? (
                  <div className="text-center py-8">
                    <p className="text-red-600 mb-4">{jobsError}</p>
                    <Button onClick={fetchJobs} variant="outline">
                      Try Again
                    </Button>
                  </div>
                ) : filteredJobs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No jobs found</p>
                    {searchTerm && (
                      <Button onClick={() => setSearchTerm("")} variant="outline">
                        Clear Search
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredJobs.map((job) => (
                      <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                              <Badge className={getStatusColor(getFrontendStatus(job.status))}>
                                {getStatusText(getFrontendStatus(job.status))}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                              <span className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />
                                {formatBudget(job)}
                              </span>
                              <span className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {job._count.proposals} proposals
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                Posted: {new Date(job.createdAt).toLocaleDateString()}
                              </span>
                              {job.applicationDeadline && (
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  Due: {new Date(job.applicationDeadline).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-sm text-gray-600">Category:</span>
                              <Badge variant="secondary" className="text-xs">
                                {job.category}
                              </Badge>
                              {job.subcategory && (
                                <Badge variant="secondary" className="text-xs">
                                  {job.subcategory}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Link to={`/jobs/${job.id}`}>
                              <Button variant="outline" size="sm" className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100">
                                <Eye className="h-4 w-4 mr-1" />
                                Public View
                              </Button>
                            </Link>
                            <Link to={`/client-jobs/${job.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Manage
                              </Button>
                            </Link>
                            <Link to={`/edit-job/${job.id}`}>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </Link>
                            {job.status === "OPEN" && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700"
                                onClick={() => deleteJob(job.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Proposals</CardTitle>
                <CardDescription>Review and manage proposals from freelancers</CardDescription>
              </CardHeader>
              <CardContent>
                {proposalsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                    <span className="ml-2 text-gray-600">Loading proposals...</span>
                  </div>
                ) : proposalsError ? (
                  <div className="text-center py-8">
                    <p className="text-red-600 mb-4">{proposalsError}</p>
                    <Button onClick={fetchProposals} variant="outline">
                      Try Again
                    </Button>
                  </div>
                ) : proposals.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No proposals found</p>
                    <p className="text-sm text-gray-500">Proposals will appear here once freelancers submit them to your jobs.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {proposals.map((proposal) => (
                      <div key={proposal.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {proposal.job?.title || 'Job Title Not Available'}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Submitted on {new Date(proposal.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(proposal.status.toLowerCase())}>
                            {getStatusText(proposal.status.toLowerCase())}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Freelancer Info */}
                          <div className="lg:col-span-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <img 
                                src={proposal.freelancer?.avatar || "/placeholder.svg"} 
                                alt={`${proposal.freelancer?.firstName || 'Freelancer'} ${proposal.freelancer?.lastName || ''}`}
                                className="w-12 h-12 rounded-full"
                              />
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {proposal.freelancer?.firstName || 'Unknown'} {proposal.freelancer?.lastName || 'Freelancer'}
                                </h4>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                  {proposal.freelancer?.successRate || 0}% success rate
                                  {proposal.freelancer?.completedJobs && (
                                    <span className="ml-2">({proposal.freelancer.completedJobs} jobs)</span>
                                  )}
                                </div>
                                {proposal.freelancer?.hourlyRate && (
                                  <p className="text-sm text-gray-600">
                                    ${proposal.freelancer.hourlyRate}/hr
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {proposal.freelancer?.topSkills?.slice(0, 3).map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Proposal Details */}
                          <div className="lg:col-span-2">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-600">Proposed Budget</p>
                                <p className="font-semibold text-gray-900">
                                  ${proposal.bidAmount.toLocaleString()}
                                  {proposal.bidType === 'HOURLY' && '/hr'}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Timeline</p>
                                <p className="font-semibold text-gray-900">{proposal.estimatedDuration}</p>
                              </div>
                            </div>
                            <div className="mb-4">
                              <p className="text-sm text-gray-600 mb-2">Cover Letter</p>
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {proposal.coverLetter}
                              </p>
                            </div>
                            {proposal.attachments.length > 0 && (
                              <p className="text-sm text-blue-600">
                                {proposal.attachments.length} attachments included
                              </p>
                            )}
                            {proposal.milestones.length > 0 && (
                              <div className="mt-3">
                                <p className="text-sm text-gray-600 mb-2">Proposed Milestones</p>
                                <div className="space-y-2">
                                  {proposal.milestones.slice(0, 2).map((milestone, index) => (
                                    <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                                      <span className="font-medium">{milestone.title}</span>
                                      <span className="text-gray-600 ml-2">${milestone.amount.toLocaleString()}</span>
                                    </div>
                                  ))}
                                  {proposal.milestones.length > 2 && (
                                    <p className="text-xs text-gray-500">
                                      +{proposal.milestones.length - 2} more milestones
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateProposal(proposal.id, { isShortlisted: !proposal.isShortlisted })}
                          >
                            {proposal.isShortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
                          </Button>
                          <a href={`/freelancers/${proposal.freelancerId}`}>
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                          </a>
                          {proposal.status === 'PENDING' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => updateProposalStatus(proposal.id, 'REJECTED')}
                              >
                                Reject
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-teal-600 hover:bg-teal-700"
                                onClick={() => updateProposalStatus(proposal.id, 'ACCEPTED')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Contracts Tab */}
          <TabsContent value="contracts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Contracts</CardTitle>
                <CardDescription>Monitor ongoing projects and accepted offers</CardDescription>
              </CardHeader>
              <CardContent>
                {offersLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                    <span className="ml-3 text-gray-600">Loading contracts...</span>
                  </div>
                ) : offersError ? (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <p className="text-red-600 mb-4">{offersError}</p>
                    <Button onClick={fetchAcceptedOffers} variant="outline">
                      Try Again
                    </Button>
                  </div>
                ) : offers.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Contracts</h3>
                    <p className="text-gray-600 mb-6">You don't have any accepted offers yet. Start by posting a job and making offers to freelancers.</p>
                    <Button onClick={() => navigate('/post-job')} className="bg-teal-600 hover:bg-teal-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Post a Job
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {offers.map((offer) => {
                      const progress = calculateProgress(offer);
                      const hasMilestones = offer.milestones && offer.milestones.length > 0;
                      
                      return (
                        <div key={offer.id} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                          {/* Header */}
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <h3 className="text-xl font-semibold text-gray-900">{offer.job.title}</h3>
                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                  Active Contract
                                </Badge>
                              </div>
                              
                              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-2" />
                                  <span className="font-medium">
                                    {offer.freelancer.firstName} {offer.freelancer.lastName}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <CalendarDays className="h-4 w-4 mr-2" />
                                  <span>Started: {new Date(offer.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-2" />
                                  <span className="font-medium">
                                    ${offer.amount.toLocaleString()} 
                                    {offer.budgetType === 'HOURLY' && '/hr'}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>{offer.duration}</span>
                                </div>
                              </div>
                            </div>
                            
                            {hasMilestones && (
                              <div className="text-right">
                                <p className="text-3xl font-bold text-teal-600">{progress}%</p>
                                <p className="text-sm text-gray-600">Complete</p>
                              </div>
                            )}
                          </div>

                          {/* Progress Bar - Only show if milestones exist */}
                          {hasMilestones && (
                            <div className="mb-6">
                              <div className="w-full bg-gray-100 rounded-full h-3">
                                <div 
                                  className="bg-teal-600 h-3 rounded-full transition-all duration-500 ease-out"
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          {/* Milestones Section */}
                          {hasMilestones ? (
                            <div className="mb-6">
                              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <Target className="h-5 w-5 mr-2 text-teal-600" />
                                Project Milestones
                              </h4>
                              <div className="space-y-3">
                                {offer.milestones.map((milestone, index) => (
                                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center space-x-3">
                                      {milestone.status === "completed" && (
                                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                                      )}
                                      {milestone.status === "in_progress" && (
                                        <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                      )}
                                      {(!milestone.status || milestone.status === "pending") && (
                                        <AlertCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                      )}
                                      <div>
                                        <span className="font-medium text-gray-900">{milestone.title}</span>
                                        {milestone.description && (
                                          <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                                        )}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-sm font-semibold text-gray-700">
                                        ${milestone.amount.toLocaleString()}
                                      </span>
                                      <p className="text-xs text-gray-500">
                                        Due: {new Date(milestone.dueDate).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="mb-6">
                              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="flex items-center">
                                  <FileText className="h-5 w-5 text-blue-600 mr-3" />
                                  <div>
                                    <p className="font-medium text-blue-900">Fixed Price Contract</p>
                                    <p className="text-sm text-blue-700">
                                      This is a {offer.budgetType.toLowerCase()} contract with no defined milestones.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Terms Section */}
                          {offer.terms && (
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h4>
                              <p className="text-sm text-gray-700 leading-relaxed">{offer.terms}</p>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                            <div className="text-sm text-gray-600">
                              <p>Last updated: {new Date(offer.updatedAt).toLocaleDateString()}</p>
                              {offer.expiresAt && (
                                <p>Expires: {new Date(offer.expiresAt).toLocaleDateString()}</p>
                              )}
                            </div>
                            <div className="flex space-x-3">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/messages/${offer.conversationId}`)}
                              >
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Message
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Performance</CardTitle>
                  <CardDescription>How your jobs are performing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Proposals per Job</span>
                      <span className="font-semibold">{stats.avgProposalsPerJob}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Job Completion Rate</span>
                      <span className="font-semibold">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Job Duration</span>
                      <span className="font-semibold">6.2 weeks</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Repeat Hire Rate</span>
                      <span className="font-semibold">39%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Spending Overview</CardTitle>
                  <CardDescription>Your investment in freelance talent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="font-semibold">$4,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Month</span>
                      <span className="font-semibold">$3,800</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Project Cost</span>
                      <span className="font-semibold">${stats.avgJobValue}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">ROI on Projects</span>
                      <span className="font-semibold text-green-600">+23%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Your hiring patterns by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <PieChart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-blue-900">Web Development</p>
                    <p className="text-sm text-blue-700">42% of jobs</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <PieChart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold text-green-900">Design</p>
                    <p className="text-sm text-green-700">31% of jobs</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <PieChart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-semibold text-purple-900">Writing</p>
                    <p className="text-sm text-purple-700">27% of jobs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default ClientDashboard;
