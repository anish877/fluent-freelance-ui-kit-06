
import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Briefcase, Shield, CheckCircle, TrendingUp, Award, Globe, Zap, Target, MessageSquare } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const Index = () => {
  const categories = [
    { name: "Web Development", jobs: 2840, avgRate: "$45-85/hr", growth: "+15%" },
    { name: "Mobile Development", jobs: 1920, avgRate: "$55-95/hr", growth: "+22%" },
    { name: "UI/UX Design", jobs: 1560, avgRate: "$40-75/hr", growth: "+18%" },
    { name: "Digital Marketing", jobs: 1340, avgRate: "$35-65/hr", growth: "+12%" },
    { name: "Data Science & AI", jobs: 980, avgRate: "$60-120/hr", growth: "+35%" },
    { name: "Content Writing", jobs: 1240, avgRate: "$25-55/hr", growth: "+8%" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Startup Founder",
      company: "TechVision AI",
      content: "Found the perfect full-stack developer for our AI platform. The quality of talent here is exceptional, and the project management tools made collaboration seamless.",
      rating: 5,
      projectValue: "$25,000",
      avatar: "/placeholder.svg"
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Developer", 
      company: "Freelance Expert",
      content: "This platform transformed my freelance career. I've earned over $150K in the past year and built lasting relationships with amazing clients worldwide.",
      rating: 5,
      projectValue: "$150,000+",
      avatar: "/placeholder.svg"
    },
    {
      name: "Emily Watson",
      role: "Design Director",
      company: "Creative Studios",
      content: "The variety of creative talent available is incredible. We've successfully completed 15+ design projects with outstanding results and quick turnaround times.",
      rating: 5,
      projectValue: "$40,000+",
      avatar: "/placeholder.svg"
    }
  ];

  const platformStats = [
    { label: "Active Freelancers", value: "45,000+", icon: Users },
    { label: "Projects Completed", value: "200,000+", icon: CheckCircle },
    { label: "Client Satisfaction", value: "98.2%", icon: Star },
    { label: "Total Earnings Paid", value: "$850M+", icon: TrendingUp }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Post Your Project",
      description: "Describe your project needs, set your budget, and timeline. Our smart matching system will help you find the right talent.",
      icon: Target
    },
    {
      step: 2,
      title: "Review Proposals",
      description: "Receive proposals from qualified freelancers. Review portfolios, ratings, and previous work to make informed decisions.",
      icon: Users
    },
    {
      step: 3,
      title: "Collaborate & Pay",
      description: "Work with your chosen freelancer using our built-in tools. Pay securely through our escrow system when milestones are completed.",
      icon: Shield
    }
  ];

  const features = [
    {
      title: "Smart Matching",
      description: "AI-powered algorithm matches you with the perfect freelancers for your project needs.",
      icon: Zap
    },
    {
      title: "Secure Payments",
      description: "Escrow protection ensures your money is safe and freelancers get paid for completed work.",
      icon: Shield
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you throughout your project journey.",
      icon: MessageSquare
    },
    {
      title: "Quality Assurance",
      description: "Rigorous vetting process ensures you work with verified, high-quality professionals.",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 via-sky-50 to-indigo-50 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              The world's
              <span className="text-teal-600"> work marketplace</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Connect with talented professionals worldwide. Find the perfect freelancer for your project or discover your next great opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link to="/talent">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Hire Talent
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg" className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Find Work
                </Button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Trusted by 500K+ businesses
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                4.9/5 average rating
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-blue-500 mr-2" />
                195 countries
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {platformStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <stat.icon className="h-8 w-8 text-teal-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600">
              Explore high-demand skills and competitive rates across industries
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-teal-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                      {category.name}
                    </h3>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {category.growth}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Active Jobs:</span>
                      <span className="font-semibold text-gray-900">{category.jobs.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Rate:</span>
                      <span className="font-semibold text-teal-600">{category.avgRate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in minutes with our simple process
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {step.step}
                  </div>
                  <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto -mt-16 -z-10">
                    <step.icon className="h-10 w-10 text-teal-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-xl text-gray-600">
              Built for success with powerful tools and unmatched security
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how our platform transforms careers and businesses
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      <p className="text-gray-500 text-sm">{testimonial.company}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {testimonial.projectValue} earned
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-teal-100 mb-10 leading-relaxed">
            Join millions of professionals and businesses building the future of work
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                Get Started Free
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link to="/talent">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                Explore Talent
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
