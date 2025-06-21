import { useState } from "react";
import { Bell, Search, Plus, TrendingUp, DollarSign, Clock, Users } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Earnings",
      value: "$12,450",
      change: "+12%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Jobs",
      value: "8",
      change: "+2",
      icon: Clock,
      color: "text-blue-600"
    },
    {
      title: "Completed Projects",
      value: "24",
      change: "+4",
      icon: TrendingUp,
      color: "text-teal-600"
    },
    {
      title: "Client Rating",
      value: "4.9",
      change: "+0.1",
      icon: Users,
      color: "text-purple-600"
    }
  ];

  const recentJobs = [
    {
      title: "E-commerce Website Development",
      client: "TechCorp Solutions",
      status: "In Progress",
      deadline: "Dec 30, 2024",
      budget: "$3,500"
    },
    {
      title: "Mobile App UI Design",
      client: "StartupHub Inc",
      status: "Review",
      deadline: "Dec 25, 2024",
      budget: "$2,200"
    },
    {
      title: "Content Writing Project",
      client: "Digital Media Co",
      status: "Completed",
      deadline: "Dec 20, 2024",
      budget: "$800"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your work.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.color}`}>{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {["overview", "jobs", "proposals", "messages"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? "border-teal-500 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Jobs</h3>
                  <Button variant="outline" className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    New Proposal
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentJobs.map((job, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{job.title}</h4>
                          <p className="text-gray-600 text-sm">Client: {job.client}</p>
                          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                            <span>Deadline: {job.deadline}</span>
                            <span>Budget: {job.budget}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            job.status === "Completed" 
                              ? "bg-green-100 text-green-800"
                              : job.status === "In Progress"
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {job.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "jobs" && (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your Active Jobs</h3>
                <p className="text-gray-600">Manage your ongoing projects and deadlines here.</p>
              </div>
            )}

            {activeTab === "proposals" && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your Proposals</h3>
                <p className="text-gray-600">Track the status of your submitted proposals.</p>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Messages</h3>
                <p className="text-gray-600">Communicate with your clients and collaborators.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
