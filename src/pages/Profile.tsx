import { useState, useEffect } from "react";
import { Edit, Camera, MapPin, Star, Calendar, DollarSign, Award, Users, Clock, CheckCircle, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { useAuth } from "../hooks/AuthContext";

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
  skills: string[];
  languages: string[];
  hourlyRate: string;
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
    technologies: string[];
    link: string;
  }>;
  workHistory: Array<{
    title: string;
    client: string;
    duration: string;
    description: string;
    rating: number;
    feedback: string;
  }>;
  reviews: Array<{
    client: string;
    rating: number;
    date: string;
    project: string;
    comment: string;
  }>;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
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

  const transformUserData = (userData: any): UserProfile => {
    return {
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
      skills: Array.isArray(userData.skills) ? userData.skills.map((s: any) => s.name || s) : [],
      languages: Array.isArray(userData.languages) ? userData.languages.map((l: any) => `${l.language} (${l.proficiency})`) : [],
      hourlyRate: userData.hourlyRate ? `$${userData.hourlyRate}` : '$0',
      education: Array.isArray(userData.education) ? userData.education.map((e: any) => ({
        degree: e.degree || '',
        school: e.institution || e.school || '',
        year: e.year || ''
      })) : [],
      certifications: Array.isArray(userData.certifications) ? userData.certifications.map((c: any) => ({
        name: c.name || c,
        issuer: c.issuer || 'Unknown',
        year: c.year || ''
      })) : [],
      portfolio: Array.isArray(userData.portfolioItems) ? userData.portfolioItems.map((item: any) => ({
        title: item.title || '',
        description: item.description || '',
        image: item.image || '/placeholder.svg',
        technologies: item.technologies || [],
        link: item.link || '#'
      })) : [],
      workHistory: [], // This will be populated from reviews/jobs
      reviews: [] // This will be populated from the reviews API
    };
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/users/profile/reviews', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const reviews = data.data.map((review: any) => ({
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="bg-white rounded-lg p-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Profile</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchProfile}>Try Again</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
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
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <img
                  src={userProfile.profilePicture}
                  alt={`${userProfile.firstName} ${userProfile.lastName}`}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <Button size="sm" className="absolute bottom-0 right-0 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{userProfile.firstName} {userProfile.lastName}</h1>
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
                  <Button onClick={() => setIsEditing(!isEditing)} className="mt-4 sm:mt-0">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">{userProfile.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">{userProfile.reviewCount} reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{userProfile.completedJobs}</div>
                    <div className="text-sm text-gray-600">Jobs completed</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{userProfile.successRate}%</div>
                    <div className="text-sm text-gray-600">Success rate</div>
                  </div>
                  <div className="text-center">
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

                <p className="text-gray-700 leading-relaxed">{userProfile.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="work-history">Work History</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {userProfile.languages.map((language, index) => (
                      <div key={index} className="text-gray-700">{language}</div>
                    ))}
                  </div>
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
                <div className="space-y-4">
                  {userProfile.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{cert.name}</div>
                        <div className="text-sm text-gray-600">{cert.issuer}</div>
                      </div>
                      <Badge variant="outline">{cert.year}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProfile.portfolio.map((project, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="work-history" className="space-y-6">
            {userProfile.workHistory.map((job, index) => (
              <Card key={index}>
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
                  <p className="text-gray-700 mb-3">{job.description}</p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm italic">"{job.feedback}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            {userProfile.reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{review.client}</h3>
                      <p className="text-sm text-gray-600">{review.project}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">"{review.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            {userProfile.education.map((edu, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
