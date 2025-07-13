// Talent/Freelancer-related types used across the application

export interface Freelancer {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: string;
  availability: "available" | "busy" | "offline";
  skills: string[];
  description: string;
  completedJobs: number;
  totalEarnings: string;
  responseTime: string;
  languages: string[];
  profilePicture: string;
  avatar?: string;
  bio?: string;
  email?: string;
  verified: boolean;
  topRated: boolean;
  risingTalent: boolean;
  isAvailable?: boolean;
  portfolio: {
    title: string;
    image: string;
    description: string;
    category: string;
  }[];
  lastActive: string;
  successRate: number;
  onTime: number;
  onBudget: number;
  repeatHireRate: number;
  certifications: string[];
  education: string[];
  specializations: string[];
  testScores: { name: string; score: number }[];
  memberSince: string;
  profileStrength: number;
  workExperience?: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
  }>;
  reviews?: Array<{
    id: string;
    rating: number;
    comment: string;
    client: {
      id: string;
      firstName: string;
      lastName: string;
      companyName?: string;
    };
    createdAt: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface TalentCategory {
  label: string;
  value: string;
  count: number;
}

export interface PlatformStats {
  totalFreelancers: string;
  averageRating: string;
  successRate: number;
  countriesCount: number;
} 