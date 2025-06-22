import { Button } from "../ui/button";
import { CheckCircle, Sparkles, ArrowRight, Star, Users, Shield } from "lucide-react";

interface OnboardingCompleteData {
  firstName?: string;
  lastName?: string;
  email?: string;
  city?: string;
  country?: string;
  category?: string;
  hourlyRate?: number;
  clientType?: string;
  [key: string]: string | number | undefined;
}

interface OnboardingCompleteProps {
  onComplete: () => void;
  data: OnboardingCompleteData;
  userType: "freelancer" | "client" | null;
}

const OnboardingComplete = ({ onComplete, data, userType }: OnboardingCompleteProps) => {
  const nextSteps = userType === "freelancer" ? [
    {
      icon: Star,
      title: "Complete your profile",
      description: "Add more portfolio items and refine your skills"
    },
    {
      icon: Users,
      title: "Browse and apply to jobs",
      description: "Start applying to projects that match your expertise"
    },
    {
      icon: Shield,
      title: "Get verified",
      description: "Complete additional verification for higher trust score"
    }
  ] : [
    {
      icon: Star,
      title: "Post your first job",
      description: "Create a detailed job posting to attract the best talent"
    },
    {
      icon: Users,
      title: "Browse freelancer profiles",
      description: "Search and invite qualified freelancers to your project"
    },
    {
      icon: Shield,
      title: "Set up payments",
      description: "Add payment methods for smooth transactions"
    }
  ];

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="relative inline-block">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎉 Welcome to FreelanceHub!
        </h2>
        
        <p className="text-lg text-gray-600 mb-2">
          Your {userType} profile has been created successfully
        </p>
        
        {data.firstName && (
          <p className="text-xl font-medium text-teal-600">
            Hello, {data.firstName}! 👋
          </p>
        )}
      </div>

      {/* Profile Summary */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-left">
            <p><span className="font-medium">Name:</span> {data.firstName} {data.lastName}</p>
            <p><span className="font-medium">Location:</span> {data.city}, {data.country}</p>
            {userType === "freelancer" && data.category && (
              <p><span className="font-medium">Category:</span> {data.category}</p>
            )}
          </div>
          <div className="text-left">
            {userType === "freelancer" && data.hourlyRate && (
              <p><span className="font-medium">Rate:</span> ${data.hourlyRate}/hour</p>
            )}
            {userType === "client" && data.clientType && (
              <p><span className="font-medium">Type:</span> {data.clientType}</p>
            )}
            <p><span className="font-medium">Email:</span> {data.email}</p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">What's next?</h3>
        <div className="space-y-4">
          {nextSteps.map((step, index) => (
            <div key={index} className="flex items-start p-4 bg-white border rounded-lg">
              <div className="bg-teal-100 p-2 rounded-full mr-4">
                <step.icon className="h-5 w-5 text-teal-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h4 className="font-semibold text-gray-900 mb-4">Join thousands of successful {userType}s</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-teal-600">45K+</div>
            <div className="text-sm text-gray-600">Active Freelancers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-600">200K+</div>
            <div className="text-sm text-gray-600">Projects Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-600">98.2%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Button onClick={onComplete} className="w-full" size="lg">
          Go to Dashboard
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            {userType === "freelancer" ? "Browse Jobs" : "Post a Job"}
          </Button>
          <Button variant="outline" className="flex-1">
            {userType === "freelancer" ? "Complete Profile" : "Browse Talent"}
          </Button>
        </div>
      </div>

      {/* Help */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Need Help Getting Started?</h4>
        <p className="text-sm text-blue-700 mb-3">
          Our support team is here to help you succeed on FreelanceHub
        </p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" size="sm">
            Contact Support
          </Button>
          <Button variant="outline" size="sm">
            View Help Center
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingComplete;
