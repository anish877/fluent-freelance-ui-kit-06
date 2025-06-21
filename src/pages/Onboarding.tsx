
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { User, Briefcase, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

// Import onboarding steps
import UserTypeSelection from "../components/onboarding/UserTypeSelection";
import FreelancerBasicInfo from "../components/onboarding/FreelancerBasicInfo";
import FreelancerProfessionalInfo from "../components/onboarding/FreelancerProfessionalInfo";
import FreelancerSkillsExperience from "../components/onboarding/FreelancerSkillsExperience";
import FreelancerPortfolio from "../components/onboarding/FreelancerPortfolio";
import FreelancerRatesAvailability from "../components/onboarding/FreelancerRatesAvailability";
import FreelancerVerification from "../components/onboarding/FreelancerVerification";
import ClientBasicInfo from "../components/onboarding/ClientBasicInfo";
import ClientCompanyInfo from "../components/onboarding/ClientCompanyInfo";
import ClientProjectNeeds from "../components/onboarding/ClientProjectNeeds";
import ClientBudgetTimeline from "../components/onboarding/ClientBudgetTimeline";
import ClientVerification from "../components/onboarding/ClientVerification";
import OnboardingComplete from "../components/onboarding/OnboardingComplete";

const Onboarding = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<"freelancer" | "client" | null>(
    (searchParams.get("type") as "freelancer" | "client") || null
  );
  const [onboardingData, setOnboardingData] = useState<any>({});

  const freelancerSteps = [
    { title: "User Type", component: UserTypeSelection },
    { title: "Basic Info", component: FreelancerBasicInfo },
    { title: "Professional Info", component: FreelancerProfessionalInfo },
    { title: "Skills & Experience", component: FreelancerSkillsExperience },
    { title: "Portfolio", component: FreelancerPortfolio },
    { title: "Rates & Availability", component: FreelancerRatesAvailability },
    { title: "Verification", component: FreelancerVerification },
    { title: "Complete", component: OnboardingComplete }
  ];

  const clientSteps = [
    { title: "User Type", component: UserTypeSelection },
    { title: "Basic Info", component: ClientBasicInfo },
    { title: "Company Info", component: ClientCompanyInfo },
    { title: "Project Needs", component: ClientProjectNeeds },
    { title: "Budget & Timeline", component: ClientBudgetTimeline },
    { title: "Verification", component: ClientVerification },
    { title: "Complete", component: OnboardingComplete }
  ];

  const steps = userType === "freelancer" ? freelancerSteps : clientSteps;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = (data: any) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUserTypeSelect = (type: "freelancer" | "client") => {
    setUserType(type);
    setOnboardingData({ userType: type });
    setCurrentStep(1);
  };

  const handleComplete = () => {
    console.log("Onboarding completed:", onboardingData);
    navigate(userType === "freelancer" ? "/dashboard" : "/client-dashboard");
  };

  const CurrentStepComponent = steps[currentStep]?.component;

  const getComponentProps = () => {
    // First step (UserTypeSelection) has different props
    if (currentStep === 0) {
      return {
        onNext: handleUserTypeSelect
      };
    }

    // Last step (OnboardingComplete) has different props
    if (currentStep === steps.length - 1) {
      return {
        data: onboardingData,
        userType: userType,
        onComplete: handleComplete
      };
    }

    // All other steps have standard props
    return {
      data: onboardingData,
      userType: userType,
      onNext: handleNext,
      onBack: handleBack,
      canGoBack: currentStep > 0
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to FreelanceHub
          </h1>
          <p className="text-gray-600">
            Let's set up your {userType || ""} profile to get you started
          </p>
        </div>

        {/* Progress Bar */}
        {userType && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                {userType === "freelancer" ? (
                  <User className="h-5 w-5 text-teal-600" />
                ) : (
                  <Briefcase className="h-5 w-5 text-teal-600" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              <Badge variant="outline" className="text-teal-600 border-teal-600">
                {Math.round(progress)}% Complete
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
            
            {/* Step indicators */}
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep 
                      ? "bg-teal-600 text-white" 
                      : "bg-gray-200 text-gray-400"
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`text-xs mt-1 ${
                    index <= currentStep ? "text-teal-600" : "text-gray-400"
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {CurrentStepComponent && (
              <CurrentStepComponent {...(getComponentProps() as any)} />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        {userType && currentStep > 0 && currentStep < steps.length - 1 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="text-sm text-gray-500">
              {currentStep} of {steps.length - 1}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
