import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface OnboardingData {
  userType?: 'freelancer' | 'client';
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  timezone?: string;
  profilePhoto?: string;
  title?: string;
  overview?: string;
  category?: string;
  subcategory?: string;
  experienceLevel?: string;
  workExperience?: any[];
  education?: any[];
  certifications?: string[];
  languages?: any[];
  skills?: any[];
  topSkills?: string[];
  serviceOfferings?: string[];
  portfolio?: string;
  socialLinks?: any;
  hourlyRate?: number;
  availability?: string;
  clientType?: string;
  howDidYouHear?: string;
  companyName?: string;
  companySize?: string;
  industry?: string;
  companyWebsite?: string;
  companyDescription?: string;
  projectTypes?: string[];
  preferredSkills?: string[];
  budgetRange?: string;
}

interface UseOnboardingReturn {
  data: OnboardingData;
  loading: boolean;
  error: string | null;
  currentStep: number;
  userType: 'freelancer' | 'client' | null;
  isOnboarded: boolean;
  updateUserType: (userType: 'freelancer' | 'client') => Promise<void>;
  updateFreelancerBasicInfo: (data: Partial<OnboardingData>) => Promise<void>;
  updateFreelancerProfessionalInfo: (data: Partial<OnboardingData>) => Promise<void>;
  updateFreelancerSkills: (data: Partial<OnboardingData>) => Promise<void>;
  updateFreelancerPortfolio: (data: Partial<OnboardingData>) => Promise<void>;
  updateFreelancerRates: (data: Partial<OnboardingData>) => Promise<void>;
  updateFreelancerVerification: () => Promise<void>;
  updateClientBasicInfo: (data: Partial<OnboardingData>) => Promise<void>;
  updateClientCompanyInfo: (data: Partial<OnboardingData>) => Promise<void>;
  updateClientProjects: (data: Partial<OnboardingData>) => Promise<void>;
  updateClientBudget: (data: Partial<OnboardingData>) => Promise<void>;
  updateClientVerification: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  loadOnboardingData: () => Promise<void>;
}

const API_BASE_URL = '';

export const useOnboarding = (): UseOnboardingReturn => {
  const [data, setData] = useState<OnboardingData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<'freelancer' | 'client' | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const navigate = useNavigate();

  const handleApiCall = async (
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' = 'GET',
    body?: any
  ) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loadOnboardingData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token, user is not authenticated, don't load data
        return;
      }

      const result = await handleApiCall('/onboarding/progress');
      
      if (result.success && result.data) {
        const userData = result.data;
        setData({
          userType: userData.userType?.toLowerCase() as 'freelancer' | 'client',
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          country: userData.country,
          city: userData.city,
          timezone: userData.timezone,
          profilePhoto: userData.avatar,
          title: userData.title,
          overview: userData.overview,
          category: userData.category,
          subcategory: userData.subcategory,
          experienceLevel: userData.experienceLevel,
          workExperience: userData.workExperience,
          education: userData.education,
          certifications: userData.certifications,
          languages: userData.languages,
          skills: userData.skills,
          topSkills: userData.topSkills,
          serviceOfferings: userData.serviceOfferings,
          portfolio: userData.portfolio,
          socialLinks: userData.socialLinks,
          hourlyRate: userData.hourlyRate,
          availability: userData.availability,
          clientType: userData.clientType,
          howDidYouHear: userData.howDidYouHear,
          companyName: userData.companyName,
          companySize: userData.companySize,
          industry: userData.industry,
          companyWebsite: userData.companyWebsite,
          companyDescription: userData.companyDescription,
          projectTypes: userData.projectTypes,
          preferredSkills: userData.preferredSkills,
          budgetRange: userData.budgetRange,
        });
        
        setUserType(userData.userType?.toLowerCase() as 'freelancer' | 'client');
        setCurrentStep(userData.onboardingStep || 0);
        setIsOnboarded(userData.isOnboarded || false);
      }
    } catch (err) {
      console.error('Failed to load onboarding data:', err);
    }
  };

  const updateUserType = async (type: 'freelancer' | 'client') => {
    try {
      const result = await handleApiCall('/onboarding/user-type', 'PUT', {
        userType: type.toUpperCase()
      });
      
      if (result.success) {
        setUserType(type);
        setCurrentStep(1);
        setData(prev => ({ ...prev, userType: type }));
      }
    } catch (err) {
      console.error('Failed to update user type:', err);
    }
  };

  const updateFreelancerBasicInfo = async (formData: Partial<OnboardingData>) => {
    try {
      const result = await handleApiCall('/onboarding/freelancer/basic', 'PUT', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        timezone: formData.timezone,
        profilePhoto: formData.profilePhoto,
        title: formData.title,
        overview: formData.overview,
      });
      
      if (result.success) {
        setData(prev => ({ ...prev, ...formData }));
        setCurrentStep(2);
      }
    } catch (err) {
      console.error('Failed to update freelancer basic info:', err);
    }
  };

  const updateFreelancerProfessionalInfo = async (formData: Partial<OnboardingData>) => {
    try {
      const result = await handleApiCall('/onboarding/freelancer/professional', 'PUT', {
        category: formData.category,
        subcategory: formData.subcategory,
        experienceLevel: formData.experienceLevel,
        workExperience: formData.workExperience,
        education: formData.education,
        certifications: formData.certifications,
        languages: formData.languages,
      });
      
      if (result.success) {
        setData(prev => ({ ...prev, ...formData }));
        setCurrentStep(3);
      }
    } catch (err) {
      console.error('Failed to update freelancer professional info:', err);
    }
  };

  const updateFreelancerSkills = async (formData: Partial<OnboardingData>) => {
    try {
      const result = await handleApiCall('/onboarding/freelancer/skills', 'PUT', {
        skills: formData.skills,
        topSkills: formData.topSkills,
        serviceOfferings: formData.serviceOfferings,
      });
      
      if (result.success) {
        setData(prev => ({ ...prev, ...formData }));
        setCurrentStep(4);
      }
    } catch (err) {
      console.error('Failed to update freelancer skills:', err);
    }
  };

  const updateFreelancerPortfolio = async (formData: Partial<OnboardingData>) => {
    try {
      const result = await handleApiCall('/onboarding/freelancer/portfolio', 'PUT', {
        portfolio: formData.portfolio,
        socialLinks: formData.socialLinks,
      });
      
      if (result.success) {
        setData(prev => ({ ...prev, ...formData }));
        setCurrentStep(5);
      }
    } catch (err) {
      console.error('Failed to update freelancer portfolio:', err);
    }
  };

  const updateFreelancerRates = async (formData: Partial<OnboardingData>) => {
    try {
      const result = await handleApiCall('/onboarding/freelancer/rates', 'PUT', {
        hourlyRate: formData.hourlyRate,
        availability: formData.availability,
      });
      
      if (result.success) {
        setData(prev => ({ ...prev, ...formData }));
        setCurrentStep(6);
      }
    } catch (err) {
      console.error('Failed to update freelancer rates:', err);
    }
  };

  const updateFreelancerVerification = async () => {
    try {
      const result = await handleApiCall('/onboarding/freelancer/verification', 'PUT');
      
      if (result.success) {
        setCurrentStep(7);
      }
    } catch (err) {
      console.error('Failed to update freelancer verification:', err);
    }
  };

  const updateClientBasicInfo = async (formData: Partial<OnboardingData>) => {
    try {
      const result = await handleApiCall('/onboarding/client/basic', 'PUT', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        timezone: formData.timezone,
        profilePhoto: formData.profilePhoto,
        clientType: formData.clientType,
        howDidYouHear: formData.howDidYouHear,
      });
      
      if (result.success) {
        setData(prev => ({ ...prev, ...formData }));
        setCurrentStep(2);
      }
    } catch (err) {
      console.error('Failed to update client basic info:', err);
    }
  };

  const updateClientCompanyInfo = async (formData: Partial<OnboardingData>) => {
    try {
      const result = await handleApiCall('/onboarding/client/company', 'PUT', {
        companyName: formData.companyName,
        companySize: formData.companySize,
        industry: formData.industry,
        companyWebsite: formData.companyWebsite,
        companyDescription: formData.companyDescription,
      });
      
      if (result.success) {
        setData(prev => ({ ...prev, ...formData }));
        setCurrentStep(3);
      }
    } catch (err) {
      console.error('Failed to update client company info:', err);
    }
  };

  const updateClientProjects = async (formData: Partial<OnboardingData>) => {
    try {
      const result = await handleApiCall('/onboarding/client/projects', 'PUT', {
        projectTypes: formData.projectTypes,
        preferredSkills: formData.preferredSkills,
      });
      
      if (result.success) {
        setData(prev => ({ ...prev, ...formData }));
        setCurrentStep(4);
      }
    } catch (err) {
      console.error('Failed to update client projects:', err);
    }
  };

  const updateClientBudget = async (formData: Partial<OnboardingData>) => {
    try {
      const result = await handleApiCall('/onboarding/client/budget', 'PUT', {
        budgetRange: formData.budgetRange,
      });
      
      if (result.success) {
        setData(prev => ({ ...prev, ...formData }));
        setCurrentStep(5);
      }
    } catch (err) {
      console.error('Failed to update client budget:', err);
    }
  };

  const updateClientVerification = async () => {
    try {
      const result = await handleApiCall('/onboarding/client/verification', 'PUT');
      
      if (result.success) {
        setCurrentStep(6);
      }
    } catch (err) {
      console.error('Failed to update client verification:', err);
    }
  };

  const completeOnboarding = async () => {
    try {
      const result = await handleApiCall('/onboarding/complete', 'PUT');
      
      if (result.success) {
        setIsOnboarded(true);
        setCurrentStep(userType === 'freelancer' ? 8 : 7);
        
        // Redirect to appropriate dashboard
        if (userType === 'freelancer') {
          navigate('/dashboard');
        } else {
          navigate('/client-dashboard');
        }
      }
    } catch (err) {
      console.error('Failed to complete onboarding:', err);
    }
  };

  useEffect(() => {
    loadOnboardingData();
  }, []);

  return {
    data,
    loading,
    error,
    currentStep,
    userType,
    isOnboarded,
    updateUserType,
    updateFreelancerBasicInfo,
    updateFreelancerProfessionalInfo,
    updateFreelancerSkills,
    updateFreelancerPortfolio,
    updateFreelancerRates,
    updateFreelancerVerification,
    updateClientBasicInfo,
    updateClientCompanyInfo,
    updateClientProjects,
    updateClientBudget,
    updateClientVerification,
    completeOnboarding,
    loadOnboardingData,
  };
}; 