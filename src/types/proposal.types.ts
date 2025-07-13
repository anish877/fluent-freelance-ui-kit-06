// Proposal-related types used across the application

export interface Proposal {
  id: string;
  coverLetter: string;
  bidAmount: number;
  bidType: 'FIXED' | 'HOURLY';
  estimatedDuration: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
  createdAt: string;
  updatedAt?: string;
  attachments?: string[];
  milestones?: Array<{
    title: string;
    description?: string;
    amount: number;
    duration?: string; // Backend might use 'duration' instead of 'dueDate'
    dueDate?: string;
    status?: 'pending' | 'in_progress' | 'completed';
  }>;
  questionResponses?: Array<{
    question: string;
    answer: string;
  }>;
  isShortlisted?: boolean;
  clientNotes?: string;
  rating?: number;
  interview?: any;
  clientViewed?: boolean;
  originalBudget?: number;
  jobId: string;
  freelancerId: string;
  job: {
    id: string;
    title: string;
    description?: string;
    budget: 'FIXED' | 'HOURLY';
    minBudget?: number;
    maxBudget?: number;
    category?: string;
    status?: string;
    _count?: {
      proposals: number;
    };
    client?: {
      id: string;
      firstName: string;
      lastName: string;
      companyName?: string;
    };
  };
  freelancer: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
    location?: string;
    skills?: string[] | Array<{
      name: string;
      category?: string;
      level?: string;
      yearsOfExperience?: number;
    }>;
    hourlyRate?: number;
    portfolio?: string;
    experience?: string;
    education?: string[] | Array<{
      school: string;
      degree: string;
      year: string;
    }>;
    certifications?: string[];
    languages?: string[] | Array<{
      name: string;
      level: string;
    }>;
    topSkills?: string[];
    experienceLevel?: string;
    totalEarnings?: string;
    successRate?: number;
    completedJobs?: number;
    onTime?: number;
    responseTime?: string;
    lastActive?: string;
    topRatedPlus?: boolean;
    verified?: boolean;
    email?: string;
    rating?: number;
    title?: string;
  };
}

export interface ExistingProposal {
  id: string;
  coverLetter: string;
  bidAmount: number;
  estimatedDuration: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
  createdAt: string;
  updatedAt: string;
}

// Interface for the modal proposal format
export interface ModalProposal {
  id: number;
  jobTitle: string;
  client: {
    name: string;
    rating: number;
    jobsPosted: number;
  };
  submittedDate: string;
  status: "pending" | "accepted" | "rejected" | "interview" | "withdrawn";
  bidAmount: string;
  coverLetter: string;
  timeline: string;
  jobBudget: string;
  jobType: "fixed" | "hourly";
  skills: string[];
  responses: number;
  lastActivity: string;
  attachments?: string[];
  interviewScheduled?: {
    date: string;
    time: string;
  };
}

// Proposal service interfaces
export interface CreateProposalData {
  jobId: string;
  coverLetter: string;
  bidAmount: number;
  estimatedDuration: string;
  attachments?: File[];
}

export interface UpdateProposalData {
  coverLetter?: string;
  bidAmount?: number;
  estimatedDuration?: string;
  attachments?: File[];
  isShortlisted?: boolean;
  clientNotes?: string;
  rating?: number;
  interview?: any;
  clientViewed?: boolean;
} 