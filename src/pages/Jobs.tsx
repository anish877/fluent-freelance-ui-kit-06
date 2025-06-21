
import { useState } from "react";
import { Search, Filter, MapPin, Clock, DollarSign } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import JobCard from "../components/cards/JobCard";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "web-dev", label: "Web Development" },
    { value: "mobile-dev", label: "Mobile Development" },
    { value: "design", label: "Design & Creative" },
    { value: "writing", label: "Writing & Translation" },
    { value: "marketing", label: "Marketing" }
  ];

  const mockJobs = [
    {
      id: 1,
      title: "Full-Stack React Developer Needed",
      description: "Looking for an experienced React developer to build a modern web application with TypeScript and Node.js backend.",
      budget: "$3,000 - $5,000",
      duration: "2-3 months",
      skills: ["React", "TypeScript", "Node.js", "MongoDB"],
      client: {
        name: "TechCorp Solutions",
        rating: 4.8,
        jobsPosted: 12,
        location: "San Francisco, CA"
      },
      postedTime: "2 hours ago",
      proposals: 8,
      category: "web-dev"
    },
    {
      id: 2,
      title: "Mobile App UI/UX Designer",
      description: "Need a talented designer to create beautiful, user-friendly mobile app interfaces for iOS and Android.",
      budget: "$2,000 - $4,000", 
      duration: "1-2 months",
      skills: ["Figma", "UI/UX Design", "Mobile Design", "Prototyping"],
      client: {
        name: "StartupHub Inc",
        rating: 4.6,
        jobsPosted: 5,
        location: "New York, NY"
      },
      postedTime: "5 hours ago",
      proposals: 15,
      category: "design"
    },
    {
      id: 3,
      title: "Content Writer for Tech Blog",
      description: "Seeking a skilled content writer to create engaging articles about emerging technologies and software development trends.",
      budget: "$50 - $100/article",
      duration: "Ongoing",
      skills: ["Content Writing", "Technical Writing", "SEO", "Research"],
      client: {
        name: "Digital Insights Media",
        rating: 4.9,
        jobsPosted: 23,
        location: "Remote"
      },
      postedTime: "1 day ago",
      proposals: 12,
      category: "writing"
    }
  ];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Work</h1>
          <p className="text-gray-600">Discover opportunities that match your skills</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Filter by</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Experience Level</h4>
                  <div className="space-y-2">
                    {["Entry Level", "Intermediate", "Expert"].map(level => (
                      <label key={level} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                        <span className="ml-2 text-sm text-gray-600">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Project Type</h4>
                  <div className="space-y-2">
                    {["Fixed Price", "Hourly", "Contract to Hire"].map(type => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                        <span className="ml-2 text-sm text-gray-600">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">{filteredJobs.length} jobs found</p>
              <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                <option>Newest First</option>
                <option>Highest Budget</option>
                <option>Most Relevant</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No jobs found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
