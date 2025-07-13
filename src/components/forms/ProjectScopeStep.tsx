import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { JobFormData } from "../../pages/PostJob";

interface ProjectScopeStepProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const ProjectScopeStep = ({ formData, updateFormData }: ProjectScopeStepProps) => {
  return (
    <div className="space-y-6">
      {/* Experience Level */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Experience Level *</Label>
          <p className="text-xs text-gray-500 mt-1">
            What level of expertise do you need for this project?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              value: "entry-level",
              title: "Entry Level",
              description: "0-2 years experience",
              icon: "🌱"
            },
            {
              value: "intermediate",
              title: "Intermediate",
              description: "2-5 years experience",
              icon: "🚀"
            },
            {
              value: "expert",
              title: "Expert",
              description: "5+ years experience",
              icon: "⭐"
            }
          ].map(option => (
            <Card 
              key={option.value}
              className={`cursor-pointer transition-all ${
                formData.experienceLevel === option.value 
                  ? 'ring-2 ring-teal-500 bg-teal-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => updateFormData({ experienceLevel: option.value })}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{option.icon}</div>
                <h3 className="font-medium text-sm">{option.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{option.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Type */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Project Type *</Label>
          <p className="text-xs text-gray-500 mt-1">
            How would you like to structure the payment for this project?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              value: "hourly",
              title: "Hourly Rate",
              description: "Pay per hour worked",
              icon: "⏰"
            },
            {
              value: "fixed",
              title: "Fixed Price",
              description: "Pay a set amount for the entire project",
              icon: "💰"
            }
          ].map(option => (
            <Card 
              key={option.value}
              className={`cursor-pointer transition-all ${
                formData.projectType === option.value 
                  ? 'ring-2 ring-teal-500 bg-teal-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => updateFormData({ projectType: option.value })}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{option.icon}</div>
                <h3 className="font-medium text-sm">{option.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{option.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Project Duration *</Label>
        <Select value={formData.duration} onValueChange={(value) => updateFormData({ duration: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select project duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="one-time">One-time Project</SelectItem>
            <SelectItem value="short-term">Short-term (1-3 months)</SelectItem>
            <SelectItem value="ongoing">Ongoing Work</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">
          How long do you expect this project to take?
        </p>
      </div>
    </div>
  );
};

export default ProjectScopeStep; 