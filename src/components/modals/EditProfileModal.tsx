import { useState, useEffect, useRef } from "react";
import { X, Plus, Upload, Camera, Loader2, Save, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { uploadService } from "../../lib/uploadService";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: any;
  onSave: (updatedProfile: any) => void;
  defaultTab?: string;
}

interface Skill {
  name: string;
  level?: string;
  yearsOfExperience?: number;
}

interface Language {
  language: string;
  proficiency: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  field?: string;
  gpa?: string;
  honors?: string;
  activities?: string[];
  current?: boolean;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
}

interface PortfolioItem {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

interface WorkExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location?: string;
  industry?: string;
}

const EditProfileModal = ({ isOpen, onClose, userProfile, onSave, defaultTab = "basic" }: EditProfileModalProps) => {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingField, setUploadingField] = useState<'avatar' | 'coverImage' | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState({ language: "", proficiency: "" });
  const [newCertification, setNewCertification] = useState({ name: "", issuer: "", year: "" });
  const [uploadingPortfolioIndex, setUploadingPortfolioIndex] = useState<number | null>(null);
  const initializedProfileId = useRef<string | null>(null);

  useEffect(() => {
    if (userProfile && isOpen && initializedProfileId.current !== userProfile.id) {
      console.log('Initializing formData for userProfile:', userProfile.id);
      console.log('UserProfile coverImage:', userProfile.coverImage);
      
      setFormData({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        title: userProfile.title || "",
        overview: userProfile.description || "",
        location: userProfile.location || "",
        country: userProfile.country || "",
        city: userProfile.city || "",
        timezone: userProfile.timezone || "",
        phone: userProfile.phone || "",
        hourlyRate: userProfile.hourlyRate?.replace('$', '') || "",
        availability: userProfile.availability || "Available - 30+ hrs/week",
        responseTime: userProfile.responseTime || "Within 24 hours",
        avatar: userProfile.profilePicture || "",
        coverImage: userProfile.coverImage || "",
        skills: userProfile.skills || [],
        languages: userProfile.languages || [],
        education: userProfile.education || [],
        certifications: userProfile.certifications || [],
        portfolio: userProfile.portfolio || [],
        workExperience: userProfile.workExperience || [],
        socialLinks: userProfile.socialLinks || {
          linkedin: "",
          github: "",
          website: "",
          twitter: ""
        }
      });
      setNewCertification({ name: "", issuer: "", year: "" });
      initializedProfileId.current = userProfile.id;
    }
  }, [userProfile, isOpen]);

  // Debug useEffect to monitor formData changes
  useEffect(() => {
    console.log('formData changed:', formData);
    console.log('Current coverImage in formData:', formData.coverImage);
  }, [formData]);

  // Reset initialization when modal closes
  useEffect(() => {
    if (!isOpen) {
      initializedProfileId.current = null;
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate required fields
      const newErrors: Record<string, string> = {};
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.title) newErrors.title = "Professional title is required";
      if (!formData.overview) newErrors.overview = "Overview is required";
      if (formData.overview && formData.overview.length < 50) {
        newErrors.overview = "Overview must be at least 50 characters";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      // Transform data for backend
      const updatedProfile = {
        ...formData,
        profilePicture: formData.avatar,
        description: formData.overview,
        hourlyRate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : null,
        skills: formData.skills.map((skill: any) => 
          typeof skill === 'string' ? { name: skill } : skill
        ),
        languages: formData.languages.map((lang: any) => 
          typeof lang === 'string' ? { language: lang, proficiency: 'Fluent' } : lang
        ),
        // Transform portfolio items to match backend structure
        portfolio: formData.portfolio?.map((item: any) => ({
          title: item.title || '',
          description: item.description || '',
          image: item.image || '/placeholder.svg',
          technologies: Array.isArray(item.technologies) ? item.technologies : [],
          link: item.link || '',
          category: item.category || 'Web Development'
        })) || []
      };

      console.log('Modal sending profile data:', updatedProfile);
      console.log('Profile picture URL:', updatedProfile.profilePicture);
      console.log('Cover image URL:', updatedProfile.coverImage);
      console.log('Portfolio data being sent:', updatedProfile.portfolio);
      console.log('Portfolio items count:', updatedProfile.portfolio?.length || 0);

      await onSave(updatedProfile);
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrors({ general: 'Failed to save profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'avatar' | 'coverImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = uploadService.validateFile(file);
    if (!validation.isValid) {
      setErrors({ [field]: validation.error });
      return;
    }

    setUploading(true);
    setUploadingField(field);
    setErrors({});

    try {
      const result = await uploadService.uploadSingle(file);
      if (result.success) {
        setFormData(prevData => {
          const updatedData = {
            ...prevData,
            [field]: result.data.url
          };
          console.log(`${field} uploaded successfully:`, result.data.url);
          console.log('Updated formData:', updatedData);
          return updatedData;
        });
      } else {
        setErrors({ [field]: 'Upload failed. Please try again.' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setErrors({ [field]: 'Upload failed. Please try again.' });
    } finally {
      setUploading(false);
      setUploadingField(null);
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, { name: newSkill.trim() }]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_: any, i: number) => i !== index)
    });
  };

  const addLanguage = () => {
    if (newLanguage.language.trim() && newLanguage.proficiency) {
      setFormData({
        ...formData,
        languages: [...formData.languages, { ...newLanguage }]
      });
      setNewLanguage({ language: "", proficiency: "" });
    }
  };

  const removeLanguage = (index: number) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((_: any, i: number) => i !== index)
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, {
        degree: "",
        institution: "",
        year: "",
        field: "",
        gpa: "",
        honors: "",
        activities: [],
        current: false
      }]
    });
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setFormData({ ...formData, education: updatedEducation });
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_: any, i: number) => i !== index)
    });
  };

  const addCertification = () => {
    if (newCertification.name.trim() && newCertification.issuer.trim()) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, { ...newCertification }]
      });
      setNewCertification({ name: "", issuer: "", year: "" });
    }
  };

  const removeCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_: any, i: number) => i !== index)
    });
  };

  const addPortfolioItem = () => {
    setFormData({
      ...formData,
      portfolio: [...formData.portfolio, {
        title: "",
        description: "",
        image: "",
        technologies: [],
        link: ""
      }]
    });
  };

  const updatePortfolioItem = (index: number, field: string, value: any) => {
    const updatedPortfolio = [...formData.portfolio];
    updatedPortfolio[index] = { ...updatedPortfolio[index], [field]: value };
    setFormData({ ...formData, portfolio: updatedPortfolio });
  };

  const removePortfolioItem = (index: number) => {
    setFormData({
      ...formData,
      portfolio: formData.portfolio.filter((_: any, i: number) => i !== index)
    });
  };

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [...formData.workExperience, {
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        location: "",
        industry: ""
      }]
    });
  };

  const updateWorkExperience = (index: number, field: string, value: any) => {
    const updatedWorkExperience = [...formData.workExperience];
    updatedWorkExperience[index] = { ...updatedWorkExperience[index], [field]: value };
    setFormData({ ...formData, workExperience: updatedWorkExperience });
  };

  const removeWorkExperience = (index: number) => {
    setFormData({
      ...formData,
      workExperience: formData.workExperience.filter((_: any, i: number) => i !== index)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Photos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        key={formData.avatar}
                        src={formData.avatar || '/placeholder.svg'}
                        alt="Profile"
                        className={`w-24 h-24 rounded-full object-cover border-4 border-gray-200 ${
                          uploadingField === 'avatar' ? 'opacity-50' : ''
                        }`}
                        onLoad={() => console.log('Profile image loaded:', formData.avatar)}
                        onError={(e) => {
                          console.error('Profile image failed to load:', formData.avatar);
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      {uploadingField === 'avatar' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-full">
                          <Loader2 className="h-6 w-6 text-white animate-spin" />
                        </div>
                      )}
                      <label className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full cursor-pointer hover:bg-teal-700 transition-colors">
                        {uploadingField === 'avatar' ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Camera className="h-4 w-4" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'avatar')}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    </div>
                    <div>
                      <h4 className="font-medium">Profile Picture</h4>
                      <p className="text-sm text-gray-600">
                        {uploadingField === 'avatar' ? 'Uploading...' : 'Upload a professional photo'}
                      </p>
                      {errors.avatar && (
                        <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
                      )}
                      {formData.avatar && formData.avatar !== userProfile?.profilePicture && (
                        <p className="text-green-600 text-sm mt-1">✓ New image uploaded</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">Current URL: {formData.avatar || 'None'}</p>
                    </div>
                  </div>

                  {/* Cover Image */}
                  <div className="space-y-4">
                    <div className="relative">
                      {formData.coverImage ? (
                        <div className="relative">
                          <img
                            key={formData.coverImage}
                            src={formData.coverImage}
                            alt="Cover"
                            className={`w-full h-32 object-cover rounded-lg border-2 border-gray-200 ${
                              uploadingField === 'coverImage' ? 'opacity-50' : ''
                            }`}
                            onLoad={() => console.log('Cover image loaded:', formData.coverImage)}
                            onError={(e) => {
                              console.error('Cover image failed to load:', formData.coverImage);
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                          {uploadingField === 'coverImage' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
                              <Loader2 className="h-6 w-6 text-white animate-spin" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-32 bg-gray-100 border-2 border-gray-200 rounded-lg flex items-center justify-center">
                          <Camera className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <label className="absolute bottom-2 right-2 bg-teal-600 text-white p-2 rounded-full cursor-pointer hover:bg-teal-700 transition-colors">
                        {uploadingField === 'coverImage' ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'coverImage')}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    </div>
                    <div>
                      <h4 className="font-medium">Cover Image</h4>
                      <p className="text-sm text-gray-600">
                        {uploadingField === 'coverImage' ? 'Uploading...' : 'Add a cover image to make your profile stand out'}
                      </p>
                      {errors.coverImage && (
                        <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
                      )}
                      {formData.coverImage && formData.coverImage !== userProfile?.coverImage && (
                        <p className="text-green-600 text-sm mt-1">✓ New cover image uploaded</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">Current URL: {formData.coverImage || 'None'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Professional Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Senior Frontend Developer"
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <Label htmlFor="overview">Professional Overview *</Label>
                    <Textarea
                      id="overview"
                      value={formData.overview}
                      onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                      placeholder="Tell clients about your experience, skills, and what makes you unique..."
                      rows={4}
                      className={errors.overview ? "border-red-500" : ""}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.overview && <p className="text-red-500 text-sm">{errors.overview}</p>}
                      <p className="text-sm text-gray-500 ml-auto">
                        {formData.overview?.length || 0}/500 characters
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                        placeholder="75"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="United States"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="San Francisco"
                      />
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Input
                        id="timezone"
                        value={formData.timezone}
                        onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                        placeholder="PST (UTC-8)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="availability">Availability</Label>
                      <Select
                        value={formData.availability}
                        onValueChange={(value) => setFormData({ ...formData, availability: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Available - 30+ hrs/week">Available - 30+ hrs/week</SelectItem>
                          <SelectItem value="Available - 20-30 hrs/week">Available - 20-30 hrs/week</SelectItem>
                          <SelectItem value="Available - 10-20 hrs/week">Available - 10-20 hrs/week</SelectItem>
                          <SelectItem value="Limited availability">Limited availability</SelectItem>
                          <SelectItem value="Not available">Not available</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="responseTime">Response Time</Label>
                      <Select
                        value={formData.responseTime}
                        onValueChange={(value) => setFormData({ ...formData, responseTime: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select response time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 hour">1 hour</SelectItem>
                          <SelectItem value="2 hours">2 hours</SelectItem>
                          <SelectItem value="4 hours">4 hours</SelectItem>
                          <SelectItem value="8 hours">8 hours</SelectItem>
                          <SelectItem value="24 hours">24 hours</SelectItem>
                          <SelectItem value="Within 24 hours">Within 24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Languages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Skills */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <Label>Skills</Label>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add a skill"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                          className="w-48"
                        />
                        <Button type="button" onClick={addSkill} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills?.map((skill: any, index: number) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {typeof skill === 'string' ? skill : skill.name}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSkill(index)}
                            className="h-4 w-4 p-0 hover:bg-red-100"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <Label>Languages</Label>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Language"
                          value={newLanguage.language}
                          onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
                          className="w-32"
                        />
                        <Select
                          value={newLanguage.proficiency}
                          onValueChange={(value) => setNewLanguage({ ...newLanguage, proficiency: value })}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Native">Native</SelectItem>
                            <SelectItem value="Fluent">Fluent</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Basic">Basic</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button type="button" onClick={addLanguage} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {formData.languages?.map((lang: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span>
                            {typeof lang === 'string' ? lang : `${lang.language} (${lang.proficiency})`}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLanguage(index)}
                            className="h-6 w-6 p-0 hover:bg-red-100"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Portfolio Projects</CardTitle>
                    <Button type="button" onClick={addPortfolioItem} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {formData.portfolio?.map((item: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Project {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePortfolioItem(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label>Project Image</Label>
                          <div className="flex items-center space-x-4 mt-2">
                            <img
                              src={item.image || '/placeholder.svg'}
                              alt="Project"
                              className="w-20 h-20 object-cover rounded border"
                            />
                            <label className="bg-teal-600 text-white px-3 py-2 rounded cursor-pointer hover:bg-teal-700">
                              {uploadingPortfolioIndex === index ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Upload className="h-4 w-4" />
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setUploadingPortfolioIndex(index);
                                    try {
                                      const result = await uploadService.uploadSingle(file);
                                      if (result.success) {
                                        updatePortfolioItem(index, 'image', result.data.url);
                                      }
                                    } catch (error) {
                                      console.error('Upload failed:', error);
                                      // You could add a toast notification here
                                    } finally {
                                      setUploadingPortfolioIndex(null);
                                    }
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Project Title</Label>
                            <Input
                              value={item.title}
                              onChange={(e) => updatePortfolioItem(index, 'title', e.target.value)}
                              placeholder="E-commerce Platform"
                            />
                          </div>
                          <div>
                            <Label>Project Link</Label>
                            <Input
                              value={item.link}
                              onChange={(e) => updatePortfolioItem(index, 'link', e.target.value)}
                              placeholder="https://example.com"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={item.description}
                            onChange={(e) => updatePortfolioItem(index, 'description', e.target.value)}
                            placeholder="Describe the project, technologies used, and your role..."
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label>Technologies (comma-separated)</Label>
                          <Input
                            value={Array.isArray(item.technologies) ? item.technologies.join(', ') : ''}
                            onChange={(e) => updatePortfolioItem(index, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                            placeholder="React, Node.js, MongoDB, AWS"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-6">
              {/* Education */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Education</CardTitle>
                    <Button type="button" onClick={addEducation} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.education?.map((edu: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Education {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Institution</Label>
                          <Input
                            value={edu.institution || edu.school || ''}
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            placeholder="University of Technology"
                          />
                        </div>
                        <div>
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            placeholder="Bachelor's in Computer Science"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label>Field of Study</Label>
                          <Input
                            value={edu.field || ''}
                            onChange={(e) => updateEducation(index, 'field', e.target.value)}
                            placeholder="Computer Science"
                          />
                        </div>
                        <div>
                          <Label>Year</Label>
                          <Input
                            value={edu.year}
                            onChange={(e) => updateEducation(index, 'year', e.target.value)}
                            placeholder="2020"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Work Experience */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Work Experience</CardTitle>
                    <Button type="button" onClick={addWorkExperience} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.workExperience?.map((exp: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Experience {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWorkExperience(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Job Title</Label>
                          <Input
                            value={exp.title}
                            onChange={(e) => updateWorkExperience(index, 'title', e.target.value)}
                            placeholder="Senior Developer"
                          />
                        </div>
                        <div>
                          <Label>Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                            placeholder="Tech Corp"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                            disabled={exp.current}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Label>Description</Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                          placeholder="Describe your role, responsibilities, and achievements..."
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Certifications</CardTitle>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Certification name"
                        value={newCertification.name}
                        onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                        className="w-48"
                      />
                      <Input
                        placeholder="Issuer"
                        value={newCertification.issuer}
                        onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                        className="w-32"
                      />
                      <Input
                        placeholder="Year"
                        value={newCertification.year}
                        onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })}
                        className="w-20"
                      />
                      <Button type="button" onClick={addCertification} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {formData.certifications?.map((cert: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span>
                          {typeof cert === 'string' ? cert : `${cert.name} - ${cert.issuer} (${cert.year})`}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCertification(index)}
                          className="h-6 w-6 p-0 hover:bg-red-100"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Social Links Tab */}
            <TabsContent value="social" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>LinkedIn</Label>
                    <Input
                      value={formData.socialLinks?.linkedin || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                      })}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <Label>GitHub</Label>
                    <Input
                      value={formData.socialLinks?.github || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, github: e.target.value }
                      })}
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                  <div>
                    <Label>Personal Website</Label>
                    <Input
                      value={formData.socialLinks?.website || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, website: e.target.value }
                      })}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div>
                    <Label>Twitter</Label>
                    <Input
                      value={formData.socialLinks?.twitter || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                      })}
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {errors.general && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal; 