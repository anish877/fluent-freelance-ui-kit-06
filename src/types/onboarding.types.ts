// Onboarding-related types used across the application

export interface StepData {
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
  skills?: Array<{
    name: string;
    category: string;
    level: string;
    yearsOfExperience: number;
  }>;
  topSkills?: string[];
  serviceOfferings?: string[];
  portfolio?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    website?: string;
    behance?: string;
    dribbble?: string;
  };
  hourlyRate?: number;
  projectBasedRates?: {
    small: string;
    medium: string;
    large: string;
  };
  availability?: string;
  hoursPerWeek?: string;
  workingHours?: {
    start: string;
    end: string;
  };
  workingDays?: string[];
  responseTime?: string;
  minimumProjectBudget?: string;
  specialRequirements?: string;
  coverImage?: string;
  hourlyRateRange?: string;
  availabilityStatus?: string;
  // Client specific fields
  clientType?: string;
  howDidYouHear?: string;
  companyName?: string;
  industry?: string;
  companySize?: string;
  companyWebsite?: string;
  companyDescription?: string;
  foundedYear?: string;
  annualRevenue?: string;
  interestedCategories?: string[];
  projectTypes?: string[];
  urgencyLevel?: string;
  preferredWorkingStyle?: string;
  communicationPreference?: string[];
  projectDescription?: string;
  budgetRange?: string;
  paymentPreference?: string;
  projectFrequency?: string;
  averageProjectDuration?: string;
  maxHourlyRate?: string;
  totalMonthlyBudget?: string;
  // Verification fields
  phoneNumber?: string;
  phoneVerified?: boolean;
  idDocument?: string;
  idDocumentType?: string;
  addressProof?: string;
  taxInformation?: string;
  agreedToTerms?: boolean;
  agreedToPrivacy?: boolean;
  agreedToFees?: boolean;
  [key: string]: string | number | boolean | string[] | object | undefined;
}

export interface ComponentProps {
  data?: StepData;
  userType?: "freelancer" | "client" | null;
  onNext?: (data: StepData) => void;
  onBack?: () => void;
  canGoBack?: boolean;
  onComplete?: (password: string) => void;
  loading?: boolean;
  error?: string | null;
}

export interface UserTypeSelectionProps {
  onSelect: (userType: 'CLIENT' | 'FREELANCER') => void;
}

export interface OnboardingCompleteProps {
  data?: StepData;
  userType?: "freelancer" | "client" | null;
  onComplete?: (password: string) => void;
  loading?: boolean;
  error?: string | null;
  onRestart?: () => void;
} 