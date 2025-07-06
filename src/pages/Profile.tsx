import { useState, useEffect } from "react";
import { Edit, Camera, MapPin, Star, Calendar, DollarSign, Award, Users, Clock, CheckCircle, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { useAuth } from "../hooks/AuthContext";
import EditProfileModal from "../components/modals/EditProfileModal";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  location: string;
  country: string;
  city: string;
  timezone: string;
  joinDate: string;
  profilePicture: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  totalEarnings: string;
  successRate: number;
  responseTime: string;
  availability: string;
  description: string;
  skills: (string | { name: string })[];
  languages: (string | { language: string; proficiency: string })[];
  hourlyRate: string;
  phone?: string;
  coverImage?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    website?: string;
    twitter?: string;
  };
  education: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
  portfolio: Array<{
    title: string;
    description: string;
    image: string;
    images?: string[];
    technologies: string[];
    link: string;
    category?: string;
    completionDate?: string;
    clientFeedback?: string;
    role?: string;
    duration?: string;
    client?: string;
    budget?: string;
    projectType?: string;
    challenges?: string;
    outcomes?: string;
  }>;
  workHistory: Array<{
    title: string;
    client: string;
    duration: string;
    description: string;
    rating: number;
    feedback: string;
  }>;
  workExperience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  reviews: Array<{
    client: string;
    rating: number;
    date: string;
    project: string;
    comment: string;
  }>;
}

// Add explicit types for all mapped fields
interface Skill {
  name: string;
  category?: string;
  level?: string;
  yearsOfExperience?: number;
}

interface Language {
  language: string;
  proficiency: string;
}

interface Education {
  degree: string;
  institution?: string;
  school?: string;
  year: string;
  endDate?: string;
  startDate?: string;
}

interface Certification {
  name: string;
  issuer?: string;
  year?: string;
}

interface PortfolioItem {
  title: string;
  description: string;
  image: string;
  images?: string[];
  technologies: string[];
  link: string;
  category?: string;
  completionDate?: string;
  clientFeedback?: string;
  role?: string;
  duration?: string;
  client?: string;
  budget?: string;
  projectType?: string;
  challenges?: string;
  outcomes?: string;
}

interface BackendPortfolioItem {
  title: string;
  description: string;
  image: string;
  images?: string[];
  technologies: string[];
  link?: string;
  url?: string;
  liveUrl?: string;
  sourceUrl?: string;
  category?: string;
  completionDate?: string;
  clientFeedback?: string;
  role?: string;
  duration?: string;
  client?: string;
  budget?: string;
  projectType?: string;
  challenges?: string;
  outcomes?: string;
}

interface WorkExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

// Add Review type for fetchReviews
interface Review {
  author: {
    firstName: string;
    lastName: string;
  };
  rating: number;
  createdAt: string;
  job?: {
    title?: string;
  };
  comment: string;
}

// Enhanced ExpandableText component
const ExpandableText = ({ text, maxLength = 200, className = "" }: { 
  text: string; 
  maxLength?: number; 
  className?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Handle empty or undefined text
  if (!text || text.trim().length === 0) {
    return <p className={`text-gray-500 italic ${className}`}>No description available</p>;
  }
  
  // Clean the text and handle line breaks
  const cleanText = text.trim();
  
  if (cleanText.length <= maxLength) {
    return <p className={`whitespace-pre-wrap break-words ${className}`}>{cleanText}</p>;
  }
  
  // Find a good breaking point (end of sentence or word)
  const truncateAt = (str: string, length: number) => {
    if (str.length <= length) return str;
    
    // Try to break at sentence end
    const sentenceEnd = str.substring(0, length).lastIndexOf('. ');
    if (sentenceEnd > length * 0.7) {
      return str.substring(0, sentenceEnd + 1);
    }
    
    // Try to break at word boundary
    const wordEnd = str.substring(0, length).lastIndexOf(' ');
    if (wordEnd > length * 0.8) {
      return str.substring(0, wordEnd);
    }
    
    // Fallback to character limit
    return str.substring(0, length);
  };
  
  const truncatedText = truncateAt(cleanText, maxLength);
  
  return (
    <div className={className}>
      <p className="whitespace-pre-wrap break-words leading-relaxed">
        {isExpanded ? cleanText : truncatedText + (truncatedText !== cleanText ? '...' : '')}
      </p>
      {truncatedText !== cleanText && (
        <Button
          variant="link"
          className="p-0 h-auto text-blue-600 hover:text-blue-800 mt-2 text-sm font-medium"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </Button>
      )}
    </div>
  );
};

// 1. Enhanced Loading State with Skeleton Components
const ProfileSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header Skeleton */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse flex-shrink-0"></div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded animate-pulse w-64"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-48"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-36"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center space-y-2">
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs Skeleton */}
      <div className="space-y-6">
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// 2. Enhanced Error State with Retry and Navigation Options
const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center bg-white rounded-lg shadow-sm p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <ExternalLink className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Profile</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Button onClick={onRetry} className="w-full sm:w-auto">
              Try Again
            </Button>
            <div className="text-sm text-gray-500">
              or{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto text-blue-600"
                onClick={() => navigate('/dashboard')}
              >
                return to dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// 3. Enhanced Empty States for Each Tab
const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionText = "Add New",
  onAction 
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}) => (
  <div className="text-center py-12 px-4">
    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
      <Icon className="h-8 w-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>
    {onAction && (
      <Button onClick={onAction} variant="outline">
        {actionText}
      </Button>
    )}
  </div>
);

// 4. Improved Profile Header with Better Visual Hierarchy
const ProfileHeader = ({ userProfile, onEditClick }: { userProfile: UserProfile; onEditClick: () => void }) => {
  const navigate = useNavigate();
  
  const handleViewPublicProfile = () => {
    navigate(`/freelancer/${userProfile.id}`);
  };
  
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative w-32 h-32 flex-shrink-0">
            <img
              src={userProfile.profilePicture}
              alt={`${userProfile.firstName} ${userProfile.lastName}`}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg bg-gray-100"
              style={{ 
                objectPosition: 'center',
                minWidth: '128px',
                minHeight: '128px'
              }}
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
            <Button size="sm" className="absolute top-0 right-0 rounded-full bg-white shadow-lg p-2 border border-gray-200 hover:bg-gray-50 z-10">
              <Camera className="h-4 w-4 text-gray-700" />
            </Button>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {userProfile.firstName} {userProfile.lastName}
                  </h1>
                  {userProfile.rating > 4.5 && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Top Rated
                    </Badge>
                  )}
                </div>
                <p className="text-xl text-gray-600 mb-2">{userProfile.title}</p>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  {userProfile.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Member since {userProfile.joinDate}
                </div>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button variant="outline" size="sm" onClick={handleViewPublicProfile}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Public Profile
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Share Profile
                </Button>
                <Button onClick={onEditClick}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-center mb-1">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-semibold">{userProfile.rating}</span>
              </div>
              <div className="text-sm text-gray-600">{userProfile.reviewCount} reviews</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg border">
              <div className="font-semibold">{userProfile.completedJobs}</div>
              <div className="text-sm text-gray-600">Jobs completed</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg border">
              <div className="font-semibold">{userProfile.successRate}%</div>
              <div className="text-sm text-gray-600">Success rate</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg border">
              <div className="font-semibold">{userProfile.totalEarnings}</div>
              <div className="text-sm text-gray-600">Total earned</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Response time: {userProfile.responseTime}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              {userProfile.hourlyRate}/hour
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              {userProfile.availability}
            </div>
          </div>

          <div className="text-gray-700 leading-relaxed max-w-none">
            <ExpandableText 
              text={userProfile.description} 
              maxLength={300}
              className="text-base"
            />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
  );
};

// 5. Enhanced Tabs with Better Spacing and Animation
const ProfileTabs = ({ userProfile, onEditClick }: { userProfile: UserProfile; onEditClick: (tab?: string) => void }) => {
  const navigate = useNavigate();
  
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="portfolio">Portfolio ({userProfile.portfolio.length})</TabsTrigger>
        <TabsTrigger value="work-experience">Experience</TabsTrigger>
        <TabsTrigger value="work-history">Work History</TabsTrigger>
        <TabsTrigger value="reviews">Reviews ({userProfile.reviews.length})</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
      </TabsList>

      {/* Tab Contents with better empty states */}
      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills Card */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              {userProfile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {typeof skill === 'string' ? skill : skill.name || 'Unknown Skill'}
                    </Badge>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Award}
                  title="No skills added yet"
                  description="Add your skills to help clients find you for relevant projects"
                  actionText="Add Skills"
                  onAction={() => onEditClick('skills')}
                />
              )}
            </CardContent>
          </Card>

          {/* Languages Card */}
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent>
              {userProfile.languages.length > 0 ? (
                <div className="space-y-2">
                  {userProfile.languages.map((language, index) => (
                    <div key={index} className="text-gray-700">
                      {typeof language === 'string' ? language : `${language.language} (${language.proficiency})`}
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Users}
                  title="No languages added"
                  description="Add languages you speak to attract international clients"
                  actionText="Add Skills"
                  onAction={() => onEditClick('skills')}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userProfile.certifications.length > 0 ? (
              <div className="space-y-4">
                {userProfile.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <div>
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-sm text-gray-600">{cert.issuer}</div>
                    </div>
                    {cert.year && <Badge variant="outline">{cert.year}</Badge>}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Award}
                title="No certifications added"
                description="Showcase your professional certifications to build trust with clients"
                actionText="Add Certification"
                onAction={() => onEditClick('experience')}
              />
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Portfolio Tab with Enhanced Layout */}
      <TabsContent value="portfolio" className="space-y-6">
        {userProfile.portfolio.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProfile.portfolio.map((project, index) => (
              <Card key={index} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{project.title}</h3>
                  <div className="flex-1 mb-3">
                    <ExpandableText 
                      text={project.description} 
                      maxLength={100} 
                      className="text-gray-600 text-sm leading-relaxed" 
                    />
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-auto">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={ExternalLink}
            title="No portfolio projects yet"
            description="Showcase your best work to attract more clients and demonstrate your expertise"
            actionText="Add Project"
            onAction={() => onEditClick('portfolio')}
          />
        )}
      </TabsContent>

      {/* Work Experience with Timeline */}
      <TabsContent value="work-experience" className="space-y-6">
        {userProfile.workExperience.length > 0 ? (
          <div className="space-y-6">
            {userProfile.workExperience.map((exp, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate ? `${exp.startDate}` : ''}
                        {exp.endDate || exp.current ? ` - ${exp.current ? 'Present' : exp.endDate}` : ''}
                      </p>
                    </div>
                    {exp.current && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2">
                    <ExpandableText text={exp.description} maxLength={180} className="text-gray-700" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Users}
            title="No work experience added"
            description="Add your professional experience to build credibility with potential clients"
            actionText="Add Experience"
            onAction={() => onEditClick('experience')}
          />
        )}
      </TabsContent>

      {/* Work History Tab */}
      <TabsContent value="work-history" className="space-y-6">
        {userProfile.workHistory.length > 0 ? (
          <div className="space-y-6">
            {userProfile.workHistory.map((job, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <p className="text-gray-600">{job.client}</p>
                      <p className="text-sm text-gray-500">{job.duration}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{job.rating}</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <ExpandableText text={job.description} maxLength={150} className="text-gray-700" />
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <ExpandableText text={job.feedback} maxLength={100} className="text-sm italic" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Star}
            title="No work history yet"
            description="Complete your first project to start building your work history"
            actionText="Browse Jobs"
            onAction={() => navigate('/jobs')}
          />
        )}
      </TabsContent>

      {/* Enhanced Reviews Section */}
      <TabsContent value="reviews" className="space-y-6">
        {userProfile.reviews.length > 0 ? (
          <div className="space-y-6">
            {userProfile.reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.client}</h3>
                        <p className="text-sm text-blue-600 font-medium">{review.project}</p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-1 font-medium text-sm">{review.rating}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <ExpandableText 
                      text={review.comment} 
                      maxLength={150} 
                      className="text-gray-700 italic leading-relaxed" 
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Star}
            title="No reviews yet"
            description="Complete your first project to start receiving reviews from clients"
            actionText="Browse Jobs"
            onAction={() => navigate('/jobs')}
          />
        )}
      </TabsContent>

      {/* Education Tab */}
      <TabsContent value="education" className="space-y-6">
        {userProfile.education.length > 0 ? (
          <div className="space-y-6">
            {userProfile.education.map((edu, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Award}
            title="No education added"
            description="Add your educational background to showcase your qualifications"
            actionText="Add Education"
            onAction={() => onEditClick('education')}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTab, setEditTab] = useState<string>("basic");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user is authenticated and is a freelancer
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.userType !== 'FREELANCER') {
      navigate('/dashboard');
      return;
    }

    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users/profile/me', {
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 403) {
          navigate('/dashboard');
          return;
        }
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      
      if (data.success) {
        const profile = transformUserData(data.data);
        setUserProfile(profile);
      } else {
        throw new Error(data.message || 'Failed to fetch profile');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const transformUserData = (userData: {
    id: string;
    firstName?: string;
    lastName?: string;
    title?: string;
    location?: string;
    country?: string;
    city?: string;
    timezone?: string;
    memberSince?: string;
    createdAt: string;
    avatar?: string;
    rating?: number;
    reviewCount?: number;
    completedJobs?: number;
    totalEarnings?: string;
    successRate?: number;
    responseTime?: string;
    availability?: string;
    overview?: string;
    bio?: string;
    skills?: Skill[] | string[];
    languages?: Language[];
    hourlyRate?: number;
    education?: Education[];
    certifications?: Certification[] | string[];
    portfolioProjects?: BackendPortfolioItem[];
    workExperience?: WorkExperience[];
    workHistory?: any[];
    phone?: string;
    coverImage?: string;
    socialLinks?: {
      linkedin?: string;
      github?: string;
      website?: string;
      twitter?: string;
    };
  }) : UserProfile => {
    console.log('transformUserData - Input userData:', userData);
    console.log('transformUserData - portfolioProjects:', userData.portfolioProjects);
    console.log('transformUserData - certifications:', userData.certifications);
    
    const transformed = {
      id: userData.id,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      title: userData.title || 'Freelancer',
      location: userData.location || `${userData.city || ''}, ${userData.country || ''}`.replace(/^,\s*/, '').replace(/,\s*$/, ''),
      country: userData.country || '',
      city: userData.city || '',
      timezone: userData.timezone || '',
      joinDate: userData.memberSince || new Date(userData.createdAt).getFullYear().toString(),
      profilePicture: userData.avatar || '/placeholder.svg',
      rating: userData.rating || 0,
      reviewCount: userData.reviewCount || 0,
      completedJobs: userData.completedJobs || 0,
      totalEarnings: userData.totalEarnings || '$0',
      successRate: userData.successRate || 0,
      responseTime: userData.responseTime || 'Within 24 hours',
      availability: userData.availability || 'Available for new projects',
      description: userData.overview || userData.bio || 'No description available',
      skills: Array.isArray(userData.skills)
        ? (userData.skills as Skill[]).map((s) => 
            typeof s === 'string' ? s : s.name || 'Unknown Skill'
          )
        : [],
      languages: Array.isArray(userData.languages)
        ? (userData.languages as Language[]).map((l) => 
            typeof l === 'string' ? l : `${l.language} (${l.proficiency})`
          )
        : [],
      hourlyRate: userData.hourlyRate ? `$${userData.hourlyRate}` : '$0',
      phone: userData.phone,
      coverImage: userData.coverImage,
      socialLinks: userData.socialLinks,
      education: Array.isArray(userData.education)
        ? (userData.education as Education[]).map((e) => ({
            degree: e.degree || '',
            school: e.institution || e.school || '',
            year: e.endDate || e.year || ''
          }))
        : [],
      certifications: Array.isArray(userData.certifications)
        ? (userData.certifications as (Certification | string)[]).map((c) =>
            typeof c === 'string'
              ? { name: c, issuer: 'Unknown', year: '' }
              : { name: c.name || '', issuer: c.issuer || 'Unknown', year: c.year || '' }
          )
        : [],
      portfolio: Array.isArray(userData.portfolioProjects)
        ? userData.portfolioProjects.map((item) => ({
            title: item.title || '',
            description: item.description || '',
            image: Array.isArray(item.images) && item.images.length > 0 
              ? item.images[0] 
              : (item.image || '/placeholder.svg'),
            images: Array.isArray(item.images) ? item.images : [],
            technologies: Array.isArray(item.technologies) ? item.technologies : [],
            link: item.liveUrl || item.sourceUrl || item.link || item.url || '#',
            category: item.category || 'Web Development',
            completionDate: item.completionDate || '',
            clientFeedback: item.clientFeedback || '',
            role: item.role || '',
            duration: item.duration || '',
            client: item.client || '',
            budget: item.budget || '',
            projectType: item.projectType || '',
            challenges: item.challenges || '',
            outcomes: item.outcomes || ''
          }))
        : [],
      workExperience: Array.isArray(userData.workExperience)
        ? (userData.workExperience as WorkExperience[]).map((exp) => ({
            title: exp.title || '',
            company: exp.company || '',
            startDate: exp.startDate || '',
            endDate: exp.endDate || '',
            current: !!exp.current,
            description: exp.description || '',
          }))
        : [],
      workHistory: Array.isArray(userData.workHistory)
        ? userData.workHistory.map((work) => ({
            title: work.title || work.position || '',
            client: work.client || work.company || '',
            duration: work.duration || `${work.startDate || ''} - ${work.endDate || ''}`,
            description: work.description || '',
            rating: work.clientRating || work.rating || 5.0,
            feedback: work.feedback || work.clientFeedback || ''
          }))
        : [],
      reviews: [] // This will be populated from the reviews API
    };
    
    console.log('transformUserData - Transformed portfolio:', transformed.portfolio);
    console.log('transformUserData - Transformed certifications:', transformed.certifications);
    
    return transformed;
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/users/profile/reviews', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const reviews = data.data.map((review: Review) => ({
            client: `${review.author.firstName} ${review.author.lastName}`,
            rating: review.rating,
            date: new Date(review.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            }),
            project: review.job?.title || 'Project',
            comment: review.comment
          }));

          setUserProfile(prev => prev ? {
            ...prev,
            reviews
          } : null);
        }
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  // Fetch reviews when profile is loaded
  useEffect(() => {
    if (userProfile) {
      fetchReviews();
    }
  }, [userProfile]);

  const handleSaveProfile = async (updatedProfile: Partial<UserProfile>) => {
    try {
      setLoading(true);
      setError(null);
      
      // Transform the data to match backend expectations
      const transformedData = {
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        title: updatedProfile.title,
        overview: updatedProfile.description, // Map description to overview
        location: updatedProfile.location,
        country: updatedProfile.country,
        city: updatedProfile.city,
        timezone: updatedProfile.timezone,
        phone: updatedProfile.phone,
        hourlyRate: updatedProfile.hourlyRate 
          ? (typeof updatedProfile.hourlyRate === 'string' 
              ? parseFloat(updatedProfile.hourlyRate.replace(/[^0-9.]/g, '')) 
              : updatedProfile.hourlyRate)
          : null,
        availability: updatedProfile.availability || "Available - 30+ hrs/week", // Ensure default value
        responseTime: updatedProfile.responseTime || "Within 24 hours", // Ensure default value
        avatar: updatedProfile.profilePicture, // Map profilePicture to avatar
        coverImage: updatedProfile.coverImage,
        skills: updatedProfile.skills?.map(skill => 
          typeof skill === 'string' ? { name: skill } : skill
        ),
        languages: updatedProfile.languages?.map(lang => 
          typeof lang === 'string' ? { language: lang.split(' (')[0], proficiency: lang.split(' (')[1]?.replace(')', '') || 'Fluent' } : lang
        ),
        education: updatedProfile.education,
        certifications: updatedProfile.certifications,
        // Transform portfolio data to match backend expectations (send as portfolioProjects)
        portfolioProjects: updatedProfile.portfolio?.map(item => ({
          title: item.title || '',
          description: item.description || '',
          images: Array.isArray(item.images) ? item.images : [item.image || '/placeholder.svg'],
          technologies: Array.isArray(item.technologies) ? item.technologies : [],
          liveUrl: item.link || '',
          sourceUrl: '',
          category: (item as PortfolioItem).category || 'Web Development',
          completionDate: item.completionDate || new Date().toISOString().split('T')[0],
          clientFeedback: item.clientFeedback || '',
          role: item.role || 'Solo Developer',
          duration: item.duration || '3 months',
          client: item.client || '',
          budget: item.budget || '0',
          projectType: item.projectType || 'Web Development',
          challenges: item.challenges || '',
          outcomes: item.outcomes || ''
        })) || [],
        workExperience: updatedProfile.workExperience,
        socialLinks: updatedProfile.socialLinks
      };

      console.log('Profile page sending portfolio data:', transformedData.portfolioProjects);
      console.log('Portfolio items count:', transformedData.portfolioProjects?.length || 0);

      // Remove undefined values (but keep empty strings for coverImage)
      Object.keys(transformedData).forEach(key => {
        if (transformedData[key as keyof typeof transformedData] === undefined) {
          delete transformedData[key as keyof typeof transformedData];
        }
      });

      console.log('Sending profile update data:', transformedData);
      console.log('Overview length:', transformedData.overview?.length || 0);
      console.log('Overview content:', transformedData.overview);
      console.log('Cover image being sent:', transformedData.coverImage);
      console.log('Cover image type:', typeof transformedData.coverImage);
      console.log('Cover image length:', transformedData.coverImage?.length || 0);

      const response = await fetch("/api/users/profile/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(transformedData),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        throw new Error(errorData.message || errorData.errors?.[0]?.msg || "Failed to update profile");
      }
      
      const successData = await response.json();
      console.log('Success response:', successData);
      
      await fetchProfile();
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (tab?: string) => {
    if (tab) {
      setEditTab(tab);
    }
    setIsEditing(true);
  };

  // 6. Replace the loading state in the main component
  if (loading) {
    return <ProfileSkeleton />;
  }

  // 7. Replace the error state in the main component
  if (error) {
    return <ErrorState error={error} onRetry={fetchProfile} />;
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
            <p className="text-gray-600">Unable to load profile information.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader userProfile={userProfile} onEditClick={() => handleEditClick()} />
        <ProfileTabs userProfile={userProfile} onEditClick={handleEditClick} />
      </div>

      <Footer />
      <EditProfileModal
        key={`edit-modal-${userProfile?.id}-${isEditing}`}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        userProfile={userProfile}
        onSave={handleSaveProfile}
        defaultTab={editTab}
      />
    </div>
  );
};

export default Profile;
