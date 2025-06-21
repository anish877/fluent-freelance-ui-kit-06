
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { JobFormData } from "../../pages/PostJob";

interface JobRequirementsStepProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const JobRequirementsStep = ({ formData, updateFormData }: JobRequirementsStepProps) => {
  const [newSkill, setNewSkill] = useState("");
  const [newQualification, setNewQualification] = useState("");

  const popularSkills = [
    "JavaScript", "React", "Node.js", "Python", "Java", "PHP", "HTML/CSS",
    "TypeScript", "Vue.js", "Angular", "MongoDB", "MySQL", "PostgreSQL",
    "AWS", "Docker", "Git", "REST API", "GraphQL", "WordPress", "Shopify"
  ];

  const addSkill = (skill: string) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      updateFormData({
        skills: [...formData.skills, skill.trim()]
      });
    }
    setNewSkill("");
  };

  const removeSkill = (skillToRemove: string) => {
    updateFormData({
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const addQualification = () => {
    if (newQualification.trim()) {
      updateFormData({
        preferredQualifications: [...formData.preferredQualifications, newQualification.trim()]
      });
      setNewQualification("");
    }
  };

  const removeQualification = (index: number) => {
    updateFormData({
      preferredQualifications: formData.preferredQualifications.filter((_, i) => i !== index)
    });
  };

  const handleCommunicationChange = (value: string, checked: boolean) => {
    const current = formData.communicationPreferences || [];
    if (checked) {
      updateFormData({
        communicationPreferences: [...current, value]
      });
    } else {
      updateFormData({
        communicationPreferences: current.filter(pref => pref !== value)
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Required Skills */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Required Skills *</Label>
          <p className="text-xs text-gray-500 mt-1">
            What specific skills are essential for this project?
          </p>
        </div>

        {/* Popular Skills */}
        <div>
          <p className="text-sm font-medium mb-2">Popular Skills:</p>
          <div className="flex flex-wrap gap-2">
            {popularSkills.map(skill => (
              <Button
                key={skill}
                variant={formData.skills.includes(skill) ? "default" : "outline"}
                size="sm"
                onClick={() => formData.skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                className="text-xs"
              >
                {skill}
                {formData.skills.includes(skill) && <X className="h-3 w-3 ml-1" />}
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Skills */}
        {formData.skills.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Selected Skills:</p>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map(skill => (
                <div key={skill} className="flex items-center space-x-1 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                  <span>{skill}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill)}
                    className="h-4 w-4 p-0 text-teal-600 hover:text-teal-800"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Custom Skill */}
        <div className="flex space-x-2">
          <Input
            placeholder="Add a custom skill..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSkill(newSkill)}
          />
          <Button onClick={() => addSkill(newSkill)} variant="outline" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Experience Level Required *</Label>
        <Select value={formData.experienceLevel} onValueChange={(value) => updateFormData({ experienceLevel: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
            <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
            <SelectItem value="expert">Expert (5+ years)</SelectItem>
            <SelectItem value="any">Any Experience Level</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Preferred Qualifications */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Preferred Qualifications</Label>
          <p className="text-xs text-gray-500 mt-1">
            Additional qualifications that would be nice to have (optional)
          </p>
        </div>
        
        <div className="space-y-3">
          {formData.preferredQualifications.map((qualification, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <span className="flex-1 text-sm">{qualification}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeQualification(index)}
                className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <div className="flex space-x-2">
            <Input
              placeholder="e.g., Portfolio of similar projects, Certification in X, etc."
              value={newQualification}
              onChange={(e) => setNewQualification(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addQualification()}
            />
            <Button onClick={addQualification} variant="outline" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Working Arrangements */}
      <div className="grid grid-cols-1 md:gri-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Preferred Working Hours</Label>
          <Select value={formData.workingHours} onValueChange={(value) => updateFormData({ workingHours: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select working hours preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flexible">Flexible</SelectItem>
              <SelectItem value="overlap-us">Must overlap with US hours</SelectItem>
              <SelectItem value="overlap-eu">Must overlap with EU hours</SelectItem>
              <SelectItem value="overlap-asia">Must overlap with Asia hours</SelectItem>
              <SelectItem value="fixed-schedule">Fixed schedule required</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Timezone Preference</Label>
          <Select value={formData.timezone} onValueChange={(value) => updateFormData({ timezone: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select timezone preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Timezone</SelectItem>
              <SelectItem value="americas">Americas (UTC-8 to UTC-3)</SelectItem>
              <SelectItem value="europe-africa">Europe/Africa (UTC-1 to UTC+3)</SelectItem>
              <SelectItem value="asia-pacific">Asia/Pacific (UTC+3 to UTC+12)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Communication Preferences</Label>
          <p className="text-xs text-gray-500 mt-1">
            How would you like to communicate with the freelancer? (Select all that apply)
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "email", label: "Email" },
            { value: "chat", label: "Platform Chat" },
            { value: "video-calls", label: "Video Calls" },
            { value: "phone", label: "Phone Calls" },
            { value: "slack", label: "Slack" },
            { value: "discord", label: "Discord" },
            { value: "teams", label: "Microsoft Teams" },
            { value: "zoom", label: "Zoom" }
          ].map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={formData.communicationPreferences?.includes(option.value)}
                onCheckedChange={(checked) => handleCommunicationChange(option.value, checked as boolean)}
              />
              <Label htmlFor={option.value} className="text-sm">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobRequirementsStep;
