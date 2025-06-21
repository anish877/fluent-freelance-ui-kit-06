
import { X, Calendar, Clock, DollarSign, Users, Star, MapPin, CheckCircle, AlertCircle } from "lucide-react";
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
}

const ProposalDetailsModal = ({ proposal, isOpen, onClose }: ProposalDetailsModalProps) => {
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
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{proposal.client.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {proposal.client.rating} rating
                    </div>
                    <span>•</span>
                    <span>{proposal.client.jobsPosted} jobs posted</span>
                  </div>
                </div>
                <Button variant="outline">View Client Profile</Button>
              </div>
            </CardContent>
          </Card>

          {/* Proposal Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Proposal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Your Bid</div>
                    <div className="font-semibold text-lg">{proposal.bidAmount}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Timeline</div>
                    <div className="font-semibold">{proposal.timeline}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">Cover Letter</div>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm">
                    {proposal.coverLetter}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Job Budget</div>
                    <div className="font-semibold">{proposal.jobBudget}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Job Type</div>
                    <div className="font-semibold capitalize">{proposal.jobType}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Competition</div>
                  <div className="font-semibold">{proposal.responses} proposals submitted</div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">Required Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {proposal.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interview Information */}
          {proposal.interviewScheduled && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Calendar className="h-5 w-5" />
                  Interview Scheduled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-blue-900">
                      {proposal.interviewScheduled.date} at {proposal.interviewScheduled.time}
                    </div>
                    <div className="text-sm text-blue-700 mt-1">
                      You'll receive a meeting link 15 minutes before the interview
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Join Interview
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status-specific Information */}
          {proposal.status === "accepted" && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-900">Congratulations! Your proposal was accepted</div>
                    <div className="text-sm text-green-700">The client will contact you shortly to discuss project details</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {proposal.status === "rejected" && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                  <div>
                    <div className="font-semibold text-red-900">This proposal was not selected</div>
                    <div className="text-sm text-red-700">Don't worry! Keep applying to similar projects to increase your chances</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Proposal submitted</div>
                    <div className="text-sm text-gray-600">{formatDate(proposal.submittedDate)}</div>
                  </div>
                </div>
                {proposal.status === "interview" && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium">Interview scheduled</div>
                      <div className="text-sm text-gray-600">Client wants to discuss your proposal</div>
                    </div>
                  </div>
                )}
                {proposal.status === "accepted" && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium">Proposal accepted</div>
                      <div className="text-sm text-gray-600">You got the job! Time to get started</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-500">
              Last activity: {proposal.lastActivity}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {proposal.status === "pending" && (
                <>
                  <Button variant="outline">Edit Proposal</Button>
                  <Button variant="destructive">Withdraw Proposal</Button>
                </>
              )}
              {proposal.status === "interview" && (
                <Button>Join Interview</Button>
              )}
              {(proposal.status === "accepted" || proposal.status === "interview") && (
                <Button variant="outline">Message Client</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetailsModal;
