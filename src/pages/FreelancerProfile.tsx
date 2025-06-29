import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, Clock, Star, Users, Award, Eye, MessageCircle, 
  ThumbsUp, Calendar, DollarSign, CheckCircle, Badge as BadgeIcon,
  Download, ExternalLink, Heart, Share2, Flag, Camera,
  Briefcase, GraduationCap, Globe, Phone, Mail, Loader2
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface FreelancerData {
  id: string;
  name: string;
  title: string;
  avatar: string;
  coverImage: string;
  location: string;
  timezone: string;
  rating: number;
  reviews: number;
  completedJobs: number;
  totalEarned: string;
  successRate: number;
  responseTime: string;
  languages: Array<{ name: string; level: string }>;
  hourlyRate: string;
  availability: string;
  memberSince: string;
  lastActive: string;
  isOnline: boolean;
  verified: boolean;
  topRated: boolean;
  skills: Array<{ name: string; level: string; yearsOfExperience: number }>;
  overview: string;
  portfolio: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    url: string;
    client: string;
    completion: string;
  }>;
  workHistory: Array<{
    id: number;
    title: string;
    client: string;
    clientRating: number;
    budget: string;
    duration: string;
    completedDate: string;
    feedback: string;
    skills: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    period: string;
    description: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    url: string;
  }>;
  employment: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
  }>;
}

const FreelancerProfile = () => {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [freelancer, setFreelancer] = useState<FreelancerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFreelancerProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/profile/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch freelancer profile');
        }
        
        const result = await response.json();
        
        if (result.success) {
          console.log('Freelancer data received:', result.data);
          console.log('Response time:', result.data.responseTime);
          setFreelancer(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch freelancer profile');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFreelancerProfile();
    }
  }, [id]);

  const handleContact = () => {
    console.log("Contact freelancer");
  };

  const handleHire = () => {
    console.log("Hire freelancer");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-teal-600" />
          <p className="text-gray-600">Loading freelancer profile...</p>
        </div>
      </div>
    );
  }

  if (error || !freelancer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Freelancer not found'}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          {/* Cover Image */}
          <div 
            className="h-32 relative"
            style={{
              backgroundImage: freelancer.coverImage && freelancer.coverImage !== '/placeholder.svg' 
                ? `url(${freelancer.coverImage})` 
                : 'linear-gradient(to right, #14b8a6, #2563eb)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button variant="outline" size="sm" className="bg-white/90">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="bg-white/90">
                <Flag className="h-4 w-4 mr-1" />
                Report
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-start space-x-6 -mt-16 mb-6">
              <div className="relative">
                <img 
                  src={freelancer.avatar} 
                  alt={freelancer.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                {freelancer.isOnline && (
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
                {freelancer.topRated && (
                  <div className="absolute -top-1 -right-1">
                    <Award className="w-6 h-6 text-yellow-500 fill-current" />
                  </div>
                )}
              </div>

              <div className="flex-1 mt-16">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{freelancer.name}</h1>
                  {freelancer.verified && (
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                  )}
                  {freelancer.topRated && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <BadgeIcon className="w-3 h-3 mr-1" />
                      Top Rated
                    </Badge>
                  )}
                </div>
                
                <h2 className="text-xl text-gray-700 mb-4">{freelancer.title}</h2>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    {freelancer.rating} ({freelancer.reviews} reviews)
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {freelancer.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {freelancer.lastActive}
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                    {freelancer.completedJobs} jobs completed
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-2xl font-bold text-gray-900">{freelancer.hourlyRate}/hr</span>
                  <span className="text-green-600 font-medium">{freelancer.availability}</span>
                </div>
              </div>

              <div className="flex flex-col space-y-3 mt-16">
                <Button onClick={handleHire} className="bg-teal-600 hover:bg-teal-700">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Hire Now
                </Button>
                <Button variant="outline" onClick={handleContact}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={isFollowing ? "text-red-600 border-red-600" : ""}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-gray-900 break-words">{freelancer.totalEarned}</p>
                <p className="text-xs md:text-sm text-gray-600">Total Earned</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-gray-900">{freelancer.successRate}%</p>
                <p className="text-xs md:text-sm text-gray-600">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-lg md:text-2xl font-bold text-gray-900 break-words">
                  {freelancer.responseTime || 'N/A'}
                </p>
                <p className="text-xs md:text-sm text-gray-600">Response Time</p>
              </div>
              <div className="text-center">
                <p className="text-lg md:text-2xl font-bold text-gray-900 break-words">{freelancer.memberSince}</p>
                <p className="text-xs md:text-sm text-gray-600">Member Since</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="work-history">Work History</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* About */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
                  <div className="prose prose-gray max-w-none">
                    {freelancer.overview.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed break-words overflow-hidden whitespace-pre-wrap">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Skills</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {freelancer.skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-900">{skill.name}</span>
                          <p className="text-sm text-gray-600">{skill.yearsOfExperience} years experience</p>
                        </div>
                        <Badge variant={skill.level === 'Expert' ? 'default' : skill.level === 'Advanced' ? 'secondary' : 'outline'}>
                          {skill.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Education</h3>
                  <div className="space-y-4">
                    {freelancer.education.map((edu, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <GraduationCap className="h-5 w-5 text-gray-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                          <p className="text-gray-700">{edu.school}</p>
                          <p className="text-sm text-gray-600">{edu.period}</p>
                          <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Certifications</h3>
                  <div className="space-y-3">
                    {Array.isArray(freelancer.certifications) ? (
                      freelancer.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 break-words">{typeof cert === 'string' ? cert : cert.name || 'Unknown Certification'}</h4>
                            {typeof cert === 'object' && cert.issuer && (
                              <p className="text-sm text-gray-600">{cert.issuer} • {cert.date}</p>
                            )}
                          </div>
                          {typeof cert === 'object' && cert.url && (
                            <Button variant="outline" size="sm" className="ml-2 flex-shrink-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No certifications available</p>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Portfolio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {freelancer.portfolio.map((project) => (
                      <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{project.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>Client: {project.client}</span>
                            <span>{project.completion}</span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-3">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Project
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="work-history" className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Work History</h3>
                  <div className="space-y-6">
                    {freelancer.workHistory.map((work) => (
                      <div key={work.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{work.title}</h4>
                            <p className="text-gray-600">Client: {work.client}</p>
                            <p className="text-sm text-gray-600">{work.duration} • Completed {work.completedDate}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              {[...Array(Math.floor(work.clientRating))].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                              <span className="ml-1 text-sm font-medium">{work.clientRating}</span>
                            </div>
                            <p className="text-lg font-bold text-gray-900">{work.budget}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{work.feedback}</p>
                        <div className="flex flex-wrap gap-2">
                          {work.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Client Reviews</h3>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-bold">{freelancer.rating}</span>
                      <span className="text-gray-600">({freelancer.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {freelancer.workHistory.map((work) => (
                      <div key={work.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{work.client}</p>
                            <p className="text-sm text-gray-600">{work.title}</p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(Math.floor(work.clientRating))].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="ml-1 text-sm">{work.clientRating}</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{work.feedback}</p>
                        <p className="text-sm text-gray-500 mt-2">{work.completedDate}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{freelancer.timezone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <Button variant="link" className="p-0 text-teal-600">
                    Send Message
                  </Button>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
              <div className="space-y-2">
                {freelancer.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-700">{lang.name}</span>
                    <span className="text-gray-600 text-sm">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Employment History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment</h3>
              <div className="space-y-4">
                {freelancer.employment.map((job, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900">{job.position}</h4>
                    <p className="text-gray-600">{job.company}</p>
                    <p className="text-sm text-gray-600">{job.period}</p>
                    <p className="text-sm text-gray-700 mt-1">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">Identity Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">Payment Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">Email Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FreelancerProfile;
