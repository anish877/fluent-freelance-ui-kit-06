import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowRight, Upload, Camera, Loader2 } from "lucide-react";
import { uploadService } from "../../lib/uploadService";

interface FreelancerBasicInfoData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  timezone?: string;
  profilePhoto?: string;
  title?: string;
  overview?: string;
  [key: string]: string | undefined;
}

interface FreelancerBasicInfoProps {
  onNext: (data: FreelancerBasicInfoData) => void;
  data: FreelancerBasicInfoData;
}

const FreelancerBasicInfo = ({ onNext, data }: FreelancerBasicInfoProps) => {
  const [formData, setFormData] = useState<FreelancerBasicInfoData>({
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    email: data.email || "",
    phone: data.phone || "",
    country: data.country || "",
    city: data.city || "",
    timezone: data.timezone || "",
    profilePhoto: data.profilePhoto || "",
    title: data.title || "",
    overview: data.overview || "",
    ...data
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);

  const countries = [
    "United States", "Canada", "United Kingdom", "Australia", "Germany", 
    "France", "Netherlands", "Spain", "Italy", "India", "Pakistan", 
    "Bangladesh", "Philippines", "Ukraine", "Poland", "Romania", "Other"
  ];

  const timezones = [
    "UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00",
    "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:00",
    "UTC-02:00", "UTC-01:00", "UTC+00:00", "UTC+01:00", "UTC+02:00",
    "UTC+03:00", "UTC+04:00", "UTC+05:00", "UTC+06:00", "UTC+07:00",
    "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00", "UTC+12:00"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.title) newErrors.title = "Professional title is required";
    if (!formData.overview) newErrors.overview = "Professional overview is required";
    if (formData.overview && formData.overview.length < 100) {
      newErrors.overview = "Overview must be at least 100 characters";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Map the data to the correct field names for the database
      const mappedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        timezone: formData.timezone,
        profilePhoto: formData.profilePhoto,
        title: formData.title,
        overview: formData.overview
      };
      onNext(mappedData);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = uploadService.validateFile(file);
    if (!validation.isValid) {
      setErrors({ profilePhoto: validation.error });
      return;
    }

    setUploading(true);
    setErrors({});

    try {
      // Upload to Cloudinary
      const result = await uploadService.uploadSingle(file);
      
      if (result.success) {
        setFormData({ ...formData, profilePhoto: result.data.url });
      } else {
        setErrors({ profilePhoto: 'Upload failed. Please try again.' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setErrors({ profilePhoto: 'Upload failed. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tell us about yourself
        </h2>
        <p className="text-gray-600">
          This information will help clients learn more about you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Photo */}
        <div className="text-center">
          <div className="relative inline-block">
            {formData.profilePhoto ? (
              <img
                src={formData.profilePhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full cursor-pointer hover:bg-teal-700 transition-colors">
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2">Upload a professional photo</p>
          {errors.profilePhoto && (
            <p className="text-red-500 text-sm mt-1">{errors.profilePhoto}</p>
          )}
        </div>

        {/* Basic Information */}
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
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="country">Country *</Label>
            <Select 
              value={formData.country} 
              onValueChange={(value) => setFormData({ ...formData, country: value })}
            >
              <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="timezone">Timezone (Optional)</Label>
          <Select 
            value={formData.timezone} 
            onValueChange={(value) => setFormData({ ...formData, timezone: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              {timezones.map(timezone => (
                <SelectItem key={timezone} value={timezone}>{timezone}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="title">Professional Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Senior Frontend Developer, UI/UX Designer"
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
            placeholder="Tell clients about your experience, skills, and what makes you unique. This should be at least 100 characters."
            rows={4}
            className={errors.overview ? "border-red-500" : ""}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.overview && <p className="text-red-500 text-sm">{errors.overview}</p>}
            <p className="text-sm text-gray-500 ml-auto">
              {formData.overview?.length || 0}/100 characters
            </p>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={uploading}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default FreelancerBasicInfo;
