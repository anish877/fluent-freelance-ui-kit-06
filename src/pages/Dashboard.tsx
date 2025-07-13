import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, Plus, TrendingUp, DollarSign, Clock, Users, Eye, MessageCircle, Calendar, CheckCircle, AlertCircle, BarChart3, FileText, Star, Award, Target, Briefcase, Activity, Loader2, User, CalendarDays, Download } from "lucide-react";
import axios from "axios";

import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { Progress } from "../components/ui/progress";
import { useAuth } from "../hooks/AuthContext";
import ProposalDetailsModal from "../components/modals/ProposalDetailsModal";

// Types for backend data
interface Proposal {
  id: string;
  coverLetter: string;
  bidAmount: number;
  estimatedDuration: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
  createdAt: string;
  attachments?: string[];
  job: {
    id: string;
    title: string;
    _count: {
      proposals: number;
    };
    client: {
      id: string;
      firstName: string;
      lastName: string;
      companyName?: string;
    };
  };
}

// Interface for the modal proposal format
interface ModalProposal {
  id: number;
  jobTitle: string;
  client: {
    name: string;
    rating: number;
    jobsPosted: number;
  };
  submittedDate: string;
  status: "pending" | "accepted" | "rejected" | "interview" | "withdrawn";
  bidAmount: string;
  coverLetter: string;
  timeline: string;
  jobBudget: string;
  jobType: "fixed" | "hourly";
  skills: string[];
  responses: number;
  lastActivity: string;
  attachments?: string[];
  interviewScheduled?: {
    date: string;
    time: string;
  };
}

// Add Offer type
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

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Proposals state
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [proposalsLoading, setProposalsLoading] = useState(false);
  const [proposalsError, setProposalsError] = useState<string | null>(null);

  // Modal state
  const [selectedProposal, setSelectedProposal] = useState<ModalProposal | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  // Offers state
  const [offers, setOffers] = useState<Offer[]>([]);
  const [offersLoading, setOffersLoading] = useState(false);
  const [offersError, setOffersError] = useState<string | null>(null);

  const stats = [
    {
      title: "Total Earnings",
      value: "$24,890",
      change: "+18%",
      changeText: "vs last month",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      trend: "up"
    },
    {
      title: "Active Projects",
      value: "12",
      change: "+3",
      changeText: "new this week",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      trend: "up"
    },
    {
      title: "Completed Jobs",
      value: "47",
      change: "+8",
      changeText: "this month",
      icon: CheckCircle,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
      trend: "up"
    },
    {
      title: "Client Rating",
      value: "4.95",
      change: "+0.02",
      changeText: "improvement",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      trend: "up"
    }
  ];

  const weeklyEarnings = [
    { week: "Week 1", amount: 2400 },
    { week: "Week 2", amount: 3200 },
    { week: "Week 3", amount: 1800 },
    { week: "Week 4", amount: 4100 }
  ];

  const recentJobs = [
    {
      id: 1,
      title: "E-commerce Website Development",
      client: "TechCorp Solutions",
      status: "In Progress",
      deadline: "Dec 30, 2024",
      budget: "$4,500",
      progress: 75,
      lastActivity: "2 hours ago",
      priority: "high",
      timeTracked: "42 hours",
      clientRating: 4.9
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      client: "StartupHub Inc",
      status: "Review",
      deadline: "Dec 25, 2024",
      budget: "$3,200",
      progress: 95,
      lastActivity: "5 hours ago",
      priority: "medium",
      timeTracked: "28 hours",
      clientRating: 4.8
    },
    {
      id: 3,
      title: "Content Management System",
      client: "Digital Agency Pro",
      status: "In Progress",
      deadline: "Jan 15, 2025",
      budget: "$5,800",
      progress: 35,
      lastActivity: "1 day ago",
      priority: "low",
      timeTracked: "18 hours",
      clientRating: 4.7
    }
  ];

  const recentProposals = [
    {
      id: 1,
      title: "React Dashboard Development",
      client: "FinTech Solutions",
      status: "pending",
      bidAmount: "$3,500",
      submittedDate: "Dec 19, 2024",
      connects: 6,
      competition: "8 proposals"
    },
    {
      id: 2,
      title: "WordPress Theme Customization",
      client: "Creative Agency",
      status: "interview",
      bidAmount: "$1,800",
      submittedDate: "Dec 18, 2024",
      connects: 4,
      competition: "3 proposals"
    },
    {
      id: 3,
      title: "Logo Design Package",
      client: "Startup Inc",
      status: "accepted",
      bidAmount: "$1,200",
      submittedDate: "Dec 17, 2024",
      connects: 2,
      competition: "15 proposals"
    }
  ];

  const messages = [
    {
      id: 1,
      from: "Sarah Johnson",
      fromCompany: "TechCorp Solutions",
      subject: "Project Milestone Review",
      preview: "Hi, the latest milestone looks great! Could you provide a detailed walkthrough of the new features?",
      time: "2 hours ago",
      unread: true,
      priority: "high"
    },
    {
      id: 2,
      from: "Mike Chen",
      fromCompany: "StartupHub Inc",
      subject: "New Project Opportunity",
      preview: "I have an exciting React Native project that would be perfect for your skills...",
      time: "1 day ago",
      unread: true,
      priority: "medium"
    },
    {
      id: 3,
      from: "Anna Williams",
      fromCompany: "Digital Agency Pro",
      subject: "Payment Confirmation",
      preview: "Payment for the logo design project has been processed. Thank you for the excellent work!",
      time: "2 days ago",
      unread: false,
      priority: "low"
    }
  ];

  const upcomingMilestones = [
    {
      id: 1,
      title: "E-commerce Frontend Delivery",
      dueDate: "Dec 22, 2024",
      project: "TechCorp E-commerce",
      amount: "$1,500",
      status: "on-track"
    },
    {
      id: 2,
      title: "UI Design Final Review",
      dueDate: "Dec 24, 2024",
      project: "Mobile App Design",
      amount: "$800",
      status: "at-risk"
    },
    {
      id: 3,
      title: "CMS Backend Integration",
      dueDate: "Dec 28, 2024",
      project: "Content Management",
      amount: "$2,200",
      status: "on-track"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Review": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "interview": return "bg-blue-100 text-blue-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "on-track": return "bg-green-100 text-green-800";
      case "at-risk": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleNewProposal = () => {
    navigate('/jobs');
  };

  const handleViewJob = (id: number) => {
    navigate(`/jobs/${id}`);
  };

  const handleViewProposal = (proposal: Proposal) => {
    // Convert backend proposal to modal format with complete details
    const modalProposal: ModalProposal = {
      id: Number(proposal.id),
      jobTitle: proposal.job.title,
      client: {
        name: proposal.job.client.companyName || 
              `${proposal.job.client.firstName} ${proposal.job.client.lastName}`,
        rating: 4.5 + Math.random() * 0.5, // Mock rating
        jobsPosted: Math.floor(Math.random() * 20) + 5 // Mock jobs posted
      },
      submittedDate: proposal.createdAt,
      status: proposal.status.toLowerCase() as "pending" | "accepted" | "rejected" | "interview" | "withdrawn",
      bidAmount: `$${proposal.bidAmount.toLocaleString()}`,
      coverLetter: proposal.coverLetter,
      timeline: proposal.estimatedDuration,
      jobBudget: `$${(proposal.bidAmount * 0.8).toLocaleString()} - $${(proposal.bidAmount * 1.2).toLocaleString()}`,
      jobType: "fixed",
      skills: ["React", "Node.js", "TypeScript", "MongoDB", "PostgreSQL", "AWS"], // Enhanced skills list
      responses: proposal.job._count.proposals,
      lastActivity: "2 hours ago",
      attachments: proposal.attachments,
      interviewScheduled: proposal.status === 'ACCEPTED' ? {
        date: "2024-12-25",
        time: "2:00 PM EST"
      } : proposal.status === 'PENDING' ? {
        date: "2024-12-28",
        time: "3:00 PM EST"
      } : undefined
    };
    
    console.log('Creating modal proposal:', {
      proposalId: proposal.id,
      jobId: proposal.job.id,
      modalProposalId: modalProposal.id
    });
    
    setSelectedProposal(modalProposal);
    setSelectedJobId(proposal.job.id);
    setShowModal(true);
  };

  const handleViewJobPosting = (jobId: string) => {
    console.log('Navigating to job:', jobId);
    if (jobId && jobId.trim() !== '') {
      const url = `/jobs/${jobId}`;
      console.log('Navigation URL:', url);
      try {
        navigate(url);
      } catch (error) {
        console.error('React Router navigation failed, using window.location:', error);
        window.location.href = url;
      }
      setShowModal(false);
      setSelectedProposal(null);
    } else {
      console.error('Invalid jobId:', jobId);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProposal(null);
    setSelectedJobId('');
  };

  const handleMessageClick = (messageId: number) => {
    console.log(`Opening message ${messageId}`);
  };

  // Fetch proposals from backend
  const fetchProposals = async () => {
    if (user?.userType !== 'FREELANCER') return;
    
    try {
      setProposalsLoading(true);
      setProposalsError(null);
      
      const response = await axios.get('/proposals/freelancer/me?limit=5');
      
      if (response.data.success) {
        setProposals(response.data.data);
      } else {
        setProposalsError('Failed to fetch proposals');
      }
    } catch (error) {
      console.error('Error fetching proposals:', error);
      setProposalsError('Failed to fetch proposals');
    } finally {
      setProposalsLoading(false);
    }
  };

  // Fetch accepted offers for freelancer
  const fetchAcceptedOffers = async () => {
    if (user?.userType !== 'FREELANCER') return;
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
      setOffersError('Failed to fetch offers');
    } finally {
      setOffersLoading(false);
    }
  };

  // Load proposals on component mount
  useEffect(() => {
    fetchProposals();
    fetchAcceptedOffers();
  }, [user]);

  // Format proposal data for display
  const formatProposalData = (proposal: Proposal) => {
    const clientName = proposal.job.client.companyName || 
                      `${proposal.job.client.firstName} ${proposal.job.client.lastName}`;
    
    const status = proposal.status.toLowerCase();
    const bidAmount = `$${proposal.bidAmount.toLocaleString()}`;
    const submittedDate = new Date(proposal.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    // Use real proposal count from the job
    const totalProposals = proposal.job._count.proposals;
    const competition = `${totalProposals} proposal${totalProposals !== 1 ? 's' : ''}`;
    
    // Mock data for connects (not available in current schema)
    const connects = Math.floor(Math.random() * 8) + 2;
    
    return {
      id: proposal.id,
      title: proposal.job.title,
      client: clientName,
      status,
      bidAmount,
      submittedDate,
      connects,
      competition
    };
  };

  // Helper for progress
  const calculateProgress = (offer: Offer): number => {
    if (!offer.milestones || offer.milestones.length === 0) return 0;
    const completed = offer.milestones.filter(m => m.status === 'completed').length;
    return Math.round((completed / offer.milestones.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex!</h1>
              <p className="text-gray-600">Here's your freelance business overview for today.</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => navigate('/jobs')} variant="outline" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Find Jobs
              </Button>
              <Button onClick={handleNewProposal} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Proposal
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-teal-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
                      <span className="text-xs text-gray-500 ml-1">{stat.changeText}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Card className="shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "projects", label: "Active Projects", icon: Briefcase },
                { id: "proposals", label: "Proposals", icon: FileText },
                { id: "messages", label: "Messages", icon: MessageCircle },
                { id: "milestones", label: "Milestones", icon: Target }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-teal-500 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <CardContent className="p-6">
            {/* Overview Tab */}
            <div className={activeTab === "overview" ? "block" : "hidden"}>
              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentJobs.slice(0, 3).map((job) => (
                      <Card key={job.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">{job.title}</h4>
                              <p className="text-sm text-gray-600">Client: {job.client}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={`${getPriorityColor(job.priority)} text-xs`}>
                                {job.priority.toUpperCase()}
                              </Badge>
                              <Badge className={getStatusColor(job.status)}>
                                {job.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                            <div>Budget: <span className="font-semibold text-gray-900">{job.budget}</span></div>
                            <div>Due: <span className="font-semibold text-gray-900">{job.deadline}</span></div>
                            <div>Tracked: <span className="font-semibold text-gray-900">{job.timeTracked}</span></div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex-1 mr-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{job.progress}%</span>
                              </div>
                              <Progress value={job.progress} className="h-2" />
                            </div>
                            <Button variant="outline" size="sm" onClick={() => handleViewJob(job.id)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Quick Stats & Actions */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">This Month</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Proposals Sent</span>
                        <span className="font-semibold">23</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Interview Rate</span>
                        <span className="font-semibold text-green-600">34%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Win Rate</span>
                        <span className="font-semibold text-blue-600">78%</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-medium">Total Earned</span>
                        <span className="font-bold text-teal-600">$8,440</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start" onClick={() => navigate('/jobs')}>
                        <Search className="h-4 w-4 mr-2" />
                        Browse New Jobs
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Clock className="h-4 w-4 mr-2" />
                        Track Time
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Create Invoice
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Projects Tab */}
            <div className={activeTab === "projects" ? "block" : "hidden"}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Active Projects ({offers.length})</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Activity className="h-4 w-4 mr-2" />
                    Time Tracker
                  </Button>
                  <Button onClick={() => navigate('/jobs')}>
                    Browse More Jobs
                  </Button>
                </div>
              </div>
              
              {offersLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-12 w-12 animate-spin text-teal-600 mx-auto mb-4" />
                  <p className="text-gray-600">Loading active projects...</p>
                </div>
              ) : offersError ? (
                <div className="text-center py-16">
                  <AlertCircle className="h-16 w-16 text-red-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading active projects</h3>
                  <p className="text-gray-500 mb-6">{offersError}</p>
                  <Button onClick={fetchAcceptedOffers} variant="outline">
                    Try Again
                  </Button>
                </div>
              ) : offers.length === 0 ? (
                <div className="text-center py-16">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active projects yet</h3>
                  <p className="text-gray-500 mb-6">
                    Accepted offers will appear here as active projects.
                  </p>
                  <Button onClick={() => navigate('/jobs')}>
                    Browse Jobs
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {offers.map((offer) => {
                    const progress = calculateProgress(offer);
                    const hasMilestones = offer.milestones && offer.milestones.length > 0;
                    return (
                      <Card key={offer.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-gray-900 text-lg">{offer.job.title}</h4>
                                <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Active</Badge>
                              </div>
                              <p className="text-gray-600 mb-2">Client: {offer.client.companyName || `${offer.client.firstName} ${offer.client.lastName}`}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>Started: {new Date(offer.createdAt).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>Budget: <span className="font-semibold text-gray-900">${offer.amount.toLocaleString()} {offer.budgetType === 'HOURLY' && '/hr'}</span></span>
                                <span>•</span>
                                <span>Duration: {offer.duration}</span>
                              </div>
                            </div>
                            {hasMilestones && (
                              <div className="flex flex-col items-end gap-2">
                                <Badge className="bg-blue-100 text-blue-800 text-xs">Milestones</Badge>
                                <div className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                                  {progress}% Complete
                                </div>
                              </div>
                            )}
                          </div>
                          {hasMilestones && (
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Project Progress</span>
                                <span className="font-semibold">{progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-teal-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                              </div>
                            </div>
                          )}
                          {hasMilestones && (
                            <div className="mb-2">
                              <div className="flex flex-wrap gap-2">
                                {offer.milestones.map((m, idx) => (
                                  <Badge key={idx} className={
                                    m.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    m.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                  }>
                                    {m.title}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Last updated: {new Date(offer.updatedAt).toLocaleDateString()}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => navigate(`/messages/${offer.conversationId}`)}>
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => navigate(`/jobs/${offer.jobId}`)}>
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Proposals Tab */}
            <div className={activeTab === "proposals" ? "block" : "hidden"}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Your Proposals ({proposals.length})</h3>
              </div>
              
              {proposalsLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-teal-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading proposals...</p>
                  </div>
                </div>
              ) : proposalsError ? (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <AlertCircle className="h-16 w-16 text-red-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading proposals</h3>
                    <p className="text-gray-500 mb-6">{proposalsError}</p>
                    <Button onClick={fetchProposals} variant="outline">
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : proposals.length === 0 ? (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals yet</h3>
                    <p className="text-gray-500 mb-6">
                      Start submitting proposals to jobs to see them here.
                    </p>
                    <Button onClick={() => navigate('/jobs')}>
                      Browse Jobs
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {proposals.map((proposal) => {
                    const formattedProposal = formatProposalData(proposal);
                    return (
                      <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-lg mb-2">{formattedProposal.title}</h4>
                              <p className="text-gray-600 mb-2">Client: {formattedProposal.client}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>Bid: <span className="font-semibold text-green-600">{formattedProposal.bidAmount}</span></span>
                                <span>•</span>
                                <span>Submitted: {formattedProposal.submittedDate}</span>
                                <span>•</span>
                                <span>Connects Used: {formattedProposal.connects}</span>
                              </div>
                            </div>
                            <Badge className={getStatusColor(formattedProposal.status)}>
                              {formattedProposal.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                              {formattedProposal.status === "interview" && <Calendar className="h-3 w-3 mr-1" />}
                              {formattedProposal.status === "accepted" && <CheckCircle className="h-3 w-3 mr-1" />}
                              <span className="capitalize">{formattedProposal.status}</span>
                            </Badge>
                          </div>
                          
                          {/* Attachments */}
                          {proposal.attachments && proposal.attachments.length > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Attachments ({proposal.attachments.length})</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {proposal.attachments.map((attachment, index) => (
                                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="w-6 h-6 bg-teal-100 rounded flex items-center justify-center">
                                      <span className="text-xs font-medium text-teal-600">
                                        {attachment.split('.').pop()?.toUpperCase() || 'FILE'}
                                      </span>
                                    </div>
                                    <span className="text-xs text-gray-700 truncate max-w-24">
                                      {attachment.split('/').pop() || 'attachment'}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() => window.open(attachment, '_blank')}
                                    >
                                      <Download className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                              Competition: {formattedProposal.competition}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Follow Up
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleViewProposal(proposal)}>
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Messages Tab */}
            <div className={activeTab === "messages" ? "block" : "hidden"}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
                <Button variant="outline">
                  View All Messages
                </Button>
              </div>
              
              <div className="space-y-3">
                {messages.map((message) => (
                  <Card key={message.id} className={`hover:shadow-md transition-shadow cursor-pointer ${message.unread ? 'bg-blue-50 border-blue-200' : ''}`} onClick={() => handleMessageClick(message.id)}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-medium ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                              {message.from}
                            </h4>
                            <span className="text-sm text-gray-500">from {message.fromCompany}</span>
                            {message.unread && (
                              <Badge variant="default" className="text-xs">New</Badge>
                            )}
                            <Badge className={getPriorityColor(message.priority)} variant="outline">
                              {message.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <h5 className={`text-sm mb-2 ${message.unread ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                            {message.subject}
                          </h5>
                          <p className="text-gray-600 text-sm line-clamp-2">{message.preview}</p>
                        </div>
                        <div className="ml-4 text-right">
                          <span className="text-xs text-gray-500">{message.time}</span>
                          <div className="mt-2">
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Milestones Tab */}
            <div className={activeTab === "milestones" ? "block" : "hidden"}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Milestones</h3>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
              </div>
              
              <div className="space-y-4">
                {upcomingMilestones.map((milestone) => (
                  <Card key={milestone.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                            <Badge className={getStatusColor(milestone.status)}>
                              {milestone.status === "on-track" ? "On Track" : "At Risk"}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">Project: {milestone.project}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Due: {milestone.dueDate}</span>
                            <span>•</span>
                            <span>Payment: {milestone.amount}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Proposal Details Modal */}
      {selectedProposal && (
        <ProposalDetailsModal
          proposal={selectedProposal}
          isOpen={showModal}
          onClose={handleCloseModal}
          onViewJobPosting={handleViewJobPosting}
          jobId={selectedJobId}
        />
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;
