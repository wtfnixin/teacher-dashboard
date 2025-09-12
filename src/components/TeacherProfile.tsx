import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit3, Save, X, Camera } from 'lucide-react';

interface TeacherData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  experience: string;
  qualification: string;
  address: string;
  bio: string;
}

const TeacherProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [teacherData, setTeacherData] = useState<TeacherData>({
    name: 'Mrs. Priya Sharma',
    email: 'priya.sharma@school.edu',
    phone: '+91 98765 43210',
    subject: 'Mathematics',
    experience: '8 years',
    qualification: 'M.Sc Mathematics, B.Ed',
    address: 'Sector 15, Chandigarh, Punjab',
    bio: 'Passionate mathematics teacher with 8 years of experience in making complex concepts simple and engaging for students.'
  });

  const [editData, setEditData] = useState<TeacherData>(teacherData);

  const handleSave = () => {
    setTeacherData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(teacherData);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof TeacherData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Teacher Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <User className="h-12 w-12 text-gray-600" />
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              )}
            </div>
            <div className="text-white">
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-2xl font-bold bg-transparent border-b-2 border-white/30 focus:border-white outline-none text-white placeholder-white/70"
                  placeholder="Teacher Name"
                />
              ) : (
                <h1 className="text-2xl font-bold">{teacherData.name}</h1>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={editData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="text-lg bg-transparent border-b border-white/30 focus:border-white outline-none text-white/90 placeholder-white/70 mt-1"
                  placeholder="Subject"
                />
              ) : (
                <p className="text-lg text-white/90">{teacherData.subject} Teacher</p>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <label className="text-sm text-gray-500">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="block w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{teacherData.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <label className="text-sm text-gray-500">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="block w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{teacherData.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-500" />
                <div className="flex-1">
                  <label className="text-sm text-gray-500">Address</label>
                  {isEditing ? (
                    <textarea
                      value={editData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="block w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-900">{teacherData.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
              
              <div>
                <label className="text-sm text-gray-500">Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{teacherData.experience}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-500">Qualification</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.qualification}
                    onChange={(e) => handleInputChange('qualification', e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{teacherData.qualification}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-500">Bio</label>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-900">{teacherData.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;