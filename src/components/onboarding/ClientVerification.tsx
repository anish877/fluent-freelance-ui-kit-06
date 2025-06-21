import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { ArrowRight, Shield, CreditCard, Phone, CheckCircle } from "lucide-react";

interface ClientVerificationData {
  phoneNumber?: string;
  phoneVerified?: boolean;
  paymentMethodAdded?: boolean;
  agreedToTerms?: boolean;
  agreedToPrivacy?: boolean;
  agreedToFees?: boolean;
  emailVerified?: boolean;
  [key: string]: string | boolean | undefined;
}

interface ClientVerificationProps {
  onNext: (data: ClientVerificationData) => void;
  data: ClientVerificationData;
}

const ClientVerification = ({ onNext, data }: ClientVerificationProps) => {
  const [formData, setFormData] = useState<ClientVerificationData>({
    phoneNumber: data.phoneNumber || "",
    phoneVerified: data.phoneVerified || false,
    paymentMethodAdded: data.paymentMethodAdded || false,
    agreedToTerms: data.agreedToTerms || false,
    agreedToPrivacy: data.agreedToPrivacy || false,
    agreedToFees: data.agreedToFees || false,
    emailVerified: data.emailVerified || false,
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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Verify Your Account
        </h2>
        <p className="text-gray-600">
          Complete verification to start hiring top freelancers with confidence
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Email Verification */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold">Email Verification</h3>
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
              Verified ✓
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Your email {data.email} has been verified successfully.
          </p>
        </div>

        {/* Phone Verification */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Phone className="h-5 w-5 text-blue-600 mr-2" />
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
              Phone verification builds trust with freelancers and enables direct communication.
            </p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <span className="ml-2 text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
              Optional
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Add a payment method to start hiring immediately. You can also add this later.
          </p>
          
          <div className="space-y-3">
            <Button type="button" variant="outline" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Add Credit Card
            </Button>
            
            <Button type="button" variant="outline" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Connect PayPal
            </Button>
            
            <Button type="button" variant="outline" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Add Bank Account
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-700">
              You can add payment methods later, but having one ready speeds up the hiring process.
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
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> *
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
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> *
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
                  I understand the <a href="#" className="text-blue-600 hover:underline">Payment Processing Fees</a> *
                </Label>
                {errors.agreedToFees && <p className="text-red-500 text-sm">{errors.agreedToFees}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Fee Structure */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold mb-3">FreelanceHub Client Fees</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Payment processing fee:</span>
              <span className="font-medium">2.9% + $0.30</span>
            </div>
            <div className="flex justify-between">
              <span>Platform fee:</span>
              <span className="font-medium">Free for clients</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>You pay only:</span>
                <span className="text-blue-600">Project amount + processing fee</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Example: For a $1,000 project, you pay $1,029 total
          </p>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Complete Setup
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default ClientVerification;
