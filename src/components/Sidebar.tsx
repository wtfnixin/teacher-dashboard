import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Bell,
  FolderOpen,
  BookOpen,
  Menu,
  X
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from '../WhatsApp Image 2025-09-09 at 10.28.37 PM.jpeg';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'students', label: t('students'), icon: Users },
    { id: 'announcement', label: t('announcement'), icon: Bell },
    { id: 'resources', label: t('resources'), icon: FolderOpen },
    { id: 'homework', label: t('homework'), icon: BookOpen },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="Logo" className="h-8 w-8 rounded-full object-contain" />
          <span className="text-xl font-bold text-gray-900">Gyanika</span>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li 
              key={item.id}
              className="animate-in slide-in-from-left"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-gray-100 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed left-0 top-0 w-64 h-full bg-white z-50 transform transition-transform duration-200 animate-in slide-in-from-left">
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;