
import { useState } from "react";
import { FileText, Download, Eye, Clock, CheckCircle, XCircle, DollarSign, Calendar, User, Building } from "lucide-react";

import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";

const Contracts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContract, setSelectedContract] = useState<string | null>(null);

  // Mock data for contracts
  const contracts = [
    {
      id: "1",
      title: "E-commerce Website Development",
      client: "Sarah Johnson",
      clientCompany: "Johnson Retail Co.",
      freelancer: "You",
      status: "active",
      type: "fixed",
      budget: 5000,
      paid: 2000,
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      duration: "2 months",
      description: "Complete redesign and development of e-commerce platform",
      milestones: [
        { id: 1, title: "UI/UX Design", amount: 1500, status: "completed", dueDate: "2024-02-01" },
        { id: 2, title: "Frontend Development", amount: 2000, status: "completed", dueDate: "2024-02-15" },
        { id: 3, title: "Backend Integration", amount: 1500, status: "in-progress", dueDate: "2024-03-01" }
      ],
      lastUpdate: "2 days ago"
    },
    {
      id: "2",
      title: "Mobile App UI Design",
      client: "Tech Solutions Inc",
      clientCompany: "Tech Solutions Inc",
      freelancer: "You", 
      status: "completed",
      type: "hourly",
      budget: 3000,
      paid: 3000,
      startDate: "2023-12-01",
      endDate: "2024-01-10",
      duration: "40 hours",
      description: "Design modern UI for iOS and Android mobile application",
      milestones: [],
      lastUpdate: "1 week ago"
    },
    {
      id: "3",
      title: "Content Writing Project",
      client: "Marketing Pro LLC",
      clientCompany: "Marketing Pro LLC",
      freelancer: "You",
      status: "pending",
      type: "fixed", 
      budget: 1200,
      paid: 0,
      startDate: "2024-02-20",
      endDate: "2024-03-20",
      duration: "1 month",
      description: "Write 20 blog posts for digital marketing website",
      milestones: [
        { id: 1, title: "Research & Outline", amount: 300, status: "pending", dueDate: "2024-02-25" },
        { id: 2, title: "First 10 Articles", amount: 600, status: "pending", dueDate: "2024-03-10" },
        { id: 3, title: "Final 10 Articles", amount: 300, status: "pending", dueDate: "2024-03-20" }
      ],
      lastUpdate: "3 days ago"
    },
    {
      id: "4",
      title: "Data Analysis Dashboard",
      client: "DataCorp Analytics", 
      clientCompany: "DataCorp Analytics",
      freelancer: "You",
      status: "cancelled",
      type: "fixed",
      budget: 2500,
      paid: 500,
      startDate: "2024-01-01",
      endDate: "2024-01-15",
      duration: "2 weeks",
      description: "Build interactive dashboard for business intelligence",
      milestones: [],
      lastUpdate: "2 weeks ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "completed": return "bg-blue-500";
      case "pending": return "bg-yellow-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Clock className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "cancelled": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedContractData = contracts.find(c => c.id === selectedContract);

  const contractStats = {
    total: contracts.length,
    active: contracts.filter(c => c.status === "active").length,
    completed: contracts.filter(c => c.status === "completed").length,
    totalEarnings: contracts.reduce((sum, c) => sum + c.paid, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">

      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contracts</h1>
          <p className="text-gray-600">Manage your work contracts and track progress</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{contractStats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{contractStats.active}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{contractStats.completed}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-600">${contractStats.totalEarnings.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Contracts List */}
          <div className="col-span-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Contracts</CardTitle>
                  <div className="flex items-center space-x-4">
                    <Input
                      placeholder="Search contracts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64"
                    />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {filteredContracts.map((contract) => (
                    <div
                      key={contract.id}
                      className={`p-6 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedContract === contract.id ? "bg-teal-50 border-r-4 border-r-teal-600" : ""
                      }`}
                      onClick={() => setSelectedContract(contract.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{contract.title}</h3>
                            <Badge variant="outline" className={`${getStatusColor(contract.status)} text-white`}>
                              {getStatusIcon(contract.status)}
                              <span className="ml-1 capitalize">{contract.status}</span>
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {contract.client}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              ${contract.budget.toLocaleString()} ({contract.type})
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {contract.duration}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-500 mb-3">{contract.description}</p>
                          
                          {contract.status === "active" && (
                            <div className="flex items-center justify-between">
                              <div className="flex-1 mr-4">
                                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                  <span>Progress</span>
                                  <span>${contract.paid.toLocaleString()} / ${contract.budget.toLocaleString()}</span>
                                </div>
                                <Progress value={(contract.paid / contract.budget) * 100} className="h-2" />
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Last updated</p>
                          <p className="text-sm text-gray-700">{contract.lastUpdate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contract Details */}
          <div className="col-span-4">
            {selectedContractData ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Contract Details
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">{selectedContractData.title}</h3>
                    <p className="text-sm text-gray-600">{selectedContractData.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Client:</span>
                      <span className="text-sm font-medium">{selectedContractData.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Company:</span>
                      <span className="text-sm font-medium">{selectedContractData.clientCompany}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge variant="outline" className={`${getStatusColor(selectedContractData.status)} text-white text-xs`}>
                        <span className="capitalize">{selectedContractData.status}</span>
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="text-sm font-medium capitalize">{selectedContractData.type} price</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Budget:</span>
                      <span className="text-sm font-medium">${selectedContractData.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Paid:</span>
                      <span className="text-sm font-medium text-green-600">${selectedContractData.paid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Start Date:</span>
                      <span className="text-sm font-medium">{new Date(selectedContractData.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">End Date:</span>
                      <span className="text-sm font-medium">{new Date(selectedContractData.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {selectedContractData.milestones.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Milestones</h4>
                      <div className="space-y-3">
                        {selectedContractData.milestones.map((milestone) => (
                          <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <h5 className="text-sm font-medium text-gray-900">{milestone.title}</h5>
                              <p className="text-xs text-gray-600">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">${milestone.amount.toLocaleString()}</p>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  milestone.status === "completed" ? "bg-green-100 text-green-800" :
                                  milestone.status === "in-progress" ? "bg-yellow-100 text-yellow-800" :
                                  "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {milestone.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Contract
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Contract</h3>
                  <p className="text-gray-500">Choose a contract from the list to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contracts;
