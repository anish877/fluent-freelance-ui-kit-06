
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, Plus, TrendingUp, DollarSign, Clock, Users, Eye, MessageCircle, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Earnings",
      value: "$12,450",
      change: "+12%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Active Jobs",
      value: "8",
      change: "+2",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Completed Projects",
      value: "24",
      change: "+4",
      icon: TrendingUp,
      color: "text-teal-600",
      bgColor: "bg-teal-100"
    },
    {
      title: "Client Rating",
      value: "4.9",
      change: "+0.1",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  const recentJobs = [
    {
      id: 1,
      title: "E-commerce Website Development",
      client: "TechCorp Solutions",
      status: "In Progress",
      deadline: "Dec 30, 2024",
      budget: "$3,500",
      progress: 65,
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      client: "StartupHub Inc",
      status: "Review",
      deadline: "Dec 25, 2024",
      budget: "$2,200",
      progress: 90,
      lastActivity: "1 day ago"
    },
    {
      id: 3,
      title: "Content Writing Project",
      client: "Digital Media Co",
      status: "Completed",
      deadline: "Dec 20, 2024",
      budget: "$800",
      progress: 100,
      lastActivity: "3 days ago"
    }
  ];

  const recentProposals = [
    {
      id: 1,
      title: "React Dashboard Development",
      client: "FinTech Solutions",
      status: "pending",
      bidAmount: "$2,800",
      submittedDate: "Dec 19, 2024"
    },
    {
      id: 2,
      title: "WordPress Theme Customization",
      client: "Creative Agency",
      status: "interview",
      bidAmount: "$1,200",
      submittedDate: "Dec 18, 2024"
    },
    {
      id: 3,
      title: "Logo Design Package",
      client: "Startup Inc",
      status: "accepted",
      bidAmount: "$950",
      submittedDate: "Dec 17, 2024"
    }
  ];

  const messages = [
    {
      id: 1,
      from: "Sarah Johnson",
      subject: "Project Update Required",
      preview: "Hi, could you please provide an update on the e-commerce project?",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      from: "Mike Chen",
      subject: "New Project Opportunity",
      preview: "I have a new React project that might interest you...",
      time: "1 day ago",
      unread: true
    },
    {
      id: 3,
      from: "Anna Williams",
      subject: "Payment Confirmation",
      preview: "Payment for the logo design project has been processed.",
      time: "2 days ago",
      unread: false
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
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleNewProposal = () => {
    navigate('/jobs');
  };

  const handleViewJob =.id: number) => {
    navigate(`/jobs/${id}`);
  };

  const handleViewProposal = (id: number) => {
    navigate('/proposals');
  };

  const handleMessageClick = (messageId: number) => {
    console.log(`Opening message ${messageId}`);
    // In a real app, this would open a messaging interface
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your work.</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleNewProposal} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Proposal
              </Button>
              <Button variant="outline" onClick={() => navigate('/jobs')}>
                Browse Jobs
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.color}`}>{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Card className="shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: TrendingUp },
                { id: "jobs", label: "Active Jobs", icon: Clock },
                { id: "proposals", label: "Proposals", icon: Users },
                { id: "messages", label: "Messages", icon: MessageCircle }
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
            <TabsContent value="overview" className={activeTab === "overview" ? "block" : "hidden"}>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <Button variant="outline" size="sm" onClick={() => navigate('/jobs')}>
                    View All Jobs
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Jobs */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Active Projects</h4>
                    <div className="space-y-3">
                      {recentJobs.slice(0, 3).map((job) => (
                        <Card key={job.id} className="hover:shadow-sm transition-shadow cursor-pointer" onClick={() => handleViewJob(job.id)}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-gray-900 text-sm">{job.title}</h5>
                              <Badge className={getStatusColor(job.status)}>
                                {job.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-xs mb-2">Client: {job.client}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Due: {job.deadline}</span>
                              <span>{job.budget}</span>
                            </div>
                            <div className="mt-2 bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-teal-500 h-1.5 rounded-full" 
                                style={{ width: `${job.progress}%` }}
                              ></div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Recent Proposals */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Recent Proposals</h4>
                    <div className="space-y-3">
                      {recentProposals.map((proposal) => (
                        <Card key={proposal.id} className="hover:shadow-sm transition-shadow cursor-pointer" onClick={() => handleViewProposal(proposal.id)}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-gray-900 text-sm">{proposal.title}</h5>
                              <Badge className={getStatusColor(proposal.status)}>
                                {proposal.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-xs mb-2">Client: {proposal.client}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Bid: {proposal.bidAmount}</span>
                              <span>{proposal.submittedDate}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <div className={activeTab === "jobs" ? "block" : "hidden"}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Active Jobs</h3>
                  <Button onClick={() => navigate('/jobs')}>
                    Browse More Jobs
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">{job.title}</h4>
                            <p className="text-gray-600 text-sm mb-2">Client: {job.client}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <span>Deadline: {job.deadline}</span>
                              <span>Budget: {job.budget}</span>
                              <span>Last activity: {job.lastActivity}</span>
                            </div>
                            <div className="mb-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{job.progress}%</span>
                              </div>
                              <div className="bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-teal-500 h-2 rounded-full transition-all duration-300" 
                                  style={{ width: `${job.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4 flex flex-col items-end gap-2">
                            <Badge className={getStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewJob(job.id)}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className={activeTab === "proposals" ? "block" : "hidden"}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Your Proposals</h3>
                  <Button onClick={() => navigate('/proposals')}>
                    View All Proposals
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {recentProposals.map((proposal) => (
                    <Card key={proposal.id} className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">{proposal.title}</h4>
                            <p className="text-gray-600 text-sm mb-2">Client: {proposal.client}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>Bid: {proposal.bidAmount}</span>
                              <span>Submitted: {proposal.submittedDate}</span>
                            </div>
                          </div>
                          <div className="ml-4 flex flex-col items-end gap-2">
                            <Badge className={getStatusColor(proposal.status)}>
                              {proposal.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                              {proposal.status === "interview" && <Calendar className="h-3 w-3 mr-1" />}
                              {proposal.status === "accepted" && <CheckCircle className="h-3 w-3 mr-1" />}
                              <span className="capitalize">{proposal.status}</span>
                            </Badge>
                            <Button variant="outline" size="sm" onClick={() => handleViewProposal(proposal.id)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className={activeTab === "messages" ? "block" : "hidden"}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
                  <Button variant="outline">
                    View All Messages
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {messages.map((message) => (
                    <Card key={message.id} className={`hover:shadow-sm transition-shadow cursor-pointer ${message.unread ? 'bg-blue-50 border-blue-200' : ''}`} onClick={() => handleMessageClick(message.id)}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-medium ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                                {message.from}
                              </h4>
                              {message.unread && (
                                <Badge variant="default" className="text-xs">New</Badge>
                              )}
                            </div>
                            <h5 className={`text-sm mb-1 ${message.unread ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
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
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
