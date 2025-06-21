
import { Link } from "react-router-dom";
import { MapPin, Clock, DollarSign, Star, Users } from "lucide-react";
import { Badge } from "../ui/badge";

interface Job {
  id: number;
  title: string;
  description: string;
  budget: string;
  duration: string;
  skills: string[];
  client: {
    name: string;
    rating: number;
    jobsPosted: number;
    location: string;
  };
  postedTime: string;
  proposals: number;
}

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link 
            to={`/jobs/${job.id}`}
            className="text-xl font-semibold text-gray-900 hover:text-teal-600 transition-colors"
          >
            {job.title}
          </Link>
          <p className="text-gray-600 mt-2 line-clamp-2">{job.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill, index) => (
          <Badge key={index} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1" />
          {job.budget}
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {job.duration}
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {job.client.location}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <div>
            <p className="font-medium text-gray-900">{job.client.name}</p>
            <div className="flex items-center text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              {job.client.rating}
              <span className="mx-2">•</span>
              {job.client.jobsPosted} jobs posted
            </div>
          </div>
        </div>
        
        <div className="text-right text-sm text-gray-600">
          <p>{job.postedTime}</p>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {job.proposals} proposals
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
