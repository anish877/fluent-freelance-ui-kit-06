
import { useState } from "react";
import { Search, Filter, MapPin, Star, Verified, Calendar, DollarSign, Eye, MessageCircle, Heart } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";

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
  portfolio: {
    title: string;
    image: string;
    description: string;
  }[];
  lastActive: string;
  successRate: number;
}

const Talent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const freelancers: Freelancer[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Full-Stack Developer & UI/UX Designer",
      location: "San Francisco, CA",
      rating: 4.9,
      reviewCount: 127,
      hourlyRate: "$85-120",
      availability: "available",
      skills: ["React", "Node.js", "TypeScript", "Figma", "AWS", "MongoDB"],
      description: "Experienced full-stack developer with 8+ years creating scalable web applications. Specialized in React ecosystem and modern UI/UX design principles. Successfully delivered 200+ projects for startups and enterprises.",
      completedJobs: 234,
      totalEarnings: "$180,500",
      responseTime: "Within 1 hour",
      languages: ["English (Native)", "Spanish (Fluent)"],
      profilePicture: "/placeholder.svg",
      verified: true,
      portfolio: [
        { title: "E-commerce Platform", image: "/placeholder.svg", description: "Modern React-based shopping platform" },
        { title: "SaaS Dashboard", image: "/placeholder.svg", description: "Analytics dashboard for B2B clients" }
      ],
      lastActive: "2 minutes ago",
      successRate: 98
    },
    {
      id: 2,
      name: "Marcus Chen",
      title: "Mobile App Developer (iOS & Android)",
      location: "Toronto, Canada",
      rating: 4.8,
      reviewCount: 89,
      hourlyRate: "$70-95",
      availability: "busy",
      skills: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase", "GraphQL"],
      description: "Mobile development specialist with expertise in native iOS/Android and cross-platform solutions. Built 50+ mobile apps with over 2M combined downloads. Focus on performance and user experience.",
      completedJobs: 156,
      totalEarnings: "$95,200",
      responseTime: "Within 2 hours",
      languages: ["English (Native)", "Mandarin (Native)", "French (Conversational)"],
      profilePicture: "/placeholder.svg",
      verified: true,
      portfolio: [
        { title: "Fitness Tracking App", image: "/placeholder.svg", description: "Native iOS app with HealthKit integration" },
        { title: "Food Delivery Platform", image: "/placeholder.svg", description: "Cross-platform React Native application" }
      ],
      lastActive: "1 hour ago",
      successRate: 96
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      title: "Digital Marketing & Content Strategist",
      location: "Barcelona, Spain",
      rating: 4.9,
      reviewCount: 203,
      hourlyRate: "$45-65",
      availability: "available",
      skills: ["SEO", "Content Marketing", "Google Analytics", "Social Media", "PPC", "Email Marketing"],
      description: "Results-driven digital marketer with 6+ years helping businesses grow online presence. Managed $500K+ in ad spend with average 300% ROI. Specialized in B2B and SaaS marketing strategies.",
      completedJobs: 312,
      totalEarnings: "$125,800",
      responseTime: "Within 30 minutes",
      languages: ["Spanish (Native)", "English (Fluent)", "French (Intermediate)"],
      profilePicture: "/placeholder.svg",
      verified: true,
      portfolio: [
        { title: "SaaS Growth Campaign", image: "/placeholder.svg", description: "Increased MRR by 400% in 6 months" },
        { title: "E-commerce SEO Strategy", image: "/placeholder.svg", description: "Boosted organic traffic by 250%" }
      ],
      lastActive: "5 minutes ago",
      successRate: 99
    }
  ];

  const categories = [
    { label: "All Categories", value: "all" },
    { label: "Web Development", value: "web" },
    { label: "Mobile Development", value: "mobile" },
    { label: "UI/UX Design", value: "design" },
    { label: "Digital Marketing", value: "marketing" },
    { label: "Data Science", value: "data" },
    { label: "Content Writing", value: "writing" }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Top Talent</h1>
          <p className="text-gray-600">Discover skilled freelancers ready to bring your projects to life</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by skills, location, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Freelancer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {freelancers.map((freelancer) => (
            <Card key={freelancer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={freelancer.profilePicture}
                        alt={freelancer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {freelancer.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-teal-500 rounded-full p-1">
                          <Verified className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{freelancer.name}</h3>
                      <p className="text-sm text-gray-600">{freelancer.title}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(freelancer.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(freelancer.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {freelancer.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {freelancer.rating} ({freelancer.reviewCount})
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="text-lg font-semibold text-gray-900">
                    {freelancer.hourlyRate}/hr
                  </div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(freelancer.availability)}`}>
                    {freelancer.availability === "available" && "Available"}
                    {freelancer.availability === "busy" && "Busy"}
                    {freelancer.availability === "offline" && "Offline"}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {freelancer.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {freelancer.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {freelancer.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{freelancer.skills.length - 4} more
                    </Badge>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                  <div>
                    <div className="font-medium text-gray-900">{freelancer.completedJobs}</div>
                    <div className="text-xs">Jobs completed</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{freelancer.successRate}%</div>
                    <div className="text-xs">Success rate</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{freelancer.totalEarnings}</div>
                    <div className="text-xs">Total earned</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{freelancer.responseTime}</div>
                    <div className="text-xs">Response time</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>

                <div className="mt-3 text-xs text-gray-500">
                  Last active: {freelancer.lastActive}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Freelancers
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Talent;
