// User and Profile-related types used across the application

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  title?: string;
  avatar?: string;
  profilePicture?: string;
  bio?: string;
  location?: string;
  country?: string;
  city?: string;
  timezone?: string;
  phone?: string;
  userType?: 'CLIENT' | 'FREELANCER';
  verified?: boolean;
  companyName?: string;
  companySize?: string;
  industry?: string;
  website?: string;
  joinDate?: string;
  memberSince?: string;
  rating?: number;
  reviewCount?: number;
  completedJobs?: number;
  totalEarnings?: string | number;
  successRate?: number;
  responseTime?: string;
  availability?: string;
  description?: string;
  overview?: string;
  hourlyRate?: string | number;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
    website?: string;
  };
  coverImage?: string;
  skills: string[]; // Simplified to match backend
  languages: string[]; // Simplified to match backend
  education: Education[];
  certifications: string[]; // Simplified to match backend
  portfolio: PortfolioItem[];
  portfolioProjects?: BackendPortfolioItem[];
  workExperience: WorkExperience[];
  workHistory?: Array<{
    title: string;
    client: string;
    duration: string;
    description: string;
    rating: number;
    feedback: string;
  }>;
  reviews: Review[];
  createdAt?: string;
  updatedAt?: string;
}

export interface FreelancerData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  hourlyRate?: number;
  totalEarnings?: number;
  completedJobs?: number;
  rating?: number;
  totalReviews?: number;
  skills: Skill[];
  languages: Language[];
  education: Education[];
  certifications: Certification[];
  portfolio: PortfolioItem[];
  workExperience: WorkExperience[];
  reviews: Review[];
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
  yearsOfExperience?: number;
}

export interface Language {
  id?: string;
  name?: string;
  language: string;
  proficiency: string;
}

export interface Education {
  id?: string;
  institution?: string;
  school?: string;
  degree: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  year?: string;
  description?: string;
}

export interface Certification {
  id?: string;
  name: string;
  issuer?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  year?: string;
}

export interface PortfolioItem {
  id?: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  technologies: string[];
  link: string;
  category?: string;
  completionDate?: string;
  clientFeedback?: string;
  role?: string;
  duration?: string;
  client?: string;
  budget?: string;
  projectType?: string;
  challenges?: string;
  outcomes?: string;
}

export interface BackendPortfolioItem {
  id?: string;
  title: string;
  description: string;
  image?: string;
  images?: string[];
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  link?: string;
  url?: string;
  category?: string;
  completionDate?: string;
  clientFeedback?: string;
  role?: string;
  duration?: string;
  client?: string;
  budget?: string;
  projectType?: string;
  challenges?: string;
  outcomes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface WorkExperience {
  id?: string;
  title: string;
  company: string;
  position?: string;
  startDate: string;
  endDate?: string;
  description: string;
  location?: string;
  current?: boolean;
  isCurrent?: boolean;
}

export interface Review {
  id?: string;
  rating: number;
  comment: string;
  author?: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    companyName?: string;
  };
  client?: string;
  project?: string;
  date?: string;
  job?: {
    id: string;
    title: string;
  };
  createdAt: string;
}

// Auth-related interfaces
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  title?: string;
  bio?: string;
  location?: string;
  country?: string;
  city?: string;
  timezone?: string;
  phone?: string;
  companyName?: string;
  companySize?: string;
  industry?: string;
  website?: string;
  hourlyRate?: number;
  availability?: string;
  description?: string;
  overview?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
    website?: string;
  };
  skills?: Skill[];
  languages?: Language[];
  education?: Education[];
  certifications?: Certification[];
  portfolio?: PortfolioItem[];
  workExperience?: WorkExperience[];
} 