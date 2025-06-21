
import { useState } from "react";
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

const JobDetails = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [proposal, setProposal] = useState("");
  const [proposalBudget, setProposalBudget] = useState("");
  const [proposalDelivery, setProposalDelivery] = useState("");

  // Mock job data - in real app, this would come from API
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
- Agile development methodology

This is a great opportunity to work with a growing startup and make a significant impact on our product development. We offer competitive compensation and the possibility of long-term collaboration.`,
    budget: "$3,000 - $5,000",
    budgetType: "Fixed Price",
    duration: "2-3 months",
    experienceLevel: "Intermediate",
    skills: ["React", "TypeScript", "Node.js", "MongoDB", "Express.js", "Stripe API", "AWS", "Jest"],
    category: "Web Development",
    subcategory: "Full Stack Development",
    client: {
      name: "TechCorp Solutions",
      avatar: "/placeholder.svg",
      rating: 4.8,
      reviews: 47,
      jobsPosted: 12,
      hireRate: 85,
      location: "San Francisco, CA",
      memberSince: "January 2022",
      totalSpent: "$45,000+",
      description: "We are a fast-growing tech startup focused on building innovative e-commerce solutions. Our team is passionate about creating exceptional user experiences and cutting-edge technology.",
      verificationStatus: "Payment Verified",
      responseTime: "Usually responds within 2 hours",
      lastActive: "Online now"
    },
    postedTime: "2 hours ago",
    proposals: 8,
    interviewsRequested: 2,
    clientTimezone: "PST (UTC-8)",
    projectType: "One-time project",
    attachments: [
      { name: "Project_Requirements.pdf", size: "2.4 MB" },
      { name: "Wireframes.sketch", size: "15.7 MB" }
    ],
    questions: [
      "What is your experience with React and TypeScript?",
      "Have you worked with e-commerce platforms before?",
      "Can you provide examples of your previous work?",
      "What is your preferred development methodology?"
    ]
  };

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

  const handleProposalSubmit = () => {
    console.log("Proposal submitted:", { proposal, proposalBudget, proposalDelivery });
    // In real app, this would submit to API
  };

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
                      Posted {job.postedTime}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.client.location}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {job.proposals} proposals
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
                  <p className="font-semibold text-gray-900">{job.budget}</p>
                  <p className="text-xs text-gray-500">{job.budgetType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold text-gray-900">{job.duration}</p>
                  <p className="text-xs text-gray-500">{job.projectType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Experience Level</p>
                  <p className="font-semibold text-gray-900">{job.experienceLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Proposals</p>
                  <p className="font-semibold text-gray-900">{job.proposals}</p>
                  <p className="text-xs text-gray-500">{job.interviewsRequested} interviews</p>
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
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Attachments */}
              {job.attachments && job.attachments.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {job.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Paperclip className="h-4 w-4 text-gray-600 mr-2" />
                        <span className="font-medium text-gray-900">{attachment.name}</span>
                        <span className="text-sm text-gray-500 ml-2">({attachment.size})</span>
                        <Button variant="outline" size="sm" className="ml-auto">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Screening Questions */}
              {job.questions && job.questions.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Screening Questions</h3>
                  <div className="space-y-3">
                    {job.questions.map((question, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                        <p className="text-gray-900">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About the Client */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About the Client</h2>
              
              <div className="flex items-start space-x-4 mb-4">
                <img 
                  src={job.client.avatar} 
                  alt={job.client.name}
                  className="w-16 h-16 rounded-full border-2 border-gray-200"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{job.client.name}</h3>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {job.client.rating} ({job.client.reviews} reviews)
                    </div>
                    <span>{job.client.location}</span>
                    <span className="text-green-600">{job.client.lastActive}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{job.client.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="font-semibold text-gray-900">{job.client.totalSpent}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hire Rate</p>
                  <p className="font-semibold text-gray-900">{job.client.hireRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jobs Posted</p>
                  <p className="font-semibold text-gray-900">{job.client.jobsPosted}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-semibold text-gray-900">{job.client.memberSince}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {job.client.verificationStatus}
                  </span>
                  <span className="text-gray-600">{job.client.responseTime}</span>
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
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                          <option>1 week</option>
                          <option>2 weeks</option>
                          <option>1 month</option>
                          <option>2-3 months</option>
                        </select>
                      </div>
                    </div>
                    <Button onClick={handleProposalSubmit} className="w-full">
                      Submit Proposal
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

            {/* Job Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Proposals</span>
                  <span className="font-medium">{job.proposals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interviews</span>
                  <span className="font-medium">{job.interviewsRequested}</span>
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
