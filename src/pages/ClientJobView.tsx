import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  MapPin, Clock, Star, Users, Calendar, 
  Eye, MessageCircle, CheckCircle, XCircle, Award,
  FileText, Download, Edit, Trash2, AlertCircle,
  Filter, Search, SortAsc, MoreHorizontal,
  TrendingUp, Target
} from "lucide-react";

import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import axios from "axios";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "../hooks/AuthContext";
import { useWebSocket } from "../hooks/socketContext";

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

interface Proposal {
  id: string;
  coverLetter: string;
  bidAmount: number;
  estimatedDuration: string;
  attachments: string[];
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
  jobId: string;
  freelancerId: string;
  createdAt: string;
  updatedAt: string;
  questionResponses?: Array<{
    question: string;
    answer: string;
  }>;
  milestones?: Array<{
    title: string;
    duration: string;
    amount: number;
  }>;
  clientNotes?: string;
  clientViewed: boolean;
  rating?: number;
  interview?: {
    scheduled: boolean;
    date?: string;
    notes?: string;
  };
  originalBudget?: number;
  isShortlisted: boolean;
  freelancer: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    title?: string;
    location?: string;
    skills?: Array<{
      name: string;
      category?: string;
      level?: string;
      yearsOfExperience?: number;
    }> | string[];
    hourlyRate?: number;
    totalEarnings?: string;
    successRate?: number;
    completedJobs?: number;
    onTime?: number;
    responseTime?: string;
    lastActive?: string;
    topRatedPlus?: boolean;
    verified?: boolean;
    languages?: Array<{
      name: string;
      level: string;
    }>;
    education?: Array<{
      school: string;
      degree: string;
      year: string;
    }>;
    certifications?: string[];
    email?: string; // Added email to freelancer interface
  };
}

const ClientJobView = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("proposals");
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [job, setJob] = useState<Job | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { createConversation } = useWebSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobAndProposals = async () => {
      try {
        setLoading(true);
        
        // Fetch job details
        const jobResponse = await axios.get(`/jobs/${id}`);
        if (jobResponse.data.success) {
          setJob(jobResponse.data.data);
        } else {
          setError('Failed to fetch job details');
          return;
        }

        // Fetch proposals for this job
        const proposalsResponse = await axios.get(`/proposals/job/${id}`);
        if (proposalsResponse.data.success) {
          setProposals(proposalsResponse.data.data);
        } else {
          setError('Failed to fetch proposals');
          return;
        }
      } catch (err: unknown) {
        console.error('Error fetching job and proposals:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
        setError(errorMessage);
        toast({
          title: "Error",
          description: "Failed to load job and proposals",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobAndProposals();
    }
  }, [id, toast]);

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = 
      proposal.freelancer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.freelancer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.coverLetter.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === "all") return matchesSearch;
    return matchesSearch && proposal.status.toLowerCase() === filterBy;
  });

  const sortedProposals = [...filteredProposals].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "price":
        return a.bidAmount - b.bidAmount;
      case "rating":
        return (b.freelancer.successRate || 0) - (a.freelancer.successRate || 0);
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ACCEPTED":
        return "bg-green-100 text-green-800 border-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      case "WITHDRAWN":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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

  const handleProposalAction = async (proposalId: string, action: string) => {
    try {
      if (action === "accept") {
        const response = await axios.put(`/proposals/${proposalId}/status`, {
          status: 'ACCEPTED'
        });
        if (response.data.success) {
          toast({
            title: "Success",
            description: "Proposal accepted successfully!",
          });
          // Refresh proposals
          const proposalsResponse = await axios.get(`/proposals/job/${id}`);
          if (proposalsResponse.data.success) {
            setProposals(proposalsResponse.data.data);
          }
        }
      } else if (action === "reject") {
        const response = await axios.put(`/proposals/${proposalId}/status`, {
          status: 'REJECTED'
        });
        if (response.data.success) {
          toast({
            title: "Success",
            description: "Proposal rejected successfully!",
          });
          // Refresh proposals
          const proposalsResponse = await axios.get(`/proposals/job/${id}`);
          if (proposalsResponse.data.success) {
            setProposals(proposalsResponse.data.data);
          }
        }
      } else if (action === "shortlist") {
        const response = await axios.put(`/proposals/${proposalId}`, {
          isShortlisted: true
        });
        if (response.data.success) {
          toast({
            title: "Success",
            description: "Proposal added to shortlist!",
          });
          // Refresh proposals
          const proposalsResponse = await axios.get(`/proposals/job/${id}`);
          if (proposalsResponse.data.success) {
            setProposals(proposalsResponse.data.data);
          }
        }
      }
    } catch (err: unknown) {
      console.error(`Error ${action}ing proposal:`, err);
      const errorMessage = err instanceof Error ? err.message : `Failed to ${action} proposal`;
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

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

  // Add a handler for messaging a freelancer
  const handleMessageFreelancer = async (freelancerEmail: string, jobId: string, projectName: string) => {
    try {
      // Pass jobId for job-specific chat
      const conversationId = await createConversation(freelancerEmail, projectName, jobId);
      if (conversationId) {
        navigate(`/messages/${conversationId}`);
      } else {
        toast({
          title: "Error",
          description: "Could not start conversation.",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not start conversation.",
        variant: "destructive"
      });
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

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/client-dashboard" className="hover:text-teal-600">Dashboard</Link>
            <span>›</span>
            <Link to="/client-dashboard" className="hover:text-teal-600">My Jobs</Link>
            <span>›</span>
            <span className="text-gray-900">Job Details</span>
          </div>
        </nav>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                <Badge variant={job.status === "OPEN" ? "default" : "secondary"}>
                  {job.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Posted {formatDate(job.createdAt)}
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
              <Link to={`/edit-job/${job.id}`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Job
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Public Page
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Job
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Job Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{job._count.proposals}</p>
              <p className="text-sm text-gray-600">Proposals</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-600">Interviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-600">Hires</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-600">Views</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-600">Saves</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-600">Invites Sent</p>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="proposals">
              Proposals ({job._count.proposals})
            </TabsTrigger>
            <TabsTrigger value="details">
              Job Details
            </TabsTrigger>
            <TabsTrigger value="analytics">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="space-y-6">
            {/* Proposal Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search proposals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="withdrawn">Withdrawn</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[150px]">
                      <SortAsc className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date Submitted</SelectItem>
                      <SelectItem value="price">Price (Low to High)</SelectItem>
                      <SelectItem value="rating">Rating (High to Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Proposals List */}
            <div className="space-y-4">
              {sortedProposals.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">No proposals found matching your criteria.</p>
                  </CardContent>
                </Card>
              ) : (
                sortedProposals.map((proposal) => (
                  <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={proposal.freelancer.avatar} />
                            <AvatarFallback>
                              {proposal.freelancer.firstName[0]}{proposal.freelancer.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {proposal.freelancer.firstName} {proposal.freelancer.lastName}
                          </h3>
                          {proposal.freelancer.topRatedPlus && (
                            <Badge variant="secondary" className="text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Top Rated Plus
                            </Badge>
                          )}
                          {proposal.freelancer.verified && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                          <Link to={`/freelancer/${proposal.freelancer.id}`}>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              <Eye className="h-3 w-3 mr-1" />
                              Profile
                            </Button>
                          </Link>
                        </div>
                            <p className="text-gray-600 mb-2">{proposal.freelancer.title || 'Freelancer'}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                {proposal.freelancer.successRate || 0}% success rate
                              </div>
                              <span>{proposal.freelancer.location || 'Location not specified'}</span>
                              <span className="text-green-600">{proposal.freelancer.lastActive || 'Recently active'}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>${proposal.freelancer.hourlyRate || 0}/hr</span>
                              <span>{proposal.freelancer.totalEarnings || '$0'} earned</span>
                              <span>{proposal.freelancer.completedJobs || 0} jobs completed</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(proposal.status)}`}>
                            {proposal.status === "PENDING" && <Clock className="h-3 w-3 mr-1" />}
                            {proposal.status === "ACCEPTED" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {proposal.status === "REJECTED" && <XCircle className="h-3 w-3 mr-1" />}
                            {proposal.status === "WITHDRAWN" && <XCircle className="h-3 w-3 mr-1" />}
                            <span className="capitalize">{proposal.status.toLowerCase()}</span>
                          </div>
                          <div className="text-right text-sm">
                            <p className="font-semibold text-gray-900">${proposal.bidAmount.toLocaleString()}</p>
                            <p className="text-gray-600">{proposal.estimatedDuration}</p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="mb-4">
                        <p className="text-gray-700 line-clamp-3 break-words whitespace-pre-wrap overflow-wrap-anywhere overflow-hidden">
                          {proposal.coverLetter}
                        </p>
                      </div>

                      {/* Skills */}
                      {proposal.freelancer.skills && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {Array.isArray(proposal.freelancer.skills) ? 
                            proposal.freelancer.skills.map((skill: string | { name: string; category?: string; level?: string; yearsOfExperience?: number }, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {typeof skill === 'string' ? skill : skill.name || 'Unknown Skill'}
                              </Badge>
                            )) : 
                            <Badge variant="secondary" className="text-xs">
                              Skills not specified
                            </Badge>
                          }
                        </div>
                      )}

                      <Separator className="my-4" />

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Submitted {formatDate(proposal.createdAt)}
                          {!proposal.clientViewed && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              New
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/freelancer/${proposal.freelancer.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Profile
                            </Button>
                          </Link>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
                              <DialogHeader>
                                <DialogTitle className="break-words overflow-wrap-anywhere">
                                  Proposal from {proposal.freelancer.firstName} {proposal.freelancer.lastName}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6 overflow-hidden">
                                {/* Freelancer Details */}
                                <div className="border rounded-lg p-4">
                                  <h3 className="font-semibold mb-3">Freelancer Profile</h3>
                                  <div className="flex items-start space-x-4 mb-4">
                                    <Avatar className="h-20 w-20">
                                      <AvatarImage src={proposal.freelancer.avatar} />
                                      <AvatarFallback>
                                        {proposal.freelancer.firstName[0]}{proposal.freelancer.lastName[0]}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <h4 className="text-lg font-semibold">{proposal.freelancer.firstName} {proposal.freelancer.lastName}</h4>
                                      <p className="text-gray-600 mb-2">{proposal.freelancer.title || 'Freelancer'}</p>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <span className="text-gray-600">Success Rate: </span>
                                          <span className="font-medium">{proposal.freelancer.successRate || 0}%</span>
                                        </div>
                                        <div>
                                          <span className="text-gray-600">Completed Jobs: </span>
                                          <span className="font-medium">{proposal.freelancer.completedJobs || 0}</span>
                                        </div>
                                        <div>
                                          <span className="text-gray-600">On Time: </span>
                                          <span className="font-medium">{proposal.freelancer.onTime || 0}%</span>
                                        </div>
                                        <div>
                                          <span className="text-gray-600">Response Time: </span>
                                          <span className="font-medium">{proposal.freelancer.responseTime || 'Not specified'}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Proposal Details */}
                                <div className="border rounded-lg p-4">
                                  <h3 className="font-semibold mb-3">Proposal Details</h3>
                                  <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div>
                                      <span className="text-gray-600">Bid Amount: </span>
                                      <span className="font-semibold text-lg">${proposal.bidAmount.toLocaleString()}</span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">Duration: </span>
                                      <span className="font-medium">{proposal.estimatedDuration}</span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">Status: </span>
                                      <Badge className={getStatusColor(proposal.status)}>{proposal.status.toLowerCase()}</Badge>
                                    </div>
                                  </div>
                                  
                                  {/* Milestones */}
                                  {proposal.milestones && Array.isArray(proposal.milestones) && proposal.milestones.length > 0 && (
                                    <div className="mb-4">
                                      <h4 className="font-medium mb-2">Project Milestones</h4>
                                      <div className="space-y-2">
                                        {proposal.milestones.map((milestone: { title: string; duration: string; amount: number }, index: number) => (
                                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <div>
                                              <span className="font-medium">{milestone.title}</span>
                                              <span className="text-sm text-gray-600 ml-2">({milestone.duration})</span>
                                            </div>
                                            <span className="font-medium">${milestone.amount}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  <div>
                                    <h4 className="font-medium mb-2">Cover Letter</h4>
                                    <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
                                      <p className="whitespace-pre-wrap break-words overflow-wrap-anywhere text-gray-700">
                                        {proposal.coverLetter}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Question Responses */}
                                {proposal.questionResponses && Array.isArray(proposal.questionResponses) && proposal.questionResponses.length > 0 && (
                                  <div className="border rounded-lg p-4 overflow-hidden">
                                    <h3 className="font-semibold mb-3">Screening Questions</h3>
                                    <div className="space-y-4">
                                      {proposal.questionResponses.map((qa: { question: string; answer: string }, index: number) => (
                                        <div key={index}>
                                          <h4 className="font-medium text-gray-900 mb-2 break-words overflow-wrap-anywhere">Q: {qa.question}</h4>
                                          <p className="text-gray-700 bg-gray-50 p-3 rounded break-words whitespace-pre-wrap overflow-wrap-anywhere overflow-hidden">
                                            {qa.answer}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-2 pt-4 border-t">
                                  <Link to={`/freelancer/${proposal.freelancer.id}`}>
                                    <Button variant="outline">
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Profile
                                    </Button>
                                  </Link>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleMessageFreelancer(proposal.freelancer.email || '', job.id || '', job.title || '')}
                                  >
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Message
                                  </Button>
                                  <Button variant="outline">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Schedule Interview
                                  </Button>
                                  <Button 
                                    variant="destructive"
                                    onClick={() => handleProposalAction(proposal.id, "reject")}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Decline
                                  </Button>
                                  <Button 
                                    onClick={() => handleProposalAction(proposal.id, "accept")}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Accept Proposal
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleProposalAction(proposal.id, "message")}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>

                          {proposal.status === "PENDING" && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleProposalAction(proposal.id, "interview")}
                              >
                                <Calendar className="h-4 w-4 mr-1" />
                                Interview
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleProposalAction(proposal.id, "accept")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                            </>
                          )}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleProposalAction(proposal.id, "shortlist")}>
                                <Star className="h-4 w-4 mr-2" />
                                Add to Shortlist
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleProposalAction(proposal.id, "archive")}>
                                <FileText className="h-4 w-4 mr-2" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" onClick={() => handleProposalAction(proposal.id, "reject")}>
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Job Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Job Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none overflow-hidden">
                      {job.description.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700 leading-relaxed break-words whitespace-pre-wrap overflow-wrap-anywhere">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Required Skills & Experience</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-gray-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Budget</p>
                      <p className="font-semibold text-gray-900">{formatBudget(job)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-900">{job.duration || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Experience Level</p>
                      <p className="font-semibold text-gray-900">{job.experienceLevel || 'Any level'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Project Type</p>
                      <p className="font-semibold text-gray-900">{job.projectType || 'Project'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-gray-900">{job.location || 'Remote'}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skills Required</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Proposals</span>
                      <span className="font-medium">{job._count.proposals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interviews</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Views</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saves</span>
                      <span className="font-medium">0</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Job Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Views</span>
                        <span className="text-sm font-medium">0</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Proposals</span>
                        <span className="text-sm font-medium">{job._count.proposals}</span>
                      </div>
                      <Progress value={job._count.proposals > 0 ? 60 : 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Saves</span>
                        <span className="text-sm font-medium">0</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Proposal Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Bid</span>
                      <span className="font-medium">
                        ${proposals.length > 0 ? 
                          (proposals.reduce((sum, p) => sum + p.bidAmount, 0) / proposals.length).toFixed(0) : 
                          '0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bid Range</span>
                      <span className="font-medium">
                        {proposals.length > 0 ? 
                          `$${Math.min(...proposals.map(p => p.bidAmount))} - $${Math.max(...proposals.map(p => p.bidAmount))}` : 
                          'No proposals'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Rating</span>
                      <span className="font-medium">
                        {proposals.length > 0 ? 
                          (proposals.reduce((sum, p) => sum + (p.freelancer.successRate || 0), 0) / proposals.length).toFixed(1) + '%' : 
                          '0%'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response Rate</span>
                      <span className="font-medium">100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Freelancer Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Top Rated Plus</span>
                      <span className="font-medium">
                        {proposals.length > 0 ? 
                          Math.round((proposals.filter(p => p.freelancer.topRatedPlus).length / proposals.length) * 100) + '%' : 
                          '0%'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Success Rate</span>
                      <span className="font-medium">
                        {proposals.length > 0 ? 
                          (proposals.reduce((sum, p) => sum + (p.freelancer.successRate || 0), 0) / proposals.length).toFixed(0) + '%' : 
                          '0%'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quick Responders</span>
                      <span className="font-medium">
                        {proposals.length > 0 ? 
                          Math.round((proposals.filter(p => p.freelancer.responseTime && p.freelancer.responseTime.includes('hour')).length / proposals.length) * 100) + '%' : 
                          '0%'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Verified</span>
                      <span className="font-medium">
                        {proposals.length > 0 ? 
                          Math.round((proposals.filter(p => p.freelancer.verified).length / proposals.length) * 100) + '%' : 
                          '0%'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Analytics Charts would go here */}
            <Card>
              <CardHeader>
                <CardTitle>Proposal Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Detailed analytics charts would be implemented here</p>
                  <p className="text-sm">Showing proposal submission patterns, view trends, etc.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Job Status</h3>
                  <Select defaultValue={job.status.toLowerCase()}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Visibility</h3>
                  <Select defaultValue={job.visibility.toLowerCase()}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="invite-only">Invite Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Application Deadline</h3>
                  <input
                    type="date"
                    defaultValue={job.applicationDeadline ? new Date(job.applicationDeadline).toISOString().split('T')[0] : ''}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex gap-4">
                    <Button>Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Delete Job</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Once you delete a job, there is no going back. This will permanently delete all proposals and associated data.
                    </p>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Job
                    </Button>
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

export default ClientJobView;
       