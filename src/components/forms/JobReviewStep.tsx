
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { JobFormData } from "../../pages/PostJob";

// Extend the interface to include attachmentUrls for EditJob
interface ExtendedJobFormData extends JobFormData {
  attachmentUrls?: string[];
}
import { MapPin, Clock, DollarSign, Users, Calendar, AlertCircle, Eye, EyeOff } from "lucide-react";

interface JobReviewStepProps {
  formData: JobFormData | ExtendedJobFormData;
  updateFormData: (data: Partial<JobFormData | ExtendedJobFormData>) => void;
}

const JobReviewStep = ({ formData }: JobReviewStepProps) => {
  const getBudgetDisplay = () => {
    if (formData.hideBudget) {
      return "Budget hidden from freelancers";
    }
    
    switch (formData.budgetType) {
      case "fixed":
        return `$${formData.minBudget?.toLocaleString() || 0} (Fixed Price)`;
      case "hourly":
        return `$${formData.minBudget || 0} - $${formData.maxBudget || 0}/hour`;
      default:
        return "Not specified";
    }
  };

  const getProjectTypeDisplay = () => {
    const types: { [key: string]: string } = {
      "hourly": "Hourly Rate",
      "fixed": "Fixed Price"
    };
    return types[formData.projectType] || formData.projectType;
  };

  const getExperienceLevelDisplay = () => {
    const levels: { [key: string]: string } = {
      "entry-level": "Entry Level (0-2 years)",
      "intermediate": "Intermediate (2-5 years)",
      "expert": "Expert (5+ years)"
    };
    return levels[formData.experienceLevel] || formData.experienceLevel;
  };

  const getDurationDisplay = () => {
    const durations: { [key: string]: string } = {
      "one-time": "One-time Project",
      "short-term": "Short-term (1-3 months)",
      "ongoing": "Ongoing Work"
    };
    return durations[formData.duration] || formData.duration;
  };

  const getVisibilityDisplay = () => {
    const visibility: { [key: string]: string } = {
      "public": "Public - Anyone can see and apply",
      "invite-only": "Invite Only - Only invited freelancers can apply",
      "private": "Private - Shared via URL only"
    };
    return visibility[formData.visibility] || formData.visibility;
  };

  return (
    <div className="space-y-6">
      {/* Job Preview Card */}
      <Card className="border-2 border-teal-200">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl text-gray-900 mb-2 break-words">
                {formData.title || "Untitled Job"}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{getDurationDisplay()}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{getBudgetDisplay()}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{getExperienceLevelDisplay()}</span>
                </div>
              </div>
            </div>
            {formData.hideBudget && (
              <Badge variant="secondary" className="ml-2 flex-shrink-0">
                <EyeOff className="h-3 w-3 mr-1" />
                Budget Hidden
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{formData.category}</Badge>
              <Badge variant="outline">{getProjectTypeDisplay()}</Badge>
            </div>
            
            <div className="max-h-32 overflow-y-auto">
              <p className="text-gray-700 leading-relaxed break-words">
                {formData.description || "No description provided"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills & Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Skills & Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.skills.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Required Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h4 className="font-medium text-sm mb-1">Experience Level:</h4>
              <p className="text-sm text-gray-600">{getExperienceLevelDisplay()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Project Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Structure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-1">Project Type:</h4>
              <p className="text-sm text-gray-600">{getProjectTypeDisplay()}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-1">Duration:</h4>
              <p className="text-sm text-gray-600">{getDurationDisplay()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget & Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Budget & Visibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-1">Budget:</h4>
            <p className="text-sm text-gray-600">{getBudgetDisplay()}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-1">Visibility:</h4>
            <p className="text-sm text-gray-600">{getVisibilityDisplay()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Attachments */}
      {(formData.attachments && formData.attachments.length > 0) || (formData.attachmentUrls && formData.attachmentUrls.length > 0) ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Attached Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* New files to be uploaded */}
              {formData.attachments && formData.attachments.map((file, index) => (
                <div key={`new-${index}`} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">
                      {file.name.split('.').pop()?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-blue-600">
                      {(file.size / 1024 / 1024).toFixed(2)} MB (New)
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Existing uploaded files */}
              {formData.attachmentUrls && formData.attachmentUrls.map((url, index) => (
                <div key={`existing-${index}`} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-teal-100 rounded flex items-center justify-center">
                    <span className="text-xs font-medium text-teal-600">
                      {url.split('.').pop()?.toUpperCase() || 'FILE'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{url.split('/').pop() || 'attachment'}</p>
                    <p className="text-xs text-gray-500">
                      Already uploaded
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Final Notes */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-medium text-blue-900 mb-2">Ready to Post Your Job?</h3>
            <p className="text-sm text-blue-700">
              Your job will be published and visible to freelancers based on your visibility settings. 
              You can edit or close the job at any time from your dashboard.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobReviewStep;
