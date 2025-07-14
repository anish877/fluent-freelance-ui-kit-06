import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import JobDetailsStep from "../components/forms/JobDetailsStep";
import ProjectScopeStep from "../components/forms/ProjectScopeStep";
import BudgetVisibilityStep from "../components/forms/BudgetVisibilityStep";
import JobReviewStep from "../components/forms/JobReviewStep";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "../hooks/AuthContext";
import { jobService, uploadService } from "../services";
import { JobFormData } from "../types";

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    description: "",
    category: "",
    skills: [],
    experienceLevel: "",
    projectType: "",
    duration: "",
    budget: "HOURLY",
    budgetType: "hourly",
    minBudget: 0,
    maxBudget: 0,
    hideBudget: false,
    visibility: "public",
    attachments: []
  });

  const steps = [
    { id: 1, title: "Job Details", description: "Title, description, category, and skills" },
    { id: 2, title: "Project Scope", description: "Experience level, project type, and duration" },
    { id: 3, title: "Budget & Visibility", description: "Payment structure and job visibility" },
    { id: 4, title: "Review & Post", description: "Review and publish your job" }
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
    if (!formData.description.trim()) errors.push("Job description is required");
    if (!formData.category) errors.push("Category is required");
    if (formData.skills.length === 0) errors.push("At least one skill is required");
    if (!formData.experienceLevel) errors.push("Experience level is required");
    if (!formData.projectType) errors.push("Project type is required");
    if (!formData.duration) errors.push("Duration is required");

    // Budget validation - only check hourly rates for hourly projects
    if (formData.projectType === "hourly") {
      if (!formData.minBudget || !formData.maxBudget) {
        errors.push("Hourly rate range is required");
      } else if (formData.minBudget >= formData.maxBudget) {
        errors.push("Minimum hourly rate must be less than maximum hourly rate");
      }
    } else if (formData.projectType === "fixed") {
      if (!formData.minBudget || formData.minBudget <= 0) {
        errors.push("Fixed budget amount is required and must be greater than 0");
      }
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
      // Upload files first if any
      let attachmentUrls: string[] = [];
      if (formData.attachments && formData.attachments.length > 0) {
        try {
          const uploadResponse = await uploadService.uploadMultiple(formData.attachments);
          attachmentUrls = uploadResponse.map(file => file.url);
        } catch (uploadError) {
          console.error('File upload error:', uploadError);
          toast({
            title: "Upload Error",
            description: "Failed to upload some files. Please try again.",
            variant: "destructive"
          });
          return;
        }
      }

      // Prepare data for API
      const jobData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        skills: formData.skills,
        experienceLevel: formData.experienceLevel,
        projectType: formData.projectType,
        duration: formData.duration,
        budget: formData.budget,
        budgetType: formData.budgetType,
        minBudget: formData.minBudget,
        maxBudget: formData.maxBudget,
        hideBudget: formData.hideBudget,
        visibility: formData.visibility,
        attachmentUrls: attachmentUrls // Send URLs instead of File objects
      };

      const response = await jobService.createJob(jobData);
      
      if (response.success) {
        toast({
          title: "Job Posted Successfully!",
          description: "Your job has been posted and is now live on the platform.",
        });
        
        navigate('/client-dashboard');
      } else {
        throw new Error(response.message || 'Failed to post job');
      }
    } catch (error: unknown) {
      console.error('Error posting job:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to post job. Please try again.';
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
        return <JobDetailsStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <ProjectScopeStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <BudgetVisibilityStep formData={formData} updateFormData={updateFormData} />;
      case 4:
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
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div
                className="bg-teal-600 h-3 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            {/* Step Indicators */}
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                    currentStep > step.id 
                      ? 'bg-green-500 text-white shadow-md' 
                      : currentStep === step.id 
                      ? 'bg-teal-500 text-white shadow-lg scale-110' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                  </div>
                  <div className="mt-2 text-center max-w-24">
                    <p className={`text-xs font-medium ${
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
