
import { useState } from "react";
import { Search, Filter, MapPin, Clock, DollarSign, Bookmark, Eye, Users, Star, Award, AlertCircle, Calendar, Building, Globe, ChevronDown } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import JobCard from "../components/cards/JobCard";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedJobType, setSelectedJobType] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const categories = [
    { value: "all", label: "All Categories", count: 1247 },
    { value: "web-dev", label: "Web Development", count: 342 },
    { value: "mobile-dev", label: "Mobile Development", count: 198 },
    { value: "design", label: "Design & Creative", count: 256 },
    { value: "writing", label: "Writing & Translation", count: 189 },
    { value: "marketing", label: "Digital Marketing", count: 167 },
    { value: "data-science", label: "Data Science & AI", count: 95 }
  ];

  const jobTypes = [
    { value: "all", label: "All Types" },
    { value: "fixed", label: "Fixed Price" },
    { value: "hourly", label: "Hourly Rate" },
    { value: "contract", label: "Contract" }
  ];

  const experienceLevels = [
    { value: "all", label: "All Levels" },
    { value: "entry", label: "Entry Level" },
    { value: "intermediate", label: "Intermediate" },
    { value: "expert", label: "Expert" }
  ];

  const budgetRanges = [
    { value: "all", label: "Any Budget" },
    { value: "0-500", label: "Less than $500" },
    { value: "500-1000", label: "$500 - $1,000" },
    { value: "1000-5000", label: "$1,000 - $5,000" },
    { value: "5000+", label: "$5,000+" }
  ];

  const mockJobs = [
    {
      id: 1,
      title: "Full-Stack E-commerce Platform Development",
      description: "We're looking for an experienced full-stack developer to build a comprehensive e-commerce platform from scratch. The project involves creating a modern, responsive web application with advanced features including user authentication, payment processing, inventory management, and admin dashboard. The ideal candidate should have expertise in React.js, Node.js, and database management.",
      budget: "$4,500 - $8,000",
      budgetType: "fixed",
      duration: "2-3 months",
      skills: ["React", "Node.js", "MongoDB", "Stripe", "AWS", "TypeScript", "Redux"],
      client: {
        name: "TechCorp Solutions",
        rating: 4.8,
        jobsPosted: 23,
        location: "San Francisco, CA",
        verified: true,
        memberSince: "2019",
        totalSpent: "$125,000+"
      },
      postedTime: "2 hours ago",
      proposals: 12,
      category: "web-dev",
      experienceLevel: "expert",
      paymentVerified: true,
      urgent: false,
      featured: true,
      projectType: "Large Project",
      estimatedHoursPerWeek: "40+ hrs/week",
      connectsRequired: 6
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design - Food Delivery Platform",
      description: "Need a talented UI/UX designer to create stunning, user-friendly mobile app interfaces for both iOS and Android platforms. The app is a food delivery service similar to UberEats. We need wireframes, high-fidelity mockups, interactive prototypes, and a complete design system. Experience with food delivery or similar marketplace apps is a plus.",
      budget: "$2,500 - $4,000", 
      budgetType: "fixed",
      duration: "1-2 months",
      skills: ["Figma", "UI/UX Design", "Mobile Design", "Prototyping", "Design Systems", "User Research"],
      client: {
        name: "FoodieHub Startup",
        rating: 4.6,
        jobsPosted: 8,
        location: "Austin, TX",
        verified: true,
        memberSince: "2021",
        totalSpent: "$35,000+"
      },
      postedTime: "5 hours ago",
      proposals: 28,
      category: "design",
      experienceLevel: "intermediate",
      paymentVerified: true,
      urgent: true,
      featured: false,
      projectType: "Medium Project",
      estimatedHoursPerWeek: "20-30 hrs/week",
      connectsRequired: 4
    },
    {
      id: 3,
      title: "AI-Powered Content Writing for Tech Blog",
      description: "Seeking a skilled technical content writer to create engaging, SEO-optimized articles about emerging technologies, AI, blockchain, and software development trends. You'll be working with our marketing team to produce 8-10 high-quality articles per month. Each article should be 2000-3000 words with proper research, citations, and technical accuracy.",
      budget: "$75 - $150/article",
      budgetType: "hourly",
      duration: "3-6 months",
      skills: ["Technical Writing", "SEO", "AI/ML", "Blockchain", "Content Strategy", "Research"],
      client: {
        name: "Digital Insights Media",
        rating: 4.9,
        jobsPosted: 45,
        location: "Remote Worldwide",
        verified: true,
        memberSince: "2018",
        totalSpent: "$85,000+"
      },
      postedTime: "1 day ago",
      proposals: 19,
      category: "writing",
      experienceLevel: "intermediate",
      paymentVerified: true,
      urgent: false,
      featured: true,
      projectType: "Ongoing Project",
      estimatedHoursPerWeek: "10-20 hrs/week",
      connectsRequired: 2
    },
    {
      id: 4,
      title: "React Native App Development - Fitness Tracking",
      description: "Looking for a React Native developer to build a comprehensive fitness tracking mobile application. The app should include features like workout logging, progress tracking, social features, integration with wearable devices, and real-time analytics. Prior experience with health/fitness apps and third-party API integrations is essential.",
      budget: "$6,000 - $12,000",
      budgetType: "fixed",
      duration: "3-4 months",
      skills: ["React Native", "JavaScript", "Firebase", "Health APIs", "Redux", "Push Notifications"],
      client: {
        name: "FitTech Innovations",
        rating: 4.7,
        jobsPosted: 12,
        location: "London, UK",
        verified: true,
        memberSince: "2020",
        totalSpent: "$75,000+"
      },
      postedTime: "3 hours ago",
      proposals: 8,
      category: "mobile-dev",
      experienceLevel: "expert",
      paymentVerified: true,
      urgent: false,
      featured: false,
      projectType: "Large Project",
      estimatedHoursPerWeek: "30-40 hrs/week",
      connectsRequired: 6
    }
  ];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    const matchesJobType = selectedJobType === "all" || job.budgetType === selectedJobType;
    const matchesExperience = selectedExperience === "all" || job.experienceLevel === selectedExperience;
    
    return matchesSearch && matchesCategory && matchesJobType && matchesExperience;
  });

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getUrgencyBadge = (urgent: boolean) => {
    if (!urgent) return null;
    return (
      <Badge variant="destructive" className="ml-2">
        <AlertCircle className="h-3 w-3 mr-1" />
        Urgent
      </Badge>
    );
  };

  const getFeaturedBadge = (featured: boolean) => {
    if (!featured) return null;
    return (
      <Badge className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-300">
        <Award className="h-3 w-3 mr-1" />
        Featured
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Enhanced Stats */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Next Project</h1>
              <p className="text-lg text-gray-600">Discover opportunities that match your skills and grow your career</p>
            </div>
            <div className="text-right">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-teal-600">1,247</div>
                <div className="text-sm text-gray-600">Active Jobs</div>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <div className="text-lg font-semibold text-gray-900">$2.5M+</div>
                  <div className="text-sm text-gray-600">Paid this month</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <div className="text-lg font-semibold text-gray-900">15,000+</div>
                  <div className="text-sm text-gray-600">Active freelancers</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <div className="text-lg font-semibold text-gray-900">5,200+</div>
                  <div className="text-sm text-gray-600">Companies hiring</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <Globe className="h-8 w-8 text-teal-600 mr-3" />
                <div>
                  <div className="text-lg font-semibold text-gray-900">180+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by skills, title, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white min-w-[200px]"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label} ({category.count})
                    </option>
                  ))}
                </select>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center h-12 px-6"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select
                    value={selectedJobType}
                    onChange={(e) => setSelectedJobType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {jobTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {experienceLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {budgetRanges.map(range => (
                      <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="all">Any Duration</option>
                    <option value="short">Less than 1 month</option>
                    <option value="medium">1-3 months</option>
                    <option value="long">3+ months</option>
                    <option value="ongoing">Ongoing</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Results Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:w-80">
            <div className="space-y-6">
              {/* Saved Jobs */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Bookmark className="h-5 w-5 mr-2 text-teal-600" />
                  Saved Jobs ({savedJobs.length})
                </h3>
                <Button variant="outline" className="w-full">
                  View All Saved Jobs
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Recently Viewed
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    My Proposals
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    Recommended for You
                  </Button>
                </div>
              </div>

              {/* Job Alerts */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-4">Job Alerts</h3>
                <p className="text-sm text-gray-600 mb-4">Get notified when new jobs match your criteria</p>
                <Button className="w-full">
                  Create Job Alert
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Job Listings */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <p className="text-gray-600">
                  <span className="font-semibold">{filteredJobs.length}</span> jobs found
                </p>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">View:</span>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    List
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    Grid
                  </Button>
                </div>
              </div>
              <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white">
                <option>Newest First</option>
                <option>Highest Budget</option>
                <option>Most Relevant</option>
                <option>Fewest Proposals</option>
                <option>Client Rating</option>
              </select>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-1 xl:grid-cols-2 gap-6" : "space-y-6"}>
              {filteredJobs.map(job => (
                <Card key={job.id} className="hover:shadow-lg transition-all duration-200 border hover:border-teal-200">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 hover:text-teal-600 cursor-pointer line-clamp-2">
                            {job.title}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSaveJob(job.id)}
                            className="ml-2 text-gray-400 hover:text-teal-600"
                          >
                            <Bookmark className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-teal-600 text-teal-600' : ''}`} />
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge className="bg-teal-100 text-teal-800 border-teal-200">
                            {job.budgetType === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}
                          </Badge>
                          <Badge variant="outline">
                            {job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)}
                          </Badge>
                          {getFeaturedBadge(job.featured)}
                          {getUrgencyBadge(job.urgent)}
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.slice(0, 6).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 6 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.skills.length - 6} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                        <span className="font-semibold text-gray-900">{job.budget}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1 text-blue-600" />
                        <span>{job.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-1 text-purple-600" />
                        <span>{job.proposals} proposals</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1 text-orange-600" />
                        <span>{job.postedTime}</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Client Information */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                            <Building className="h-4 w-4 text-teal-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">{job.client.name}</h4>
                            <div className="flex items-center text-xs text-gray-600">
                              <Star className="h-3 w-3 text-yellow-500 mr-1 fill-current" />
                              <span>{job.client.rating}</span>
                              <span className="mx-1">•</span>
                              <span>{job.client.jobsPosted} jobs posted</span>
                              {job.client.verified && (
                                <>
                                  <span className="mx-1">•</span>
                                  <Badge variant="outline" className="text-xs px-1 py-0">
                                    Verified
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 text-right">
                          <div>Member since {job.client.memberSince}</div>
                          <div>{job.client.totalSpent} spent</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{job.client.location}</span>
                        {job.paymentVerified && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="text-green-600 font-medium">Payment Verified</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        <span>{job.connectsRequired} connects required</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                          Submit Proposal
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search criteria or filters to find more opportunities.
                  </p>
                  <Button onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedJobType("all");
                    setSelectedExperience("all");
                  }}>
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
