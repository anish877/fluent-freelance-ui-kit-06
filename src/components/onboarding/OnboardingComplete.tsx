import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CheckCircle, Sparkles, ArrowRight, Star, Users, Shield, Eye, EyeOff } from "lucide-react";

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
  onComplete: (password: string) => void;
  data: OnboardingCompleteData;
  userType: "freelancer" | "client" | null;
  loading?: boolean;
  error?: string | null;
}

const OnboardingComplete = ({ onComplete, data, userType, loading = false, error = null }: OnboardingCompleteProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const validateForm = () => {
    const errors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onComplete(password);
    }
  };

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
          🎉 Almost There!
        </h2>
        
        <p className="text-lg text-gray-600 mb-2">
          Create your account to complete your {userType} profile
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

      {/* Password Form */}
      <div className="bg-white border rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Your Account</h3>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={formErrors.password ? "border-red-500" : ""}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={formErrors.confirmPassword ? "border-red-500" : ""}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Button 
            onClick={handleSubmit} 
            className="w-full" 
            size="lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Account...
              </>
            ) : (
              <>
                Create Account & Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
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
