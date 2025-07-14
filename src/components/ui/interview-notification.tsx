import React from 'react';
import { Calendar, Clock, MapPin, Video, ExternalLink, CheckCircle, X, Users } from 'lucide-react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Button } from './button';

interface InterviewNotificationProps {
  interviewData: {
    date: string;
    time: string;
    duration: number;
    meetLink: string;
    notes?: string;
    jobTitle: string;
    clientName: string;
    status?: 'pending' | 'accepted' | 'declined' | 'withdrawn';
    withdrawnBy?: string;
    withdrawnReason?: string;
    originalData?: {
      date: string;
      time: string;
      duration: number;
      notes?: string;
      meetLink: string;
      jobTitle: string;
      clientName: string;
    };
    interviewData?: any; // For nested structure
  };
  onJoinInterview?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  onWithdraw?: () => void;
  onReschedule?: () => void;
  status?: 'pending' | 'accepted' | 'declined' | 'withdrawn';
  currentUserEmail?: string;
  senderEmail?: string;
}

const InterviewNotification: React.FC<InterviewNotificationProps> = ({
  interviewData,
  onJoinInterview,
  onAccept,
  onDecline,
  onWithdraw,
  onReschedule,
  status = 'pending',
  currentUserEmail,
  senderEmail
}) => {
  // Validate required fields
  if (!interviewData) {
    console.error('InterviewNotification: interviewData is required');
    return <div className="p-4 bg-red-50 border border-red-200 rounded">Error: Invalid interview data</div>;
  }

  // Handle different data structures
  const data = interviewData.interviewData || interviewData;
  
  // Check for required fields with fallbacks - also check originalData for withdrawn interviews
  // The data structure from websocket includes 'type' field, so we need to handle that
  const hasRequiredFields = (data.date && data.time && data.jobTitle) || 
                           (data.originalData && data.originalData.date && data.originalData.time && data.jobTitle) ||
                           // Handle case where data has type field but missing other fields
                           (data.type && data.meetLink && data.jobTitle);
  
  // For withdrawn interviews without date/time, show a different UI
  if (!hasRequiredFields && data.status === 'withdrawn') {
    return (
      <Card className="border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 shadow-sm max-w-sm mx-auto">
        <CardContent className="p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-red-100 rounded-full">
                <X className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Interview Withdrawn</h3>
                <p className="text-xs text-gray-600">by {data.clientName}</p>
              </div>
            </div>
            <Badge className="text-xs px-2 py-1 bg-red-100 text-red-700 border-red-200">
              <X className="h-3 w-3 mr-1" />
              <span className="capitalize">Withdrawn</span>
            </Badge>
          </div>

          {/* Job Title */}
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-1">Job Position</p>
            <p className="text-sm font-medium text-red-700 truncate">{data.jobTitle}</p>
          </div>

          {/* Withdrawal Details */}
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-xs">
            <p className="text-red-700 font-medium mb-1">Interview Withdrawn</p>
            <p className="text-red-600">{data.withdrawnReason}</p>
            <p className="text-red-600 mt-1">Withdrawn on {new Date(data.withdrawnAt).toLocaleDateString()}</p>
          </div>

          {/* Notes if available */}
          {data.notes && (
            <div className="mb-3 p-2 bg-gray-50 rounded text-xs">
              <p className="text-gray-700 whitespace-pre-wrap line-clamp-2">{data.notes}</p>
            </div>
          )}

          {/* Reschedule button for withdrawn interviews - only show to original scheduler */}
          {data.withdrawnBy === currentUserEmail && onReschedule && (
            <div className="flex space-x-1.5">
              <Button
                onClick={onReschedule}
                size="sm"
                className="flex-1 h-6 text-xs bg-teal-600 hover:bg-teal-700"
              >
                <Calendar className="h-3 w-3 mr-1" />
                Schedule Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
  
  if (!hasRequiredFields) {
    console.error('InterviewNotification: Missing required fields', data);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-700 font-medium mb-1">Interview Data Error</p>
        <p className="text-red-600 text-sm">Missing required fields: date, time, or jobTitle</p>
        <p className="text-red-600 text-xs mt-1">Available data: {Object.keys(data).join(', ')}</p>
        <p className="text-red-600 text-xs mt-1">Data values: {JSON.stringify(data, null, 2)}</p>
        <p className="text-red-600 text-xs mt-1">Status: {data.status}</p>
      </div>
    );
  }

  // Use the correct data structure throughout the component
  // For withdrawn interviews, use originalData for date/time, otherwise use direct data
  // Handle the case where data has type field but missing date/time (use defaults)
  const interviewDataToUse = {
    ...data,
    date: data.date || data.originalData?.date || new Date().toISOString().split('T')[0],
    time: data.time || data.originalData?.time || '09:00',
    duration: data.duration || data.originalData?.duration || 30,
    notes: data.notes || data.originalData?.notes || '',
    meetLink: data.meetLink || data.originalData?.meetLink || '',
    jobTitle: data.jobTitle || data.originalData?.jobTitle || 'Interview',
    clientName: data.clientName || data.originalData?.clientName || 'Client'
  };
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = () => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'declined':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-3 w-3" />;
      case 'declined':
        return <X className="h-3 w-3" />;
      case 'withdrawn':
        return <X className="h-3 w-3" />;
      default:
        return <Calendar className="h-3 w-3" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'accepted':
        return 'Accepted';
      case 'declined':
        return 'Declined';
      case 'withdrawn':
        return 'Withdrawn';
      default:
        return 'Pending';
    }
  };

  // Determine user roles
  const isCurrentUserSender = senderEmail === currentUserEmail;
  const isClient = interviewData.clientName && currentUserEmail === senderEmail;
  const isFreelancer = !isClient;

  // Check if interview is active (not withdrawn/declined)
  const isActive = status === 'pending' || status === 'accepted';

  return (
    <Card className="border border-teal-200 bg-gradient-to-br from-teal-50 to-blue-50 shadow-sm max-w-sm mx-auto hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-teal-100 rounded-full">
              <Video className="h-4 w-4 text-teal-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Interview Invitation</h3>
              <p className="text-xs text-gray-600">from {interviewDataToUse.clientName}</p>
            </div>
          </div>
          <Badge className={`text-xs px-2 py-1 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="ml-1 capitalize">{getStatusText()}</span>
          </Badge>
        </div>

        {/* Withdrawn Message */}
        {status === 'withdrawn' && interviewDataToUse.withdrawnReason && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-xs">
            <p className="text-red-700 font-medium mb-1">Interview Withdrawn</p>
            <p className="text-red-600">{interviewDataToUse.withdrawnReason}</p>
          </div>
        )}

        {/* Job Title */}
        <div className="mb-3">
          <p className="text-xs text-gray-600 mb-1">Job Position</p>
          <p className="text-sm font-medium text-teal-700 truncate">{interviewDataToUse.jobTitle}</p>
        </div>

        {/* Interview Details - Compact Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <Calendar className="h-3 w-3 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-xs font-medium text-gray-900">{formatDate(interviewDataToUse.date)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="h-3 w-3 text-purple-500" />
            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p className="text-xs font-medium text-gray-900">{formatTime(interviewDataToUse.time)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="h-3 w-3 text-orange-500" />
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="text-xs font-medium text-gray-900">{interviewDataToUse.duration}m</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="h-3 w-3 text-green-500" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-xs font-medium text-gray-900">Google Meet</p>
            </div>
          </div>
        </div>

        {/* Google Meet Link - Only show if interview is active */}
        {isActive && interviewDataToUse.meetLink && (
          <div className="mb-3 p-1.5 bg-white rounded border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Video className="h-3 w-3 text-teal-600" />
                <span className="text-xs font-medium text-gray-700">Meeting Link</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(interviewDataToUse.meetLink, '_blank')}
                className="text-xs h-5 px-2 text-teal-600 border-teal-200 hover:bg-teal-50"
              >
                <ExternalLink className="h-2.5 w-2.5 mr-1" />
                Join
              </Button>
            </div>
          </div>
        )}

        {/* Notes - Only if exists */}
        {interviewDataToUse.notes && (
          <div className="mb-3 p-2 bg-gray-50 rounded text-xs">
            <p className="text-gray-700 whitespace-pre-wrap line-clamp-2">{interviewDataToUse.notes}</p>
          </div>
        )}

        {/* Action Buttons - Conditional based on user role and status */}
        {status === 'pending' && (
          <div className="flex space-x-1.5">
            {/* Client actions - can withdraw */}
            {isClient && isCurrentUserSender && (
              <Button
                variant="outline"
                size="sm"
                onClick={onWithdraw}
                className="flex-1 h-6 text-xs border-red-200 text-red-600 hover:bg-red-50"
              >
                <X className="h-3 w-3 mr-1" />
                Withdraw
              </Button>
            )}
            
            {/* Freelancer actions - can accept/decline */}
            {isFreelancer && !isCurrentUserSender && (
              <>
                <Button
                  onClick={onAccept}
                  size="sm"
                  className="flex-1 h-6 text-xs bg-teal-600 hover:bg-teal-700"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Accept
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDecline}
                  className="flex-1 h-6 text-xs border-red-200 text-red-600 hover:bg-red-50"
                >
                  Decline
                </Button>
              </>
            )}
          </div>
        )}

        {(status === 'accepted' || (status === 'pending' && interviewDataToUse.meetLink)) && isActive && (
          <div className="flex space-x-1.5">
            <Button
              onClick={onJoinInterview}
              size="sm"
              className="flex-1 h-6 text-xs bg-teal-600 hover:bg-teal-700"
            >
              <Video className="h-3 w-3 mr-1" />
              Join
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(interviewDataToUse.meetLink, '_blank')}
              className="flex-1 h-6 text-xs"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Browser
            </Button>
          </div>
        )}

        {/* Schedule Again button for withdrawn interviews - only show to original scheduler */}
        {status === 'withdrawn' && isClient && isCurrentUserSender && onReschedule && (
          <div className="flex space-x-1.5">
            <Button
              onClick={onReschedule}
              size="sm"
              className="flex-1 h-6 text-xs bg-teal-600 hover:bg-teal-700"
            >
              <Calendar className="h-3 w-3 mr-1" />
              Schedule Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InterviewNotification; 