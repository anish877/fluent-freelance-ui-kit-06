// Export all services
export { authService } from './auth.service';
export { jobService } from './job.service';
export { proposalService } from './proposal.service';
export { offerService } from './offer.service';
export { userService } from './user.service';
export { uploadService } from './upload.service';
export { notificationService } from './notification.service';
export { googleMeetService } from './google-meet.service';
export { jobInvitationsService } from './job-invitations.service';
export { messageService } from './message.service';

// Export API utilities
export { api, handleApiResponse, handleApiError } from './api';

// Re-export types from centralized types folder
export type { 
  LoginCredentials, 
  RegisterData,
  UpdateProfileData,
  CreateProposalData, 
  UpdateProposalData,
  CreateOfferData, 
  UpdateOfferData,
  UploadResponse,
  GoogleMeetData,
  Notification,
  WSConversation,
  WSMessageData
} from '../types'; 