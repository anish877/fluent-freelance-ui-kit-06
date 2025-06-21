import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Briefcase, Shield } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";

const Index = () => {
  const categories = [
    "Web Development", "Mobile Development", "Design & Creative", 
    "Writing & Translation", "Marketing", "Data Science"
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Startup Founder",
      content: "Found the perfect developer for our mobile app. The quality of talent here is exceptional.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Freelance Designer", 
      content: "This platform helped me grow my freelance business and connect with amazing clients.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-sky-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find the perfect
              <span className="text-teal-600"> freelance </span>
              services for your business
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with talented professionals worldwide. Get your projects done with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg">
                  Hire Talent
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg" className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-4 text-lg">
                  Find Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="bg-gray-50 hover:bg-gray-100 transition-colors p-6 rounded-lg text-center cursor-pointer group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                  {category}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Platform
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted Community</h3>
              <p className="text-gray-600">Join millions of freelancers and clients who trust our platform</p>
            </div>
            <div className="text-center">
              <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600">Safe and secure payment processing with escrow protection</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Work</h3>
              <p className="text-gray-600">Access to top-tier talent with proven track records</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
