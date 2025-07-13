import React, { useState, useEffect } from 'react';
import { 
  X, 
  DollarSign, 
  Clock, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Plus,
  Loader2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import { offerService } from '../../services/offer.service';

interface Milestone {
  title: string;
  description: string;
  amount: number;
  dueDate?: string;
}

interface Payment {
  id: string;
  milestoneIndex: number;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  paymentMethod?: string;
  transactionId?: string;
  paidAt?: string;
  createdAt: string;
}

interface Offer {
  id: string;
  budgetType: 'FIXED' | 'HOURLY';
  amount: number;
  duration: string;
  milestones?: Milestone[];
  terms?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'WITHDRAWN';
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  payments?: Payment[];
  client: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    companyName?: string;
    email: string;
    location?: string;
    totalSpent?: number;
    totalJobs?: number;
    rating?: number;
    memberSince?: string;
  };
  freelancer: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    email: string;
    title?: string;
    location?: string;
    hourlyRate?: number;
    totalEarnings?: number;
    rating?: number;
    memberSince?: string;
    skills?: string[];
  };
  job?: {
    id: string;
    title: string;
    description: string;
    budget: 'FIXED' | 'HOURLY';
    minBudget?: number;
    maxBudget?: number;
  };
}

interface OfferDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: Offer;
  onStatusChange?: () => void;
}

const OfferDetailsModal: React.FC<OfferDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  offer, 
  onStatusChange 
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    amount: '',
    dueDate: ''
  });

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
        onClose();
      }
    } catch (error: unknown) {
      console.error('Error accepting offer:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to accept offer';
      toast.error(errorMessage);
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
        onClose();
      }
    } catch (error: unknown) {
      console.error('Error rejecting offer:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to reject offer';
      toast.error(errorMessage);
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
        onClose();
      }
    } catch (error: unknown) {
      console.error('Error withdrawing offer:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to withdraw offer';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch payments for the offer
  const fetchPayments = async () => {
    if (!offer || offer.status !== 'ACCEPTED') return;
    
    setLoadingPayments(true);
    try {
      const response = await offerService.getOfferPayments(offer.id);
      if (response.success) {
        setPayments(response.data);
      }
    } catch (error: unknown) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoadingPayments(false);
    }
  };

  // Handle milestone payment
  const handleMilestonePayment = async (milestoneIndex: number, amount: number) => {
    setIsLoading(true);
    try {
      const response = await offerService.processMilestonePayment(offer.id, {
        milestoneIndex,
        amount,
        paymentMethod: 'Credit Card'
      });
      
      if (response.success) {
        toast.success('Payment processed successfully!');
        fetchPayments(); // Refresh payments
        onStatusChange?.();
      }
    } catch (error: unknown) {
      console.error('Error processing payment:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process payment';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle test milestone payment (for testing purposes)
  const handleTestMilestonePayment = async (milestoneIndex: number, amount: number) => {
    setIsLoading(true);
    try {
      const response = await offerService.processMilestonePayment(offer.id, {
        milestoneIndex,
        amount
      });
      
      if (response.success) {
        toast.success('Test payment processed successfully!');
        fetchPayments(); // Refresh payments
        onStatusChange?.();
      }
    } catch (error: unknown) {
      console.error('Error processing test payment:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process test payment';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Get payment status for a milestone
  const getMilestonePaymentStatus = (milestoneIndex: number) => {
    const payment = payments.find(p => p.milestoneIndex === milestoneIndex);
    return payment?.status || 'PENDING';
  };

  // Handle adding new milestone
  const handleAddMilestone = async () => {
    if (!newMilestone.title || !newMilestone.description || !newMilestone.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await offerService.addMilestone(offer.id, {
        title: newMilestone.title,
        description: newMilestone.description,
        amount: parseFloat(newMilestone.amount),
        dueDate: newMilestone.dueDate || null
      });
      
      if (response.success) {
        toast.success('Milestone added successfully!');
        setShowAddMilestone(false);
        setNewMilestone({ title: '', description: '', amount: '', dueDate: '' });
        onStatusChange?.(); // Refresh the offer data
      }
    } catch (error: unknown) {
      console.error('Error adding milestone:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to add milestone';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const isExpired = offer.expiresAt && new Date() > new Date(offer.expiresAt);

  // Fetch payments when modal opens for accepted offers
  useEffect(() => {
    if (isOpen && offer.status === 'ACCEPTED') {
      fetchPayments();
    }
  }, [isOpen, offer.status, offer.id]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Offer Details</h2>
              <p className="text-sm text-gray-500">Review and manage this offer</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Status Banner */}
              <div className={`p-4 rounded-lg border ${getStatusColor(offer.status)}`}>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(offer.status)}
                  <span className="font-semibold">Offer {offer.status}</span>
                </div>
                <p className="text-sm mt-1 opacity-90">
                  {offer.status === 'PENDING' && 'Waiting for freelancer response'}
                  {offer.status === 'ACCEPTED' && 'Offer has been accepted and contract is active'}
                  {offer.status === 'REJECTED' && 'Offer has been declined by the freelancer'}
                  {offer.status === 'EXPIRED' && 'Offer has expired'}
                  {offer.status === 'WITHDRAWN' && 'Offer has been withdrawn by the client'}
                </p>
              </div>

              {/* Offer Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Offer Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="font-semibold text-lg">
                        {formatCurrency(offer.amount)} {offer.budgetType === 'HOURLY' && '/hr'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold text-lg">{offer.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-semibold text-lg">{formatDate(offer.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Project Milestones</h3>
                  {isClient && offer.status === 'ACCEPTED' && (
                    <Button
                      onClick={() => setShowAddMilestone(true)}
                      size="sm"
                      className="bg-white hover:bg-gray-100 text-black border border-gray-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Milestone
                    </Button>
                  )}
                </div>
                
                {offer.milestones && offer.milestones.length > 0 ? (
                  <div className="space-y-4">
                    {offer.milestones.map((milestone: Milestone, index: number) => {
                      const paymentStatus = getMilestonePaymentStatus(index);
                      const isPaid = paymentStatus === 'COMPLETED';
                      
                      return (
                        <div key={index} className="border rounded-lg p-4 bg-white">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge className={`text-xs ${
                                    isPaid 
                                      ? 'bg-green-100 text-green-800 border-green-200' 
                                      : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                  }`}>
                                    {isPaid ? 'Funded' : 'Waiting for Funding'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <span className="text-lg font-bold text-green-600">
                              {formatCurrency(milestone.amount)}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{milestone.description}</p>
                          {milestone.dueDate && (
                            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                              <Calendar className="h-4 w-4" />
                              <span>Due: {formatDate(milestone.dueDate)}</span>
                            </div>
                          )}
                          
                          {/* Payment Buttons for Clients */}
                          {isClient && offer.status === 'ACCEPTED' && !isPaid && (
                            <div className="space-y-2">
                              <Button
                                onClick={() => handleMilestonePayment(index, milestone.amount)}
                                disabled={isLoading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                              >
                                {isLoading ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Processing Payment...
                                  </>
                                ) : (
                                  `Pay ${formatCurrency(milestone.amount)}`
                                )}
                              </Button>
                              <Button
                                onClick={() => handleTestMilestonePayment(index, milestone.amount)}
                                disabled={isLoading}
                                variant="outline"
                                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                              >
                                {isLoading ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Processing Test Payment...
                                  </>
                                ) : (
                                  `Test Payment ${formatCurrency(milestone.amount)}`
                                )}
                              </Button>
                            </div>
                          )}
                          
                          {/* Payment Status for Freelancers */}
                          {!isClient && offer.status === 'ACCEPTED' && (
                            <div className="text-sm text-gray-600">
                              {isPaid ? (
                                <span className="text-green-600">✓ Payment received</span>
                              ) : (
                                <span className="text-yellow-600">⏳ Waiting for client payment</span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No milestones defined yet.</p>
                    {isClient && offer.status === 'ACCEPTED' && (
                      <p className="text-sm mt-2">Click "Add Milestone" to create one.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Payment History */}
              {payments.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                  <div className="space-y-3">
                    {payments.map((payment) => {
                      const milestone = offer.milestones?.[payment.milestoneIndex];
                      return (
                        <div key={payment.id} className="border rounded-lg p-4 bg-white">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <span className="font-semibold text-gray-900">
                                {milestone?.title || `Milestone ${payment.milestoneIndex + 1}`}
                              </span>
                            </div>
                            <span className="text-lg font-bold text-green-600">
                              {formatCurrency(payment.amount)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Paid on {formatDate(payment.paidAt || payment.createdAt)}</span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {payment.paymentMethod}
                            </span>
                          </div>
                          {payment.transactionId && (
                            <div className="text-xs text-gray-400 mt-1">
                              TXN: {payment.transactionId}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Terms & Conditions */}
              {offer.terms && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Terms & Conditions</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{offer.terms}</p>
                  </div>
                </div>
              )}


            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-gray-200 overflow-y-auto">
            <div className="p-6 space-y-6">

              {/* Timeline */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-900">Offer Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm">Offer Created</p>
                      <p className="text-xs text-gray-500">{formatDate(offer.createdAt)}</p>
                    </div>
                  </div>
                  
                  {offer.status === 'ACCEPTED' && (
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Offer Accepted</p>
                        <p className="text-xs text-gray-500">{formatDate(offer.updatedAt)}</p>
                      </div>
                    </div>
                  )}
                  
                  {offer.status === 'REJECTED' && (
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Offer Declined</p>
                        <p className="text-xs text-gray-500">{formatDate(offer.updatedAt)}</p>
                      </div>
                    </div>
                  )}
                  
                  {offer.status === 'WITHDRAWN' && (
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Offer Withdrawn</p>
                        <p className="text-xs text-gray-500">{formatDate(offer.updatedAt)}</p>
                      </div>
                    </div>
                  )}
                  
                  {offer.expiresAt && (
                    <div className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${isExpired ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                      <div>
                        <p className="font-medium text-sm">Offer Expires</p>
                        <p className="text-xs text-gray-500">{formatDate(offer.expiresAt)}</p>
                        {isExpired && <p className="text-xs text-red-500">Expired</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* View Job Details Button */}
              {offer.job && (
                <div>
                  <h3 className="font-semibold mb-4 text-gray-900">Related Job</h3>
                  <Button 
                    onClick={() => {
                      onClose();
                      navigate(`/jobs/${offer.job.id}`);
                    }}
                    className="w-full bg-white hover:bg-gray-100 text-black border border-gray-200"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Job Details
                  </Button>
                </div>
              )}

              {/* Actions */}
              {offer.status === 'PENDING' && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Actions</h3>
                  {canWithdraw && (
                    <Button
                      variant="outline"
                      onClick={handleWithdraw}
                      disabled={isLoading}
                      className="w-full border-red-200 text-red-700 hover:bg-red-50"
                    >
                      {isLoading ? 'Withdrawing...' : 'Withdraw Offer'}
                    </Button>
                  )}
                  {canReject && (
                    <Button
                      variant="outline"
                      onClick={handleReject}
                      disabled={isLoading}
                      className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      {isLoading ? 'Declining...' : 'Decline Offer'}
                    </Button>
                  )}
                  {canAccept && (
                    <Button
                      onClick={handleAccept}
                      disabled={isLoading}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isLoading ? 'Accepting...' : 'Accept Offer'}
                    </Button>
                  )}
                </div>
              )}

              {/* Status Messages */}
              {offer.status === 'ACCEPTED' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800 mb-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Offer Accepted</span>
                  </div>
                  <p className="text-sm text-green-700">
                    This offer has been accepted. You can now proceed with the project.
                  </p>
                </div>
              )}

              {offer.status === 'REJECTED' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-red-800 mb-2">
                    <XCircle className="h-4 w-4" />
                    <span className="font-medium">Offer Declined</span>
                  </div>
                  <p className="text-sm text-red-700">
                    This offer has been declined by the freelancer.
                  </p>
                </div>
              )}

              {offer.status === 'WITHDRAWN' && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-gray-800 mb-2">
                    <XCircle className="h-4 w-4" />
                    <span className="font-medium">Offer Withdrawn</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    This offer has been withdrawn by the client.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Milestone Modal */}
      {showAddMilestone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Add New Milestone</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddMilestone(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Milestone Title *
                </Label>
                <Input
                  id="title"
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                  placeholder="e.g., Design Phase, Development Phase"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                  placeholder="Describe what this milestone includes..."
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                  Amount (USD) *
                </Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newMilestone.amount}
                  onChange={(e) => setNewMilestone({ ...newMilestone, amount: e.target.value })}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
                  Due Date (Optional)
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newMilestone.dueDate}
                  onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddMilestone(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddMilestone}
                  disabled={isLoading || !newMilestone.title || !newMilestone.description || !newMilestone.amount}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  {isLoading ? 'Adding...' : 'Add Milestone'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferDetailsModal; 