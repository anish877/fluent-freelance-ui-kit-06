import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowRight, Upload, Camera } from "lucide-react";

interface ClientBasicInfoData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  timezone?: string;
  profilePhoto?: string;
  clientType?: string;
  howDidYouHear?: string;
  [key: string]: string | undefined;
}

interface ClientBasicInfoProps {
  onNext: (data: ClientBasicInfoData) => void;
  data: ClientBasicInfoData;
}

const ClientBasicInfo = ({ onNext, data }: ClientBasicInfoProps) => {
  const [formData, setFormData] = useState<ClientBasicInfoData>({
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    email: data.email || "",
    phone: data.phone || "",
    country: data.country || "",
    city: data.city || "",
    timezone: data.timezone || "",
    profilePhoto: data.profilePhoto || "",
    clientType: data.clientType || "",
    howDidYouHear: data.howDidYouHear || "",
    ...data
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = [
    "United States", "Canada", "United Kingdom", "Australia", "Germany", 
    "France", "Netherlands", "Spain", "Italy", "India", "Other"
  ];

  const clientTypes = [
    { value: "individual", label: "Individual", description: "Personal projects and small tasks" },
    { value: "small-business", label: "Small Business", description: "1-10 employees" },
    { value: "medium-business", label: "Medium Business", description: "11-100 employees" },
    { value: "enterprise", label: "Enterprise", description: "100+ employees" },
    { value: "agency", label: "Agency", description: "Marketing/Design agency" },
    { value: "startup", label: "Startup", description: "Early-stage company" }
  ];

  const referralSources = [
    "Google Search", "Social Media", "Friend/Colleague Referral", 
    "Online Advertisement", "Blog/Article", "Other Platform", "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.clientType) newErrors.clientType = "Client type is required";

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
        clientType: formData.clientType,
        howDidYouHear: formData.howDidYouHear
      };
      onNext(mappedData);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, profilePhoto: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tell us about yourself
        </h2>
        <p className="text-gray-600">
          This information helps us connect you with the best freelancers
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
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
              <Upload className="h-4 w-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2">Upload your photo (optional)</p>
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
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
        </div>

        {/* Client Type */}
        <div>
          <Label className="text-base font-medium">What type of client are you? *</Label>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {clientTypes.map(type => (
              <div
                key={type.value}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  formData.clientType === type.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setFormData({ ...formData, clientType: type.value })}
              >
                <h4 className="font-medium text-gray-900 text-sm">{type.label}</h4>
                <p className="text-xs text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
          {errors.clientType && <p className="text-red-500 text-sm mt-1">{errors.clientType}</p>}
        </div>

        {/* How did you hear about us */}
        <div>
          <Label htmlFor="howDidYouHear">How did you hear about FreelanceHub?</Label>
          <Select 
            value={formData.howDidYouHear} 
            onValueChange={(value) => setFormData({ ...formData, howDidYouHear: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              {referralSources.map(source => (
                <SelectItem key={source} value={source}>{source}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default ClientBasicInfo;
