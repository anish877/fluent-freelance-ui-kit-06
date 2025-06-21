
import { useState } from "react";
import { Edit, Camera, MapPin, Star, Calendar, DollarSign, Award, Users, Clock, CheckCircle, ExternalLink } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const userProfile = {
    name: "Alex Thompson",
    title: "Senior Full-Stack Developer & Technical Consultant",
    location: "Austin, Texas, USA",
    joinDate: "March 2020",
    profilePicture: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 156,
    completedJobs: 234,
    totalEarnings: "$185,500",
    successRate: 98,
    responseTime: "Within 1 hour",
    availability: "Available for new projects",
    description: "Passionate full-stack developer with 10+ years of experience building scalable web applications and leading development teams. Specialized in React, Node.js, and cloud architecture. I help startups and enterprises transform their ideas into robust, user-friendly digital solutions.",
    skills: [
      "React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL", 
      "GraphQL", "REST APIs", "Microservices", "DevOps", "CI/CD", "Kubernetes"
    ],
    languages: ["English (Native)", "Spanish (Fluent)", "French (Conversational)"],
    hourlyRate: "$85-120",
    education: [
      {
        degree: "Master of Science in Computer Science",
        school: "University of Texas at Austin",
        year: "2014-2016"
      },
      {
        degree: "Bachelor of Science in Software Engineering",
        school: "Texas Tech University",
        year: "2010-2014"
      }
    ],
    certifications: [
      { name: "AWS Solutions Architect Professional", issuer: "Amazon Web Services", year: "2023" },
      { name: "Google Cloud Professional Developer", issuer: "Google Cloud", year: "2022" },
      { name: "Certified Kubernetes Administrator", issuer: "CNCF", year: "2021" }
    ],
    portfolio: [
      {
        title: "E-commerce Platform Redesign",
        description: "Complete redesign and development of a multi-vendor e-commerce platform serving 100K+ users",
        image: "/placeholder.svg",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        link: "https://example.com"
      },
      {
        title: "SaaS Analytics Dashboard",
        description: "Real-time analytics dashboard for B2B SaaS company with advanced data visualization",
        image: "/placeholder.svg",
        technologies: ["React", "D3.js", "Python", "PostgreSQL"],
        link: "https://example.com"
      },
      {
        title: "Mobile Banking App",
        description: "Secure mobile banking application with biometric authentication and real-time transactions",
        image: "/placeholder.svg",
        technologies: ["React Native", "Node.js", "AWS", "Docker"],
        link: "https://example.com"
      }
    ],
    workHistory: [
      {
        title: "Lead Full-Stack Developer",
        client: "TechStart Solutions",
        duration: "Jan 2023 - Present",
        description: "Leading development of enterprise-level applications for Fortune 500 clients. Managed team of 5 developers and improved system performance by 40%.",
        rating: 5.0,
        feedback: "Alex exceeded all expectations. Delivered complex features ahead of schedule and provided excellent technical leadership."
      },
      {
        title: "Senior React Developer",
        client: "Digital Innovation Corp",
        duration: "Jun 2022 - Dec 2022",
        description: "Built responsive web applications using React and TypeScript. Implemented modern state management and improved code quality standards.",
        rating: 4.9,
        feedback: "Outstanding developer with great communication skills. Would definitely work with Alex again."
      }
    ],
    reviews: [
      {
        client: "Sarah Johnson",
        rating: 5.0,
        date: "December 2024",
        project: "E-commerce Platform Development",
        comment: "Alex is an exceptional developer who delivered our complex e-commerce platform ahead of schedule. His attention to detail and technical expertise are outstanding. Communication was excellent throughout the project."
      },
      {
        client: "Michael Chen",
        rating: 4.9,
        date: "November 2024",
        project: "SaaS Dashboard Implementation",
        comment: "Great experience working with Alex. He understood our requirements perfectly and implemented a beautiful, performant dashboard. Very professional and responsive."
      }
    ]
  };

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
                  alt={userProfile.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <Button size="sm" className="absolute bottom-0 right-0 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{userProfile.name}</h1>
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
