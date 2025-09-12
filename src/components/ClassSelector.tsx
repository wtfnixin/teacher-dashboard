import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const classes = ['All Classes', 'Class 6A', 'Class 6B', 'Class 7A', 'Class 7B', 'Class 8A', 'Class 8B'];

interface ClassSelectorProps {
  selectedClass: string;
  onClassChange: (className: string) => void;
}

const ClassSelector: React.FC<ClassSelectorProps> = ({ selectedClass, onClassChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 min-w-[160px]"
      >
        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        <span className="font-medium text-gray-900">{selectedClass}</span>
        <ChevronDown className="h-4 w-4 text-gray-600 ml-auto" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-40 animate-in slide-in-from-top-2 duration-200">
          {classes.map((className) => (
            <button
              key={className}
          onClick={() => {
            onClassChange(className);
            setIsOpen(false);
          }}
          className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 ${
            selectedClass === className ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
          }`}
        >
          {className}
        </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassSelector;