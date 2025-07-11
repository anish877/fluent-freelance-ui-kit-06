
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";

import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "../hooks/AuthContext";
import JobBasicsStep from "../components/forms/JobBasicsStep";
import JobDescriptionStep from "../components/forms/JobDescriptionStep";
import JobRequirementsStep from "../components/forms/JobRequirementsStep";
import JobBudgetStep from "../components/forms/JobBudgetStep";
import JobReviewStep from "../components/forms/JobReviewStep";
import { JobFormData } from "./PostJob";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    hourlyRateMin: 0,
    hourlyRateMax: 0,
    milestones: [],
    isUrgent: false,
    visibility: "public",
    applicationDeadline: "",
    additionalNotes: ""
  });

  const steps = [
    { id: 1, title: "Job Basics" },
    { id: 2, title: "Description" },
    { id: 3, title: "Requirements" },
    { id: 4, title: "Budget & Timeline" },
    { id: 5, title: "Review & Post" }
  ];

  // Fetch job data on component mount
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await axios.get(`/jobs/${id}`);
        
        if (response.data.success) {
          const job = response.data.data;
          
          // Transform backend data to frontend format
          const transformedData: JobFormData = {
            title: job.title || "",
            category: job.category || "",
            subcategory: job.subcategory || "",
            projectType: job.projectType || "",
            duration: job.duration || "",
            description: job.description || "",
            objectives: job.requirements?.filter((req: string) => req.includes("objective") || req.includes("goal")) || [],
            deliverables: job.requirements?.filter((req: string) => req.includes("deliverable") || req.includes("output")) || [],
            skills: Array.isArray(job.skills) ? job.skills : [],
            experienceLevel: job.experienceLevel || "",
            preferredQualifications: [],
            workingHours: job.workingHours || "",
            timezone: job.timezone || "",
            communicationPreferences: Array.isArray(job.communicationPreferences) ? job.communicationPreferences : [],
            budgetType: job.budget === 'FIXED' ? 'fixed' : job.budget === 'HOURLY' ? 'hourly' : 'milestone',
            budgetAmount: job.minBudget || job.maxBudget || 0,
            hourlyRateMin: job.minBudget || 0,
            hourlyRateMax: job.maxBudget || job.hourlyRate || 0,
            milestones: [],
            isUrgent: job.isUrgent || false,
            visibility: job.visibility || "public",
            applicationDeadline: job.applicationDeadline ? new Date(job.applicationDeadline).toISOString().split('T')[0] : "",
            additionalNotes: ""
          };
          
          setFormData(transformedData);
        } else {
          setError('Failed to fetch job details');
        }
      } catch (err: any) {
        console.error('Error fetching job:', err);
        setError(err.response?.data?.message || 'Failed to fetch job details');
        toast({
          title: "Error",
          description: "Failed to load job details",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id, toast]);

  const updateFormData = (updates: Partial<JobFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.title.trim()) errors.push("Job title is required");
    if (!formData.category) errors.push("Category is required");
    if (!formData.description.trim()) errors.push("Job description is required");
    if (formData.skills.length === 0) errors.push("At least one skill is required");
    if (!formData.experienceLevel) errors.push("Experience level is required");
    if (!formData.workingHours) errors.push("Working hours are required");
    if (!formData.timezone) errors.push("Timezone is required");
    if (formData.communicationPreferences.length === 0) errors.push("At least one communication preference is required");

    // Budget validation
    if (formData.budgetType === "fixed" && formData.budgetAmount <= 0) {
      errors.push("Budget amount must be greater than 0");
    }
    if (formData.budgetType === "hourly") {
      if ((formData.hourlyRateMin || 0) <= 0) errors.push("Minimum hourly rate must be greater than 0");
      if ((formData.hourlyRateMax || 0) <= 0) errors.push("Maximum hourly rate must be greater than 0");
      if ((formData.hourlyRateMin || 0) > (formData.hourlyRateMax || 0)) {
        errors.push("Minimum hourly rate cannot be greater than maximum hourly rate");
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
      // Prepare data for API
      const jobData = {
        title: formData.title,
        category: formData.category,
        subcategory: formData.subcategory,
        projectType: formData.projectType,
        duration: formData.duration,
        description: formData.description,
        requirements: [...formData.objectives, ...formData.deliverables],
        skills: formData.skills,
        experienceLevel: formData.experienceLevel,
        workingHours: formData.workingHours,
        timezone: formData.timezone,
        communicationPreferences: formData.communicationPreferences,
        budget: formData.budgetType === 'fixed' ? 'FIXED' : 'HOURLY',
        minBudget: formData.budgetType === 'fixed' ? formData.budgetAmount : formData.hourlyRateMin,
        maxBudget: formData.budgetType === 'fixed' ? formData.budgetAmount : formData.hourlyRateMax,
        hourlyRate: formData.budgetType === 'hourly' ? formData.hourlyRateMax : undefined,
        isUrgent: formData.isUrgent,
        visibility: formData.visibility,
        applicationDeadline: formData.applicationDeadline ? new Date(formData.applicationDeadline + 'T00:00:00.000Z').toISOString() : null
      };

      const response = await axios.put(`/jobs/${id}`, jobData);
      
      if (response.data.success) {
        toast({
          title: "Job Updated Successfully!",
          description: "Your job has been updated and is now live on the platform.",
        });
        
        navigate('/client-dashboard');
      } else {
        throw new Error(response.data.message || 'Failed to update job');
      }
    } catch (error: any) {
      console.error('Error updating job:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update job. Please try again.';
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
          <p className="text-gray-600 mb-4">Only clients can edit jobs.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => navigate('/client-dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/client-dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Edit Job</h1>
                <p className="text-sm text-gray-600">Update your job posting</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
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
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentStep > step.id 
                    ? 'bg-green-500 text-white shadow-md' 
                    : currentStep === step.id 
                    ? 'bg-teal-500 text-white shadow-lg scale-110' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? '✓' : step.id}
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
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/client-dashboard')}
            >
              Cancel
            </Button>
            
            {currentStep < steps.length ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Job"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditJob;
