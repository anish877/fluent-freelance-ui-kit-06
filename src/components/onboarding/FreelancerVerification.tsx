import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { ArrowRight, Shield, Upload, FileText, CreditCard, Phone } from "lucide-react";

interface FreelancerVerificationData {
  phoneNumber?: string;
  phoneVerified?: boolean;
  idDocument?: string;
  idDocumentType?: string;
  addressProof?: string;
  taxInformation?: string;
  agreedToTerms?: boolean;
  agreedToPrivacy?: boolean;
  agreedToFees?: boolean;
  [key: string]: string | boolean | undefined;
}

interface FreelancerVerificationProps {
  onNext: (data: FreelancerVerificationData) => void;
  data: FreelancerVerificationData;
}

const FreelancerVerification = ({ onNext, data }: FreelancerVerificationProps) => {
  const [formData, setFormData] = useState<FreelancerVerificationData>({
    phoneNumber: data.phoneNumber || "",
    phoneVerified: data.phoneVerified || false,
    idDocument: data.idDocument || "",
    idDocumentType: data.idDocumentType || "",
    addressProof: data.addressProof || "",
    taxInformation: data.taxInformation || "",
    agreedToTerms: data.agreedToTerms || false,
    agreedToPrivacy: data.agreedToPrivacy || false,
    agreedToFees: data.agreedToFees || false,
    ...data
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required for verification";
    }
    
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = "You must agree to the Terms of Service";
    }
    
    if (!formData.agreedToPrivacy) {
      newErrors.agreedToPrivacy = "You must agree to the Privacy Policy";
    }
    
    if (!formData.agreedToFees) {
      newErrors.agreedToFees = "You must agree to the Service Fees";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    }
  };

  const handleFileUpload = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, [field]: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <Shield className="h-12 w-12 text-teal-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Verify Your Identity
        </h2>
        <p className="text-gray-600">
          Complete verification to build trust with clients and access all platform features
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Phone Verification */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Phone className="h-5 w-5 text-teal-600 mr-2" />
            <h3 className="text-lg font-semibold">Phone Verification</h3>
          </div>
          
          <div className="max-w-md">
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className={errors.phoneNumber ? "border-red-500" : ""}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            
            <Button 
              type="button" 
              variant="outline" 
              className="mt-2"
              disabled={!formData.phoneNumber}
            >
              Send Verification Code
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <Shield className="h-4 w-4 inline mr-1" />
              Phone verification helps clients trust your profile and improves your visibility in search results.
            </p>
          </div>
        </div>

        {/* Identity Documents (Optional but Recommended) */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 text-teal-600 mr-2" />
            <h3 className="text-lg font-semibold">Identity Documents (Optional)</h3>
            <span className="ml-2 text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Recommended</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Upload identity documents to increase your profile trust score and access premium features.
          </p>
          
          <div className="space-y-4">
            <div>
              <Label>Government-issued ID</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mt-2">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload("idDocument", e)}
                  className="hidden"
                  id="id-document"
                />
                <label htmlFor="id-document" className="flex flex-col items-center cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {formData.idDocument ? "Document uploaded ✓" : "Upload passport, driver's license, or national ID"}
                  </span>
                </label>
              </div>
            </div>
            
            <div>
              <Label>Address Proof</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mt-2">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload("addressProof", e)}
                  className="hidden"
                  id="address-proof"
                />
                <label htmlFor="address-proof" className="flex flex-col items-center cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {formData.addressProof ? "Document uploaded ✓" : "Upload utility bill or bank statement"}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Tax Information */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="h-5 w-5 text-teal-600 mr-2" />
            <h3 className="text-lg font-semibold">Payment Information</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Tax Information (if applicable)</Label>
              <Input
                value={formData.taxInformation}
                onChange={(e) => setFormData({ ...formData, taxInformation: e.target.value })}
                placeholder="Tax ID, EIN, or VAT number"
              />
              <p className="text-sm text-gray-500 mt-1">
                Required for US freelancers earning over $600/year
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-700">
              You'll be able to add payment methods (bank account, PayPal) after completing registration.
            </p>
          </div>
        </div>

        {/* Terms and Agreements */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Terms & Agreements</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: checked })}
                className={errors.agreedToTerms ? "border-red-500" : ""}
              />
              <div>
                <Label htmlFor="terms" className="cursor-pointer">
                  I agree to the <a href="#" className="text-teal-600 hover:underline">Terms of Service</a> *
                </Label>
                {errors.agreedToTerms && <p className="text-red-500 text-sm">{errors.agreedToTerms}</p>}
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacy"
                checked={formData.agreedToPrivacy}
                onCheckedChange={(checked) => setFormData({ ...formData, agreedToPrivacy: checked })}
                className={errors.agreedToPrivacy ? "border-red-500" : ""}
              />
              <div>
                <Label htmlFor="privacy" className="cursor-pointer">
                  I agree to the <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a> *
                </Label>
                {errors.agreedToPrivacy && <p className="text-red-500 text-sm">{errors.agreedToPrivacy}</p>}
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox
                id="fees"
                checked={formData.agreedToFees}
                onCheckedChange={(checked) => setFormData({ ...formData, agreedToFees: checked })}
                className={errors.agreedToFees ? "border-red-500" : ""}
              />
              <div>
                <Label htmlFor="fees" className="cursor-pointer">
                  I understand and agree to the <a href="#" className="text-teal-600 hover:underline">Service Fees</a> (10% platform fee) *
                </Label>
                {errors.agreedToFees && <p className="text-red-500 text-sm">{errors.agreedToFees}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Service Fees Breakdown */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold mb-3">FreelanceHub Service Fees</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Platform fee (deducted from earnings):</span>
              <span className="font-medium">10%</span>
            </div>
            <div className="flex justify-between">
              <span>Payment processing:</span>
              <span className="font-medium">2.9% + $0.30</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>You keep:</span>
                <span className="text-green-600">~87% of project value</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Example: On a $1,000 project, you receive $870 after all fees
          </p>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Complete Verification
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default FreelancerVerification;
