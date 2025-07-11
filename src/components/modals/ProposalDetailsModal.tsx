
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{proposal.jobTitle}</h2>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span>Proposal ID: #{proposal.id}</span>
              <span>•</span>
              <span>Submitted: {formatDate(proposal.submittedDate)}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(proposal.status)}`}>
              <span className="capitalize">{proposal.status}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Proposal Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Proposal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Your Bid Amount</div>
                  <div className="font-semibold text-lg text-green-600">{proposal.bidAmount}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Estimated Timeline</div>
                  <div className="font-semibold">{proposal.timeline}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Proposal Status</div>
                  <div className="font-semibold capitalize">{proposal.status}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Submitted Date</div>
                  <div className="font-semibold">{formatDate(proposal.submittedDate)}</div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="text-sm text-gray-600 mb-2">Your Cover Letter</div>
                <div className="bg-gray-50 p-4 rounded-lg text-sm leading-relaxed max-h-32 overflow-y-auto">
                  {proposal.coverLetter}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                console.log('Button clicked! Props:', { onViewJobPosting: !!onViewJobPosting, jobId });
                if (onViewJobPosting && jobId) {
                  console.log('Calling onViewJobPosting with jobId:', jobId);
                  onViewJobPosting(jobId);
                } else {
                  console.log('Missing props:', { onViewJobPosting: !!onViewJobPosting, jobId });
                }
              }}
              className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100"
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
