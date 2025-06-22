import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { User, Briefcase, ArrowRight, Star, TrendingUp, Shield, Globe } from "lucide-react";

interface UserTypeSelectionProps {
  onNext: (type: "freelancer" | "client") => void;
}

const UserTypeSelection = ({ onNext }: UserTypeSelectionProps) => {
  const [selectedType, setSelectedType] = useState<"freelancer" | "client" | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Join as a freelancer or hire talent
        </h2>
        <p className="text-lg text-gray-600">
          Choose how you want to use FreelanceHub
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Freelancer Option */}
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
            selectedType === "freelancer" 
              ? "ring-2 ring-teal-500 shadow-lg" 
              : "hover:shadow-md"
          }`}
          onClick={() => setSelectedType("freelancer")}
        >
          <CardContent className="p-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                I'm a freelancer, looking for work
              </h3>
              <p className="text-gray-600 mb-6">
                Find great projects to work on and build your career
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-500 mr-2" />
                  Build your reputation with client reviews
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                  Set your own rates and work schedule
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-blue-500 mr-2" />
                  Secure payments and dispute protection
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Globe className="h-4 w-4 text-purple-500 mr-2" />
                  Work with clients worldwide
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Option */}
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
            selectedType === "client" 
              ? "ring-2 ring-teal-500 shadow-lg" 
              : "hover:shadow-md"
          }`}
          onClick={() => setSelectedType("client")}
        >
          <CardContent className="p-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                I'm a client, hiring for a project
              </h3>
              <p className="text-gray-600 mb-6">
                Find talented freelancers to bring your projects to life
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 text-teal-500 mr-2" />
                  Access to 45,000+ verified freelancers
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-blue-500 mr-2" />
                  Secure milestone-based payments
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-500 mr-2" />
                  Review portfolios and ratings
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                  Scale your team as needed
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button 
          onClick={() => selectedType && onNext(selectedType)}
          disabled={!selectedType}
          size="lg"
          className="px-8 py-3"
        >
          {selectedType === "freelancer" ? "Apply as Freelancer" : "Join as Client"}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        {selectedType && (
          <p className="text-sm text-gray-500 mt-4">
            {selectedType === "freelancer" 
              ? "Create your freelancer profile and start finding work"
              : "Set up your client account and start hiring talent"
            }
          </p>
        )}
      </div>
    </div>
  );
};

export default UserTypeSelection;
