import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { ArrowRight, Target, Code, Palette, PenTool, TrendingUp, Camera } from "lucide-react";

interface ClientProjectNeedsData {
  interestedCategories?: string[];
  projectTypes?: string[];
  urgencyLevel?: string;
  preferredWorkingStyle?: string;
  communicationPreference?: string[];
  projectDescription?: string;
  [key: string]: string | string[] | undefined;
}

interface ClientProjectNeedsProps {
  onNext: (data: ClientProjectNeedsData) => void;
  data: ClientProjectNeedsData;
}

const ClientProjectNeeds = ({ onNext, data }: ClientProjectNeedsProps) => {
  const [formData, setFormData] = useState<ClientProjectNeedsData>({
    interestedCategories: data.interestedCategories || [],
    projectTypes: data.projectTypes || [],
    urgencyLevel: data.urgencyLevel || "",
    preferredWorkingStyle: data.preferredWorkingStyle || "",
    communicationPreference: data.communicationPreference || [],
    projectDescription: data.projectDescription || "",
    ...data
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { id: "web-dev", label: "Web Development", icon: Code },
    { id: "mobile-dev", label: "Mobile Development", icon: Code },
    { id: "design", label: "Design & Creative", icon: Palette },
    { id: "writing", label: "Writing & Content", icon: PenTool },
    { id: "marketing", label: "Digital Marketing", icon: TrendingUp },
    { id: "video", label: "Video & Animation", icon: Camera }
  ];

  const projectTypes = [
    { id: "one-time", label: "One-time projects", description: "Single project with defined scope" },
    { id: "ongoing", label: "Ongoing work", description: "Long-term partnership" },
    { id: "both", label: "Both", description: "Open to different arrangements" }
  ];

  const urgencyLevels = [
    { id: "asap", label: "ASAP", description: "Need to start immediately" },
    { id: "week", label: "Within a week", description: "Can wait up to 7 days" },
    { id: "month", label: "Within a month", description: "No immediate rush" },
    { id: "flexible", label: "Flexible", description: "Timeline is flexible" }
  ];

  const workingStyles = [
    { id: "hands-off", label: "Hands-off", description: "Minimal oversight, trust freelancer's expertise" },
    { id: "collaborative", label: "Collaborative", description: "Regular check-ins and feedback" },
    { id: "hands-on", label: "Hands-on", description: "Close supervision and frequent communication" }
  ];

  const communicationOptions = [
    "Email", "Slack", "Video calls", "Phone calls", "Project management tools", "In-person meetings"
  ];

  const toggleCategory = (categoryId: string) => {
    const isSelected = formData.interestedCategories.includes(categoryId);
    if (isSelected) {
      setFormData({
        ...formData,
        interestedCategories: formData.interestedCategories.filter(id => id !== categoryId)
      });
    } else {
      setFormData({
        ...formData,
        interestedCategories: [...formData.interestedCategories, categoryId]
      });
    }
  };

  const toggleCommunication = (option: string) => {
    const isSelected = formData.communicationPreference.includes(option);
    if (isSelected) {
      setFormData({
        ...formData,
        communicationPreference: formData.communicationPreference.filter(o => o !== option)
      });
    } else {
      setFormData({
        ...formData,
        communicationPreference: [...formData.communicationPreference, option]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (formData.interestedCategories.length === 0) {
      newErrors.categories = "Please select at least one category";
    }
    
    if (formData.projectTypes.length === 0) {
      newErrors.projectTypes = "Please select project type preference";
    }
    
    if (!formData.urgencyLevel) {
      newErrors.urgencyLevel = "Please select urgency level";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What kind of work do you need?
        </h2>
        <p className="text-gray-600">
          Help us understand your project needs so we can recommend the best freelancers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Categories of Interest */}
        <div>
          <Label className="text-lg font-semibold">What type of work are you interested in? *</Label>
          <p className="text-sm text-gray-600 mb-4">Select all that apply</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(category => (
              <div
                key={category.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.interestedCategories.includes(category.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex flex-col items-center text-center">
                  <category.icon className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="font-medium text-sm">{category.label}</span>
                </div>
              </div>
            ))}
          </div>
          
          {errors.categories && <p className="text-red-500 text-sm mt-2">{errors.categories}</p>}
        </div>

        {/* Project Types */}
        <div>
          <Label className="text-lg font-semibold">Project type preference *</Label>
          <div className="space-y-3 mt-4">
            {projectTypes.map(type => (
              <div
                key={type.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.projectTypes.includes(type.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => {
                  const isSelected = formData.projectTypes.includes(type.id);
                  if (isSelected) {
                    setFormData({
                      ...formData,
                      projectTypes: formData.projectTypes.filter(t => t !== type.id)
                    });
                  } else {
                    setFormData({
                      ...formData,
                      projectTypes: [...formData.projectTypes, type.id]
                    });
                  }
                }}
              >
                <h4 className="font-medium text-gray-900">{type.label}</h4>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
          
          {errors.projectTypes && <p className="text-red-500 text-sm mt-2">{errors.projectTypes}</p>}
        </div>

        {/* Urgency Level */}
        <div>
          <Label className="text-lg font-semibold">How urgent is your typical project? *</Label>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {urgencyLevels.map(level => (
              <div
                key={level.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.urgencyLevel === level.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setFormData({ ...formData, urgencyLevel: level.id })}
              >
                <h4 className="font-medium text-gray-900">{level.label}</h4>
                <p className="text-sm text-gray-600">{level.description}</p>
              </div>
            ))}
          </div>
          
          {errors.urgencyLevel && <p className="text-red-500 text-sm mt-2">{errors.urgencyLevel}</p>}
        </div>

        {/* Working Style */}
        <div>
          <Label className="text-lg font-semibold">Preferred working style</Label>
          <div className="space-y-3 mt-4">
            {workingStyles.map(style => (
              <div
                key={style.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.preferredWorkingStyle === style.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setFormData({ ...formData, preferredWorkingStyle: style.id })}
              >
                <h4 className="font-medium text-gray-900">{style.label}</h4>
                <p className="text-sm text-gray-600">{style.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Communication Preferences */}
        <div>
          <Label className="text-lg font-semibold">Communication preferences</Label>
          <p className="text-sm text-gray-600 mb-4">How do you prefer to communicate with freelancers?</p>
          
          <div className="grid grid-cols-2 gap-3">
            {communicationOptions.map(option => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={formData.communicationPreference.includes(option)}
                  onCheckedChange={() => toggleCommunication(option)}
                />
                <Label htmlFor={option} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Project Description */}
        <div>
          <Label htmlFor="projectDescription">Tell us about your ideal project</Label>
          <Textarea
            id="projectDescription"
            value={formData.projectDescription}
            onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
            placeholder="Describe the type of projects you typically need help with, your goals, and what success looks like to you..."
            rows={4}
          />
          <p className="text-sm text-gray-500 mt-1">
            This helps us recommend freelancers who are the best fit for your needs
          </p>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default ClientProjectNeeds;
