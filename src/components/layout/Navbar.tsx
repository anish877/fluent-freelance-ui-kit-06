
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell, User, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import Dropdown from "../ui/Dropdown";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const userMenuItems = [
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
    { label: "Logout", href: "/login" }
  ];

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

          {/* Desktop Navigation */}
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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </div>
            
            <Dropdown 
              trigger={
                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </div>
              }
              items={userMenuItems}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link to="/jobs" className="text-gray-700 hover:text-teal-600 font-medium">
                Find Work
              </Link>
              <Link to="/talent" className="text-gray-700 hover:text-teal-600 font-medium">
                Find Talent
              </Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-teal-600 font-medium">
                Dashboard
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <Link to="/login">
                  <Button variant="outline" className="w-full mb-2">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
