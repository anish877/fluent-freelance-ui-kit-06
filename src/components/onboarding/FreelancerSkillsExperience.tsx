import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowRight, Plus, X, Star, Code, Palette, PenTool, TrendingUp } from "lucide-react";

interface Skill {
  name: string;
  category: string;
  level: string;
  yearsOfExperience: number;
}

interface FreelancerSkillsExperienceData {
  skills?: Skill[];
  topSkills?: string[];
  serviceOfferings?: string[];
  [key: string]: Skill[] | string[] | undefined;
}

interface FreelancerSkillsExperienceProps {
  onNext: (data: FreelancerSkillsExperienceData) => void;
  data: FreelancerSkillsExperienceData;
}

const FreelancerSkillsExperience = ({ onNext, data }: FreelancerSkillsExperienceProps) => {
  const [formData, setFormData] = useState<FreelancerSkillsExperienceData>({
    skills: data.skills || [],
    topSkills: data.topSkills || [],
    serviceOfferings: data.serviceOfferings || [],
    ...data
  });

  const [skillInput, setSkillInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const skillCategories = {
    "Programming Languages": [
      "JavaScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Go", "Swift", "Kotlin"
    ],
    "Web Technologies": [
      "React", "Vue.js", "Angular", "Node.js", "Express.js", "Next.js", "Nuxt.js", "HTML5", "CSS3", "SASS"
    ],
    "Mobile Development": [
      "React Native", "Flutter", "iOS Development", "Android Development", "Xamarin", "Ionic"
    ],
    "Design Tools": [
      "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "InDesign", "After Effects", "Canva"
    ],
    "Database & Backend": [
      "MongoDB", "PostgreSQL", "MySQL", "Firebase", "AWS", "Docker", "Kubernetes", "GraphQL"
    ],
    "Marketing & SEO": [
      "Google Analytics", "SEO", "SEM", "Social Media Marketing", "Content Marketing", "Email Marketing"
    ],
    "Writing & Content": [
      "Content Writing", "Copywriting", "Technical Writing", "Blog Writing", "Social Media Content"
    ]
  };

  const experienceLevels = [
    { value: "beginner", label: "Beginner", icon: "🌱" },
    { value: "intermediate", label: "Intermediate", icon: "⭐" },
    { value: "advanced", label: "Advanced", icon: "🚀" },
    { value: "expert", label: "Expert", icon: "👑" }
  ];

  const addSkill = (skill: string, category?: string) => {
    if (skill && !formData.skills.find(s => s.name === skill)) {
      const newSkill = {
        name: skill,
        category: category || "Other",
        level: "intermediate",
        yearsOfExperience: 1
      };
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill]
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skillName: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s.name !== skillName),
      topSkills: formData.topSkills.filter(s => s !== skillName)
    });
  };

  const updateSkillLevel = (skillName: string, level: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.map(s => 
        s.name === skillName ? { ...s, level } : s
      )
    });
  };

  const updateSkillExperience = (skillName: string, yearsOfExperience: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.map(s => 
        s.name === skillName ? { ...s, yearsOfExperience } : s
      )
    });
  };

  const toggleTopSkill = (skillName: string) => {
    const isTopSkill = formData.topSkills.includes(skillName);
    if (isTopSkill) {
      setFormData({
        ...formData,
        topSkills: formData.topSkills.filter(s => s !== skillName)
      });
    } else if (formData.topSkills.length < 5) {
      setFormData({
        ...formData,
        topSkills: [...formData.topSkills, skillName]
      });
    }
  };

  const addService = () => {
    if (serviceInput && !formData.serviceOfferings.includes(serviceInput)) {
      setFormData({
        ...formData,
        serviceOfferings: [...formData.serviceOfferings, serviceInput]
      });
      setServiceInput("");
    }
  };

  const removeService = (service: string) => {
    setFormData({
      ...formData,
      serviceOfferings: formData.serviceOfferings.filter(s => s !== service)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (formData.skills.length === 0) {
      newErrors.skills = "Please add at least one skill";
    }
    if (formData.topSkills.length === 0) {
      newErrors.topSkills = "Please select at least one top skill";
    }
    if (formData.serviceOfferings.length === 0) {
      newErrors.serviceOfferings = "Please add at least one service offering";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Programming Languages":
      case "Web Technologies":
      case "Database & Backend":
        return <Code className="h-4 w-4" />;
      case "Design Tools":
        return <Palette className="h-4 w-4" />;
      case "Writing & Content":
        return <PenTool className="h-4 w-4" />;
      case "Marketing & SEO":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Skills & Expertise
        </h2>
        <p className="text-gray-600">
          Showcase your skills to help clients find you for the right projects
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Skills Selection */}
        <div>
          <Label className="text-lg font-semibold">Skills *</Label>
          <p className="text-sm text-gray-600 mb-4">
            Add skills that represent your expertise. You can select from popular skills or add your own.
          </p>
          
          {/* Skill Categories */}
          <div className="space-y-6 mb-6">
            {Object.entries(skillCategories).map(([category, categorySkills]) => (
              <div key={category} className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  {getCategoryIcon(category)}
                  <h4 className="font-medium text-gray-900 ml-2">{category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map(skill => (
                    <Button
                      key={skill}
                      type="button"
                      variant={formData.skills.find(s => s.name === skill) ? "default" : "outline"}
                      size="sm"
                      onClick={() => formData.skills.find(s => s.name === skill) 
                        ? removeSkill(skill) 
                        : addSkill(skill, category)
                      }
                      className="text-xs"
                    >
                      {formData.skills.find(s => s.name === skill) ? "✓ " : "+"} {skill}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Custom Skill Input */}
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add a custom skill..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill(skillInput))}
            />
            <Button type="button" onClick={() => addSkill(skillInput)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
        </div>

        {/* Selected Skills Management */}
        {formData.skills.length > 0 && (
          <div>
            <Label className="text-lg font-semibold">Manage Your Skills</Label>
            <p className="text-sm text-gray-600 mb-4">
              Set your experience level and years of experience for each skill
            </p>
            
            <div className="space-y-4">
              {formData.skills.map((skill, index) => (
                <div key={skill.name} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <Badge variant="secondary" className="mr-2">
                        {skill.category}
                      </Badge>
                      <span className="font-medium">{skill.name}</span>
                      {formData.topSkills.includes(skill.name) && (
                        <Badge variant="default" className="ml-2 bg-yellow-500">
                          ⭐ Top Skill
                        </Badge>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill.name)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm">Experience Level</Label>
                      <Select 
                        value={skill.level} 
                        onValueChange={(value) => updateSkillLevel(skill.name, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevels.map(level => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.icon} {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-sm">Years of Experience</Label>
                      <Select 
                        value={skill.yearsOfExperience.toString()} 
                        onValueChange={(value) => updateSkillExperience(skill.name, parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8,9,10].map(year => (
                            <SelectItem key={year} value={year.toString()}>
                              {year} year{year > 1 ? 's' : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant={formData.topSkills.includes(skill.name) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleTopSkill(skill.name)}
                        disabled={!formData.topSkills.includes(skill.name) && formData.topSkills.length >= 5}
                        className="w-full"
                      >
                        {formData.topSkills.includes(skill.name) ? "Remove from Top" : "Mark as Top"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Skills Selection */}
        {formData.skills.length > 0 && (
          <div>
            <Label className="text-lg font-semibold">Top Skills (Max 5) *</Label>
            <p className="text-sm text-gray-600 mb-4">
              Choose up to 5 skills that best represent your expertise. These will be featured prominently on your profile.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex flex-wrap gap-2">
                {formData.topSkills.map(skillName => {
                  const skill = formData.skills.find(s => s.name === skillName);
                  return (
                    <Badge key={skillName} className="bg-yellow-500 text-white">
                      ⭐ {skillName} ({skill?.level})
                    </Badge>
                  );
                })}
              </div>
              <p className="text-sm text-yellow-700 mt-2">
                {formData.topSkills.length}/5 top skills selected
              </p>
            </div>
            
            {errors.topSkills && <p className="text-red-500 text-sm mt-2">{errors.topSkills}</p>}
          </div>
        )}

        {/* Service Offerings */}
        <div>
          <Label className="text-lg font-semibold">Service Offerings *</Label>
          <p className="text-sm text-gray-600 mb-4">
            What specific services do you offer to clients?
          </p>
          
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="e.g., Custom Web Application Development, Logo Design, Content Strategy..."
              value={serviceInput}
              onChange={(e) => setServiceInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
            />
            <Button type="button" onClick={addService}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.serviceOfferings.map(service => (
              <Badge key={service} variant="outline" className="flex items-center gap-1">
                {service}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeService(service)}
                  className="h-4 w-4 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          
          {errors.serviceOfferings && <p className="text-red-500 text-sm">{errors.serviceOfferings}</p>}
        </div>

        <Button type="submit" className="w-full" size="lg">
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default FreelancerSkillsExperience;
