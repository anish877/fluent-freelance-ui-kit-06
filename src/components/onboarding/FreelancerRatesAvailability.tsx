import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { ArrowRight, Clock, DollarSign, Calendar, Info } from "lucide-react";

interface ProjectBasedRates {
  small: string;
  medium: string;
  large: string;
}

interface WorkingHours {
  start: string;
  end: string;
}

interface FreelancerRatesAvailabilityData {
  hourlyRate?: string;
  projectBasedRates?: ProjectBasedRates;
  preferredPaymentType?: string;
  availability?: string;
  hoursPerWeek?: string;
  timezone?: string;
  workingHours?: WorkingHours;
  workingDays?: string[];
  responseTime?: string;
  minimumProjectBudget?: string;
  specialRequirements?: string;
  [key: string]: string | ProjectBasedRates | WorkingHours | string[] | undefined;
}

interface FreelancerRatesAvailabilityProps {
  onNext: (data: FreelancerRatesAvailabilityData) => void;
  data: FreelancerRatesAvailabilityData;
}

const FreelancerRatesAvailability = ({ onNext, data }: FreelancerRatesAvailabilityProps) => {
  const [formData, setFormData] = useState<FreelancerRatesAvailabilityData>({
    hourlyRate: data.hourlyRate || "",
    projectBasedRates: data.projectBasedRates || {
      small: "",
      medium: "",
      large: ""
    },
    preferredPaymentType: data.preferredPaymentType || "both",
    availability: data.availability || "full-time",
    hoursPerWeek: data.hoursPerWeek || "",
    timezone: data.timezone || "",
    workingHours: data.workingHours || {
      start: "09:00",
      end: "17:00"
    },
    workingDays: data.workingDays || ["monday", "tuesday", "wednesday", "thursday", "friday"],
    responseTime: data.responseTime || "",
    minimumProjectBudget: data.minimumProjectBudget || "",
    specialRequirements: data.specialRequirements || "",
    ...data
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const availabilityOptions = [
    { value: "full-time", label: "Full-time", description: "30+ hours per week" },
    { value: "part-time", label: "Part-time", description: "Less than 30 hours per week" },
    { value: "project-based", label: "Projects Only", description: "Available for specific projects" }
  ];

  const responseTimeOptions = [
    { value: "immediate", label: "Within 1 hour" },
    { value: "few-hours", label: "Within a few hours" },
    { value: "same-day", label: "Same day" },
    { value: "next-day", label: "Within 24 hours" },
    { value: "few-days", label: "Within a few days" }
  ];

  const paymentTypes = [
    { value: "hourly", label: "Hourly", description: "Get paid by the hour" },
    { value: "fixed", label: "Fixed Price", description: "Set project-based rates" },
    { value: "both", label: "Both", description: "Flexible with both options" }
  ];

  const daysOfWeek = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" }
  ];

  const toggleWorkingDay = (day: string) => {
    const isSelected = formData.workingDays.includes(day);
    if (isSelected) {
      setFormData({
        ...formData,
        workingDays: formData.workingDays.filter(d => d !== day)
      });
    } else {
      setFormData({
        ...formData,
        workingDays: [...formData.workingDays, day]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.hourlyRate && formData.preferredPaymentType !== "fixed") {
      newErrors.hourlyRate = "Hourly rate is required";
    }
    
    if (formData.preferredPaymentType === "fixed" && 
        !formData.projectBasedRates.small && 
        !formData.projectBasedRates.medium && 
        !formData.projectBasedRates.large) {
      newErrors.projectRates = "At least one project rate range is required";
    }
    
    if (!formData.availability) {
      newErrors.availability = "Availability preference is required";
    }
    
    if (!formData.responseTime) {
      newErrors.responseTime = "Response time is required";
    }
    
    if (formData.workingDays.length === 0) {
      newErrors.workingDays = "Select at least one working day";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Set Your Rates & Availability
        </h2>
        <p className="text-gray-600">
          Define your pricing and working preferences to attract the right clients
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Payment Preference */}
        <div>
          <Label className="text-lg font-semibold">Payment Preference *</Label>
          <p className="text-sm text-gray-600 mb-4">
            How do you prefer to get paid for your work?
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            {paymentTypes.map(type => (
              <div
                key={type.value}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.preferredPaymentType === type.value
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setFormData({ ...formData, preferredPaymentType: type.value })}
              >
                <h4 className="font-medium text-gray-900">{type.label}</h4>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Rate */}
        {(formData.preferredPaymentType === "hourly" || formData.preferredPaymentType === "both") && (
          <div>
            <Label className="text-lg font-semibold">Hourly Rate *</Label>
            <p className="text-sm text-gray-600 mb-4">
              Set your hourly rate in USD. This will be visible to clients.
            </p>
            
            <div className="relative max-w-xs">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                placeholder="50"
                className={`pl-10 ${errors.hourlyRate ? "border-red-500" : ""}`}
              />
              <span className="absolute right-3 top-3 text-sm text-gray-500">/hour</span>
            </div>
            
            {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Pricing Tips</h4>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• Research market rates for your skill level</li>
                    <li>• Consider your experience and expertise</li>
                    <li>• You can always adjust rates later</li>
                    <li>• Higher rates often attract better clients</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project-Based Rates */}
        {(formData.preferredPaymentType === "fixed" || formData.preferredPaymentType === "both") && (
          <div>
            <Label className="text-lg font-semibold">Project-Based Rates</Label>
            <p className="text-sm text-gray-600 mb-4">
              Set your typical rates for different project sizes
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Small Projects</Label>
                  <p className="text-xs text-gray-500 mb-2">Quick tasks, 1-2 weeks</p>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      value={formData.projectBasedRates.small}
                      onChange={(e) => setFormData({
                        ...formData,
                        projectBasedRates: { ...formData.projectBasedRates, small: e.target.value }
                      })}
                      placeholder="500-2000"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Medium Projects</Label>
                  <p className="text-xs text-gray-500 mb-2">1-3 months work</p>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      value={formData.projectBasedRates.medium}
                      onChange={(e) => setFormData({
                        ...formData,
                        projectBasedRates: { ...formData.projectBasedRates, medium: e.target.value }
                      })}
                      placeholder="2000-10000"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Large Projects</Label>
                  <p className="text-xs text-gray-500 mb-2">3+ months, complex</p>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      value={formData.projectBasedRates.large}
                      onChange={(e) => setFormData({
                        ...formData,
                        projectBasedRates: { ...formData.projectBasedRates, large: e.target.value }
                      })}
                      placeholder="10000+"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              {errors.projectRates && <p className="text-red-500 text-sm">{errors.projectRates}</p>}
            </div>
          </div>
        )}

        {/* Minimum Project Budget */}
        <div>
          <Label>Minimum Project Budget</Label>
          <p className="text-sm text-gray-600 mb-2">
            What's the smallest project budget you'll accept?
          </p>
          <div className="relative max-w-xs">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="number"
              value={formData.minimumProjectBudget}
              onChange={(e) => setFormData({ ...formData, minimumProjectBudget: e.target.value })}
              placeholder="100"
              className="pl-10"
            />
          </div>
        </div>

        {/* Availability */}
        <div>
          <Label className="text-lg font-semibold">Availability *</Label>
          <p className="text-sm text-gray-600 mb-4">
            How much time can you dedicate to freelance work?
          </p>
          
          <div className="space-y-3">
            {availabilityOptions.map(option => (
              <div
                key={option.value}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.availability === option.value
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setFormData({ ...formData, availability: option.value })}
              >
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">{option.label}</h4>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {errors.availability && <p className="text-red-500 text-sm mt-2">{errors.availability}</p>}
        </div>

        {/* Hours per Week */}
        <div>
          <Label>Hours per Week</Label>
          <p className="text-sm text-gray-600 mb-2">
            How many hours per week are you available?
          </p>
          <div className="max-w-xs">
            <Input
              type="number"
              value={formData.hoursPerWeek}
              onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
              placeholder="40"
              min="1"
              max="60"
            />
          </div>
        </div>

        {/* Working Days */}
        <div>
          <Label className="text-lg font-semibold">Working Days *</Label>
          <p className="text-sm text-gray-600 mb-4">
            Which days of the week are you typically available?
          </p>
          
          <div className="grid grid-cols-4 gap-3">
            {daysOfWeek.map(day => (
              <div
                key={day.value}
                className={`border rounded-lg p-3 cursor-pointer transition-all text-center ${
                  formData.workingDays.includes(day.value)
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => toggleWorkingDay(day.value)}
              >
                <span className="font-medium">{day.label}</span>
              </div>
            ))}
          </div>
          
          {errors.workingDays && <p className="text-red-500 text-sm mt-2">{errors.workingDays}</p>}
        </div>

        {/* Working Hours */}
        <div>
          <Label>Typical Working Hours</Label>
          <p className="text-sm text-gray-600 mb-4">
            What are your preferred working hours? (in your local timezone)
          </p>
          
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div>
              <Label>Start Time</Label>
              <Input
                type="time"
                value={formData.workingHours.start}
                onChange={(e) => setFormData({
                  ...formData,
                  workingHours: { ...formData.workingHours, start: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>End Time</Label>
              <Input
                type="time"
                value={formData.workingHours.end}
                onChange={(e) => setFormData({
                  ...formData,
                  workingHours: { ...formData.workingHours, end: e.target.value }
                })}
              />
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div>
          <Label className="text-lg font-semibold">Response Time *</Label>
          <p className="text-sm text-gray-600 mb-4">
            How quickly do you typically respond to client messages?
          </p>
          
          <Select 
            value={formData.responseTime} 
            onValueChange={(value) => setFormData({ ...formData, responseTime: value })}
          >
            <SelectTrigger className={`max-w-md ${errors.responseTime ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Select response time" />
            </SelectTrigger>
            <SelectContent>
              {responseTimeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {errors.responseTime && <p className="text-red-500 text-sm mt-1">{errors.responseTime}</p>}
        </div>

        {/* Special Requirements */}
        <div>
          <Label>Special Requirements or Notes</Label>
          <p className="text-sm text-gray-600 mb-2">
            Any special requirements, preferences, or notes for potential clients?
          </p>
          <Textarea
            value={formData.specialRequirements}
            onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
            placeholder="e.g., Prefer long-term projects, require 50% upfront payment, work only with startups..."
            rows={3}
          />
        </div>

        <Button type="submit" className="w-full" size="lg">
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default FreelancerRatesAvailability;
