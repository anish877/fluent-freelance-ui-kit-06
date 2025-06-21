import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowRight, Plus, X, Upload, ExternalLink, Image, Video, FileText } from "lucide-react";

interface PortfolioItem {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  images: string[];
  liveUrl: string;
  sourceUrl: string;
  completionDate: string;
  clientFeedback: string;
  role: string;
  duration: string;
}

interface FreelancerPortfolioData {
  portfolioItems?: PortfolioItem[];
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  behanceUrl?: string;
  dribbbleUrl?: string;
  [key: string]: PortfolioItem[] | string | undefined;
}

interface FreelancerPortfolioProps {
  onNext: (data: FreelancerPortfolioData) => void;
  data: FreelancerPortfolioData;
}

const FreelancerPortfolio = ({ onNext, data }: FreelancerPortfolioProps) => {
  const [formData, setFormData] = useState<FreelancerPortfolioData>({
    portfolioItems: data.portfolioItems || [],
    githubUrl: data.githubUrl || "",
    linkedinUrl: data.linkedinUrl || "",
    websiteUrl: data.websiteUrl || "",
    behanceUrl: data.behanceUrl || "",
    dribbbleUrl: data.dribbbleUrl || "",
    ...data
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const addPortfolioItem = () => {
    setFormData({
      ...formData,
      portfolioItems: [
        ...formData.portfolioItems,
        {
          title: "",
          description: "",
          category: "",
          technologies: [],
          images: [],
          liveUrl: "",
          sourceUrl: "",
          completionDate: "",
          clientFeedback: "",
          role: "",
          duration: ""
        }
      ]
    });
  };

  const removePortfolioItem = (index: number) => {
    setFormData({
      ...formData,
      portfolioItems: formData.portfolioItems.filter((_, i) => i !== index)
    });
  };

  const updatePortfolioItem = (index: number, field: string, value: any) => {
    const updated = formData.portfolioItems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, portfolioItems: updated });
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const item = formData.portfolioItems[index];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...item.images, e.target?.result as string];
        updatePortfolioItem(index, "images", newImages);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (itemIndex: number, imageIndex: number) => {
    const item = formData.portfolioItems[itemIndex];
    const newImages = item.images.filter((_, i) => i !== imageIndex);
    updatePortfolioItem(itemIndex, "images", newImages);
  };

  const addTechnology = (itemIndex: number, tech: string) => {
    const item = formData.portfolioItems[itemIndex];
    if (tech && !item.technologies.includes(tech)) {
      updatePortfolioItem(itemIndex, "technologies", [...item.technologies, tech]);
    }
  };

  const removeTechnology = (itemIndex: number, tech: string) => {
    const item = formData.portfolioItems[itemIndex];
    updatePortfolioItem(itemIndex, "technologies", item.technologies.filter(t => t !== tech));
  };

  const categories = [
    "Web Development", "Mobile App", "UI/UX Design", "Graphic Design",
    "Logo Design", "Branding", "Marketing Campaign", "Content Writing",
    "E-commerce", "Landing Page", "Dashboard", "Other"
  ];

  const roles = [
    "Solo Developer", "Lead Developer", "Frontend Developer", "Backend Developer",
    "Full Stack Developer", "UI/UX Designer", "Graphic Designer", "Project Manager",
    "Consultant", "Team Member"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (formData.portfolioItems.length === 0) {
      newErrors.portfolio = "Please add at least one portfolio item to showcase your work";
    }

    // Validate each portfolio item
    formData.portfolioItems.forEach((item, index) => {
      if (!item.title) {
        newErrors[`portfolio_${index}_title`] = "Project title is required";
      }
      if (!item.description) {
        newErrors[`portfolio_${index}_description`] = "Project description is required";
      }
      if (!item.category) {
        newErrors[`portfolio_${index}_category`] = "Project category is required";
      }
    });

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Showcase Your Work
        </h2>
        <p className="text-gray-600">
          Add portfolio items and professional links to demonstrate your expertise
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Professional Links */}
        <div>
          <Label className="text-lg font-semibold">Professional Links</Label>
          <p className="text-sm text-gray-600 mb-4">
            Add links to your professional profiles and websites
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
              <Input
                id="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div>
              <Label htmlFor="githubUrl">GitHub Profile</Label>
              <Input
                id="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div>
              <Label htmlFor="websiteUrl">Personal Website</Label>
              <Input
                id="websiteUrl"
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div>
              <Label htmlFor="behanceUrl">Behance Profile</Label>
              <Input
                id="behanceUrl"
                type="url"
                value={formData.behanceUrl}
                onChange={(e) => setFormData({ ...formData, behanceUrl: e.target.value })}
                placeholder="https://behance.net/yourprofile"
              />
            </div>
          </div>
        </div>

        {/* Portfolio Items */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <Label className="text-lg font-semibold">Portfolio Items *</Label>
              <p className="text-sm text-gray-600">
                Showcase your best work to attract clients
              </p>
            </div>
            <Button type="button" onClick={addPortfolioItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Portfolio Item
            </Button>
          </div>

          {formData.portfolioItems.length === 0 && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No portfolio items yet</h3>
                <p className="text-gray-600 mb-4">Add your first portfolio item to showcase your work</p>
                <Button type="button" onClick={addPortfolioItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Portfolio Item
                </Button>
              </div>
            </div>
          )}

          {formData.portfolioItems.map((item, index) => (
            <div key={index} className="border rounded-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-6">
                <h4 className="text-lg font-semibold">Portfolio Item {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removePortfolioItem(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Project Title *</Label>
                    <Input
                      value={item.title}
                      onChange={(e) => updatePortfolioItem(index, "title", e.target.value)}
                      placeholder="e.g., E-commerce Website Redesign"
                      className={errors[`portfolio_${index}_title`] ? "border-red-500" : ""}
                    />
                    {errors[`portfolio_${index}_title`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`portfolio_${index}_title`]}</p>
                    )}
                  </div>
                  <div>
                    <Label>Category *</Label>
                    <Select 
                      value={item.category} 
                      onValueChange={(value) => updatePortfolioItem(index, "category", value)}
                    >
                      <SelectTrigger className={errors[`portfolio_${index}_category`] ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors[`portfolio_${index}_category`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`portfolio_${index}_category`]}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label>Project Description *</Label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => updatePortfolioItem(index, "description", e.target.value)}
                    placeholder="Describe the project, your role, challenges faced, and solutions provided..."
                    rows={4}
                    className={errors[`portfolio_${index}_description`] ? "border-red-500" : ""}
                  />
                  {errors[`portfolio_${index}_description`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`portfolio_${index}_description`]}</p>
                  )}
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Your Role</Label>
                    <Select 
                      value={item.role} 
                      onValueChange={(value) => updatePortfolioItem(index, "role", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <Input
                      value={item.duration}
                      onChange={(e) => updatePortfolioItem(index, "duration", e.target.value)}
                      placeholder="e.g., 2 months, 6 weeks"
                    />
                  </div>
                  <div>
                    <Label>Completion Date</Label>
                    <Input
                      type="month"
                      value={item.completionDate}
                      onChange={(e) => updatePortfolioItem(index, "completionDate", e.target.value)}
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <Label>Technologies Used</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add technology (press Enter)"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTechnology(index, e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map(tech => (
                      <span key={tech} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(index, tech)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Live URL</Label>
                    <Input
                      type="url"
                      value={item.liveUrl}
                      onChange={(e) => updatePortfolioItem(index, "liveUrl", e.target.value)}
                      placeholder="https://project-demo.com"
                    />
                  </div>
                  <div>
                    <Label>Source Code</Label>
                    <Input
                      type="url"
                      value={item.sourceUrl}
                      onChange={(e) => updatePortfolioItem(index, "sourceUrl", e.target.value)}
                      placeholder="https://github.com/user/project"
                    />
                  </div>
                </div>

                {/* Images */}
                <div>
                  <Label>Project Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e)}
                      className="hidden"
                      id={`images-${index}`}
                    />
                    <label
                      htmlFor={`images-${index}`}
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Click to upload images</span>
                    </label>
                  </div>
                  
                  {item.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {item.images.map((image, imgIndex) => (
                        <div key={imgIndex} className="relative">
                          <img
                            src={image}
                            alt={`Project ${index + 1} - Image ${imgIndex + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index, imgIndex)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Client Feedback */}
                <div>
                  <Label>Client Feedback (Optional)</Label>
                  <Textarea
                    value={item.clientFeedback}
                    onChange={(e) => updatePortfolioItem(index, "clientFeedback", e.target.value)}
                    placeholder="Share any positive feedback or testimonials from the client..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}

          {errors.portfolio && <p className="text-red-500 text-sm">{errors.portfolio}</p>}
        </div>

        <Button type="submit" className="w-full" size="lg">
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default FreelancerPortfolio;
