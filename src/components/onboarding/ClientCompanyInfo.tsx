import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowRight, Building, Upload, Globe } from "lucide-react";

interface ClientCompanyInfoData {
  companyName?: string;
  industry?: string;
  companySize?: string;
  website?: string;
  linkedinProfile?: string;
  companyDescription?: string;
  companyLogo?: string;
  foundedYear?: string;
  annualRevenue?: string;
  [key: string]: string | undefined;
}

interface ClientCompanyInfoProps {
  onNext: (data: ClientCompanyInfoData) => void;
  data: ClientCompanyInfoData;
}

const ClientCompanyInfo = ({ onNext, data }: ClientCompanyInfoProps) => {
  const [formData, setFormData] = useState<ClientCompanyInfoData>({
    companyName: data.companyName || "",
    industry: data.industry || "",
    companySize: data.companySize || "",
    website: data.website || "",
    linkedinProfile: data.linkedinProfile || "",
    companyDescription: data.companyDescription || "",
    companyLogo: data.companyLogo || "",
    foundedYear: data.foundedYear || "",
    annualRevenue: data.annualRevenue || "",
    ...data
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const industries = [
    "Technology", "Healthcare", "Finance", "E-commerce", "Education", "Marketing & Advertising",
    "Real Estate", "Manufacturing", "Consulting", "Non-profit", "Entertainment", "Food & Beverage",
    "Travel & Tourism", "Automotive", "Fashion", "Other"
  ];

  const companySizes = [
    { value: "1", label: "Just me" },
    { value: "2-10", label: "2-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "201-1000", label: "201-1000 employees" },
    { value: "1000+", label: "1000+ employees" }
  ];

  const revenueRanges = [
    "Under $100K", "$100K - $500K", "$500K - $1M", "$1M - $10M", "$10M+", "Prefer not to say"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (!formData.companySize) newErrors.companySize = "Company size is required";

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, companyLogo: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tell us about your company
        </h2>
        <p className="text-gray-600">
          This information helps freelancers understand your business better
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Logo */}
        <div className="text-center">
          <div className="relative inline-block">
            {formData.companyLogo ? (
              <img
                src={formData.companyLogo}
                alt="Company Logo"
                className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                <Building className="h-8 w-8 text-gray-400" />
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
              <Upload className="h-3 w-3" />
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2">Company logo (optional)</p>
        </div>

        {/* Basic Company Info */}
        <div>
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className={errors.companyName ? "border-red-500" : ""}
          />
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="industry">Industry *</Label>
            <Select 
              value={formData.industry} 
              onValueChange={(value) => setFormData({ ...formData, industry: value })}
            >
              <SelectTrigger className={errors.industry ? "border-red-500" : ""}>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
          </div>
          
          <div>
            <Label htmlFor="companySize">Company Size *</Label>
            <Select 
              value={formData.companySize} 
              onValueChange={(value) => setFormData({ ...formData, companySize: value })}
            >
              <SelectTrigger className={errors.companySize ? "border-red-500" : ""}>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {companySizes.map(size => (
                  <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="foundedYear">Founded Year</Label>
            <Input
              id="foundedYear"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={formData.foundedYear}
              onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
              placeholder="2020"
            />
          </div>
          
          <div>
            <Label htmlFor="annualRevenue">Annual Revenue</Label>
            <Select 
              value={formData.annualRevenue} 
              onValueChange={(value) => setFormData({ ...formData, annualRevenue: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                {revenueRanges.map(range => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Online Presence */}
        <div>
          <Label htmlFor="website">Company Website</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://yourcompany.com"
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="linkedinProfile">LinkedIn Company Page</Label>
          <Input
            id="linkedinProfile"
            type="url"
            value={formData.linkedinProfile}
            onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
            placeholder="https://linkedin.com/company/yourcompany"
          />
        </div>

        {/* Company Description */}
        <div>
          <Label htmlFor="companyDescription">Company Description</Label>
          <Textarea
            id="companyDescription"
            value={formData.companyDescription}
            onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
            placeholder="Describe your company, mission, and what you do..."
            rows={4}
          />
          <p className="text-sm text-gray-500 mt-1">
            Help freelancers understand your business and culture
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

export default ClientCompanyInfo;
