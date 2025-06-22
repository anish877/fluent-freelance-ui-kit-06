import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { User, Briefcase, Loader2, CheckCircle } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Get onboarding data from navigation state
  const onboardingData = location.state?.onboardingData || {};
  
  const [formData, setFormData] = useState({
    firstName: onboardingData.firstName || "",
    lastName: onboardingData.lastName || "",
    email: onboardingData.email || "",
    password: "",
    confirmPassword: "",
    userType: onboardingData.userType || "freelancer",
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: any = {};
    
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setError(null);

      try {
        // Create user account
        const signupResponse = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            userType: formData.userType.toUpperCase()
          }),
        });

        const signupResult = await signupResponse.json();

        if (!signupResponse.ok) {
          throw new Error(signupResult.message || 'Failed to create account');
        }

        // Store token
        localStorage.setItem('token', signupResult.token);

        // If we have onboarding data, apply it to the user profile
        if (Object.keys(onboardingData).length > 0) {
          await applyOnboardingData(onboardingData, signupResult.token);
        }

        setSuccess(true);
        
        // Redirect after a short delay
        setTimeout(() => {
          if (formData.userType === 'freelancer') {
            navigate('/dashboard');
          } else {
            navigate('/client-dashboard');
          }
        }, 2000);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const applyOnboardingData = async (data: any, token: string) => {
    try {
      // Apply onboarding data step by step
      if (data.userType === 'freelancer') {
        // Basic info
        if (data.firstName || data.lastName || data.email || data.phone || data.country || data.city || data.timezone || data.profilePhoto || data.title || data.overview) {
          await fetch('http://localhost:5000/api/onboarding/freelancer/basic', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone,
              country: data.country,
              city: data.city,
              timezone: data.timezone,
              profilePhoto: data.profilePhoto,
              title: data.title,
              overview: data.overview,
            }),
          });
        }

        // Professional info
        if (data.category || data.subcategory || data.experienceLevel || data.workExperience || data.education || data.certifications || data.languages) {
          await fetch('http://localhost:5000/api/onboarding/freelancer/professional', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              category: data.category,
              subcategory: data.subcategory,
              experienceLevel: data.experienceLevel,
              workExperience: data.workExperience,
              education: data.education,
              certifications: data.certifications,
              languages: data.languages,
            }),
          });
        }

        // Skills
        if (data.skills || data.topSkills || data.serviceOfferings) {
          await fetch('http://localhost:5000/api/onboarding/freelancer/skills', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              skills: data.skills,
              topSkills: data.topSkills,
              serviceOfferings: data.serviceOfferings,
            }),
          });
        }

        // Portfolio
        if (data.portfolio || data.socialLinks) {
          await fetch('http://localhost:5000/api/onboarding/freelancer/portfolio', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              portfolio: data.portfolio,
              socialLinks: data.socialLinks,
            }),
          });
        }

        // Rates
        if (data.hourlyRate || data.availability) {
          await fetch('http://localhost:5000/api/onboarding/freelancer/rates', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              hourlyRate: data.hourlyRate,
              availability: data.availability,
            }),
          });
        }

        // Verification
        await fetch('http://localhost:5000/api/onboarding/freelancer/verification', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        // Complete onboarding
        await fetch('http://localhost:5000/api/onboarding/complete', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

      } else if (data.userType === 'client') {
        // Basic info
        if (data.firstName || data.lastName || data.email || data.phone || data.country || data.city || data.timezone || data.profilePhoto || data.clientType || data.howDidYouHear) {
          await fetch('http://localhost:5000/api/onboarding/client/basic', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone,
              country: data.country,
              city: data.city,
              timezone: data.timezone,
              profilePhoto: data.profilePhoto,
              clientType: data.clientType,
              howDidYouHear: data.howDidYouHear,
            }),
          });
        }

        // Company info
        if (data.companyName || data.companySize || data.industry || data.companyWebsite || data.companyDescription) {
          await fetch('http://localhost:5000/api/onboarding/client/company', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              companyName: data.companyName,
              companySize: data.companySize,
              industry: data.industry,
              companyWebsite: data.companyWebsite,
              companyDescription: data.companyDescription,
            }),
          });
        }

        // Projects
        if (data.projectTypes || data.preferredSkills) {
          await fetch('http://localhost:5000/api/onboarding/client/projects', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              projectTypes: data.projectTypes,
              preferredSkills: data.preferredSkills,
            }),
          });
        }

        // Budget
        if (data.budgetRange) {
          await fetch('http://localhost:5000/api/onboarding/client/budget', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              budgetRange: data.budgetRange,
            }),
          });
        }

        // Verification
        await fetch('http://localhost:5000/api/onboarding/client/verification', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        // Complete onboarding
        await fetch('http://localhost:5000/api/onboarding/complete', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
      }
    } catch (err) {
      console.error('Failed to apply onboarding data:', err);
    }
  };

  // Show success state
  if (success) {
  return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Account Created Successfully!
        </h2>
            <p className="text-gray-600 mb-4">
              Your account has been created and your profile has been set up.
            </p>
            <div className="flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="text-sm text-gray-500">
                Redirecting to dashboard...
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Create Your Account
          </CardTitle>
          <p className="text-gray-600">
            {Object.keys(onboardingData).length > 0 
              ? "Complete your account setup" 
              : "Join FreelanceHub today"
            }
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection (only show if not from onboarding) */}
            {Object.keys(onboardingData).length === 0 && (
              <div>
                <Label className="text-base font-medium">I am a:</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.userType === 'freelancer'
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData({ ...formData, userType: 'freelancer' })}
                  >
                    <User className="h-6 w-6 mx-auto mb-2 text-teal-600" />
                    <p className="text-sm font-medium text-center">Freelancer</p>
                    <p className="text-xs text-gray-500 text-center">I want to find work</p>
                  </div>
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.userType === 'client'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData({ ...formData, userType: 'client' })}
                  >
                    <Briefcase className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-medium text-center">Client</p>
                    <p className="text-xs text-gray-500 text-center">I want to hire</p>
                  </div>
            </div>
          </div>
            )}

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
              <Label htmlFor="password">Password *</Label>
                <Input
                id="password"
                type="password"
                  value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="agreeToTerms" className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-teal-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-teal-600 hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>
            {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-teal-600 hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
