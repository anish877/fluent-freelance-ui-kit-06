
import { useState } from "react";
import { Search, Filter, Eye, MessageCircle, Calendar, DollarSign, Clock, TrendingUp } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import ProposalCard from "../components/cards/ProposalCard";
import ProposalFilters from "../components/filters/ProposalFilters";
import ProposalStats from "../components/stats/ProposalStats";

interface Proposal {
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
  interviewScheduled?: {
    date: string;
    time: string;
  };
}

const Proposals = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  // Mock data for proposals
  const proposals: Proposal[] = [
    {
      id: 1,
      jobTitle: "E-commerce Website Development with React",
      client: {
        name: "TechStart Solutions",
        rating: 4.8,
        jobsPosted: 12
      },
      submittedDate: "2024-12-18",
      status: "pending",
      bidAmount: "$3,200",
      coverLetter: "I'm excited about this e-commerce project. With 5+ years of React experience and expertise in payment integrations...",
      timeline: "3-4 weeks",
      jobBudget: "$3,000 - $5,000",
      jobType: "fixed",
      skills: ["React", "Node.js", "MongoDB", "Stripe"],
      responses: 15,
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      jobTitle: "Mobile App UI/UX Design for Fitness App",
      client: {
        name: "FitLife Corp",
        rating: 4.9,
        jobsPosted: 8
      },
      submittedDate: "2024-12-17",
      status: "interview",
      bidAmount: "$2,800",
      coverLetter: "Your fitness app concept aligns perfectly with my design philosophy. I specialize in creating intuitive...",
      timeline: "2-3 weeks",
      jobBudget: "$2,500 - $4,000",
      jobType: "fixed",
      skills: ["UI/UX Design", "Figma", "Prototyping", "Mobile Design"],
      responses: 8,
      lastActivity: "1 day ago",
      interviewScheduled: {
        date: "2024-12-22",
        time: "2:00 PM EST"
      }
    },
    {
      id: 3,
      jobTitle: "Content Writing for Tech Blog",
      client: {
        name: "Digital Insights Ltd",
        rating: 4.7,
        jobsPosted: 25
      },
      submittedDate: "2024-12-16",
      status: "accepted",
      bidAmount: "$45/hour",
      coverLetter: "I've been following your tech blog and love the depth of analysis. As a technical writer with...",
      timeline: "Ongoing",
      jobBudget: "$40 - $60/hour",
      jobType: "hourly",
      skills: ["Technical Writing", "SEO", "Content Strategy"],
      responses: 22,
      lastActivity: "3 days ago"
    },
    {
      id: 4,
      jobTitle: "Logo Design for Startup",
      client: {
        name: "InnovateCo",
        rating: 4.6,
        jobsPosted: 3
      },
      submittedDate: "2024-12-15",
      status: "rejected",
      bidAmount: "$800",
      coverLetter: "I understand the importance of brand identity for startups. My minimalist design approach...",
      timeline: "1 week",
      jobBudget: "$500 - $1,200",
      jobType: "fixed",
      skills: ["Logo Design", "Brand Identity", "Adobe Illustrator"],
      responses: 45,
      lastActivity: "4 days ago"
    },
    {
      id: 5,
      jobTitle: "Python Data Analysis Project",
      client: {
        name: "DataDriven Analytics",
        rating: 4.9,
        jobsPosted: 15
      },
      submittedDate: "2024-12-14",
      status: "withdrawn",
      bidAmount: "$1,500",
      coverLetter: "Data analysis is my passion. I have extensive experience with pandas, numpy, and visualization...",
      timeline: "2 weeks",
      jobBudget: "$1,200 - $2,000",
      jobType: "fixed",
      skills: ["Python", "Data Analysis", "Pandas", "Matplotlib"],
      responses: 12,
      lastActivity: "5 days ago"
    }
  ];

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.client.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && proposal.status === activeTab;
  });

  const proposalCounts = {
    all: proposals.length,
    pending: proposals.filter(p => p.status === "pending").length,
    interview: proposals.filter(p => p.status === "interview").length,
    accepted: proposals.filter(p => p.status === "accepted").length,
    rejected: proposals.filter(p => p.status === "rejected").length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Proposals</h1>
          <p className="text-gray-600">Track and manage all your submitted proposals</p>
        </div>

        {/* Stats Overview */}
        <ProposalStats proposals={proposals} />

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
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
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6">
            <ProposalFilters />
          </div>
        )}

        {/* Proposals Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="relative">
              All
              <Badge variant="secondary" className="ml-2 text-xs">
                {proposalCounts.all}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="relative">
              Pending
              <Badge variant="secondary" className="ml-2 text-xs">
                {proposalCounts.pending}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="interview" className="relative">
              Interview
              <Badge variant="secondary" className="ml-2 text-xs">
                {proposalCounts.interview}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="accepted" className="relative">
              Accepted
              <Badge variant="secondary" className="ml-2 text-xs">
                {proposalCounts.accepted}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="relative">
              Rejected
              <Badge variant="secondary" className="ml-2 text-xs">
                {proposalCounts.rejected}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredProposals.length > 0 ? (
              <div className="space-y-4">
                {filteredProposals.map((proposal) => (
                  <ProposalCard 
                    key={proposal.id} 
                    proposal={proposal}
                    onViewDetails={setSelectedProposal}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                  {activeTab === "all" ? (
                    <>
                      <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-lg font-medium">No proposals found</p>
                    </>
                  ) : (
                    <>
                      <Clock className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-lg font-medium">No {activeTab} proposals</p>
                    </>
                  )}
                  <p className="text-sm">Try adjusting your search or filters</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Proposals;
