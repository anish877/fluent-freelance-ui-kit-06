
import { useState } from "react";
import { Search, MessageCircle, Book, Video, FileText, Phone, Mail, ExternalLink, ChevronRight, ChevronDown } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Badge } from "../components/ui/badge";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const helpCategories = [
    { id: "getting-started", name: "Getting Started", icon: Book, count: 12 },
    { id: "account", name: "Account & Profile", icon: FileText, count: 8 },
    { id: "projects", name: "Projects & Contracts", icon: MessageCircle, count: 15 },
    { id: "payments", name: "Payments & Billing", icon: Phone, count: 10 },
    { id: "safety", name: "Safety & Security", icon: Mail, count: 6 },
    { id: "technical", name: "Technical Issues", icon: Video, count: 9 }
  ];

  const popularArticles = [
    {
      id: "1",
      title: "How to create an effective freelancer profile",
      category: "getting-started",
      views: 15420,
      helpful: 89,
      content: "Learn how to optimize your profile to attract more clients..."
    },
    {
      id: "2", 
      title: "Understanding project milestones and payments",
      category: "payments",
      views: 12350,
      helpful: 92,
      content: "A comprehensive guide to managing project payments..."
    },
    {
      id: "3",
      title: "Best practices for client communication",
      category: "projects", 
      views: 9840,
      helpful: 87,
      content: "Tips for maintaining professional communication..."
    },
    {
      id: "4",
      title: "How to handle difficult clients and projects",
      category: "projects",
      views: 8920,
      helpful: 84,
      content: "Strategies for managing challenging situations..."
    },
    {
      id: "5",
      title: "Setting up two-factor authentication",
      category: "safety",
      views: 7650,
      helpful: 95,
      content: "Secure your account with additional security measures..."
    }
  ];

  const faqData = [
    {
      question: "How do I get started as a freelancer on the platform?",
      answer: "Getting started is easy! First, create your account and complete your profile with your skills, experience, and portfolio. Then browse available projects, submit proposals, and start building your reputation with successful project completions."
    },
    {
      question: "How are payments processed and when do I get paid?",
      answer: "Payments are processed securely through our platform. For hourly projects, you submit timesheets weekly. For fixed-price projects, payments are released when milestones are completed and approved by the client. Funds are typically available within 5-7 business days."
    },
    {
      question: "What fees does the platform charge?",
      answer: "We charge a service fee based on your lifetime earnings with each client: 20% for the first $500, 10% from $500.01 to $10,000, and 5% for earnings above $10,000. This fee structure rewards long-term client relationships."
    },
    {
      question: "How do I handle disputes with clients?",
      answer: "If you have a dispute with a client, first try to resolve it through direct communication. If that doesn't work, you can use our mediation service where our team helps facilitate a resolution. For serious issues, we have an arbitration process."
    },
    {
      question: "Can I work with clients outside the platform?",
      answer: "While you can establish relationships through our platform, we encourage keeping all work and payments within the system for your protection. This ensures access to our dispute resolution services and maintains your transaction history."
    },
    {
      question: "How do I improve my profile visibility?",
      answer: "To improve visibility: complete your profile 100%, add a professional photo, showcase your best work in your portfolio, maintain high job success scores, respond quickly to messages, and regularly update your skills and availability."
    }
  ];

  const contactOptions = [
    {
      method: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      icon: MessageCircle,
      action: "Start Chat"
    },
    {
      method: "Email Support", 
      description: "Send us detailed questions or feedback",
      availability: "Response within 24 hours",
      icon: Mail,
      action: "Send Email"
    },
    {
      method: "Phone Support",
      description: "Speak directly with a support representative",
      availability: "Mon-Fri, 9AM-6PM EST",
      icon: Phone,
      action: "Call Now"
    }
  ];

  const filteredArticles = popularArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 mb-8">Find answers, get support, and learn how to make the most of our platform</p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for help articles, tutorials, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Book className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Getting Started Guide</h3>
              <p className="text-gray-600 mb-4">Complete guide for new users</p>
              <Button variant="outline">Read Guide</Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">Step-by-step video guides</p>
              <Button variant="outline">Watch Videos</Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
              <p className="text-gray-600 mb-4">Get help from our team</p>
              <Button variant="outline">Get Support</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Categories Sidebar */}
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Browse by Category</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  <div
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedCategory === "all" ? "bg-teal-50 border-r-4 border-r-teal-600" : ""
                    }`}
                    onClick={() => setSelectedCategory("all")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">All Articles</span>
                      <Badge variant="outline">{popularArticles.length}</Badge>
                    </div>
                  </div>
                  {helpCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <div
                        key={category.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b ${
                          selectedCategory === category.id ? "bg-teal-50 border-r-4 border-r-teal-600" : ""
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <IconComponent className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <Badge variant="outline">{category.count}</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-9 space-y-8">
            {/* Popular Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Help Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredArticles.map((article) => (
                    <div key={article.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-2">{article.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{article.content}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{article.views.toLocaleString()} views</span>
                            <span>{article.helpful}% found helpful</span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Still need help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {contactOptions.map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <div key={index} className="p-6 border rounded-lg text-center hover:shadow-md transition-shadow">
                        <IconComponent className="h-8 w-8 text-teal-600 mx-auto mb-4" />
                        <h3 className="font-medium text-gray-900 mb-2">{option.method}</h3>
                        <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                        <p className="text-xs text-gray-500 mb-4">{option.availability}</p>
                        <Button variant="outline" size="sm" className="w-full">
                          {option.action}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Community Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Community & Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Community Forum</h3>
                    <p className="text-sm text-gray-600 mb-3">Connect with other freelancers and clients</p>
                    <Button variant="outline" size="sm">
                      Visit Forum
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Blog & Updates</h3>
                    <p className="text-sm text-gray-600 mb-3">Latest tips, news, and platform updates</p>
                    <Button variant="outline" size="sm">
                      Read Blog
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
