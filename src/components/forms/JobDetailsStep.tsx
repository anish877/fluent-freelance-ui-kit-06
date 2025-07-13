import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { JobFormData } from "../../pages/PostJob";

interface JobDetailsStepProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const JobDetailsStep = ({ formData, updateFormData }: JobDetailsStepProps) => {
  const [newSkill, setNewSkill] = useState("");

  const categories = [
    { value: "web-development", label: "Web Development" },
    { value: "mobile-development", label: "Mobile Development" },
    { value: "design-creative", label: "Design & Creative" },
    { value: "writing-translation", label: "Writing & Translation" },
    { value: "marketing", label: "Digital Marketing" },
    { value: "data-analytics", label: "Data & Analytics" },
    { value: "admin-support", label: "Admin & Support" },
    { value: "customer-service", label: "Customer Service" },
    { value: "sales", label: "Sales & Business Development" },
    { value: "accounting", label: "Accounting & Consulting" }
  ];

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      updateFormData({ skills: [...formData.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateFormData({ skills: formData.skills.filter(skill => skill !== skillToRemove) });
  };

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

      {/* Category */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Category *</Label>
        <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
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

      {/* Job Description */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Job Description *</Label>
        <Textarea
          placeholder="Describe your project in detail. Include what you need, your goals, and any specific requirements..."
          rows={6}
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          className="w-full"
        />
        <p className="text-xs text-gray-500">
          Be detailed about your project requirements and expectations
        </p>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Required Skills *</Label>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., React, TypeScript, Node.js"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            className="flex-1"
          />
          <Button type="button" onClick={addSkill} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {formData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        
        <p className="text-xs text-gray-500">
          Add the key skills and technologies needed for this project
        </p>
      </div>
    </div>
  );
};

export default JobDetailsStep; 