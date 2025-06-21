
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { JobFormData } from "../../pages/PostJob";

interface JobBasicsStepProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const JobBasicsStep = ({ formData, updateFormData }: JobBasicsStepProps) => {
  const categories = [
    { value: "web-development", label: "Web Development", subcategories: ["Frontend", "Backend", "Full-Stack", "E-commerce", "CMS"] },
    { value: "mobile-development", label: "Mobile Development", subcategories: ["iOS", "Android", "React Native", "Flutter", "Hybrid Apps"] },
    { value: "design-creative", label: "Design & Creative", subcategories: ["UI/UX Design", "Graphic Design", "Logo Design", "Branding", "Video Editing"] },
    { value: "writing-translation", label: "Writing & Translation", subcategories: ["Content Writing", "Copywriting", "Technical Writing", "Translation", "Proofreading"] },
    { value: "marketing", label: "Marketing", subcategories: ["Digital Marketing", "SEO", "Social Media", "Email Marketing", "PPC Advertising"] },
    { value: "data-analytics", label: "Data & Analytics", subcategories: ["Data Analysis", "Data Science", "Business Intelligence", "Machine Learning", "Statistics"] }
  ];

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  return (
    <div className="space-y-6">
      {/* Job Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Job Title *
        </Label>
        <Input
          id="title"
          placeholder="e.g., Full-Stack React Developer for E-commerce Platform"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          className="w-full"
        />
        <p className="text-xs text-gray-500">
          Be specific and descriptive to attract the right freelancers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value, subcategory: "" })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subcategory */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Subcategory *</Label>
          <Select 
            value={formData.subcategory} 
            onValueChange={(value) => updateFormData({ subcategory: value })}
            disabled={!formData.category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a subcategory" />
            </SelectTrigger>
            <SelectContent>
              {selectedCategory?.subcategories.map(subcategory => (
                <SelectItem key={subcategory} value={subcategory.toLowerCase().replace(/\s+/g, '-')}>
                  {subcategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Project Type *</Label>
          <Select value={formData.projectType} onValueChange={(value) => updateFormData({ projectType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">One-time Project</SelectItem>
              <SelectItem value="ongoing">Ongoing Work</SelectItem>
              <SelectItem value="contract-to-hire">Contract to Hire</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Expected Duration *</Label>
          <Select value={formData.duration} onValueChange={(value) => updateFormData({ duration: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less-than-1-week">Less than 1 week</SelectItem>
              <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
              <SelectItem value="1-month">1 month</SelectItem>
              <SelectItem value="2-3-months">2-3 months</SelectItem>
              <SelectItem value="3-6-months">3-6 months</SelectItem>
              <SelectItem value="6-months-plus">6+ months</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Description */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Quick Project Summary</Label>
        <Textarea
          placeholder="Provide a brief overview of your project in 2-3 sentences..."
          rows={3}
          value={formData.additionalNotes}
          onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
        />
        <p className="text-xs text-gray-500">
          This helps freelancers quickly understand what you're looking for
        </p>
      </div>
    </div>
  );
};

export default JobBasicsStep;
