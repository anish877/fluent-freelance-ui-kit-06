// Main types index file - exports all types for easy importing

// Job types
export * from './job.types';

// User/Profile types
export * from './user.types';

// Proposal types
export * from './proposal.types';

// Offer types
export * from './offer.types';

// Onboarding types
export * from './onboarding.types';

// Talent types
export * from './talent.types';

// Dashboard types
export * from './dashboard.types';

// Common types
export * from './common.types';

// API types
export * from './api.types';

// WebSocket types
export * from './websocket.types';

// Auth types
export * from './auth.types';

// Re-export Category from job.types as JobCategory to avoid conflicts
export type { Category as JobCategory } from './job.types';
export type { TalentCategory } from './talent.types'; 