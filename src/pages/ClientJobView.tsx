
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, Clock, DollarSign, Star, Users, Calendar, 
  Eye, MessageCircle, CheckCircle, XCircle, Award,
  FileText, Download, Edit, Trash2, AlertCircle,
  Filter, Search, SortAsc, MoreHorizontal, BookOpen,
  TrendingUp, Target, Briefcase, Globe, Phone, Mail,
  LinkedinIcon, Github, ExternalLink, ThumbsUp, ThumbsDown
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
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

const ClientJobView = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("proposals");
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock job data
  const job = {
    id: parseInt(id || "1"),
    title: "Full-Stack React Developer for E-commerce Platform",
    description: `We are looking for an experienced full-stack React developer to help us build a modern e-commerce platform. This is a challenging project that requires expertise in React, Node.js, and modern web technologies.

The platform will include:
- User authentication and authorization
- Product catalog with search and filtering
- Shopping cart and checkout process
- Payment integration (Stripe/PayPal)
- Admin dashboard for inventory management
- Real-time notifications
- Mobile-responsive design
- Performance optimization

We value clean, maintainable code and expect the developer to follow best practices including:
- TypeScript implementation
- Unit and integration testing
- Git workflow with proper documentation
- Code reviews and collaboration
- Agile development methodology`,
    status: "OPEN",
    budget: "$3,000 - $5,000",
    budgetType: "Fixed Price",
    duration: "2-3 months",
    experienceLevel: "Intermediate",
    skills: ["React", "TypeScript", "Node.js", "MongoDB", "Express.js", "Stripe API", "AWS", "Jest"],
    category: "Web Development",
    subcategory: "Full Stack Development",
    location: "Remote",
    isRemote: true,
    postedDate: "2024-12-18",
    expiryDate: "2025-01-18",
    visibility: "Public",
    jobType: "One-time project",
    proposals: 15,
    interviews: 3,
    hires: 0,
    views: 234,
    saves: 28,
    applications: 15,
    invitesSent: 5,
    connectsRequired: 6,
    requirements: [
      "5+ years of React development experience",
      "Strong TypeScript skills",
      "Experience with Node.js and Express",
      "Knowledge of MongoDB or similar NoSQL databases",
      "Experience with payment gateway integration",
      "Portfolio of similar e-commerce projects",
      "Excellent communication skills",
      "Available for regular video calls"
    ],
    preferredQualifications: [
      "AWS or cloud deployment experience",
      "Experience with testing frameworks",
      "Knowledge of SEO best practices",
      "Previous startup experience"
    ],
    screeningQuestions: [
      "What is your experience with React and TypeScript?",
      "Have you worked with e-commerce platforms before?",
      "Can you provide examples of your previous work?",
      "What is your preferred development methodology?",
      "How do you handle version control and code reviews?"
    ],
    attachments: [
      { id: 1, name: "Project_Requirements.pdf", size: "2.4 MB", url: "/docs/requirements.pdf" },
      { id: 2, name: "Wireframes.sketch", size: "15.7 MB", url: "/docs/wireframes.sketch" },
      { id: 3, name: "Brand_Guidelines.pdf", size: "5.1 MB", url: "/docs/brand.pdf" }
    ]
  };

  // Mock proposals data
  const proposals = [
    {
      id: 1,
      freelancer: {
        id: "f1",
        firstName: "Sarah",
        lastName: "Chen",
        avatar: "/placeholder.svg",
        title: "Senior Full-Stack Developer",
        location: "San Francisco, CA",
        rating: 4.9,
        reviews: 47,
        hourlyRate: 85,
        totalEarnings: "$127,000+",
        successRate: 98,
        completedJobs: 89,
        onTime: 96,
        responseTime: "within 1 hour",
        lastActive: "Online now",
        skills: ["React", "TypeScript", "Node.js", "MongoDB", "AWS", "Docker"],
        topRatedPlus: true,
        verified: true,
        languages: [
          { name: "English", level: "Native" },
          { name: "Mandarin", level: "Native" }
        ],
        education: [
          {
            school: "Stanford University",
            degree: "MS Computer Science",
            year: "2018"
          }
        ],
        certifications: ["AWS Certified Developer", "Google Cloud Professional"],
        portfolio: [
          {
            title: "E-commerce Platform for Fashion Brand",
            description: "Built complete e-commerce solution with React and Node.js",
            image: "/placeholder.svg",
            url: "https://example.com"
          }
        ]
      },
      bidAmount: 4200,
      originalBudget: 4500,
      estimatedDuration: "8-10 weeks",
      milestones: [
        { title: "Setup & Planning", duration: "1 week", amount: 600 },
        { title: "Frontend Development", duration: "4 weeks", amount: 1800 },
        { title: "Backend Development", duration: "3 weeks", amount: 1200 },
        { title: "Testing & Deployment", duration: "1 week", amount: 600 }
      ],
      coverLetter: `Hi there!

I'm excited about this e-commerce project and believe I'm the perfect fit for your needs. With over 6 years of full-stack development experience, I've built numerous e-commerce platforms similar to what you're describing.

**Why I'm the right choice:**
• 6+ years of React/TypeScript experience with focus on e-commerce
• Built 12+ complete e-commerce platforms from scratch
• Expert in payment integrations (Stripe, PayPal, Square)
• Strong background in performance optimization and SEO
• Experience with AWS deployment and scaling

**My approach to your project:**
1. **Week 1**: Project setup, architecture planning, and wireframe review
2. **Weeks 2-5**: Frontend development with React/TypeScript
3. **Weeks 6-8**: Backend API development with Node.js/Express
4. **Week 9**: Integration, testing, and performance optimization
5. **Week 10**: Deployment, documentation, and handover

**Recent relevant experience:**
I recently completed a similar project for a fashion startup where I built their entire e-commerce platform. The project included user authentication, product catalog, shopping cart, payment processing, and admin dashboard. The client was extremely satisfied and the platform now processes $50K+ monthly revenue.

I'm available to start immediately and can commit 40+ hours per week to ensure timely delivery. I'm also comfortable with regular video calls and provide daily progress updates.

Looking forward to discussing this project further!

Best regards,
Sarah`,
      questionResponses: [
        {
          question: "What is your experience with React and TypeScript?",
          answer: "I have 6+ years of React experience and 4+ years with TypeScript. I've built over 20 production applications using this stack, including several e-commerce platforms. I'm well-versed in modern React patterns, hooks, context API, and TypeScript best practices."
        },
        {
          question: "Have you worked with e-commerce platforms before?",
          answer: "Yes, I've built 12+ complete e-commerce platforms. Recent projects include a fashion marketplace, electronics store, and B2B wholesale platform. I have extensive experience with payment gateways, inventory management, order processing, and performance optimization for high-traffic sites."
        }
      ],
      attachments: [
        { id: 1, name: "Portfolio_Examples.pdf", size: "8.2 MB" },
        { id: 2, name: "References.pdf", size: "1.1 MB" }
      ],
      submittedDate: "2024-12-18T10:30:00Z",
      status: "pending",
      clientViewed: true,
      clientNotes: "",
      rating: null,
      interview: {
        scheduled: false,
        date: null,
        notes: ""
      }
    },
    {
      id: 2,
      freelancer: {
        id: "f2",
        firstName: "Alex",
        lastName: "Rodriguez",
        avatar: "/placeholder.svg",
        title: "React Developer & UI/UX Designer",
        location: "Austin, TX",
        rating: 4.7,
        reviews: 32,
        hourlyRate: 65,
        totalEarnings: "$89,000+",
        successRate: 94,
        completedJobs: 56,
        onTime: 92,
        responseTime: "within 2 hours",
        lastActive: "2 hours ago",
        skills: ["React", "JavaScript", "UI/UX Design", "Figma", "Node.js"],
        topRatedPlus: false,
        verified: true,
        languages: [
          { name: "English", level: "Fluent" },
          { name: "Spanish", level: "Native" }
        ]
      },
      bidAmount: 3800,
      estimatedDuration: "10-12 weeks",
      coverLetter: "I'm a full-stack developer with strong design skills. I can handle both the technical implementation and ensure great user experience...",
      submittedDate: "2024-12-18T14:15:00Z",
      status: "pending",
      clientViewed: false,
      questionResponses: []
    },
    {
      id: 3,
      freelancer: {
        id: "f3",
        firstName: "Priya",
        lastName: "Patel",
        avatar: "/placeholder.svg",
        title: "Senior Full-Stack Engineer",
        location: "Toronto, Canada",
        rating: 4.8,
        reviews: 67,
        hourlyRate: 75,
        totalEarnings: "$156,000+",
        successRate: 97,
        completedJobs: 78,
        onTime: 95,
        responseTime: "within 30 minutes",
        lastActive: "Online now",
        skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
        topRatedPlus: true,
        verified: true,
        languages: [
          { name: "English", level: "Fluent" },
          { name: "Hindi", level: "Native" }
        ]
      },
      bidAmount: 4500,
      estimatedDuration: "8 weeks",
      coverLetter: "With 8+ years in full-stack development, I specialize in scalable e-commerce solutions...",
      submittedDate: "2024-12-17T16:45:00Z",
      status: "interview",
      clientViewed: true,
      interview: {
        scheduled: true,
        date: "2024-12-22T15:00:00Z",
        notes: "Great technical discussion, very knowledgeable"
      }
    }
  ];

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = 
      proposal.freelancer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.freelancer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.coverLetter.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === "all") return matchesSearch;
    return matchesSearch && proposal.status === filterBy;
  });

  const sortedProposals = [...filteredProposals].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
      case "price":
        return a.bidAmount - b.bidAmount;
      case "rating":
        return b.freelancer.rating - a.freelancer.rating;
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "interview":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
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

  const handleProposalAction = (proposalId: number, action: string) => {
    console.log(`${action} proposal ${proposalId}`);
    // In real app, this would make API call
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
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
                  Posted {formatDate(job.postedDate)}
                </span>
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </span>
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {job.views} views
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {job.proposals} proposals
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit Job
              </Button>
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
              <p className="text-2xl font-bold text-gray-900">{job.proposals}</p>
              <p className="text-sm text-gray-600">Proposals</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{job.interviews}</p>
              <p className="text-sm text-gray-600">Interviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{job.hires}</p>
              <p className="text-sm text-gray-600">Hires</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{job.views}</p>
              <p className="text-sm text-gray-600">Views</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{job.saves}</p>
              <p className="text-sm text-gray-600">Saves</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{job.invitesSent}</p>
              <p className="text-sm text-gray-600">Invites Sent</p>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="proposals">
              Proposals ({job.proposals})
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
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
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
              {sortedProposals.map((proposal) => (
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
                          </div>
                          <p className="text-gray-600 mb-2">{proposal.freelancer.title}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              {proposal.freelancer.rating} ({proposal.freelancer.reviews} reviews)
                            </div>
                            <span>{proposal.freelancer.location}</span>
                            <span className="text-green-600">{proposal.freelancer.lastActive}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>${proposal.freelancer.hourlyRate}/hr</span>
                            <span>{proposal.freelancer.totalEarnings} earned</span>
                            <span>{proposal.freelancer.successRate}% success rate</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(proposal.status)}`}>
                          {proposal.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                          {proposal.status === "interview" && <Calendar className="h-3 w-3 mr-1" />}
                          {proposal.status === "accepted" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {proposal.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                          <span className="capitalize">{proposal.status}</span>
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
                      <p className="text-gray-700 line-clamp-3">{proposal.coverLetter}</p>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proposal.freelancer.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Submitted {formatDate(proposal.submittedDate)}
                        {!proposal.clientViewed && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                Proposal from {proposal.freelancer.firstName} {proposal.freelancer.lastName}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
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
                                    <p className="text-gray-600 mb-2">{proposal.freelancer.title}</p>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-gray-600">Rating: </span>
                                        <span className="font-medium">{proposal.freelancer.rating}/5 ({proposal.freelancer.reviews} reviews)</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Success Rate: </span>
                                        <span className="font-medium">{proposal.freelancer.successRate}%</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Completed Jobs: </span>
                                        <span className="font-medium">{proposal.freelancer.completedJobs}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">On Time: </span>
                                        <span className="font-medium">{proposal.freelancer.onTime}%</span>
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
                                    <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
                                  </div>
                                </div>
                                
                                {/* Milestones */}
                                {proposal.milestones && (
                                  <div className="mb-4">
                                    <h4 className="font-medium mb-2">Project Milestones</h4>
                                    <div className="space-y-2">
                                      {proposal.milestones.map((milestone, index) => (
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
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="whitespace-pre-wrap">{proposal.coverLetter}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Question Responses */}
                              {proposal.questionResponses && proposal.questionResponses.length > 0 && (
                                <div className="border rounded-lg p-4">
                                  <h3 className="font-semibold mb-3">Screening Questions</h3>
                                  <div className="space-y-4">
                                    {proposal.questionResponses.map((qa, index) => (
                                      <div key={index}>
                                        <h4 className="font-medium text-gray-900 mb-2">Q: {qa.question}</h4>
                                        <p className="text-gray-700 bg-gray-50 p-3 rounded">{qa.answer}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Action Buttons */}
                              <div className="flex justify-end gap-2 pt-4 border-t">
                                <Button variant="outline">
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  Message
                                </Button>
                                <Button variant="outline">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Schedule Interview
                                </Button>
                                <Button variant="destructive">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Decline
                                </Button>
                                <Button>
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

                        {proposal.status === "pending" && (
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
              ))}
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
                    <div className="prose prose-gray max-w-none">
                      {job.description.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
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
                      
                      {job.preferredQualifications && (
                        <div>
                          <h4 className="font-medium mb-2">Preferred Qualifications</h4>
                          <ul className="space-y-2">
                            {job.preferredQualifications.map((pref, index) => (
                              <li key={index} className="flex items-start">
                                <Star className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-gray-700">{pref}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Screening Questions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Screening Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {job.screeningQuestions.map((question, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                          <p className="text-gray-900">{question}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Attachments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Attachments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {job.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-600 mr-3" />
                            <div>
                              <p className="font-medium text-gray-900">{attachment.name}</p>
                              <p className="text-sm text-gray-600">{attachment.size}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
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
                      <p className="font-semibold text-gray-900">{job.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-900">{job.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Experience Level</p>
                      <p className="font-semibold text-gray-900">{job.experienceLevel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Project Type</p>
                      <p className="font-semibold text-gray-900">{job.jobType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-gray-900">{job.location}</p>
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
                      <span className="font-medium">{job.proposals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interviews</span>
                      <span className="font-medium">{job.interviews}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Views</span>
                      <span className="font-medium">{job.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saves</span>
                      <span className="font-medium">{job.saves}</span>
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
                        <span className="text-sm font-medium">{job.views}</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Proposals</span>
                        <span className="text-sm font-medium">{job.proposals}</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Saves</span>
                        <span className="text-sm font-medium">{job.saves}</span>
                      </div>
                      <Progress value={45} className="h-2" />
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
                      <span className="font-medium">$4,167</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bid Range</span>
                      <span className="font-medium">$3,200 - $5,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Rating</span>
                      <span className="font-medium">4.8/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response Rate</span>
                      <span className="font-medium">87%</span>
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
                      <span className="font-medium">33%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Success Rate</span>
                      <span className="font-medium">96%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quick Responders</span>
                      <span className="font-medium">67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Verified</span>
                      <span className="font-medium">93%</span>
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
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
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
                    defaultValue="2025-01-18"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <h3 className="font-medium mb-2">Connects Required</h3>
                  <Select defaultValue="6">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Connect</SelectItem>
                      <SelectItem value="2">2 Connects</SelectItem>
                      <SelectItem value="4">4 Connects</SelectItem>
                      <SelectItem value="6">6 Connects</SelectItem>
                    </SelectContent>
                  </Select>
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
