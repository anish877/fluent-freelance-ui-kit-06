import React, { useState } from 'react';
import { DollarSign, Clock, FileText, Calendar, CheckCircle, XCircle, AlertCircle, User, Building } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/AuthContext';
import { offerService } from '../../services/offer.service';

interface Offer {
  id: string;
  title: string;
  description: string;
  budgetType: 'FIXED' | 'HOURLY';
  amount: number;
  duration: string;
  milestones?: any[];
  terms?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'WITHDRAWN';
  expiresAt?: string;
  createdAt: string;
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
  job?: {
    id: string;
    title: string;
    description: string;
  };
}

interface OfferCardProps {
  offer: Offer;
  onStatusChange?: () => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onStatusChange }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const isClient = user?.userType === 'CLIENT';
  const isFreelancer = user?.userType === 'FREELANCER';
  const isOwner = isClient ? offer.client.id === user?.id : offer.freelancer.id === user?.id;
  const canAccept = isFreelancer && offer.status === 'PENDING' && offer.freelancer.id === user?.id;
  const canReject = isFreelancer && offer.status === 'PENDING' && offer.freelancer.id === user?.id;
  const canWithdraw = isClient && offer.status === 'PENDING' && offer.client.id === user?.id;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'EXPIRED':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'WITHDRAWN':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <AlertCircle className="h-4 w-4" />;
      case 'ACCEPTED':
        return <CheckCircle className="h-4 w-4" />;
      case 'REJECTED':
        return <XCircle className="h-4 w-4" />;
      case 'EXPIRED':
        return <Clock className="h-4 w-4" />;
      case 'WITHDRAWN':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      const response = await offerService.acceptOffer(offer.id);
      if (response.success) {
        toast.success('Offer accepted successfully!');
        onStatusChange?.();
      }
    } catch (error: any) {
      console.error('Error accepting offer:', error);
      toast.error(error.response?.data?.message || 'Failed to accept offer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      const response = await offerService.rejectOffer(offer.id);
      if (response.success) {
        toast.success('Offer rejected');
        onStatusChange?.();
      }
    } catch (error: any) {
      console.error('Error rejecting offer:', error);
      toast.error(error.response?.data?.message || 'Failed to reject offer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setIsLoading(true);
    try {
      const response = await offerService.withdrawOffer(offer.id);
      if (response.success) {
        toast.success('Offer withdrawn successfully');
        onStatusChange?.();
      }
    } catch (error: any) {
      console.error('Error withdrawing offer:', error);
      toast.error(error.response?.data?.message || 'Failed to withdraw offer');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isExpired = offer.expiresAt && new Date() > new Date(offer.expiresAt);

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-teal-600" />
            <h3 className="font-semibold text-lg">{offer.title}</h3>
          </div>
          <Badge className={`${getStatusColor(offer.status)} border`}>
            <div className="flex items-center space-x-1">
              {getStatusIcon(offer.status)}
              <span>{offer.status}</span>
            </div>
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide' : 'Details'}
        </Button>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-gray-500" />
          <span>
            ${offer.amount} {offer.budgetType === 'HOURLY' && '/hr'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>{offer.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>{formatDate(offer.createdAt)}</span>
        </div>
      </div>

      {/* Client/Freelancer Info */}
      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
        <Avatar className="h-8 w-8">
          <AvatarImage src={isClient ? offer.freelancer.avatar : offer.client.avatar} />
          <AvatarFallback>
            {isClient 
              ? `${offer.freelancer.firstName[0]}${offer.freelancer.lastName[0]}`
              : `${offer.client.firstName[0]}${offer.client.lastName[0]}`
            }
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            {isClient ? <User className="h-4 w-4 text-gray-500" /> : <Building className="h-4 w-4 text-gray-500" />}
            <span className="font-medium">
              {isClient 
                ? `${offer.freelancer.firstName} ${offer.freelancer.lastName}`
                : `${offer.client.firstName} ${offer.client.lastName}`
              }
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {isClient 
              ? offer.freelancer.email
              : offer.client.companyName || 'Client'
            }
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h4 className="font-medium mb-2">Description</h4>
        <p className="text-sm text-gray-700 leading-relaxed">{offer.description}</p>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="space-y-4 border-t pt-4">
          {/* Milestones */}
          {offer.milestones && offer.milestones.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">Milestones</h4>
              <div className="space-y-3">
                {offer.milestones.map((milestone: any, index: number) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{milestone.title}</h5>
                      <span className="text-sm font-medium">${milestone.amount}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                    {milestone.dueDate && (
                      <div className="text-xs text-gray-500">
                        Due: {formatDate(milestone.dueDate)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Terms */}
          {offer.terms && (
            <div>
              <h4 className="font-medium mb-2">Terms & Conditions</h4>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{offer.terms}</p>
            </div>
          )}

          {/* Expiration */}
          {offer.expiresAt && (
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Expires: {formatDate(offer.expiresAt)}</span>
              {isExpired && (
                <Badge variant="destructive" className="text-xs">
                  Expired
                </Badge>
              )}
            </div>
          )}

          {/* Job Link */}
          {offer.job && (
            <div>
              <h4 className="font-medium mb-2">Related Job</h4>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-900">{offer.job.title}</h5>
                <p className="text-sm text-blue-700 mt-1">{offer.job.description}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      {offer.status === 'PENDING' && (
        <div className="flex items-center justify-end space-x-3 pt-4 border-t">
          {canWithdraw && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleWithdraw}
              disabled={isLoading}
            >
              {isLoading ? 'Withdrawing...' : 'Withdraw Offer'}
            </Button>
          )}
          {canReject && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              disabled={isLoading}
            >
              {isLoading ? 'Rejecting...' : 'Decline'}
            </Button>
          )}
          {canAccept && (
            <Button
              size="sm"
              onClick={handleAccept}
              disabled={isLoading}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {isLoading ? 'Accepting...' : 'Accept Offer'}
            </Button>
          )}
        </div>
      )}

      {/* Status Messages */}
      {offer.status === 'ACCEPTED' && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium">Offer Accepted</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            This offer has been accepted. You can now proceed with the project.
          </p>
        </div>
      )}

      {offer.status === 'REJECTED' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2 text-red-800">
            <XCircle className="h-4 w-4" />
            <span className="font-medium">Offer Declined</span>
          </div>
          <p className="text-sm text-red-700 mt-1">
            This offer has been declined.
          </p>
        </div>
      )}

      {offer.status === 'WITHDRAWN' && (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-2 text-gray-800">
            <XCircle className="h-4 w-4" />
            <span className="font-medium">Offer Withdrawn</span>
          </div>
          <p className="text-sm text-gray-700 mt-1">
            This offer has been withdrawn by the client.
          </p>
        </div>
      )}
    </div>
  );
};

export default OfferCard; 