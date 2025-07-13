import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, MapPin, Clock, DollarSign, Bookmark, Eye, Users, Star, Award, AlertCircle, Calendar, Building, Globe, ChevronDown, Loader2 } from "lucide-react";
import axios from "axios";

import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import JobCard from "../components/cards/JobCard";
import { useAuth } from "../hooks/AuthContext";

// Types for backend data
interface Job {
  id: string;
  title: string;
  description: string;

  budget: 'FIXED' | 'HOURLY';
  minBudget?: number;
  maxBudget?: number;
  duration?: string;
  skills: string[];
  category: string;
  subcategory?: string;
  projectType?: string;
  experienceLevel?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  visibility: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    companyName?: string;
    location?: string;
    verified: boolean;
    createdAt: string;
  };
  _count: {
    proposals: number;
  };
}

interface Category {
  value: string;
  label: string;
  count: number;
}

const Jobs = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedJobType, setSelectedJobType] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  
  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [jobsPerPage] = useState(10);
  
  const [categories, setCategories] = useState<Category[]>([
    { value: "all", label: "All Categories", count: 0 },
    { value: "web-dev", label: "Web Development", count: 0 },
    { value: "mobile-dev", label: "Mobile Development", count: 0 },
    { value: "design", label: "Design & Creative", count: 0 },
    { value: "writing", label: "Writing & Translation", count: 0 },
    { value: "marketing", label: "Digital Marketing", count: 0 },
    { value: "data-science", label: "Data Science & AI", count: 0 }
  ]);

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

  // Fetch jobs from backend
  const fetchJobs = async (page = 1) => {
    try {
      setJobsLoading(true);
      setJobsError(null);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: jobsPerPage.toString(),
        search: searchTerm,
        category: selectedCategory !== 'all' ? selectedCategory : '',
        jobType: selectedJobType !== 'all' ? selectedJobType : '',
        experience: selectedExperience !== 'all' ? selectedExperience : '',
        budget: selectedBudget !== 'all' ? selectedBudget : '',
        duration: selectedDuration !== 'all' ? selectedDuration : ''
      });
      
      const response = await axios.get(`/jobs?${params}`);
      
      if (response.data.success) {
        setJobs(response.data.data);
        setTotalJobs(response.data.total || response.data.data.length);
        setTotalPages(response.data.totalPages || Math.ceil((response.data.total || response.data.data.length) / jobsPerPage));
        setCurrentPage(page);
        
        // Update category counts if available
        if (response.data.categoryCounts) {
          setCategories(prev => prev.map(cat => ({
            ...cat,
            count: cat.value === "all" ? response.data.total : (response.data.categoryCounts[cat.value] || 0)
          })));
        } else {
          // Fallback to calculating from current data
          const categoryCounts = response.data.data.reduce((acc: Record<string, number>, job: Job) => {
            const category = job.category.toLowerCase().replace(/\s+/g, '-');
            acc[category] = (acc[category] || 0) + 1;
            return acc;
          }, {});
          
          setCategories(prev => prev.map(cat => ({
            ...cat,
            count: cat.value === "all" ? response.data.total : (categoryCounts[cat.value] || 0)
          })));
        }
      } else {
        setJobsError('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobsError('Failed to fetch jobs');
    } finally {
      setJobsLoading(false);
    }
  };

  // Format budget display
  const formatBudget = (job: Job) => {
    if (job.projectType === 'fixed') {
      if (job.minBudget && job.maxBudget && job.minBudget !== job.maxBudget) {
        return `$${job.minBudget.toLocaleString()} - $${job.maxBudget.toLocaleString()}`;
      } else if (job.minBudget) {
        return `$${job.minBudget.toLocaleString()}`;
      }
    } else if (job.projectType === 'hourly') {
      if (job.minBudget && job.maxBudget && job.minBudget !== job.maxBudget) {
        return `$${job.minBudget} - $${job.maxBudget}/hour`;
      } else if (job.minBudget) {
        return `$${job.minBudget}/hour`;
      }
    }
    return 'Budget not specified';
  };

  // Format posted time
  const formatPostedTime = (createdAt: string) => {
    const now = new Date();
    const posted = new Date(createdAt);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    
    return posted.toLocaleDateString();
  };

  // Get client name
  const getClientName = (job: Job) => {
    if (job.client.companyName) {
      return job.client.companyName;
    }
    return `${job.client.firstName} ${job.client.lastName}`;
  };

  // Get client location
  const getClientLocation = (job: Job) => {
    if (job.client.location) {
      return job.client.location;
    }
    if (job.location) {
      return job.location;
    }
    return 'Remote';
  };

  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || 
                           job.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    
    const matchesJobType = selectedJobType === "all" || 
                          (selectedJobType === "fixed" && job.projectType === "fixed") ||
                          (selectedJobType === "hourly" && job.projectType === "hourly");
    
    const matchesExperience = selectedExperience === "all" || 
                             job.experienceLevel?.toLowerCase() === selectedExperience;
    
    // Budget filtering
    let matchesBudget = true;
    if (selectedBudget !== "all") {
      const jobBudget = job.minBudget || job.maxBudget || 0;
      switch (selectedBudget) {
        case "0-500":
          matchesBudget = jobBudget <= 500;
          break;
        case "500-1000":
          matchesBudget = jobBudget >= 500 && jobBudget <= 1000;
          break;
        case "1000-5000":
          matchesBudget = jobBudget >= 1000 && jobBudget <= 5000;
          break;
        case "5000+":
          matchesBudget = jobBudget >= 5000;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesJobType && matchesExperience && matchesBudget;
  });

  // Load jobs on component mount
  useEffect(() => {
    fetchJobs(1);
  }, []);

  // Handle pagination
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchJobs(page);
    }
  };

  // Handle filter changes
  useEffect(() => {
    fetchJobs(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, selectedJobType, selectedExperience, selectedBudget, selectedDuration]);

  const toggleSaveJob = (jobId: string) => {
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
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        {/* Header with Enhanced Stats */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Next Project</h1>
              <p className="text-lg text-gray-600">Discover opportunities that match your skills and grow your career</p>
            </div>
            <div className="text-right">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-teal-600">{jobs.length}</div>
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

            <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "space-y-6"}>
              {jobsLoading ? (
                <div className="col-span-full flex items-center justify-center py-16">
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-teal-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading jobs...</p>
                  </div>
                </div>
              ) : jobsError ? (
                <div className="col-span-full text-center py-16">
                  <div className="max-w-md mx-auto">
                    <AlertCircle className="h-16 w-16 text-red-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading jobs</h3>
                    <p className="text-gray-500 mb-6">{jobsError}</p>
                    <Button onClick={() => fetchJobs(currentPage)} variant="outline">
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="col-span-full text-center py-16">
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
              ) : (
                filteredJobs.map(job => (
                  <Card key={job.id} className="hover:shadow-lg transition-all duration-200 border hover:border-teal-200 overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <Link to={`/jobs/${job.id}`} className="flex-1 min-w-0">
                              <h3 className="text-xl font-semibold text-gray-900 hover:text-teal-600 cursor-pointer leading-tight mb-2 break-words hyphens-auto">
                                {job.title}
                              </h3>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleSaveJob(job.id)}
                              className="text-gray-400 hover:text-teal-600 flex-shrink-0 ml-2"
                            >
                              <Bookmark className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-teal-600 text-teal-600' : ''}`} />
                            </Button>
                          </div>
                          
                          <div className="flex items-center flex-wrap gap-2 mb-3">
                            <Badge className="bg-teal-100 text-teal-800 border-teal-200">
                              {job.projectType === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}
                            </Badge>
                            {job.experienceLevel && (
                              <Badge variant="outline">
                                {job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)}
                              </Badge>
                            )}
                            {job.isUrgent && (
                              <Badge variant="destructive">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Urgent
                              </Badge>
                            )}
                          </div>

                          {/* Enhanced description handling */}
                          <div className="mb-4">
                            <p className="text-gray-600 text-sm leading-relaxed break-words hyphens-auto">
                              {job.description.length > 200 
                                ? `${job.description.substring(0, 200)}...` 
                                : job.description
                              }
                            </p>
                            {job.description.length > 200 && (
                              <Link to={`/jobs/${job.id}`} className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                                Read more
                              </Link>
                            )}
                          </div>

                          {/* Skills with better wrapping */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.slice(0, 5).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs whitespace-nowrap">
                                {skill.length > 15 ? `${skill.substring(0, 15)}...` : skill}
                              </Badge>
                            ))}
                            {job.skills.length > 5 && (
                              <Badge variant="outline" className="text-xs whitespace-nowrap">
                                +{job.skills.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {/* Improved grid layout for job details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                        <div className="flex items-center text-gray-600 min-w-0">
                          <DollarSign className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                          <span className="font-semibold text-gray-900 truncate">
                            {formatBudget(job)}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 min-w-0">
                          <Clock className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                          <span className="truncate">{job.duration || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-purple-600 flex-shrink-0" />
                          <span>{job._count.proposals} proposal{job._count.proposals !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center text-gray-600 min-w-0">
                          <Calendar className="h-4 w-4 mr-2 text-orange-600 flex-shrink-0" />
                          <span className="truncate">{formatPostedTime(job.createdAt)}</span>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      {/* Client Information with better alignment */}
                      <div className="mb-4">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                            {job.client.avatar ? (
                              <img 
                                src={job.client.avatar} 
                                alt={getClientName(job)} 
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <Building className="h-5 w-5 text-teal-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-gray-900 text-sm break-words leading-tight">
                                  {getClientName(job)}
                                </h4>
                                <div className="flex items-center flex-wrap gap-1 text-xs text-gray-600 mt-1">
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 text-yellow-500 mr-1 fill-current flex-shrink-0" />
                                    <span>4.5</span>
                                  </div>
                                  <span>•</span>
                                  <span>{job._count.proposals} reviews</span>
                                  {job.client.verified && (
                                    <>
                                      <span>•</span>
                                      <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                                        ✓ Verified
                                      </Badge>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 text-right flex-shrink-0 ml-2">
                                <div>Since {new Date(job.client.createdAt).getFullYear()}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-xs text-gray-600 ml-13">
                          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="break-words">{getClientLocation(job)}</span>
                          {job.isRemote && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="text-blue-600 font-medium">Remote OK</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action buttons with better responsive layout */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="text-xs text-gray-500">
                          <span>Connects required: {Math.max(1, Math.ceil(job._count.proposals / 10))}</span>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Link to={`/jobs/${job.id}`} className="flex-1 sm:flex-none">
                          <Button size="sm" className="bg-teal-600 hover:bg-teal-700 flex-1 sm:flex-none">
                            <Eye className="h-4 w-4 mr-1" />
                              View Details
                          </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </Button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                
                <Button 
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
              
              {/* Page info */}
              <div className="ml-6 text-sm text-gray-600">
                Page {currentPage} of {totalPages} • {totalJobs} total jobs
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