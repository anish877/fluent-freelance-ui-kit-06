
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

interface DropdownItem {
  label: string;
  href?: string;       // optional, for navigation
  onClick?: () => void; // optional, for actions like logout
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

const Dropdown = ({ trigger, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
         {items.map((item, index) => (
      item.href ? (
        <Link
          key={index}
          to={item.href}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </Link>
      ) : (
        <button
          key={index}
          onClick={() => {
            item.onClick?.();
            setIsOpen(false);
          }}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
          {item.label}
        </button>
      )
    ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
