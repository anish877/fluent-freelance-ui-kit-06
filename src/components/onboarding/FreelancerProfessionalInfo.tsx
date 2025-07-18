import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { ArrowRight, Plus, X, Building, GraduationCap } from "lucide-react";

interface WorkExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location: string;
  industry: string;
  achievements: string[];
  technologies: string[];
}

interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  honors: string;
  activities: string[];
}

interface Language {
  language: string;
  proficiency: string;
}

interface Employment {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location: string;
  industry: string;
  achievements: string[];
  technologies: string[];
}

interface FreelancerProfessionalInfoData {
  category?: string;
  subcategory?: string;
  experienceLevel?: string;
  workExperience?: WorkExperience[];
  education?: Education[];
  certifications?: string[];
  languages?: Language[];
  employment?: Employment[];
  [key: string]: string | WorkExperience[] | Education[] | string[] | Language[] | Employment[] | undefined;
}

interface FreelancerProfessionalInfoProps {
  onNext: (data: FreelancerProfessionalInfoData) => void;
  data: FreelancerProfessionalInfoData;
}

const FreelancerProfessionalInfo = ({ onNext, data }: FreelancerProfessionalInfoProps) => {
  const [formData, setFormData] = useState<FreelancerProfessionalInfoData>({
    category: data.category || "",
    subcategory: data.subcategory || "",
    experienceLevel: data.experienceLevel || "",
    workExperience: data.workExperience || [],
    education: data.education || [],
    certifications: data.certifications || [],
    languages: data.languages || [{ language: "English", proficiency: "Native" }],
    employment: data.employment || [],
    ...data
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = {
    "Web Development": ["Frontend Development", "Backend Development", "Full Stack Development", "WordPress Development", "E-commerce Development"],
    "Mobile Development": ["iOS Development", "Android Development", "React Native", "Flutter", "Hybrid Apps"],
    "Design & Creative": ["UI/UX Design", "Graphic Design", "Logo Design", "Web Design", "Brand Identity"],
    "Writing & Translation": ["Content Writing", "Copywriting", "Technical Writing", "Translation", "Proofreading"],
    "Digital Marketing": ["SEO", "Social Media Marketing", "PPC Advertising", "Email Marketing", "Content Marketing"],
    "Data Science & Analytics": ["Data Analysis", "Machine Learning", "Data Visualization", "Statistical Analysis", "Business Intelligence"]
  };

  const experienceLevels = [
    { value: "entry", label: "Entry Level", description: "Less than 1 year" },
    { value: "intermediate", label: "Intermediate", description: "1-3 years" },
    { value: "expert", label: "Expert", description: "3+ years" }
  ];

  const languages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", "Russian",
    "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Dutch", "Swedish", "Other"
  ];

  const proficiencyLevels = ["Basic", "Conversational", "Fluent", "Native"];

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        {
          title: "",
          company: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          location: "",
          industry: "",
          achievements: [],
          technologies: []
        }
      ]
    });
  };

  const removeWorkExperience = (index: number) => {
    setFormData({
      ...formData,
      workExperience: formData.workExperience.filter((_, i) => i !== index)
    });
  };

  const updateWorkExperience = (index: number, field: string, value: any) => {
    const updated = formData.workExperience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    setFormData({ ...formData, workExperience: updated });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          school: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          current: false,
          gpa: "",
          honors: "",
          activities: []
        }
      ]
    });
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index)
    });
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const updated = formData.education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    setFormData({ ...formData, education: updated });
  };

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [...formData.languages, { language: "", proficiency: "" }]
    });
  };

  const removeLanguage = (index: number) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((_, i) => i !== index)
    });
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    const updated = formData.languages.map((lang, i) => 
      i === index ? { ...lang, [field]: value } : lang
    );
    setFormData({ ...formData, languages: updated });
  };

  const addEmployment = () => {
    setFormData({
      ...formData,
      employment: [
        ...formData.employment,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          location: "",
          industry: "",
          achievements: [],
          technologies: []
        }
      ]
    });
  };

  const removeEmployment = (index: number) => {
    setFormData({
      ...formData,
      employment: formData.employment.filter((_, i) => i !== index)
    });
  };

  const updateEmployment = (index: number, field: string, value: any) => {
    const updated = formData.employment.map((emp, i) => 
      i === index ? { ...emp, [field]: value } : emp
    );
    setFormData({ ...formData, employment: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.subcategory) newErrors.subcategory = "Subcategory is required";
    if (!formData.experienceLevel) newErrors.experienceLevel = "Experience level is required";

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Map the data to the correct field names for the database
      const mappedData = {
        category: formData.category,
        subcategory: formData.subcategory,
        experienceLevel: formData.experienceLevel,
        workExperience: formData.workExperience,
        education: formData.education,
        certifications: formData.certifications,
        languages: formData.languages,
        employment: formData.employment
      };
      onNext(mappedData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Professional Background
        </h2>
        <p className="text-gray-600">
          Help clients understand your expertise and experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Category Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Primary Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({ ...formData, category: value, subcategory: "" })}
            >
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(categories).map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>
          <div>
            <Label htmlFor="subcategory">Subcategory *</Label>
            <Select 
              value={formData.subcategory} 
              onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
              disabled={!formData.category}
            >
              <SelectTrigger className={errors.subcategory ? "border-red-500" : ""}>
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {formData.category && categories[formData.category as keyof typeof categories]?.map(sub => (
                  <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subcategory && <p className="text-red-500 text-sm mt-1">{errors.subcategory}</p>}
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <Label>Experience Level *</Label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {experienceLevels.map(level => (
              <div
                key={level.value}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.experienceLevel === level.value
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setFormData({ ...formData, experienceLevel: level.value })}
              >
                <h4 className="font-medium text-gray-900">{level.label}</h4>
                <p className="text-sm text-gray-600">{level.description}</p>
              </div>
            ))}
          </div>
          {errors.experienceLevel && <p className="text-red-500 text-sm mt-1">{errors.experienceLevel}</p>}
        </div>

        {/* Work Experience */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <Label>Work Experience</Label>
            <Button type="button" variant="outline" size="sm" onClick={addWorkExperience}>
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
          
          {formData.workExperience.map((exp, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-400 mr-2" />
                  <h4 className="font-medium">Work Experience {index + 1}</h4>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWorkExperience(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Job Title</Label>
                  <Input
                    value={exp.title}
                    onChange={(e) => updateWorkExperience(index, "title", e.target.value)}
                    placeholder="e.g., Senior Developer"
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateWorkExperience(index, "company", e.target.value)}
                    placeholder="e.g., Tech Company Inc."
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateWorkExperience(index, "location", e.target.value)}
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
                <div>
                  <Label>Industry</Label>
                  <Input
                    value={exp.industry}
                    onChange={(e) => updateWorkExperience(index, "industry", e.target.value)}
                    placeholder="e.g., Technology, Healthcare, Finance"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateWorkExperience(index, "startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateWorkExperience(index, "endDate", e.target.value)}
                    disabled={exp.current}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id={`current-${index}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => updateWorkExperience(index, "current", checked)}
                />
                <Label htmlFor={`current-${index}`}>I currently work here</Label>
              </div>
              
              <div className="mb-4">
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateWorkExperience(index, "description", e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
              </div>

              <div className="mb-4">
                <Label>Key Achievements</Label>
                <Textarea
                  value={exp.achievements.join('\n')}
                  onChange={(e) => updateWorkExperience(index, "achievements", e.target.value.split('\n').filter(item => item.trim()))}
                  placeholder="List your key achievements, one per line..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Technologies Used</Label>
                <Input
                  value={exp.technologies.join(', ')}
                  onChange={(e) => updateWorkExperience(index, "technologies", e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech))}
                  placeholder="e.g., React, Node.js, AWS, Docker (comma separated)"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <Label>Education</Label>
            <Button type="button" variant="outline" size="sm" onClick={addEducation}>
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
          
          {formData.education.map((edu, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 text-gray-400 mr-2" />
                  <h4 className="font-medium">Education {index + 1}</h4>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>School/University</Label>
                  <Input
                    value={edu.school}
                    onChange={(e) => updateEducation(index, "school", e.target.value)}
                    placeholder="e.g., University of Technology"
                  />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    placeholder="e.g., Bachelor's, Master's"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <Label>Field of Study</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => updateEducation(index, "field", e.target.value)}
                  placeholder="e.g., Computer Science"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                    disabled={edu.current}
                  />
                </div>
                <div>
                  <Label>GPA</Label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                    placeholder="e.g., 3.8/4.0"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <Label>Honors & Awards</Label>
                <Input
                  value={edu.honors}
                  onChange={(e) => updateEducation(index, "honors", e.target.value)}
                  placeholder="e.g., Magna Cum Laude, Dean's List"
                />
              </div>

              <div className="mb-4">
                <Label>Activities & Organizations</Label>
                <Textarea
                  value={edu.activities.join('\n')}
                  onChange={(e) => updateEducation(index, "activities", e.target.value.split('\n').filter(item => item.trim()))}
                  placeholder="List your activities, clubs, or organizations, one per line..."
                  rows={2}
                />
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id={`current-edu-${index}`}
                  checked={edu.current}
                  onCheckedChange={(checked) => updateEducation(index, "current", checked)}
                />
                <Label htmlFor={`current-edu-${index}`}>I currently study here</Label>
              </div>
            </div>
          ))}
        </div>

        {/* Employment History */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <Label>Employment History</Label>
            <Button type="button" variant="outline" size="sm" onClick={addEmployment}>
              <Plus className="h-4 w-4 mr-2" />
              Add Employment
            </Button>
          </div>
          
          {formData.employment.map((emp, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-400 mr-2" />
                  <h4 className="font-medium">Employment {index + 1}</h4>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEmployment(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Position</Label>
                  <Input
                    value={emp.position}
                    onChange={(e) => updateEmployment(index, "position", e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    value={emp.company}
                    onChange={(e) => updateEmployment(index, "company", e.target.value)}
                    placeholder="e.g., Tech Innovations Inc"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    value={emp.location}
                    onChange={(e) => updateEmployment(index, "location", e.target.value)}
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
                <div>
                  <Label>Industry</Label>
                  <Input
                    value={emp.industry}
                    onChange={(e) => updateEmployment(index, "industry", e.target.value)}
                    placeholder="e.g., Technology, Healthcare, Finance"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={emp.startDate}
                    onChange={(e) => updateEmployment(index, "startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={emp.endDate}
                    onChange={(e) => updateEmployment(index, "endDate", e.target.value)}
                    disabled={emp.current}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id={`current-emp-${index}`}
                  checked={emp.current}
                  onCheckedChange={(checked) => updateEmployment(index, "current", checked)}
                />
                <Label htmlFor={`current-emp-${index}`}>I currently work here</Label>
              </div>
              
              <div className="mb-4">
                <Label>Description</Label>
                <Textarea
                  value={emp.description}
                  onChange={(e) => updateEmployment(index, "description", e.target.value)}
                  placeholder="Describe your role and responsibilities..."
                  rows={3}
                />
              </div>

              <div className="mb-4">
                <Label>Key Achievements</Label>
                <Textarea
                  value={emp.achievements.join('\n')}
                  onChange={(e) => updateEmployment(index, "achievements", e.target.value.split('\n').filter(item => item.trim()))}
                  placeholder="List your key achievements, one per line..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Technologies Used</Label>
                <Input
                  value={emp.technologies.join(', ')}
                  onChange={(e) => updateEmployment(index, "technologies", e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech))}
                  placeholder="e.g., React, Node.js, AWS, Docker (comma separated)"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <Label>Languages</Label>
            <Button type="button" variant="outline" size="sm" onClick={addLanguage}>
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </div>
          
          {formData.languages.map((lang, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-4">
              <div className="col-span-2">
                <Select 
                  value={lang.language} 
                  onValueChange={(value) => updateLanguage(index, "language", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(language => (
                      <SelectItem key={language} value={language}>{language}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Select 
                  value={lang.proficiency} 
                  onValueChange={(value) => updateLanguage(index, "proficiency", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Proficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLanguage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full" size="lg">
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default FreelancerProfessionalInfo;
