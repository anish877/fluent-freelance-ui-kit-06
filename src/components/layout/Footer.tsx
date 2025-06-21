
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    "For Clients": [
      "How to Hire",
      "Talent Marketplace", 
      "Project Catalog",
      "Enterprise"
    ],
    "For Talent": [
      "How to Find Work",
      "Direct Contracts",
      "Find Freelance Jobs",
      "Tips & Resources"
    ],
    "Resources": [
      "Help & Support",
      "Success Stories", 
      "Reviews",
      "Resources"
    ],
    "Company": [
      "About Us",
      "Leadership",
      "Careers",
      "Press"
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link 
                      to="#" 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-teal-600 text-white px-3 py-1 rounded-lg font-bold text-xl">
                FL
              </div>
              <span className="ml-2 text-xl font-bold">FreelanceHub</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 FreelanceHub. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
