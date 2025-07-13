import { useState } from "react";
import { DollarSign, Eye, EyeOff, Upload, X } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { JobFormData } from "../../pages/PostJob";

interface BudgetVisibilityStepProps {
  formData: JobFormData;
  updateFormData: (data: Partial<JobFormData>) => void;
}

const BudgetVisibilityStep = ({ formData, updateFormData }: BudgetVisibilityStepProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
    updateFormData({ attachments: [...(formData.attachments || []), ...files] });
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    updateFormData({ attachments: newFiles });
  };

  return (
    <div className="space-y-6">
      {/* Budget Settings */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Budget Settings</Label>
          <p className="text-xs text-gray-500 mt-1">
            Set your budget range and visibility preferences
          </p>
        </div>

        {formData.projectType === "hourly" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Minimum Hourly Rate *</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="number"
                  placeholder="25"
                  value={formData.minBudget || ""}
                  onChange={(e) => updateFormData({ minBudget: parseFloat(e.target.value) || 0 })}
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
                  value={formData.maxBudget || ""}
                  onChange={(e) => updateFormData({ maxBudget: parseFloat(e.target.value) || 0 })}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        )}

        {formData.projectType === "fixed" && (
          <div>
            <Label className="text-sm font-medium">Fixed Budget Amount *</Label>
            <div className="relative mt-2">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                placeholder="5000"
                value={formData.minBudget || ""}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  updateFormData({ minBudget: value, maxBudget: value });
                }}
                className="pl-9"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Total project budget in USD
            </p>
          </div>
        )}

        {/* Hide Budget Option */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hideBudget"
            checked={formData.hideBudget}
            onCheckedChange={(checked) => updateFormData({ hideBudget: checked as boolean })}
          />
          <Label htmlFor="hideBudget" className="text-sm">
            Hide budget from freelancers
          </Label>
        </div>
        <p className="text-xs text-gray-500">
          When enabled, freelancers won't see your budget and will propose their own rates
        </p>
      </div>

      {/* Job Visibility */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Job Visibility *</Label>
          <p className="text-xs text-gray-500 mt-1">
            Control who can see and apply to your job
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              value: "public",
              title: "Public",
              description: "Anyone can see and apply",
              icon: "🌍"
            },
            {
              value: "invite-only",
              title: "Invite Only",
              description: "Only invited freelancers can apply",
              icon: "📧"
            },
            {
              value: "private",
              title: "Private",
              description: "Shared via URL only",
              icon: "🔒"
            }
          ].map(option => (
            <Card 
              key={option.value}
              className={`cursor-pointer transition-all ${
                formData.visibility === option.value 
                  ? 'ring-2 ring-teal-500 bg-teal-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => updateFormData({ visibility: option.value as any })}
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

      {/* File Attachments */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Attach Files (Optional)</Label>
          <p className="text-xs text-gray-500 mt-1">
            Upload project briefs, mockups, or reference materials
          </p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Choose Files
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              PDF, DOC, TXT, JPG, PNG up to 10MB each
            </p>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Selected Files</Label>
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-teal-100 rounded flex items-center justify-center">
                    <span className="text-xs font-medium text-teal-600">
                      {file.name.split('.').pop()?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetVisibilityStep; 