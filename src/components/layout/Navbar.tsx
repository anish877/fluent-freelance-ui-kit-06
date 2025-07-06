import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell, User, ChevronDown, LogOut, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import Dropdown from "../ui/Dropdown";
import { useAuth } from "@/hooks/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated, isLoading } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const userMenuItems = [
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
    { 
      label: isLoggingOut ? "Logging out..." : "Logout", 
      onClick: handleLogout,
      icon: isLoggingOut ? Loader2 : LogOut,
      disabled: isLoggingOut
    }
  ];

  // Show loading state while auth is being determined
  if (isLoading) {
    return (
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <div className="bg-teal-600 text-white px-3 py-1 rounded-lg font-bold text-xl">
                FL
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">FreelanceHub</span>
            </Link>
            <div className="flex items-center">
              <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-teal-600 text-white px-3 py-1 rounded-lg font-bold text-xl">
              FL
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">FreelanceHub</span>
          </Link>

          {/* Desktop Navigation - Only show for authenticated users */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/jobs" 
                className={`font-medium transition-colors ${
                  isActive('/jobs') ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                Find Work
              </Link>
              <Link 
                to="/talent" 
                className={`font-medium transition-colors ${
                  isActive('/talent') ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                Find Talent
              </Link>
              <Link 
                to="/dashboard" 
                className={`font-medium transition-colors ${
                  isActive('/dashboard') ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                Dashboard
              </Link>
            </div>
          )}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </div>
                
                {/* User Menu */}
                <Dropdown 
                  trigger={
                    <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                        {user?.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.firstName || "User"} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div className="hidden lg:block text-left">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.firstName || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.email}
                        </p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-600" />
                    </div>
                  }
                  items={userMenuItems}
                />

                {/* Logout Loading Overlay */}
                {isLoggingOut && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                    <div className="flex items-center space-x-2 text-teal-600">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-sm font-medium">Logging out...</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Auth Buttons for Non-authenticated Users */
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="font-medium">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="font-medium">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              disabled={isLoggingOut}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center space-x-3 px-2 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.firstName || "User"} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {user?.firstName || "User"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <Link 
                    to="/jobs" 
                    className="text-gray-700 hover:text-teal-600 font-medium px-2 py-1 rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Find Work
                  </Link>
                  <Link 
                    to="/talent" 
                    className="text-gray-700 hover:text-teal-600 font-medium px-2 py-1 rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Find Talent
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-teal-600 font-medium px-2 py-1 rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  {/* User Actions */}
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <Link 
                      to="/profile" 
                      className="block text-gray-700 hover:text-teal-600 font-medium px-2 py-1 rounded transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="block text-gray-700 hover:text-teal-600 font-medium px-2 py-1 rounded transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      disabled={isLoggingOut}
                      className="flex items-center space-x-2 w-full text-left text-gray-700 hover:text-red-600 font-medium px-2 py-1 rounded transition-colors disabled:opacity-50"
                    >
                      {isLoggingOut ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Logging out...</span>
                        </>
                      ) : (
                        <>
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                /* Auth Buttons for Mobile */
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Global Logout Loading Overlay */}
        {isLoggingOut && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
              <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
              <span className="text-lg font-medium text-gray-900">Logging out...</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;