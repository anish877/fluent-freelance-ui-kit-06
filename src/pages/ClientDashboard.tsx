import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, Eye, Edit, Trash2, Clock, Users, DollarSign, 
  TrendingUp, Star, MessageCircle, CheckCircle, AlertCircle,
  Filter, Search, Calendar, BarChart3, PieChart, Loader2
} from "lucide-react";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
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
  requirements: string[];
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
  clientId: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    proposals: number;
  };
}

const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState<string | null>(null);

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

  // Load jobs on component mount
  useEffect(() => {
    if (user?.userType === 'CLIENT') {
      fetchJobs();
    }
  }, [user]);

  // Format budget display
  const formatBudget = (job: Job) => {
    if (job.budget === 'FIXED') {
      if (job.minBudget && job.maxBudget) {
        return `$${job.minBudget.toLocaleString()} - $${job.maxBudget.toLocaleString()}`;
      } else if (job.minBudget) {
        return `$${job.minBudget.toLocaleString()}`;
      }
    } else if (job.budget === 'HOURLY' && job.hourlyRate) {
      return `$${job.hourlyRate}/hour`;
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

  const topProposals = [
    {
      id: 1,
      jobTitle: "Full-Stack React Developer",
      freelancer: {
        name: "Alex Thompson",
        avatar: "/placeholder.svg",
        rating: 4.9,
        completedJobs: 47,
        skills: ["React", "Node.js", "TypeScript"]
      },
      proposal: {
        budget: "$4,200",
        timeline: "8 weeks",
        coverLetter: "I have extensive experience building e-commerce platforms with React and Node.js. I've completed 15+ similar projects...",
        attachments: 2
      },
      submittedDate: "2024-01-16",
      status: "pending"
    },
    {
      id: 2,
      jobTitle: "Mobile App UI/UX Designer", 
      freelancer: {
        name: "Maria Garcia",
        avatar: "/placeholder.svg",
        rating: 4.8,
        completedJobs: 32,
        skills: ["Figma", "React Native", "User Research"]
      },
      proposal: {
        budget: "$3,500",
        timeline: "6 weeks",
        coverLetter: "Your mobile app project aligns perfectly with my expertise in creating user-centered designs...",
        attachments: 5
      },
      submittedDate: "2024-01-14",
      status: "shortlisted"
    }
  ];

  const activeContracts = [
    {
      id: 1,
      title: "Mobile App UI/UX Designer",
      freelancer: "Sarah Chen",
      startDate: "2024-01-20",
      budget: "$3,500",
      progress: 65,
      milestones: [
        { name: "Wireframes", status: "completed", dueDate: "2024-01-25" },
        { name: "Design System", status: "in_progress", dueDate: "2024-02-05" },
        { name: "Final Mockups", status: "pending", dueDate: "2024-02-15" }
      ],
      lastUpdate: "2024-01-22"
    },
    {
      id: 2,
      title: "Content Writer for Tech Blog",
      freelancer: "James Wilson",
      startDate: "2024-01-15",
      budget: "$1,200",
      progress: 40,
      milestones: [
        { name: "Article Outlines", status: "completed", dueDate: "2024-01-18" },
        { name: "First Draft (5 articles)", status: "in_progress", dueDate: "2024-01-28" },
        { name: "Final Articles", status: "pending", dueDate: "2024-02-10" }
      ],
      lastUpdate: "2024-01-21"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your jobs, proposals, and freelancer relationships</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700">
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
                            <Link to={`/client-jobs/${job.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
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
                <div className="space-y-6">
                  {topProposals.map((proposal) => (
                    <div key={proposal.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{proposal.jobTitle}</h3>
                          <p className="text-sm text-gray-600">
                            Submitted on {new Date(proposal.submittedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getStatusColor(proposal.status)}>
                          {getStatusText(proposal.status)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Freelancer Info */}
                        <div className="lg:col-span-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <img 
                              src={proposal.freelancer.avatar} 
                              alt={proposal.freelancer.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-900">{proposal.freelancer.name}</h4>
                              <div className="flex items-center text-sm text-gray-600">
                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                {proposal.freelancer.rating} ({proposal.freelancer.completedJobs} jobs)
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {proposal.freelancer.skills.slice(0, 3).map((skill, index) => (
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
                              <p className="font-semibold text-gray-900">{proposal.proposal.budget}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Timeline</p>
                              <p className="font-semibold text-gray-900">{proposal.proposal.timeline}</p>
                            </div>
                          </div>
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">Cover Letter</p>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {proposal.proposal.coverLetter}
                            </p>
                          </div>
                          {proposal.proposal.attachments > 0 && (
                            <p className="text-sm text-blue-600">
                              {proposal.proposal.attachments} attachments included
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Hire
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Contracts Tab */}
          <TabsContent value="contracts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Contracts</CardTitle>
                <CardDescription>Monitor ongoing projects and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activeContracts.map((contract) => (
                    <div key={contract.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{contract.title}</h3>
                          <p className="text-gray-600">with {contract.freelancer}</p>
                          <p className="text-sm text-gray-500">
                            Started: {new Date(contract.startDate).toLocaleDateString()} • 
                            Budget: {contract.budget}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-teal-600">{contract.progress}%</p>
                          <p className="text-sm text-gray-600">Complete</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${contract.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Milestones */}
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium text-gray-900">Milestones</h4>
                        {contract.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              {milestone.status === "completed" && (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              )}
                              {milestone.status === "in_progress" && (
                                <Clock className="h-4 w-4 text-blue-600" />
                              )}
                              {milestone.status === "pending" && (
                                <AlertCircle className="h-4 w-4 text-gray-400" />
                              )}
                              <span className="text-sm font-medium">{milestone.name}</span>
                            </div>
                            <span className="text-xs text-gray-600">
                              Due: {new Date(milestone.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          Last update: {new Date(contract.lastUpdate).toLocaleDateString()}
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
