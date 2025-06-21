
import { useState } from "react";
import { Search, Filter, MapPin, Star, Verified, Calendar, DollarSign, Eye, MessageCircle, Heart, Award, Shield, Clock, TrendingUp, Users, Globe, Briefcase, CheckCircle, Video, Phone, Mail } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { Progress } from "../components/ui/progress";

interface Freelancer {
  id: number;
  name: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: string;
  availability: "available" | "busy" | "offline";
  skills: string[];
  description: string;
  completedJobs: number;
  totalEarnings: string;
  responseTime: string;
  languages: string[];
  profilePicture: string;
  verified: boolean;
  topRated: boolean;
  risingTalent: boolean;
  portfolio: {
    title: string;
    image: string;
    description: string;
    category: string;
  }[];
  lastActive: string;
  successRate: number;
  onTime: number;
  onBudget: number;
  repeatHireRate: number;
  certifications: string[];
  education: string[];
  specializations: string[];
  testScores: { name: string; score: number }[];
  memberSince: string;
  profileStrength: number;
}

const Talent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedHourlyRate, setSelectedHourlyRate] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [activeTab, setActiveTab] = useState("browse");

  const freelancers: Freelancer[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Full-Stack Developer & Technical Lead",
      location: "San Francisco, CA, USA",
      rating: 4.95,
      reviewCount: 187,
      hourlyRate: "$85-120",
      availability: "available",
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "GraphQL", "Docker", "Kubernetes"],
      description: "Experienced full-stack developer with 10+ years creating scalable web applications and leading development teams. Specialized in React ecosystem, cloud architecture, and modern DevOps practices. Successfully delivered 200+ projects for startups and Fortune 500 companies. Expert in microservices architecture and agile methodologies.",
      completedJobs: 234,
      totalEarnings: "$450,000+",
      responseTime: "Within 1 hour",
      languages: ["English (Native)", "Spanish (Fluent)", "Portuguese (Conversational)"],
      profilePicture: "/placeholder.svg",
      verified: true,
      topRated: true,
      risingTalent: false,
      portfolio: [
        { title: "E-commerce Platform", image: "/placeholder.svg", description: "Modern React-based shopping platform with 1M+ users", category: "Web Development" },
        { title: "SaaS Dashboard", image: "/placeholder.svg", description: "Analytics dashboard serving 500+ B2B clients", category: "SaaS" },
        { title: "Mobile Banking App", image: "/placeholder.svg", description: "Secure fintech application with biometric authentication", category: "FinTech" }
      ],
      lastActive: "2 minutes ago",
      successRate: 98,
      onTime: 96,
      onBudget: 94,
      repeatHireRate: 85,
      certifications: ["AWS Certified Solutions Architect", "Google Cloud Professional", "React Advanced Certification"],
      education: ["MS Computer Science - Stanford", "BS Software Engineering - UC Berkeley"],
      specializations: ["Enterprise Applications", "Cloud Architecture", "Team Leadership", "Code Review"],
      testScores: [
        { name: "JavaScript", score: 95 },
        { name: "React", score: 98 },
        { name: "Node.js", score: 92 },
        { name: "System Design", score: 90 }
      ],
      memberSince: "2018",
      profileStrength: 100
    },
    {
      id: 2,
      name: "Marcus Chen",
      title: "Senior Mobile App Developer (iOS & Android)",
      location: "Toronto, Canada",
      rating: 4.88,
      reviewCount: 143,
      hourlyRate: "$70-95",
      availability: "busy",
      skills: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase", "GraphQL", "ARKit", "Core ML"],
      description: "Mobile development specialist with 8+ years of expertise in native iOS/Android and cross-platform solutions. Created 60+ mobile apps with over 5M combined downloads. Expert in performance optimization, security implementation, and App Store optimization. Strong focus on user experience and cutting-edge mobile technologies.",
      completedJobs: 189,
      totalEarnings: "$320,000+",
      responseTime: "Within 2 hours",
      languages: ["English (Native)", "Mandarin (Native)", "French (Conversational)", "Japanese (Basic)"],
      profilePicture: "/placeholder.svg",
      verified: true,
      topRated: true,
      risingTalent: false,
      portfolio: [
        { title: "Fitness Tracking App", image: "/placeholder.svg", description: "Native iOS app with HealthKit integration - 500K+ downloads", category: "Health & Fitness" },
        { title: "Food Delivery Platform", image: "/placeholder.svg", description: "Cross-platform app serving 50+ cities", category: "Food & Delivery" },
        { title: "AR Shopping Experience", image: "/placeholder.svg", description: "Innovative AR-powered e-commerce app", category: "AR/VR" }
      ],
      lastActive: "1 hour ago",
      successRate: 96,
      onTime: 98,
      onBudget: 92,
      repeatHireRate: 78,
      certifications: ["Apple Certified iOS Developer", "Google Android Certified", "Firebase Expert"],
      education: ["MS Mobile Computing - Waterloo", "BS Computer Engineering - UofT"],
      specializations: ["Performance Optimization", "App Store Optimization", "Mobile Security", "AR/VR Development"],
      testScores: [
        { name: "iOS Development", score: 96 },
        { name: "Android Development", score: 94 },
        { name: "React Native", score: 89 },
        { name: "Mobile UI/UX", score: 87 }
      ],
      memberSince: "2019",
      profileStrength: 95
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      title: "Digital Marketing Strategist & Growth Hacker",
      location: "Barcelona, Spain",
      rating: 4.92,
      reviewCount: 298,
      hourlyRate: "$60-85",
      availability: "available",
      skills: ["SEO", "Google Ads", "Facebook Ads", "Analytics", "Growth Hacking", "Content Strategy", "Email Marketing", "Conversion Optimization"],
      description: "Results-driven digital marketer with 7+ years helping businesses scale online. Managed $2M+ in ad spend with average 350% ROI. Specialized in B2B SaaS and e-commerce growth strategies. Expert in data-driven marketing, conversion optimization, and building high-performing marketing funnels. Fluent in multiple marketing platforms and analytics tools.",
      completedJobs: 367,
      totalEarnings: "$280,000+",
      responseTime: "Within 30 minutes",
      languages: ["Spanish (Native)", "English (Fluent)", "French (Intermediate)", "Italian (Basic)"],
      profilePicture: "/placeholder.svg",
      verified: true,
      topRated: true,
      risingTalent: false,
      portfolio: [
        { title: "SaaS Growth Campaign", image: "/placeholder.svg", description: "Increased MRR by 400% in 8 months - $2M ARR", category: "SaaS Marketing" },
        { title: "E-commerce SEO Strategy", image: "/placeholder.svg", description: "Boosted organic traffic by 300% and revenue by 250%", category: "SEO" },
        { title: "PPC Campaign Management", image: "/placeholder.svg", description: "Managed $500K ad spend with 4.2x ROAS", category: "Paid Advertising" }
      ],
      lastActive: "5 minutes ago",
      successRate: 99,
      onTime: 97,
      onBudget: 96,
      repeatHireRate: 82,
      certifications: ["Google Ads Certified", "Facebook Marketing Professional", "HubSpot Inbound Certified", "Google Analytics IQ"],
      education: ["MBA Marketing - IESE", "BS Business Administration - Pompeu Fabra"],
      specializations: ["Growth Hacking", "SaaS Marketing", "E-commerce Growth", "Marketing Automation"],
      testScores: [
        { name: "Google Ads", score: 98 },
        { name: "SEO", score: 95 },
        { name: "Analytics", score: 93 },
        { name: "Growth Strategy", score: 96 }
      ],
      memberSince: "2017",
      profileStrength: 98
    },
    {
      id: 4,
      name: "Alex Thompson",
      title: "Senior UI/UX Designer & Product Designer",
      location: "London, UK",
      rating: 4.89,
      reviewCount: 156,
      hourlyRate: "$75-110",
      availability: "available",
      skills: ["Figma", "Adobe XD", "Sketch", "Principle", "User Research", "Prototyping", "Design Systems", "Accessibility"],
      description: "Award-winning product designer with 9+ years creating intuitive digital experiences for web and mobile applications. Specialized in design systems, user research, and conversion-focused designs. Led design teams and collaborated with product managers to deliver user-centered solutions that drive business results.",
      completedJobs: 178,
      totalEarnings: "$375,000+",
      responseTime: "Within 1 hour",
      languages: ["English (Native)", "German (Fluent)", "French (Conversational)"],
      profilePicture: "/placeholder.svg",
      verified: true,
      topRated: true,
      risingTalent: false,
      portfolio: [
        { title: "Banking App Redesign", image: "/placeholder.svg", description: "Complete UX overhaul increasing user engagement by 40%", category: "Mobile Design" },
        { title: "SaaS Design System", image: "/placeholder.svg", description: "Comprehensive design system for B2B platform", category: "Design Systems" },
        { title: "E-learning Platform", image: "/placeholder.svg", description: "Educational platform serving 100K+ students", category: "Web Design" }
      ],
      lastActive: "30 minutes ago",
      successRate: 97,
      onTime: 95,
      onBudget: 98,
      repeatHireRate: 88,
      certifications: ["Google UX Design Professional", "Adobe Certified Expert", "Nielsen Norman UX Certification"],
      education: ["MA Interaction Design - Royal College of Art", "BA Graphic Design - Central Saint Martins"],
      specializations: ["Design Systems", "User Research", "Mobile Design", "Accessibility Design"],
      testScores: [
        { name: "UI Design", score: 97 },
        { name: "UX Research", score: 91 },
        { name: "Prototyping", score: 94 },
        { name: "Design Systems", score: 96 }
      ],
      memberSince: "2018",
      profileStrength: 92
    }
  ];

  const categories = [
    { label: "All Categories", value: "all", count: 45000 },
    { label: "Web Development", value: "web", count: 12500 },
    { label: "Mobile Development", value: "mobile", count: 8200 },
    { label: "UI/UX Design", value: "design", count: 9800 },
    { label: "Digital Marketing", value: "marketing", count: 7600 },
    { label: "Data Science & AI", value: "data", count: 4200 },
    { label: "Content Writing", value: "writing", count: 6400 }
  ];

  const toggleFavorite = (freelancerId: number) => {
    setFavorites(prev => 
      prev.includes(freelancerId) 
        ? prev.filter(id => id !== freelancerId)
        : [...prev, freelancerId]
    );
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available": return "bg-green-100 text-green-800 border-green-200";
      case "busy": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "offline": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getBadges = (freelancer: Freelancer) => {
    const badges = [];
    if (freelancer.topRated) badges.push({ label: "Top Rated", color: "bg-yellow-100 text-yellow-800 border-yellow-300", icon: Award });
    if (freelancer.risingTalent) badges.push({ label: "Rising Talent", color: "bg-blue-100 text-blue-800 border-blue-300", icon: TrendingUp });
    if (freelancer.verified) badges.push({ label: "Verified", color: "bg-green-100 text-green-800 border-green-300", icon: Verified });
    return badges;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Hire Top Talent</h1>
              <p className="text-lg text-gray-600">Connect with skilled professionals ready to bring your vision to life</p>
            </div>
            <div className="text-right">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                Post a Job
              </Button>
            </div>
          </div>
          
          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-teal-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">45,000+</div>
                  <div className="text-sm text-gray-600">Verified professionals</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">Average rating</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Project success rate</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <Globe className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">195</div>
                  <div className="text-sm text-gray-600">Countries represented</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search Section */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-96">
              <TabsTrigger value="browse">Browse Talent</TabsTrigger>
              <TabsTrigger value="saved">Saved (5)</TabsTrigger>
              <TabsTrigger value="hired">Previously Hired</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1 max-w-2xl">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Search by skills, name, or expertise..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                      className="flex items-center gap-2 h-12 px-6"
                    >
                      <Filter className="h-4 w-4" />
                      Advanced Filters
                    </Button>
                  </div>

                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.value}
                        variant={selectedCategory === category.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.value)}
                        className="h-8"
                      >
                        {category.label} ({category.count.toLocaleString()})
                      </Button>
                    ))}
                  </div>

                  {/* Advanced Filters */}
                  {showAdvancedFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                        <select
                          value={selectedAvailability}
                          onChange={(e) => setSelectedAvailability(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="all">Any Availability</option>
                          <option value="available">Available Now</option>
                          <option value="busy">Busy</option>
                          <option value="offline">Offline</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <select
                          value={selectedRating}
                          onChange={(e) => setSelectedRating(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="all">Any Rating</option>
                          <option value="4.8+">4.8+ Stars</option>
                          <option value="4.5+">4.5+ Stars</option>
                          <option value="4.0+">4.0+ Stars</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate</label>
                        <select
                          value={selectedHourlyRate}
                          onChange={(e) => setSelectedHourlyRate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="all">Any Rate</option>
                          <option value="0-25">$0 - $25/hr</option>
                          <option value="25-50">$25 - $50/hr</option>
                          <option value="50-100">$50 - $100/hr</option>
                          <option value="100+">$100+/hr</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Special Badges</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                          <option value="all">All Freelancers</option>
                          <option value="top-rated">Top Rated Only</option>
                          <option value="rising">Rising Talent</option>
                          <option value="verified">Verified Only</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results Controls */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <p className="text-gray-600">
                    <span className="font-semibold">{freelancers.length}</span> professionals found
                  </p>
                  <Separator orientation="vertical" className="h-6" />
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">View:</span>
                    <Button
                      variant={viewMode === "cards" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("cards")}
                    >
                      Cards
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      List
                    </Button>
                  </div>
                </div>
                <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white">
                  <option>Best Match</option>
                  <option>Highest Rated</option>
                  <option>Most Reviews</option>
                  <option>Newest</option>
                  <option>Lowest Rate</option>
                  <option>Highest Rate</option>
                </select>
              </div>

              {/* Freelancer Grid/List */}
              <div className={viewMode === "cards" ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                {freelancers.map((freelancer) => (
                  <Card key={freelancer.id} className="hover:shadow-xl transition-all duration-300 border hover:border-teal-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="relative">
                            <img
                              src={freelancer.profilePicture}
                              alt={freelancer.name}
                              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                              freelancer.availability === 'available' ? 'bg-green-500' : 
                              freelancer.availability === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                            }`} />
                            {freelancer.verified && (
                              <div className="absolute -top-1 -right-1 bg-teal-500 rounded-full p-1">
                                <Verified className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{freelancer.name}</h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{freelancer.title}</p>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              {freelancer.location}
                            </div>
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                                <span className="font-semibold text-gray-900">{freelancer.rating}</span>
                                <span className="text-sm text-gray-500 ml-1">({freelancer.reviewCount})</span>
                              </div>
                              <div className="text-lg font-bold text-teal-600">
                                {freelancer.hourlyRate}/hr
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(freelancer.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Heart className={`h-5 w-5 ${favorites.includes(freelancer.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(freelancer.availability)}`}>
                          {freelancer.availability === "available" && "Available Now"}
                          {freelancer.availability === "busy" && "Busy"}
                          {freelancer.availability === "offline" && "Offline"}
                        </div>
                        {getBadges(freelancer).map((badge, index) => (
                          <div key={index} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
                            <badge.icon className="h-3 w-3 mr-1" />
                            {badge.label}
                          </div>
                        ))}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {freelancer.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {freelancer.skills.slice(0, 5).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {freelancer.skills.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{freelancer.skills.length - 5}
                          </Badge>
                        )}
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Success Rate:</span>
                          <span className="font-semibold text-green-600">{freelancer.successRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">On Time:</span>
                          <span className="font-semibold text-blue-600">{freelancer.onTime}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Jobs Done:</span>
                          <span className="font-semibold text-gray-900">{freelancer.completedJobs}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Repeat Hire:</span>
                          <span className="font-semibold text-purple-600">{freelancer.repeatHireRate}%</span>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      {/* Portfolio Preview */}
                      {freelancer.portfolio.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Work</h4>
                          <div className="grid grid-cols-3 gap-2">
                            {freelancer.portfolio.slice(0, 3).map((item, index) => (
                              <div key={index} className="relative group cursor-pointer">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-16 object-cover rounded border group-hover:opacity-75 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded flex items-center justify-center transition-all">
                                  <Eye className="h-4 w-4 text-white opacity-0 group-hover:opacity-100" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Contact Actions */}
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Video className="h-4 w-4 mr-2" />
                            Video Call
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Briefcase className="h-4 w-4 mr-2" />
                            Invite to Job
                          </Button>
                        </div>
                      </div>

                      {/* Last Activity */}
                      <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
                        <span>Last active: {freelancer.lastActive}</span>
                        <span>Responds in {freelancer.responseTime.toLowerCase()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-6">
              <div className="text-center py-16">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No saved freelancers yet</h3>
                <p className="text-gray-500">Save freelancers you're interested in to easily find them later.</p>
              </div>
            </TabsContent>

            <TabsContent value="hired" className="mt-6">
              <div className="text-center py-16">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No previous hires</h3>
                <p className="text-gray-500">Freelancers you've worked with will appear here for easy re-hiring.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Load More Professionals
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Talent;
