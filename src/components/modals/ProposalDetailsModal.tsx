
import { X, Calendar, Clock, DollarSign, Users, Star, MapPin, CheckCircle, AlertCircle, FileText, Briefcase, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

interface Proposal {
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

interface ProposalDetailsModalProps {
  proposal: Proposal;
  isOpen: boolean;
  onClose: () => void;
  onViewJobPosting?: (jobId: string) => void;
  jobId?: string;
}

const ProposalDetailsModal = ({ proposal, isOpen, onClose, onViewJobPosting, jobId }: ProposalDetailsModalProps) => {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted": return "bg-green-100 text-green-800 border-green-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      case "interview": return "bg-blue-100 text-blue-800 border-blue-200";
      case "withdrawn": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 relative">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">{proposal.jobTitle}</h2>
            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
              <span>Proposal ID: #{proposal.id}</span>
              <span className="mx-1">•</span>
              <span>Submitted: {formatDate(proposal.submittedDate)}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(proposal.status)}`}>{proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}</Badge>
            <Button variant="ghost" size="icon" onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-700 focus:ring-2 focus:ring-teal-500">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-8 py-8 space-y-8">
          {/* Bid & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="text-xs text-gray-500 font-medium">Your Bid</div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-teal-600" />
                <span className="text-xl font-bold text-gray-900">{proposal.bidAmount}</span>
                <span className="text-xs text-gray-500 font-medium">{proposal.jobType === 'hourly' ? '/hr' : 'total'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-500 font-medium">Timeline</div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-teal-600" />
                <span className="text-lg font-semibold text-gray-900">{proposal.timeline}</span>
              </div>
            </div>
          </div>

          <Separator className="my-2" />

          {/* Status & Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="text-xs text-gray-500 font-medium">Status</div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-base font-semibold text-gray-900 capitalize">{proposal.status}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-500 font-medium">Last Activity</div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-600" />
                <span className="text-base font-semibold text-gray-900">{formatDate(proposal.lastActivity)}</span>
              </div>
            </div>
          </div>

          <Separator className="my-2" />

          {/* Cover Letter */}
          <div>
            <div className="text-xs text-gray-500 font-medium mb-2">Cover Letter</div>

            <div className="bg-gray-50 border border-gray-100 rounded-lg p-5 text-gray-800 text-base leading-relaxed max-h-48 overflow-y-auto shadow-inner">
              {proposal.coverLetter}
            </div>
          </div>

          {/* Attachments */}
          {proposal.attachments && proposal.attachments.length > 0 && (
            <div>
              <div className="text-xs text-gray-500 font-medium mb-2">Attachments ({proposal.attachments.length})</div>
              <div className="space-y-2">
                {proposal.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-teal-100 rounded flex items-center justify-center">
                        <span className="text-xs font-medium text-teal-600">
                          {attachment.split('.').pop()?.toUpperCase() || 'FILE'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {attachment.split('/').pop() || 'attachment'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {attachment.includes('cloudinary') ? 'Cloudinary File' : 'Attachment'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(attachment, '_blank')}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col md:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={onClose} className="min-w-[120px]">
              Close
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                if (onViewJobPosting && jobId) {
                  onViewJobPosting(jobId);
                }
              }}
              className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 min-w-[160px]"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Job Posting
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetailsModal;
