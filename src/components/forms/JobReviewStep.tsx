
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { JobFormData } from "../../pages/PostJob";
import { MapPin, Clock, DollarSign, Users, Calendar, AlertCircle } from "lucide-react";

interface JobReviewStepProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const JobReviewStep = ({ formData }: JobReviewStepProps) => {
  const getBudgetDisplay = () => {
    switch (formData.budgetType) {
      case "fixed":
        return `$${formData.budgetAmount?.toLocaleString() || 0} (Fixed Price)`;
      case "hourly":
        return `$${formData.hourlyRateMin || 0} - $${formData.hourlyRateMax || 0}/hour`;
      case "milestone":
        const total = (formData.milestones || []).reduce((sum, m) => sum + m.amount, 0);
        return `$${total.toLocaleString()} (${formData.milestones?.length || 0} milestones)`;
      default:
        return "Not specified";
    }
  };

  const getProjectTypeDisplay = () => {
    const types: { [key: string]: string } = {
      "one-time": "One-time Project",
      "ongoing": "Ongoing Work",
      "contract-to-hire": "Contract to Hire",
      "part-time": "Part-time",
      "full-time": "Full-time"
    };
    return types[formData.projectType] || formData.projectType;
  };

  const getExperienceLevelDisplay = () => {
    const levels: { [key: string]: string } = {
      "entry": "Entry Level (0-2 years)",
      "intermediate": "Intermediate (2-5 years)",
      "expert": "Expert (5+ years)",
      "any": "Any Experience Level"
    };
    return levels[formData.experienceLevel] || formData.experienceLevel;
  };

  return (
    <div className="space-y-6">
      {/* Job Preview Card */}
      <Card className="border-2 border-teal-200">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl text-gray-900 mb-2">
                {formData.title || "Untitled Job"}
              </CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formData.duration}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {getBudgetDisplay()}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {getExperienceLevelDisplay()}
                </div>
              </div>
            </div>
            {formData.isUrgent && (
              <Badge variant="destructive" className="ml-2">
                <AlertCircle className="h-3 w-3 mr-1" />
                Urgent
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Badge variant="outline">{formData.category}</Badge>
              {formData.subcategory && (
                <Badge variant="outline" className="ml-2">{formData.subcategory}</Badge>
              )}
              <Badge variant="outline" className="ml-2">{getProjectTypeDisplay()}</Badge>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              {formData.description || "No description provided"}
            </p>
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
            
            {formData.preferredQualifications.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Preferred Qualifications:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {formData.preferredQualifications.map((qual, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      {qual}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Structure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.objectives.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Objectives:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {formData.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {formData.deliverables.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Expected Deliverables:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {formData.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Budget Breakdown */}
      {formData.budgetType === "milestone" && formData.milestones && formData.milestones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Milestone Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {formData.milestones.map((milestone, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{milestone.title}</h4>
                    <p className="text-xs text-gray-500">{milestone.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">${milestone.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center font-medium">
                <span>Total Project Value:</span>
                <span className="text-lg text-green-600">
                  ${formData.milestones.reduce((sum, m) => sum + m.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Working Arrangements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Working Arrangements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm">Working Hours:</h4>
              <p className="text-sm text-gray-600">{formData.workingHours || "Not specified"}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm">Timezone:</h4>
              <p className="text-sm text-gray-600">{formData.timezone || "Not specified"}</p>
            </div>
          </div>
          
          {formData.communicationPreferences && formData.communicationPreferences.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-2">Communication Preferences:</h4>
              <div className="flex flex-wrap gap-2">
                {formData.communicationPreferences.map(pref => (
                  <Badge key={pref} variant="outline">{pref}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Job Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Job Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm">Visibility:</h4>
              <p className="text-sm text-gray-600 capitalize">{formData.visibility}</p>
            </div>
            {formData.applicationDeadline && (
              <div>
                <h4 className="font-medium text-sm">Application Deadline:</h4>
                <p className="text-sm text-gray-600">
                  {new Date(formData.applicationDeadline).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Final Notes */}
      <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
        <h3 className="font-medium text-teal-900 mb-2">Ready to post your job?</h3>
        <p className="text-sm text-teal-800">
          Once you post this job, it will be visible to freelancers on the platform. You'll start receiving 
          proposals and can begin reviewing candidates. You can edit the job details later if needed.
        </p>
      </div>
    </div>
  );
};

export default JobReviewStep;
