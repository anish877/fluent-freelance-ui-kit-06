
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { JobFormData } from "../../pages/PostJob";

interface JobDescriptionStepProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const JobDescriptionStep = ({ formData, updateFormData }: JobDescriptionStepProps) => {
  const [newObjective, setNewObjective] = useState("");
  const [newDeliverable, setNewDeliverable] = useState("");

  const addObjective = () => {
    if (newObjective.trim()) {
      updateFormData({
        objectives: [...formData.objectives, newObjective.trim()]
      });
      setNewObjective("");
    }
  };

  const removeObjective = (index: number) => {
    updateFormData({
      objectives: formData.objectives.filter((_, i) => i !== index)
    });
  };

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      updateFormData({
        deliverables: [...formData.deliverables, newDeliverable.trim()]
      });
      setNewDeliverable("");
    }
  };

  const removeDeliverable = (index: number) => {
    updateFormData({
      deliverables: formData.deliverables.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8">
      {/* Detailed Description */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Project Description *</Label>
        <Textarea
          placeholder="Provide a comprehensive description of your project. Include:
• What you want to achieve
• Current situation/context
• Specific requirements
• Any constraints or preferences
• Success criteria"
          rows={8}
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          className="min-h-[200px]"
        />
        <p className="text-xs text-gray-500">
          Detailed descriptions receive 3x more quality proposals. Be specific about your needs.
        </p>
      </div>

      {/* Project Objectives */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Project Objectives</Label>
          <p className="text-xs text-gray-500 mt-1">
            List the main goals and objectives for this project
          </p>
        </div>
        
        <div className="space-y-3">
          {formData.objectives.map((objective, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <span className="flex-1 text-sm">{objective}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeObjective(index)}
                className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <div className="flex space-x-2">
            <Input
              placeholder="Add a project objective..."
              value={newObjective}
              onChange={(e) => setNewObjective(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addObjective()}
            />
            <Button onClick={addObjective} variant="outline" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Deliverables */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Expected Deliverables *</Label>
          <p className="text-xs text-gray-500 mt-1">
            What specific outputs do you expect from this project?
          </p>
        </div>
        
        <div className="space-y-3">
          {formData.deliverables.map((deliverable, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <span className="flex-1 text-sm">{deliverable}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeDeliverable(index)}
                className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <div className="flex space-x-2">
            <Input
              placeholder="Add an expected deliverable..."
              value={newDeliverable}
              onChange={(e) => setNewDeliverable(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addDeliverable()}
            />
            <Button onClick={addDeliverable} variant="outline" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {formData.deliverables.length === 0 && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              💡 <strong>Tip:</strong> Clear deliverables help freelancers understand exactly what you need and reduce revisions.
            </p>
          </div>
        )}
      </div>

      {/* Additional Context */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Additional Context & References</Label>
        <Textarea
          placeholder="Share any additional context, references, examples, or inspiration that might help freelancers understand your vision better..."
          rows={4}
          value={formData.additionalNotes}
          onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
        />
      </div>
    </div>
  );
};

export default JobDescriptionStep;
