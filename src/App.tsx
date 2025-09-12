
import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ClassSelector from './components/ClassSelector';
import QuickActions from './components/QuickActions';
import Announcement from './components/Announcement';
import ResourceManager from './components/ResourceManager';
import HomeworkManager from './components/HomeworkManager';
import StudentInfo from './components/StudentInfo';
import TeacherProfile from './components/TeacherProfile';
import { Users, BarChart3, TrendingUp, BookOpen } from 'lucide-react';
import { ResourceProvider } from './contexts/ResourceContext';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleQuickActionClick = (actionId: string) => {
    switch (actionId) {
      case 'add-student':
        setActiveTab('students');
        break;
      case 'create-assignment':
        setActiveTab('homework');
        break;
      case 'upload-resource':
        setActiveTab('resources');
        break;
      case 'add-announcement':
        setActiveTab('announcement');
        break;
      default:
        break;
    }
  };

  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  const Overview = () => {
    // Mock announcements data for recent announcements by other teachers
    const recentAnnouncements = [
      {
        id: '1',
        className: 'Class 5A',
        text: 'Parent-teacher meeting scheduled for next Friday.',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        className: 'Class 6B',
        text: 'Science project submissions due next Monday.',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: '3',
        className: 'Class 7C',
        text: 'Field trip planned for next month.',
        timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
      },
    ];

    return (
      <div className="space-y-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Mrs. Sharma!</h1>
            <p className="text-gray-600 mt-1">Here's what's happening in your classes today.</p>
          </div>
        </div>

        {/* Quick Actions Only */}
        <div className="px-4">
          <QuickActions onActionClick={handleQuickActionClick} />
        </div>

        {/* Recent Announcements by Other Teachers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden px-6 py-4 mx-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Announcements</h2>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-blue-600">{announcement.className}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(announcement.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{announcement.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentInfo />;
      case 'announcement':
        return <Announcement />;
      case 'resources':
        return <ResourceManager />;
      case 'homework':
        return <HomeworkManager />;
      case 'profile':
        return <TeacherProfile />;
      default:
        return <Overview />;
    }
  };
  
  return (
    <LanguageProvider>
      <ResourceProvider>
        <div className="min-h-screen bg-gray-50 hero">
          <div className="flex">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="flex-1 flex flex-col min-h-screen">
              <Header onProfileClick={handleProfileClick} />
              
              <main className="flex-1 p-6 lg:ml-0 ml-0">
                <div className="w-full mx-auto">
                  {renderContent()}
                </div>
              </main>
            </div>
          </div>
        </div>
      </ResourceProvider>
    </LanguageProvider>
  );
}

export default App;
