
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Building, Users, Calendar, Star, Briefcase, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ClientProfile = () => {
  const { id } = useParams();

  const { data: client, isLoading, error } = useQuery({
    queryKey: ['client', id],
    queryFn: async () => {
      const response = await fetch(`/api/users/client/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch client profile');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !client?.success) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Client Not Found</h2>
              <p className="text-gray-600">The client profile you're looking for doesn't exist or is no longer available.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const clientData = client.data;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={clientData.avatar} alt={`${clientData.firstName} ${clientData.lastName}`} />
                <AvatarFallback className="text-lg">
                  {clientData.firstName?.[0]}{clientData.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {clientData.firstName} {clientData.lastName}
                </h1>
                
                {clientData.companyName && (
                  <div className="flex items-center text-gray-600 mb-2">
                    <Building className="w-4 h-4 mr-1" />
                    <span>{clientData.companyName}</span>
                  </div>
                )}
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  {clientData.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{clientData.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Member since {new Date(clientData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {clientData.verified && (
                  <Badge variant="secondary" className="mb-2">
                    Verified Client
                  </Badge>
                )}
                
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  <span>{clientData.rating || 'No rating'}</span>
                  {clientData.reviewCount && (
                    <span className="ml-1">({clientData.reviewCount} reviews)</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            {clientData.companyDescription && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
                  <p className="text-gray-700 leading-relaxed">{clientData.companyDescription}</p>
                </CardContent>
              </Card>
            )}

            {/* Company Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clientData.industry && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Industry</h3>
                      <p className="text-gray-900">{clientData.industry}</p>
                    </div>
                  )}
                  
                  {clientData.companySize && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Company Size</h3>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-gray-400" />
                        <span className="text-gray-900">{clientData.companySize}</span>
                      </div>
                    </div>
                  )}
                  
                  {clientData.companyWebsite && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Website</h3>
                      <a 
                        href={clientData.companyWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {clientData.companyWebsite}
                      </a>
                    </div>
                  )}
                  
                  {clientData.clientType && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Client Type</h3>
                      <p className="text-gray-900 capitalize">{clientData.clientType.replace('-', ' ')}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Project Preferences */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Preferences</h2>
                
                <div className="space-y-4">
                  {clientData.projectTypes && clientData.projectTypes.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Project Types</h3>
                      <div className="flex flex-wrap gap-2">
                        {clientData.projectTypes.map((type: string, index: number) => (
                          <Badge key={index} variant="outline">{type}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {clientData.preferredSkills && clientData.preferredSkills.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Preferred Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {clientData.preferredSkills.map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {clientData.budgetRange && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Budget Range</h3>
                      <p className="text-gray-900">{clientData.budgetRange}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Stats</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600">Jobs Posted</span>
                    </div>
                    <span className="font-semibold">{clientData._count?.jobsPosted || 0}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600">Reviews Given</span>
                    </div>
                    <span className="font-semibold">{clientData._count?.reviews || 0}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600">Last Active</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {clientData.lastActive || 'Recently'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                
                <div className="space-y-3">
                  {clientData.email && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                      <p className="text-gray-900 break-all">{clientData.email}</p>
                    </div>
                  )}
                  
                  {clientData.phone && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                      <p className="text-gray-900">{clientData.phone}</p>
                    </div>
                  )}
                  
                  {clientData.timezone && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Timezone</h3>
                      <p className="text-gray-900">{clientData.timezone}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
