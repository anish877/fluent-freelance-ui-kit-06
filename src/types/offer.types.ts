// Offer-related types used across the application

export interface Offer {
  id: string;
  conversationId: string;
  clientId: string;
  freelancerId: string;
  jobId: string;
  budgetType: 'FIXED' | 'HOURLY';
  amount: number;
  duration: string;
  milestones: Array<{
    title: string;
    description: string;
    amount: number;
    dueDate: string;
    status?: 'pending' | 'in_progress' | 'completed';
  }>;
  terms?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'WITHDRAWN';
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    companyName?: string;
  };
  freelancer: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    email: string;
  };
  job: {
    id: string;
    title: string;
    description: string;
  };
  conversation: {
    id: string;
    projectName?: string;
  };
}

// Offer service interfaces
export interface CreateOfferData {
  conversationId: string;
  freelancerId: string;
  jobId: string;
  budgetType: 'FIXED' | 'HOURLY';
  amount: number;
  duration: string;
  milestones?: Array<{
    title: string;
    description: string;
    amount: number;
    dueDate: string;
  }>;
  terms?: string;
  expiresAt?: string;
}

export interface UpdateOfferData {
  budgetType?: 'FIXED' | 'HOURLY';
  amount?: number;
  duration?: string;
  milestones?: Array<{
    title: string;
    description: string;
    amount: number;
    dueDate: string;
  }>;
  terms?: string;
  expiresAt?: string;
} 