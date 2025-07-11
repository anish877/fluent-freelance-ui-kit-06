import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

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
  
  // Freelancer specific fields
  category?: string;
  subcategory?: string;
  experienceLevel?: string;
  workExperience?: any[];
  employment?: any[];
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
  
  // Additional freelancer fields
  projectBasedRates?: any; // { small, medium, large }
  hoursPerWeek?: string;
  workingHours?: any; // { start, end }
  workingDays?: string[];
  responseTime?: string;
  minimumProjectBudget?: string;
  specialRequirements?: string;
  coverImage?: string;
  
  // Client specific fields
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
  
  // Additional client fields
  interestedCategories?: string[];
  urgencyLevel?: string;
  preferredWorkingStyle?: string;
  communicationPreference?: string[];
  projectDescription?: string;
  paymentPreference?: string;
  projectFrequency?: string;
  averageProjectDuration?: string;
  maxHourlyRate?: string;
  totalMonthlyBudget?: string;
}

interface UseOnboardingReturn {
  data: OnboardingData;
  loading: boolean;
  error: string | null;
  currentStep: number;
  userType: 'freelancer' | 'client' | null;
  isOnboarded: boolean;
  updateUserType: (userType: 'freelancer' | 'client') => void;
  updateFreelancerBasicInfo: (data: Partial<OnboardingData>) => void;
  updateFreelancerProfessionalInfo: (data: Partial<OnboardingData>) => void;
  updateFreelancerSkills: (data: Partial<OnboardingData>) => void;
  updateFreelancerPortfolio: (data: Partial<OnboardingData>) => void;
  updateFreelancerRates: (data: Partial<OnboardingData>) => void;
  updateFreelancerVerification: () => void;
  updateClientBasicInfo: (data: Partial<OnboardingData>) => void;
  updateClientCompanyInfo: (data: Partial<OnboardingData>) => void;
  updateClientProjects: (data: Partial<OnboardingData>) => void;
  updateClientBudget: (data: Partial<OnboardingData>) => void;
  updateClientVerification: () => void;
  completeOnboarding: (password: string) => Promise<void>;
  loadOnboardingData: () => void;
  clearOnboardingData: () => void;
}

const LOCAL_STORAGE_KEY = 'onboarding_data';

export const useOnboarding = (): UseOnboardingReturn => {
  const [data, setData] = useState<OnboardingData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<'freelancer' | 'client' | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const navigate = useNavigate();
  const { completeOnboarding: authCompleteOnboarding } = useAuth();

  // Load data from localStorage
  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setData(parsed.data || {});
        setCurrentStep(parsed.currentStep || 0);
        setUserType(parsed.userType || null);
        setIsOnboarded(parsed.isOnboarded || false);
      }
    } catch (err) {
      console.error('Failed to load from localStorage:', err);
    }
  };

  // Save data to localStorage
  const saveToLocalStorage = (newData: Partial<OnboardingData>, newStep?: number) => {
    try {
      const updatedData = { ...data, ...newData };
      const storageData = {
        data: updatedData,
        currentStep: newStep !== undefined ? newStep : currentStep,
        userType: updatedData.userType || userType,
        isOnboarded: false
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storageData));
      setData(updatedData);
      if (newStep !== undefined) {
        setCurrentStep(newStep);
      }
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  };

  const loadOnboardingData = () => {
    loadFromLocalStorage();
  };

  const clearOnboardingData = () => {
    // Clear all onboarding data from localStorage
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    
    // Clear any other onboarding-related localStorage items
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('onboarding') || key.includes('Onboarding'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Also clear any form data that might be stored
    const formKeys = [
      'freelancer_onboarding',
      'client_onboarding',
      'onboarding_form_data',
      'onboarding_step',
      'onboarding_user_type'
    ];
    formKeys.forEach(key => localStorage.removeItem(key));
    
    // Reset state
    setData({});
    setCurrentStep(0);
    setUserType(null);
    setIsOnboarded(false);
    setError(null);
  };

  const updateUserType = (type: 'freelancer' | 'client') => {
    saveToLocalStorage({ userType: type }, 1);
    setUserType(type);
  };

  const updateFreelancerBasicInfo = (formData: Partial<OnboardingData>) => {
    saveToLocalStorage(formData, 2);
  };

  const updateFreelancerProfessionalInfo = (formData: Partial<OnboardingData>) => {
    saveToLocalStorage(formData, 3);
  };

  const updateFreelancerSkills = (formData: Partial<OnboardingData>) => {
    saveToLocalStorage(formData, 4);
  };

  const updateFreelancerPortfolio = (formData: Partial<OnboardingData>) => {
    saveToLocalStorage(formData, 5);
  };

  const updateFreelancerRates = (formData: Partial<OnboardingData>) => {
    saveToLocalStorage(formData, 6);
  };

  const updateFreelancerVerification = () => {
    saveToLocalStorage({}, 7);
  };

  const updateClientBasicInfo = (formData: Partial<OnboardingData>) => {
    saveToLocalStorage(formData, 2);
  };

  const updateClientCompanyInfo = (formData: Partial<OnboardingData>) => {
    saveToLocalStorage(formData, 3);
  };

  const updateClientProjects = (formData: Partial<OnboardingData>) => {
    saveToLocalStorage(formData, 4);
  };

  const updateClientBudget = (formData: Partial<OnboardingData>) => {
    saveToLocalStorage(formData, 5);
  };

  const updateClientVerification = () => {
    saveToLocalStorage({}, 6);
  };

  const completeOnboarding = async (password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Prepare data for API call with correct field mappings
      const apiData = {
        userType: userType?.toUpperCase(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password,
        phone: data.phone,
        country: data.country,
        city: data.city,
        timezone: data.timezone,
        profilePhoto: data.profilePhoto,
        title: data.title,
        overview: data.overview,
        
        // Freelancer specific fields - map to correct database fields
        category: data.category,
        subcategory: data.subcategory,
        experienceLevel: data.experienceLevel,
        workExperience: data.workExperience, // Keep workExperience as workExperience
        employmentHistory: data.employment, // Map employment to employmentHistory
        education: data.education,
        certifications: data.certifications,
        languages: data.languages,
        skills: data.skills,
        topSkills: data.topSkills,
        serviceOfferings: data.serviceOfferings,
        portfolioProjects: data.portfolio, // Map portfolio to portfolioProjects
        socialLinks: data.socialLinks,
        hourlyRate: data.hourlyRate,
        availability: data.availability,
        
        // Additional freelancer fields
        projectBasedRates: data.projectBasedRates,
        hoursPerWeek: data.hoursPerWeek,
        workingHours: data.workingHours,
        workingDays: data.workingDays,
        responseTime: data.responseTime,
        minimumProjectBudget: data.minimumProjectBudget,
        specialRequirements: data.specialRequirements,
        coverImage: data.coverImage,
        
        // Client specific fields
        clientType: data.clientType,
        howDidYouHear: data.howDidYouHear,
        companyName: data.companyName,
        companySize: data.companySize,
        industry: data.industry,
        companyWebsite: data.companyWebsite,
        companyDescription: data.companyDescription,
        projectTypes: data.projectTypes,
        preferredSkills: data.preferredSkills,
        budgetRange: data.budgetRange,
        
        // Additional client fields
        interestedCategories: data.interestedCategories,
        urgencyLevel: data.urgencyLevel,
        preferredWorkingStyle: data.preferredWorkingStyle,
        communicationPreference: data.communicationPreference,
        projectDescription: data.projectDescription,
        paymentPreference: data.paymentPreference,
        projectFrequency: data.projectFrequency,
        averageProjectDuration: data.averageProjectDuration,
        maxHourlyRate: data.maxHourlyRate,
        totalMonthlyBudget: data.totalMonthlyBudget
      };

      console.log('Sending onboarding data to API:', JSON.stringify(apiData, null, 2));

      const { success, message } = await authCompleteOnboarding(apiData);

      if (success) {
        // Clear all onboarding data using the utility function
        clearOnboardingData();
        
        setIsOnboarded(true);
        setCurrentStep(userType === 'freelancer' ? 8 : 7);
        
        // Show success message
        toast.success(
          `Welcome to FreelanceHub! Your ${userType} profile has been created successfully.`
        );
        
        // Redirect based on user type
        if (userType === 'client') {
          navigate('/client-dashboard', { replace: true });
        } else if (userType === 'freelancer') {
          navigate('/dashboard', { replace: true });
        }
      } else {
        throw new Error(message || 'Failed to complete onboarding');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to complete onboarding';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
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
    clearOnboardingData,
  };
}; 