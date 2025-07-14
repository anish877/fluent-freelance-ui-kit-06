// Dashboard-related types used across the application

export interface DashboardStats {
  title: string;
  value: string;
  change: string;
  changeText: string;
  icon: any; // React component type
  color: string;
  bgColor: string;
  trend: 'up' | 'down';
}

export interface WeeklyEarnings {
  week: string;
  amount: number;
}

export interface RecentJob {
  id: number;
  title: string;
  client: string;
  status: string;
  deadline: string;
  budget: string;
  progress: number;
  lastActivity: string;
  priority: 'low' | 'medium' | 'high';
  timeTracked: string;
  clientRating: number;
}

export interface RecentActivity {
  id: number;
  type: 'proposal' | 'message' | 'payment' | 'review';
  title: string;
  description: string;
  time: string;
  status?: string;
  amount?: string;
}

export interface DashboardNotification {
  id: string;
  type: 'proposal' | 'message' | 'payment' | 'review' | 'offer' | 'job_invitation';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  data?: {
    jobId?: string;
    proposalId?: string;
    offerId?: string;
    messageId?: string;
  };
} 