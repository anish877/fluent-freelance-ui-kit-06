import React, { useState, useEffect } from 'react';
import { X, DollarSign, Clock, FileText, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { offerService } from '../../services/offer.service';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  freelancerId: string;
  freelancerName: string;
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  jobBudget?: 'FIXED' | 'HOURLY';
  jobMinBudget?: number;
  jobMaxBudget?: number;
  onOfferCreated?: () => void;
}

interface Milestone {
  title: string;
  description: string;
  amount: number;
  dueDate: string;
}

const OfferModal: React.FC<OfferModalProps> = ({
  isOpen,
  onClose,
  conversationId,
  freelancerId,
  freelancerName,
  jobId,
  jobTitle,
  jobDescription,
  jobBudget,
  jobMinBudget,
  jobMaxBudget,
  onOfferCreated
}) => {
  const [formData, setFormData] = useState({
    budgetType: (jobBudget || 'FIXED') as 'FIXED' | 'HOURLY',
    amount: '',
    duration: '',
    terms: '',
    expiresAt: ''
  });
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        budgetType: (jobBudget || 'FIXED') as 'FIXED' | 'HOURLY',
        amount: '',
        duration: '',
        terms: '',
        expiresAt: ''
      });
      setMilestones([]);
    }
  }, [isOpen, jobBudget]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addMilestone = () => {
    setMilestones(prev => [...prev, {
      title: '',
      description: '',
      amount: 0,
      dueDate: ''
    }]);
  };

  const updateMilestone = (index: number, field: keyof Milestone, value: string | number) => {
    setMilestones(prev => prev.map((milestone, i) => 
      i === index ? { ...milestone, [field]: value } : milestone
    ));
  };

  const removeMilestone = (index: number) => {
    setMilestones(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.duration) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        conversationId,
        freelancerId,
        budgetType: formData.budgetType,
        amount: parseFloat(formData.amount),
        duration: formData.duration,
        terms: formData.terms || undefined,
        expiresAt: formData.expiresAt || undefined,
        jobId: jobId,
        milestones: milestones.length > 0 ? milestones : undefined
      };

      const response = await offerService.createOffer(payload);
      
      if (response.success) {
        toast.success('Offer sent successfully!');
        onOfferCreated?.();
        onClose();
        // Reset form
        setFormData({
          budgetType: 'FIXED',
          amount: '',
          duration: '',
          terms: '',
          expiresAt: ''
        });
        setMilestones([]);
      }
    } catch (error: unknown) {
      console.error('Error creating offer:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create offer';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] shadow-2xl border border-gray-100 flex flex-col">
        <div className="p-8 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Make an Offer</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-100 transition">
              <X className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
          <p className="text-base text-gray-500 mt-2">Send a professional offer to <span className="font-semibold text-gray-900">{freelancerName}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto flex-1 min-h-0">
          {/* Job Information */}
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold text-gray-700">Job Title</Label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-base font-medium text-gray-900">
                  {jobTitle || 'No title available'}
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-1">From job details</p>
            </div>

            <div>
              <Label className="text-base font-semibold text-gray-700">Job Description</Label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-100 max-h-40 overflow-y-auto">
                <p className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {jobDescription || 'No description available'}
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-1">From job details</p>
            </div>
          </div>

          {/* Budget Type Heading */}
          {jobBudget && (
            <div>
              <Label className="text-base font-semibold text-gray-700">Project Type</Label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-base font-medium text-gray-900">
                  {formData.budgetType === 'FIXED' ? 'Fixed Price' : 'Hourly Rate'} Project
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-1">Based on job requirements</p>
            </div>
          )}

          {/* Budget and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!jobBudget && (
              <div>
                <Label htmlFor="budgetType" className="text-base font-semibold text-gray-700">Budget Type *</Label>
                <Select
                  value={formData.budgetType}
                  onValueChange={(value: 'FIXED' | 'HOURLY') => handleInputChange('budgetType', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FIXED">Fixed Price</SelectItem>
                    <SelectItem value="HOURLY">Hourly Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="amount" className="text-base font-semibold text-gray-700">
                {formData.budgetType === 'FIXED' ? 'Total Amount ($)' : 'Hourly Rate ($)'} *
              </Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder={
                  formData.budgetType === 'FIXED' 
                    ? (jobMinBudget && jobMaxBudget 
                        ? `${jobMinBudget} - ${jobMaxBudget}` 
                        : String(jobMinBudget || jobMaxBudget || '500'))
                    : (jobMinBudget && jobMaxBudget 
                        ? `${jobMinBudget} - ${jobMaxBudget}` 
                        : String(jobMinBudget || jobMaxBudget || '25'))
                }
                className="mt-2"
              />
              {jobMinBudget && jobMaxBudget && (
                <p className="text-xs text-gray-500 mt-1">
                  Job budget: ${jobMinBudget.toLocaleString()} - ${jobMaxBudget.toLocaleString()}
                  {formData.budgetType === 'HOURLY' ? '/hr' : ''}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="duration" className="text-base font-semibold text-gray-700">Duration *</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="e.g., 2 weeks, 40 hours"
                className="mt-2"
              />
            </div>
          </div>

          {/* Milestones - Only for Fixed Price */}
          {formData.budgetType === 'FIXED' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-base font-semibold text-gray-700">Milestones (Optional)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addMilestone}
                  className="border-gray-200 text-green-700 hover:bg-green-50 hover:border-green-600"
                >
                  Add Milestone
                </Button>
              </div>

              {milestones.map((milestone, index) => (
                <div key={index} className="border border-gray-100 rounded-xl p-5 mb-4 space-y-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">Milestone {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMilestone(index)}
                      className="rounded-full hover:bg-gray-200"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Title</Label>
                      <Input
                        value={milestone.title}
                        onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                        placeholder="Milestone title"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Amount ($)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={milestone.amount}
                        onChange={(e) => updateMilestone(index, 'amount', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Description</Label>
                    <Textarea
                      value={milestone.description}
                      onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                      placeholder="Describe what will be delivered"
                      rows={2}
                      className="resize-none mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Due Date</Label>
                    <Input
                      type="date"
                      value={milestone.dueDate}
                      onChange={(e) => updateMilestone(index, 'dueDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Terms and Expiration */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="terms" className="text-base font-semibold text-gray-700">Terms & Conditions (Optional)</Label>
              <Textarea
                id="terms"
                value={formData.terms}
                onChange={(e) => handleInputChange('terms', e.target.value)}
                placeholder="Any additional terms, conditions, or special requirements..."
                rows={3}
                className="mt-2 resize-none"
              />
            </div>

            <div>
              <Label htmlFor="expiresAt" className="text-base font-semibold text-gray-700">Offer Expires (Optional)</Label>
              <Input
                id="expiresAt"
                type="datetime-local"
                value={formData.expiresAt}
                onChange={(e) => handleInputChange('expiresAt', e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h4 className="font-semibold mb-4 text-gray-800">Offer Summary</h4>
            <div className="space-y-2 text-base">
              <div className="flex justify-between">
                <span>Budget Type:</span>
                <Badge variant="outline" className="border-green-600 text-green-700 bg-green-50">
                  {formData.budgetType === 'FIXED' ? 'Fixed Price' : 'Hourly Rate'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold text-gray-900">
                  ${formData.amount || '0'} {formData.budgetType === 'HOURLY' && '/hr'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{formData.duration || 'Not specified'}</span>
              </div>
              {milestones.length > 0 && (
                <div className="flex justify-between">
                  <span>Milestones:</span>
                  <span>{milestones.length}</span>
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Actions - Fixed at bottom */}
        <div className="flex justify-end space-x-4 p-8 border-t border-gray-100 flex-shrink-0">
          <Button type="button" variant="outline" onClick={onClose} className="border-gray-200 text-gray-700 hover:bg-gray-50">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white px-8 font-semibold shadow-sm"
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Sending...' : 'Send Offer'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferModal; 