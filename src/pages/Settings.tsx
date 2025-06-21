
import { useState } from "react";
import { Save, Bell, Shield, CreditCard, User, Globe, Eye, Mail, Smartphone } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";

const Settings = () => {
  const [settings, setSettings] = useState({
    profile: {
      firstName: "Alex",
      lastName: "Thompson",
      email: "alex.thompson@example.com",
      phone: "+1 (555) 123-4567",
      location: "Austin, Texas, USA",
      timezone: "Central Standard Time",
      language: "English",
      currency: "USD"
    },
    notifications: {
      emailNewJobs: true,
      emailMessages: true,
      emailPayments: true,
      emailMarketing: false,
      pushNewJobs: true,
      pushMessages: true,
      pushPayments: true,
      smsImportant: false
    },
    privacy: {
      profileVisibility: "public",
      showEarnings: false,
      showLocation: true,
      allowSearchEngines: true,
      showOnlineStatus: true
    },
    security: {
      twoFactorEnabled: false,
      loginAlerts: true,
      dataDownload: false
    },
    billing: {
      paymentMethod: "PayPal",
      taxId: "",
      billingAddress: "123 Main St, Austin, TX 78701"
    }
  });

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings:`, settings[section as keyof typeof settings]);
    // Here you would typically make an API call
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account preferences and settings</p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={settings.profile.firstName}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, firstName: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={settings.profile.lastName}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, lastName: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={settings.profile.phone}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, phone: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={settings.profile.location}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, location: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select
                      value={settings.profile.timezone}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, timezone: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option>Central Standard Time</option>
                      <option>Eastern Standard Time</option>
                      <option>Pacific Standard Time</option>
                      <option>Mountain Standard Time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      value={settings.profile.currency}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, currency: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                    </select>
                  </div>
                </div>

                <Button onClick={() => handleSave('profile')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'emailNewJobs', label: 'New job matches', description: 'Get notified when jobs match your skills' },
                    { key: 'emailMessages', label: 'Messages', description: 'New messages from clients' },
                    { key: 'emailPayments', label: 'Payments', description: 'Payment confirmations and invoices' },
                    { key: 'emailMarketing', label: 'Marketing emails', description: 'Tips, news, and feature updates' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                          onChange={(e) => setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              [item.key]: e.target.checked
                            }
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Push Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'pushNewJobs', label: 'New job matches', description: 'Push notifications for relevant jobs' },
                    { key: 'pushMessages', label: 'Messages', description: 'Instant message notifications' },
                    { key: 'pushPayments', label: 'Payments', description: 'Payment status updates' },
                    { key: 'smsImportant', label: 'SMS for important updates', description: 'Critical account notifications via SMS' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                          onChange={(e) => setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              [item.key]: e.target.checked
                            }
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Button onClick={() => handleSave('notifications')}>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Preferences
              </Button>
            </div>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Visibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Visibility
                  </label>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, profileVisibility: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="public">Public</option>
                    <option value="freelancehub-only">FreelanceHub Users Only</option>
                    <option value="private">Private</option>
                  </select>
                  <p className="text-sm text-gray-600 mt-1">
                    Control who can see your profile information
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  {[
                    { key: 'showEarnings', label: 'Show earnings on profile', description: 'Display total earnings to potential clients' },
                    { key: 'showLocation', label: 'Show location', description: 'Display your location on your profile' },
                    { key: 'allowSearchEngines', label: 'Allow search engines', description: 'Let search engines index your profile' },
                    { key: 'showOnlineStatus', label: 'Show online status', description: 'Display when you\'re online to clients' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.privacy[item.key as keyof typeof settings.privacy]}
                          onChange={(e) => setSettings({
                            ...settings,
                            privacy: {
                              ...settings.privacy,
                              [item.key]: e.target.checked
                            }
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <Button onClick={() => handleSave('privacy')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {settings.security.twoFactorEnabled ? (
                        <Badge variant="default">Enabled</Badge>
                      ) : (
                        <Badge variant="destructive">Disabled</Badge>
                      )}
                      <Button variant="outline" size="sm">
                        {settings.security.twoFactorEnabled ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="font-medium mb-2">Change Password</div>
                    <p className="text-sm text-gray-600 mb-4">Update your password regularly to keep your account secure</p>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Login Alerts</div>
                      <div className="text-sm text-gray-600">Get notified of unusual login activity</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.loginAlerts}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, loginAlerts: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>

                  <Separator />

                  <div>
                    <div className="font-medium mb-2">Download Your Data</div>
                    <p className="text-sm text-gray-600 mb-4">Download a copy of your account data and activity</p>
                    <Button variant="outline">Request Data Download</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium mb-2">Deactivate Account</div>
                      <p className="text-sm text-gray-600 mb-4">Temporarily disable your account. You can reactivate it anytime.</p>
                      <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                        Deactivate Account
                      </Button>
                    </div>
                    <Separator />
                    <div>
                      <div className="font-medium mb-2 text-red-600">Delete Account</div>
                      <p className="text-sm text-gray-600 mb-4">Permanently delete your account. This action cannot be undone.</p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Payment Method
                    </label>
                    <select
                      value={settings.billing.paymentMethod}
                      onChange={(e) => setSettings({
                        ...settings,
                        billing: { ...settings.billing, paymentMethod: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="PayPal">PayPal</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Stripe">Stripe</option>
                      <option value="Wire Transfer">Wire Transfer</option>
                    </select>
                  </div>

                  <Button variant="outline">Add Payment Method</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax ID / SSN
                    </label>
                    <input
                      type="text"
                      value={settings.billing.taxId}
                      onChange={(e) => setSettings({
                        ...settings,
                        billing: { ...settings.billing, taxId: e.target.value }
                      })}
                      placeholder="Enter your tax identification number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Billing Address
                    </label>
                    <textarea
                      value={settings.billing.billingAddress}
                      onChange={(e) => setSettings({
                        ...settings,
                        billing: { ...settings.billing, billingAddress: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Service Fee - December 2024</div>
                        <div className="text-sm text-gray-600">Project: E-commerce Platform</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">$45.00</div>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Service Fee - November 2024</div>
                        <div className="text-sm text-gray-600">Project: SaaS Dashboard</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">$32.50</div>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={() => handleSave('billing')}>
                <Save className="h-4 w-4 mr-2" />
                Save Billing Information
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
