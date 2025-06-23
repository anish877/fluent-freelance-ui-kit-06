import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowRight, DollarSign, Clock, Info } from "lucide-react";

interface ClientBudgetTimelineData {
  budgetRange?: string;
  paymentPreference?: string;
  projectFrequency?: string;
  averageProjectDuration?: string;
  maxHourlyRate?: string;
  totalMonthlyBudget?: string;
  [key: string]: string | undefined;
}

interface ClientBudgetTimelineProps {
  onNext: (data: ClientBudgetTimelineData) => void;
  data: ClientBudgetTimelineData;
}

const ClientBudgetTimeline = ({ onNext, data }: ClientBudgetTimelineProps) => {
  const [formData, setFormData] = useState<ClientBudgetTimelineData>({
    budgetRange: data.budgetRange || "",
    paymentPreference: data.paymentPreference || "",
    projectFrequency: data.projectFrequency || "",
    averageProjectDuration: data.averageProjectDuration || "",
    maxHourlyRate: data.maxHourlyRate || "",
    totalMonthlyBudget: data.totalMonthlyBudget || "",
    ...data
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const budgetRanges = [
    { value: "under-500", label: "Under $500", description: "Small tasks and quick projects" },
    { value: "500-2000", label: "$500 - $2,000", description: "Small to medium projects" },
    { value: "2000-10000", label: "$2,000 - $10,000", description: "Medium to large projects" },
    { value: "10000-50000", label: "$10,000 - $50,000", description: "Large complex projects" },
    { value: "50000+", label: "$50,000+", description: "Enterprise-level projects" }
  ];

  const paymentPreferences = [
    { value: "hourly", label: "Hourly Rate", description: "Pay by the hour" },
    { value: "fixed", label: "Fixed Price", description: "Set project price upfront" },
    { value: "milestone", label: "Milestone-based", description: "Pay as milestones are completed" },
    { value: "flexible", label: "Flexible", description: "Open to different arrangements" }
  ];

  const projectFrequencies = [
    { value: "one-time", label: "One-time project", description: "Single project only" },
    { value: "occasional", label: "Occasional projects", description: "Few times per year" },
    { value: "regular", label: "Regular projects", description: "Monthly projects" },
    { value: "ongoing", label: "Ongoing work", description: "Continuous work needed" }
  ];

  const projectDurations = [
    "Less than 1 week", "1-2 weeks", "2-4 weeks", "1-3 months", "3-6 months", "6+ months"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.budgetRange) {
      newErrors.budgetRange = "Please select a budget range";
    }
    
    if (!formData.paymentPreference) {
      newErrors.paymentPreference = "Please select payment preference";
    }
    
    if (!formData.projectFrequency) {
      newErrors.projectFrequency = "Please select project frequency";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Map the data to the correct field names for the database
      const mappedData = {
        budgetRange: formData.budgetRange,
        paymentPreference: formData.paymentPreference,
        projectFrequency: formData.projectFrequency,
        averageProjectDuration: formData.averageProjectDuration,
        maxHourlyRate: formData.maxHourlyRate,
        totalMonthlyBudget: formData.totalMonthlyBudget
      };
      onNext(mappedData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Budget & Timeline Preferences
        </h2>
        <p className="text-gray-600">
          Help us match you with freelancers within your budget range
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Budget Range */}
        <div>
          <Label className="text-lg font-semibold">Typical project budget range *</Label>
          <p className="text-sm text-gray-600 mb-4">
            What do you usually spend on freelance projects?
          </p>
          
          <div className="space-y-3">
            {budgetRanges.map(range => (
              <div
                key={range.value}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.budgetRange === range.value
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setFormData({ ...formData, budgetRange: range.value })}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{range.label}</h4>
                    <p className="text-sm text-gray-600">{range.description}</p>
                  </div>
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
            ))}
          </div>
          
          {errors.budgetRange && <p className="text-red-500 text-sm mt-2">{errors.budgetRange}</p>}
        </div>

        {/* Payment Preference */}
        <div>
          <Label className="text-lg font-semibold">Payment preference *</Label>
          <p className="text-sm text-gray-600 mb-4">
            How do you prefer to structure payments?
          </p>
          
          <div className="space-y-3">
            {paymentPreferences.map(pref => (
              <div
                key={pref.value}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.paymentPreference === pref.value
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setFormData({ ...formData, paymentPreference: pref.value })}
              >
                <h4 className="font-medium text-gray-900">{pref.label}</h4>
                <p className="text-sm text-gray-600">{pref.description}</p>
              </div>
            ))}
          </div>
          
          {errors.paymentPreference && <p className="text-red-500 text-sm mt-2">{errors.paymentPreference}</p>}
        </div>

        {/* Hourly Rate Range */}
        {(formData.paymentPreference === "hourly" || formData.paymentPreference === "flexible") && (
          <div>
            <Label>Maximum hourly rate you're comfortable with</Label>
            <div className="relative max-w-xs">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                value={formData.maxHourlyRate}
                onChange={(e) => setFormData({ ...formData, maxHourlyRate: e.target.value })}
                placeholder="75"
                className="pl-10"
              />
              <span className="absolute right-3 top-3 text-sm text-gray-500">/hour</span>
            </div>
          </div>
        )}

        {/* Project Frequency */}
        <div>
          <Label className="text-lg font-semibold">How often do you hire freelancers? *</Label>
          <div className="space-y-3 mt-4">
            {projectFrequencies.map(freq => (
              <div
                key={freq.value}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.projectFrequency === freq.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setFormData({ ...formData, projectFrequency: freq.value })}
              >
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">{freq.label}</h4>
                    <p className="text-sm text-gray-600">{freq.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {errors.projectFrequency && <p className="text-red-500 text-sm mt-2">{errors.projectFrequency}</p>}
        </div>

        {/* Monthly Budget for Regular Clients */}
        {(formData.projectFrequency === "regular" || formData.projectFrequency === "ongoing") && (
          <div>
            <Label>Total monthly budget for freelance work</Label>
            <div className="relative max-w-xs">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                value={formData.totalMonthlyBudget}
                onChange={(e) => setFormData({ ...formData, totalMonthlyBudget: e.target.value })}
                placeholder="5000"
                className="pl-10"
              />
              <span className="absolute right-3 top-3 text-sm text-gray-500">/month</span>
            </div>
          </div>
        )}

        {/* Average Project Duration */}
        <div>
          <Label>Average project duration</Label>
          <Select 
            value={formData.averageProjectDuration} 
            onValueChange={(value) => setFormData({ ...formData, averageProjectDuration: value })}
          >
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {projectDurations.map(duration => (
                <SelectItem key={duration} value={duration}>{duration}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Budget Tips */}
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Budget Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Higher budgets typically attract more experienced freelancers</li>
                <li>• Consider the complexity and timeline of your projects</li>
                <li>• You can always negotiate rates with freelancers</li>
                <li>• Quality work often requires fair compensation</li>
              </ul>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default ClientBudgetTimeline;
