
import { Calendar, Clock, DollarSign, Eye, MessageCircle, Users, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
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

interface ProposalCardProps {
  proposal: Proposal;
  onViewDetails: (proposal: Proposal) => void;
}

const ProposalCard = ({ proposal, onViewDetails }: ProposalCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "interview":
        return <Calendar className="h-4 w-4" />;
      case "withdrawn":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "interview":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "withdrawn":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-teal-600 cursor-pointer">
              {proposal.jobTitle}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span className="font-medium">{proposal.client.name}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{proposal.client.rating}</span>
              </div>
              <span className="mx-2">•</span>
              <span>{proposal.client.jobsPosted} jobs posted</span>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">{proposal.coverLetter}</p>
          </div>
          <div className="ml-4 flex flex-col items-end">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(proposal.status)}`}>
              {getStatusIcon(proposal.status)}
              <span className="ml-1 capitalize">{proposal.status}</span>
            </div>
            {proposal.interviewScheduled && (
              <div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                Interview: {proposal.interviewScheduled.date} at {proposal.interviewScheduled.time}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          {proposal.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4 mr-2" />
            <div>
              <div className="font-medium text-gray-900">{proposal.bidAmount}</div>
              <div className="text-xs">Your bid</div>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <div>
              <div className="font-medium text-gray-900">{proposal.timeline}</div>
              <div className="text-xs">Timeline</div>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <div>
              <div className="font-medium text-gray-900">{proposal.responses}</div>
              <div className="text-xs">Proposals</div>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <div>
              <div className="font-medium text-gray-900">{formatDate(proposal.submittedDate)}</div>
              <div className="text-xs">Submitted</div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Last activity: {proposal.lastActivity}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails(proposal)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              View Details
            </Button>
            {proposal.status === "pending" && (
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Message Client
              </Button>
            )}
            {proposal.status === "interview" && (
              <Button size="sm" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Join Interview
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProposalCard;
