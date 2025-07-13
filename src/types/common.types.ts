// Common types used across the application

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  total?: number;
  totalPages?: number;
  currentPage?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  jobType?: string;
  experience?: string;
  budget?: string;
  duration?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FileUpload {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface Location {
  city?: string;
  state?: string;
  country?: string;
  fullAddress?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
  website?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: Location;
  socialLinks?: SocialLinks;
}

export interface StatusBadge {
  status: string;
  color: 'default' | 'secondary' | 'destructive' | 'outline';
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface TabItem {
  value: string;
  label: string;
  icon?: any; // React component type
  disabled?: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: any; // React component type
  children?: MenuItem[];
  badge?: string;
  disabled?: boolean;
} 