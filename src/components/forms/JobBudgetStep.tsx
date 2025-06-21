import { useState } from "react";
import { Plus, X, DollarSign } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { JobFormData } from "../../pages/PostJob";

interface JobBudgetStepProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const JobBudgetStep = ({ formData, updateFormData }: JobBudgetStepProps) => {
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    amount: 0,
    description: ""
  });

  const addMilestone = () => {
    if (newMilestone.title.trim() && newMilestone.amount > 0) {
      const milestones = formData.milestones || [];
      updateFormData({
        milestones: [...milestones, newMilestone]
      });
      setNewMilestone({ title: "", amount: 0, description: "" });
    }
  };

  const removeMilestone = (index: number) => {
    const milestones = formData.milestones || [];
    updateFormData({
      milestones: milestones.filter((_, i) => i !== index)
    });
  };

  const totalMilestoneAmount = (formData.milestones || []).reduce((sum, milestone) => sum + milestone.amount, 0);

  return (
    <div className="space-y-8">
      {/* Budget Type */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Budget Type *</Label>
          <p className="text-xs text-gray-500 mt-1">
            How would you like to structure the payment for this project?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              value: "fixed",
              title: "Fixed Price",
              description: "Pay a set amount for the entire project",
              icon: "💰"
            },
            {
              value: "hourly",
              title: "Hourly Rate",
              description: "Pay per hour worked",
              icon: "⏰"
            },
            {
              value: "milestone",
              title: "Milestone-based",
              description: "Pay based on completed milestones",
              icon: "🎯"
            }
          ].map(option => (
            <Card 
              key={option.value}
              className={`cursor-pointer transition-all ${
                formData.budgetType === option.value 
                  ? 'ring-2 ring-teal-500 bg-teal-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => updateFormData({ budgetType: option.value })}
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

      {/* Budget Details */}
      {formData.budgetType === "fixed" && (
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Fixed Budget Amount *</Label>
            <div className="relative mt-2">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                placeholder="5000"
                value={formData.budgetAmount || ""}
                onChange={(e) => updateFormData({ budgetAmount: parseInt(e.target.value) || 0 })}
                className="pl-9"
              />
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Projects with clear budgets receive 50% more proposals. Consider your project scope and market rates.
            </p>
          </div>
        </div>
      )}

      {formData.budgetType === "hourly" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Minimum Hourly Rate *</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="number"
                  placeholder="25"
                  value={formData.hourlyRateMin || ""}
                  onChange={(e) => updateFormData({ hourlyRateMin: parseInt(e.target.value) || 0 })}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Maximum Hourly Rate *</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="number"
                  placeholder="75"
                  value={formData.hourlyRateMax || ""}
                  onChange={(e) => updateFormData({ hourlyRateMax: parseInt(e.target.value) || 0 })}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Estimated Hours</Label>
            <Input
              type="number"
              placeholder="40"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              This helps freelancers understand the project scope
            </p>
          </div>
        </div>
      )}

      {formData.budgetType === "milestone" && (
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium">Project Milestones</Label>
            <p className="text-xs text-gray-500 mt-1">
              Break down your project into milestones with specific payments
            </p>
          </div>

          {/* Existing Milestones */}
          {(formData.milestones || []).length > 0 && (
            <div className="space-y-3">
              {formData.milestones?.map((milestone, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{milestone.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{milestone.description}</p>
                        <p className="text-sm font-medium text-green-600 mt-2">${milestone.amount}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMilestone(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">
                  Total Project Value: <span className="text-green-600">${totalMilestoneAmount}</span>
                </p>
              </div>
            </div>
          )}

          {/* Add New Milestone */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Add Milestone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Milestone Title</Label>
                <Input
                  placeholder="e.g., Design Mockups Completed"
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div>
                <Label className="text-sm">Description</Label>
                <Input
                  placeholder="Brief description of what needs to be completed"
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <div>
                <Label className="text-sm">Payment Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="1000"
                    value={newMilestone.amount || ""}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <Button onClick={addMilestone} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Milestone
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Additional Options */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="urgent"
            checked={formData.isUrgent}
            onCheckedChange={(checked) => updateFormData({ isUrgent: checked as boolean })}
          />
          <Label htmlFor="urgent" className="text-sm">
            This is an urgent project (may increase visibility but expect higher rates)
          </Label>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Job Visibility</Label>
          <Select value={formData.visibility} onValueChange={(value) => updateFormData({ visibility: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public - Anyone can apply</SelectItem>
              <SelectItem value="invite-only">Invite Only - You invite specific freelancers</SelectItem>
              <SelectItem value="private">Private - Hidden from search, only accessible via link</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Application Deadline (Optional)</Label>
          <Input
            type="date"
            value={formData.applicationDeadline || ""}
            onChange={(e) => updateFormData({ applicationDeadline: e.target.value })}
          />
          <p className="text-xs text-gray-500">
            Set a deadline for when you want to stop accepting applications
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobBudgetStep;
