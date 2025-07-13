import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, Star, Verified, Calendar, DollarSign, Eye, MessageCircle, Heart, Award, Shield, Clock, TrendingUp, Users, Globe, Briefcase, CheckCircle, Video, Phone, Mail } from "lucide-react";

import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { Progress } from "../components/ui/progress";
import { useAuth } from "../hooks/AuthContext";
import { useWebSocket } from "../hooks/socketContext";
import { Freelancer, TalentCategory, PlatformStats } from "../types";

const Talent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createConversation } = useWebSocket();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedHourlyRate, setSelectedHourlyRate] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [activeTab, setActiveTab] = useState("browse");
  const [contactingFreelancer, setContactingFreelancer] = useState<string | null>(null);
  
  // Data states
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats>({
    totalFreelancers: "0",
    averageRating: "0.0",
    successRate: 0,
    countriesCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  // Handle view profile navigation
  const handleViewProfile = (freelancerId: string) => {
    navigate(`/freelancer/${freelancerId}`);
  };

  // Fetch freelancers
  const fetchFreelancers = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(selectedAvailability !== 'all' && { availability: selectedAvailability }),
        ...(selectedRating !== 'all' && { rating: selectedRating }),
        ...(selectedHourlyRate !== 'all' && { hourlyRate: selectedHourlyRate })
      });

      const response = await fetch(`/api/talent?${params}`);
      const data = await response.json();

      if (data.success) {
        setFreelancers(data.data);
        setPagination(data.pagination);
      } else {
        setError('Failed to fetch freelancers');
      }
    } catch (err) {
      setError('Failed to fetch freelancers');
      console.error('Error fetching freelancers:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch platform stats
  const fetchPlatformStats = async () => {
    try {
      const response = await fetch('/api/talent/stats');
      const data = await response.json();

      if (data.success) {
        setPlatformStats(data.data);
      }
    } catch (err) {
      console.error('Error fetching platform stats:', err);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/talent/categories');
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Fetch saved freelancers
  const fetchSavedFreelancers = async () => {
    if (!user) return;
    
    try {
      const response = await fetch('/api/talent/saved');
      const data = await response.json();

      if (data.success) {
        setFreelancers(data.data);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error('Error fetching saved freelancers:', err);
    }
  };

  // Fetch hired freelancers
  const fetchHiredFreelancers = async () => {
    if (!user) return;
    
    try {
      const response = await fetch('/api/talent/hired');
      const data = await response.json();

      if (data.success) {
        setFreelancers(data.data);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error('Error fetching hired freelancers:', err);
    }
  };

  // Save/unsave freelancer
  const toggleFavorite = async (freelancerId: string) => {
    if (!user) return;

    try {
      if (favorites.includes(freelancerId)) {
        // Remove from saved
        const response = await fetch(`/api/talent/save/${freelancerId}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        
        if (response.ok) {
          setFavorites(prev => prev.filter(id => id !== freelancerId));
          console.log('Removed from favorites:', freelancerId);
        } else {
          console.error('Failed to remove from favorites');
        }
      } else {
        // Add to saved
        const response = await fetch(`/api/talent/save/${freelancerId}`, {
          method: 'POST',
          credentials: 'include'
        });
        
        if (response.ok) {
          setFavorites(prev => [...prev, freelancerId]);
          console.log('Added to favorites:', freelancerId);
        } else {
          console.error('Failed to add to favorites');
        }
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'browse') {
      fetchFreelancers();
    } else if (tab === 'saved') {
      fetchSavedFreelancers();
    } else if (tab === 'hired') {
      fetchHiredFreelancers();
    }
  };

  // Handle contact freelancer
  const handleContactFreelancer = async (freelancer: Freelancer) => {
    if (!user) {
      alert('Please log in to contact freelancers');
      return;
    }

    setContactingFreelancer(freelancer.id);
    
    try {
      // Create conversation with the freelancer
      const conversationId = await createConversation(
        freelancer.email || `${freelancer.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        `Project with ${freelancer.name}`
      );

      if (conversationId) {
        // Navigate to messages page with the new conversation
        navigate(`/messages/${conversationId}`);
      } else {
        alert('Failed to create conversation. Please try again.');
      }
    } catch (error) {
      console.error('Error contacting freelancer:', error);
      alert('Failed to contact freelancer. Please try again.');
    } finally {
      setContactingFreelancer(null);
    }
  };

  // Load saved favorites on mount
  useEffect(() => {
    if (user) {
      fetch('/api/talent/saved', {
        credentials: 'include'
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          if (data.success) {
            const savedIds = data.data.map((f: Freelancer) => f.id);
            setFavorites(savedIds);
            console.log('Loaded saved freelancers:', savedIds.length);
          }
        })
        .catch(err => {
          console.error('Error fetching saved freelancers:', err);
          // If there's an error, set favorites to empty array
          setFavorites([]);
        });
    } else {
      // If no user, clear favorites
      setFavorites([]);
    }
  }, [user]);

  // Debug log for favorites state
  useEffect(() => {
    console.log('Favorites state updated:', favorites.length, favorites);
  }, [favorites]);

  // Initial data fetch
  useEffect(() => {
    fetchFreelancers();
    fetchPlatformStats();
    fetchCategories();
  }, []);

  // Refetch when filters change
  useEffect(() => {
    if (activeTab === 'browse') {
      fetchFreelancers(1);
    }
  }, [searchTerm, selectedCategory, selectedAvailability, selectedRating, selectedHourlyRate]);

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

  if (loading && freelancers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading talent...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
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
                  <div className="text-2xl font-bold text-gray-900">{platformStats.totalFreelancers}+</div>
                  <div className="text-sm text-gray-600">Verified professionals</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{platformStats.averageRating}/5</div>
                  <div className="text-sm text-gray-600">Average rating</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{platformStats.successRate}%</div>
                  <div className="text-sm text-gray-600">Project success rate</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <Globe className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{platformStats.countriesCount}</div>
                  <div className="text-sm text-gray-600">Countries represented</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search Section */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-96">
              <TabsTrigger value="browse">Browse Talent</TabsTrigger>
              <TabsTrigger value="saved">Saved ({favorites.length})</TabsTrigger>
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
                          <Button 
                            size="sm" 
                            className="flex-1 bg-teal-600 hover:bg-teal-700"
                            onClick={() => handleContactFreelancer(freelancer)}
                            disabled={contactingFreelancer === freelancer.id}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            {contactingFreelancer === freelancer.id ? 'Contacting...' : 'Contact'}
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewProfile(freelancer.id)}>
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

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => fetchFreelancers(pagination.page - 1)}
                      disabled={pagination.page === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          variant={pagination.page === pageNum ? "default" : "outline"}
                          onClick={() => fetchFreelancers(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    <Button
                      variant="outline"
                      onClick={() => fetchFreelancers(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="saved" className="mt-6">
              {freelancers.length > 0 ? (
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
                            <Button 
                              size="sm" 
                              className="flex-1 bg-teal-600 hover:bg-teal-700"
                              onClick={() => handleContactFreelancer(freelancer)}
                              disabled={contactingFreelancer === freelancer.id}
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              {contactingFreelancer === freelancer.id ? 'Contacting...' : 'Contact'}
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewProfile(freelancer.id)}>
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
              ) : (
                <div className="text-center py-16">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No saved freelancers yet</h3>
                  <p className="text-gray-500">Save freelancers you're interested in to easily find them later.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="hired" className="mt-6">
              {freelancers.length > 0 ? (
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
                            <Button 
                              size="sm" 
                              className="flex-1 bg-teal-600 hover:bg-teal-700"
                              onClick={() => handleContactFreelancer(freelancer)}
                              disabled={contactingFreelancer === freelancer.id}
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              {contactingFreelancer === freelancer.id ? 'Contacting...' : 'Contact'}
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewProfile(freelancer.id)}>
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
              ) : (
                <div className="text-center py-16">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No previous hires</h3>
                  <p className="text-gray-500">Freelancers you've worked with will appear here for easy re-hiring.</p>
                </div>
              )}
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