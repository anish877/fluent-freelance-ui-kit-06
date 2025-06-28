import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowRight, Plus, X, Upload, ExternalLink, Image, Video, FileText, Loader2 } from "lucide-react";
import { uploadService } from "../../lib/uploadService";

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

interface SocialLinks {
  linkedin?: string;
  github?: string;
  website?: string;
  behance?: string;
  dribbble?: string;
}

interface FreelancerPortfolioData {
  portfolioItems?: PortfolioItem[];
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  behanceUrl?: string;
  dribbbleUrl?: string;
  socialLinks?: SocialLinks;
  portfolio?: string;
  [key: string]: PortfolioItem[] | string | SocialLinks | undefined;
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
  const [uploadingStates, setUploadingStates] = useState<Record<string, boolean>>({});

  const addPortfolioItem = () => {
    setFormData({
      ...formData,
      portfolioItems: [
        ...formData.portfolioItems!,
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
      portfolioItems: formData.portfolioItems!.filter((_, i) => i !== index)
    });
  };

  const updatePortfolioItem = (index: number, field: string, value: any) => {
    const updated = formData.portfolioItems!.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, portfolioItems: updated });
  };

  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const uploadKey = `portfolio_${index}`;
    setUploadingStates(prev => ({ ...prev, [uploadKey]: true }));

    try {
      // Upload multiple files to Cloudinary
      const result = await uploadService.uploadMultiple(files);
      
      if (result.success) {
        const item = formData.portfolioItems![index];
        const newImages = [...item.images, ...result.data.map(file => file.url)];
        updatePortfolioItem(index, "images", newImages);
      } else {
        setErrors({ [uploadKey]: 'Upload failed. Please try again.' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setErrors({ [uploadKey]: 'Upload failed. Please try again.' });
    } finally {
      setUploadingStates(prev => ({ ...prev, [uploadKey]: false }));
    }
  };

  const removeImage = (itemIndex: number, imageIndex: number) => {
    const item = formData.portfolioItems![itemIndex];
    const newImages = item.images.filter((_, i) => i !== imageIndex);
    updatePortfolioItem(itemIndex, "images", newImages);
  };

  const addTechnology = (itemIndex: number, tech: string) => {
    const item = formData.portfolioItems![itemIndex];
    if (tech && !item.technologies.includes(tech)) {
      updatePortfolioItem(itemIndex, "technologies", [...item.technologies, tech]);
    }
  };

  const removeTechnology = (itemIndex: number, tech: string) => {
    const item = formData.portfolioItems![itemIndex];
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
    
    if (formData.portfolioItems!.length === 0) {
      newErrors.portfolio = "Please add at least one portfolio item to showcase your work";
    }

    // Validate each portfolio item
    formData.portfolioItems!.forEach((item, index) => {
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
      // Map the data to the correct field names for the database
      const mappedData: FreelancerPortfolioData = {
        portfolio: JSON.stringify(formData.portfolioItems), // Store portfolio items as JSON string
        socialLinks: {
          linkedin: formData.linkedinUrl,
          github: formData.githubUrl,
          website: formData.websiteUrl,
          behance: formData.behanceUrl,
          dribbble: formData.dribbbleUrl
        }
      };
      onNext(mappedData);
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

          {formData.portfolioItems!.length === 0 && (
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

          {formData.portfolioItems!.map((item, index) => (
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
                    <Label htmlFor={`title_${index}`}>Project Title *</Label>
                    <Input
                      id={`title_${index}`}
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
                    <Label htmlFor={`category_${index}`}>Category *</Label>
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

                <div>
                  <Label htmlFor={`description_${index}`}>Project Description *</Label>
                  <Textarea
                    id={`description_${index}`}
                    value={item.description}
                    onChange={(e) => updatePortfolioItem(index, "description", e.target.value)}
                    placeholder="Describe the project, your role, challenges faced, and outcomes achieved..."
                    rows={3}
                    className={errors[`portfolio_${index}_description`] ? "border-red-500" : ""}
                  />
                  {errors[`portfolio_${index}_description`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`portfolio_${index}_description`]}</p>
                  )}
                </div>

                {/* Project Images */}
                <div>
                  <Label>Project Images</Label>
                  <div className="mt-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <div className="flex items-center justify-center">
                        <label className="cursor-pointer">
                          {uploadingStates[`portfolio_${index}`] ? (
                            <div className="flex items-center">
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              <span>Uploading...</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Upload className="h-4 w-4 mr-2" />
                              <span>Upload Images</span>
                            </div>
                          )}
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleImageUpload(index, e)}
                            className="hidden"
                            disabled={uploadingStates[`portfolio_${index}`]}
                          />
                        </label>
                      </div>
                    </div>
                    
                    {errors[`portfolio_${index}`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`portfolio_${index}`]}</p>
                    )}

                    {/* Display uploaded images */}
                    {item.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {item.images.map((image, imageIndex) => (
                          <div key={imageIndex} className="relative">
                            <img
                              src={image}
                              alt={`Project ${index + 1} - Image ${imageIndex + 1}`}
                              className="w-full h-24 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index, imageIndex)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Links */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`liveUrl_${index}`}>Live URL</Label>
                    <Input
                      id={`liveUrl_${index}`}
                      type="url"
                      value={item.liveUrl}
                      onChange={(e) => updatePortfolioItem(index, "liveUrl", e.target.value)}
                      placeholder="https://project-demo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`sourceUrl_${index}`}>Source Code URL</Label>
                    <Input
                      id={`sourceUrl_${index}`}
                      type="url"
                      value={item.sourceUrl}
                      onChange={(e) => updatePortfolioItem(index, "sourceUrl", e.target.value)}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`role_${index}`}>Your Role</Label>
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
                    <Label htmlFor={`duration_${index}`}>Duration</Label>
                    <Input
                      id={`duration_${index}`}
                      value={item.duration}
                      onChange={(e) => updatePortfolioItem(index, "duration", e.target.value)}
                      placeholder="e.g., 3 months"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`completionDate_${index}`}>Completion Date</Label>
                    <Input
                      id={`completionDate_${index}`}
                      type="date"
                      value={item.completionDate}
                      onChange={(e) => updatePortfolioItem(index, "completionDate", e.target.value)}
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <Label>Technologies Used</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-sm flex items-center"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(index, tech)}
                          className="ml-1 text-teal-600 hover:text-teal-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Add technology"
                      className="border rounded px-2 py-1 text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          addTechnology(index, input.value);
                          input.value = '';
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Client Feedback */}
                <div>
                  <Label htmlFor={`clientFeedback_${index}`}>Client Feedback (Optional)</Label>
                  <Textarea
                    id={`clientFeedback_${index}`}
                    value={item.clientFeedback}
                    onChange={(e) => updatePortfolioItem(index, "clientFeedback", e.target.value)}
                    placeholder="Share positive feedback from the client..."
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default FreelancerPortfolio;
