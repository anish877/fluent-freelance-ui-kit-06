import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import JobBasicsStep from "../components/forms/JobBasicsStep";
import JobDescriptionStep from "../components/forms/JobDescriptionStep";
import JobRequirementsStep from "../components/forms/JobRequirementsStep";
import JobBudgetStep from "../components/forms/JobBudgetStep";
import JobReviewStep from "../components/forms/JobReviewStep";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "../hooks/AuthContext";
import axios from "axios";

export interface JobFormData {
  // Basic Info
  title: string;
  category: string;
  subcategory: string;
  projectType: string;
  duration: string;
  
  // Description
  description: string;
  objectives: string[];
  deliverables: string[];
  
  // Requirements
  skills: string[];
  experienceLevel: string;
  preferredQualifications: string[];
  workingHours: string;
  timezone: string;
  communicationPreferences: string[];
  
  // Budget
  budgetType: string;
  budgetAmount: number;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  milestones?: Array<{
    title: string;
    amount: number;
    description: string;
  }>;
  
  // Additional
  attachments?: File[];
  isUrgent: boolean;
  visibility: string;
  applicationDeadline?: string;
  additionalNotes: string;
}

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    category: "",
    subcategory: "",
    projectType: "",
    duration: "",
    description: "",
    objectives: [],
    deliverables: [],
    skills: [],
    experienceLevel: "",
    preferredQualifications: [],
    workingHours: "",
    timezone: "",
    communicationPreferences: [],
    budgetType: "",
    budgetAmount: 0,
    isUrgent: false,
    visibility: "public",
    additionalNotes: ""
  });

  const steps = [
    { id: 1, title: "Basic Information", description: "Job title, category, and type" },
    { id: 2, title: "Job Description", description: "Detailed description and objectives" },
    { id: 3, title: "Requirements", description: "Skills and qualifications needed" },
    { id: 4, title: "Budget & Timeline", description: "Payment and project timeline" },
    { id: 5, title: "Review & Post", description: "Review and publish your job" }
  ];

  const updateFormData = (data: Partial<JobFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateForm = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Basic validation
    if (!formData.title.trim()) errors.push("Job title is required");
    if (!formData.category) errors.push("Category is required");
    if (!formData.subcategory) errors.push("Subcategory is required");
    if (!formData.projectType) errors.push("Project type is required");
    if (!formData.duration) errors.push("Duration is required");

    // Description validation
    if (!formData.description.trim()) errors.push("Job description is required");
    if (formData.description.length < 50) errors.push("Description must be at least 50 characters");
    if (formData.deliverables.length === 0) errors.push("At least one deliverable is required");

    // Requirements validation
    if (formData.skills.length === 0) errors.push("At least one skill is required");
    if (!formData.experienceLevel) errors.push("Experience level is required");

    // Budget validation
    if (!formData.budgetType) errors.push("Budget type is required");
    if (formData.budgetType === "fixed" && (!formData.budgetAmount || formData.budgetAmount <= 0)) {
      errors.push("Fixed budget amount is required and must be greater than 0");
    }
    if (formData.budgetType === "hourly" && (!formData.hourlyRateMin || !formData.hourlyRateMax)) {
      errors.push("Hourly rate range is required");
    }
    if (formData.budgetType === "hourly" && formData.hourlyRateMin && formData.hourlyRateMax && formData.hourlyRateMin >= formData.hourlyRateMax) {
      errors.push("Minimum hourly rate must be less than maximum hourly rate");
    }

    return { isValid: errors.length === 0, errors };
  };

  const handleSubmit = async () => {
    const validation = validateForm();
    if (!validation.isValid) {
      toast({
        title: "Validation Error",
        description: validation.errors.join(", "),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare data for API
      const jobData = {
        title: formData.title,
        category: formData.category,
        subcategory: formData.subcategory,
        projectType: formData.projectType,
        duration: formData.duration,
        description: formData.description,
        objectives: formData.objectives,
        deliverables: formData.deliverables,
        skills: formData.skills,
        experienceLevel: formData.experienceLevel,
        preferredQualifications: formData.preferredQualifications,
        workingHours: formData.workingHours,
        timezone: formData.timezone,
        communicationPreferences: formData.communicationPreferences,
        budgetType: formData.budgetType,
        budgetAmount: formData.budgetAmount,
        hourlyRateMin: formData.hourlyRateMin,
        hourlyRateMax: formData.hourlyRateMax,
        milestones: formData.milestones,
        isUrgent: formData.isUrgent,
        visibility: formData.visibility,
        applicationDeadline: formData.applicationDeadline,
        additionalNotes: formData.additionalNotes
      };

      const response = await axios.post('/jobs', jobData);
      
      if (response.data.success) {
        toast({
          title: "Job Posted Successfully!",
          description: "Your job has been posted and is now live on the platform.",
        });
        
        navigate('/client-dashboard');
      } else {
        throw new Error(response.data.message || 'Failed to post job');
      }
    } catch (error: any) {
      console.error('Error posting job:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to post job. Please try again.';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <JobBasicsStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <JobDescriptionStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <JobRequirementsStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <JobBudgetStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <JobReviewStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  // Check if user is a client
  if (user && user.userType !== 'CLIENT') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">Only clients can post jobs.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
          <p className="text-gray-600">Find the perfect freelancer for your project</p>
        </div>

        {/* Progress Indicator */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    currentStep > step.id 
                      ? 'bg-green-500 text-white' 
                      : currentStep === step.id 
                      ? 'bg-teal-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block w-20 h-0.5 ml-4 ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < steps.length ? (
            <Button onClick={nextStep} className="flex items-center">
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostJob;
