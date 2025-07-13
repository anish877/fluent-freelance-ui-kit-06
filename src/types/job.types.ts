// Job-related types used across the application

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: 'FIXED' | 'HOURLY';
  minBudget?: number;
  maxBudget?: number;
  duration?: string;
  skills: string[];
  category: string;
  subcategory?: string;
  projectType?: string;
  experienceLevel?: string;
  location?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  visibility: string;
  attachments?: string[]; // URLs to attached files
  isUrgent?: boolean;
  isRemote?: boolean;
  applicationDeadline?: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
    location?: string;
    companyName?: string;
    companySize?: string;
    industry?: string;
    verified: boolean;
    createdAt: string;
  };
  _count: {
    proposals: number;
  };
}

export interface JobFormData {
  // Basic Info
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  skills: string[];
  experienceLevel: string; // entry-level, intermediate, expert
  projectType: string; // hourly, fixed-price
  duration: string; // ongoing, short-term, one-time
  
  // Budget
  budget: 'FIXED' | 'HOURLY';
  budgetType: 'hourly' | 'fixed';
  minBudget?: number;
  maxBudget?: number;
  hideBudget: boolean;
  
  // Visibility & Files
  visibility: 'public' | 'invite-only' | 'private' | string;
  location?: string;
  attachments?: File[];
  attachmentUrls?: string[]; // Store uploaded URLs
}

export interface Category {
  value: string;
  label: string;
  count: number;
}

export interface JobInvitation {
  id: string;
  jobId: string;
  clientId: string;
  freelancerId?: string;
  freelancerEmail?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
  message?: string;
  createdAt: string;
  updatedAt: string;
  job: {
    id: string;
    title: string;
    description: string;
    budget: 'FIXED' | 'HOURLY';
    minBudget?: number;
    maxBudget?: number;
    category: string;
    skills: string[];
    client: {
      id: string;
      firstName: string;
      lastName: string;
      companyName?: string;
      avatar?: string;
    };
  };
  client: {
    id: string;
    firstName: string;
    lastName: string;
    companyName?: string;
    avatar?: string;
  };
  freelancer?: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
} 