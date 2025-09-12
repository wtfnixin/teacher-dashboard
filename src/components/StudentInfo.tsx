import React from 'react';
import { User, Mail, Phone, MapPin, ChevronDown, Plus } from 'lucide-react';
import { Student } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Arjun Sharma',
    rollNumber: 'S001',
    class: '6A',
    attendance: 92,
    performance: { math: 85, science: 78, english: 88, overall: 84 },
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Priya Patel',
    rollNumber: 'S002',
    class: '6A',
    attendance: 96,
    performance: { math: 92, science: 89, english: 94, overall: 92 },
    avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Rahul Singh',
    rollNumber: 'S003',
    class: '6A',
    attendance: 88,
    performance: { math: 76, science: 82, english: 79, overall: 79 },
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    rollNumber: 'S004',
    class: '6B',
    attendance: 94,
    performance: { math: 88, science: 85, english: 91, overall: 88 },
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Vikram Kumar',
    rollNumber: 'S005',
    class: '6B',
    attendance: 89,
    performance: { math: 82, science: 79, english: 86, overall: 82 },
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '6',
    name: 'Ananya Reddy',
    rollNumber: 'S006',
    class: '7A',
    attendance: 97,
    performance: { math: 95, science: 92, english: 89, overall: 92 },
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100&h=100&fit=crop&crop=face'
  }
];

const StudentInfo: React.FC = () => {
  const { t } = useLanguage();
  const [selectedClass, setSelectedClass] = React.useState('6A');
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const classes = ['6A', '6B', '7A', '7B', '8A', '8B'];

  // State for students list
  const [students, setStudents] = React.useState(mockStudents);

  // State for modal open
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Form state
  const [formData, setFormData] = React.useState({
    name: '',
    classGrade: '',
    section: '',
    photo: ''
  });

  const filteredStudents = students.filter(student => student.class === selectedClass);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle photo upload and convert to data URL
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.classGrade || !formData.section) {
      alert('Please fill all fields');
      return;
    }
    const newStudent = {
      id: (students.length + 1).toString(),
      name: formData.name,
      rollNumber: `S${(students.length + 1).toString().padStart(3, '0')}`,
      class: formData.classGrade + formData.section,
      attendance: 0,
      performance: { math: 0, science: 0, english: 0, overall: 0 },
      avatar: formData.photo || 'https://via.placeholder.com/100'
    };
    setStudents(prev => [...prev, newStudent]);
    setIsModalOpen(false);
    setFormData({ name: '', classGrade: '', section: '', photo: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{t('students')} Information</h2>
        
        {/* Class Dropdown and Add Student Button */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 min-w-[140px]"
            >
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <span className="font-medium text-gray-900">Class {selectedClass}</span>
              <ChevronDown className="h-4 w-4 text-gray-600 ml-auto" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-40 animate-in slide-in-from-top-2 duration-200">
                {classes.map((className) => (
                  <button
                    key={className}
                    onClick={() => {
                      setSelectedClass(className);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 ${
                      selectedClass === className ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    Class {className}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-all duration-200"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>
      
      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student, index) => (
          <div 
            key={student.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 animate-in slide-in-from-bottom"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-16 h-16 rounded-full object-cover border-3 border-gradient-to-r from-blue-400 to-purple-400"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                <p className="text-sm text-gray-500">Roll: {student.rollNumber}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Attendance */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{t('attendance')}</span>
                  <span className={`text-sm font-semibold ${
                    student.attendance >= 90 ? 'text-green-600' : 
                    student.attendance >= 75 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {student.attendance}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      student.attendance >= 90 ? 'bg-gradient-to-r from-green-400 to-green-600' : 
                      student.attendance >= 75 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                    style={{ width: `${student.attendance}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Overall Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className={`text-sm font-semibold ${
                    student.performance.overall >= 80 ? 'text-blue-600' : 
                    student.performance.overall >= 60 ? 'text-purple-600' : 'text-orange-600'
                  }`}>
                    {student.performance.overall}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      student.performance.overall >= 80 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 
                      student.performance.overall >= 60 ? 'bg-gradient-to-r from-purple-400 to-purple-600' : 'bg-gradient-to-r from-orange-400 to-orange-600'
                    }`}
                    style={{ width: `${student.performance.overall}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Subject Performance */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {Object.entries(student.performance).filter(([key]) => key !== 'overall').map(([subject, score]) => (
                  <div key={subject} className="text-center">
                    <div className="text-xs text-gray-500 capitalize mb-1">{subject}</div>
                    <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      score >= 80 ? 'bg-green-100 text-green-700' : 
                      score >= 60 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {score}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding student */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Student</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="classGrade">Class</label>
                  <select
                    id="classGrade"
                    name="classGrade"
                    value={formData.classGrade}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select class</option>
                    {['6', '7', '8'].map((grade) => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="section">Section</label>
                  <select
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select section</option>
                    {['A', 'B'].map((section) => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="photo">Photo</label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentInfo;