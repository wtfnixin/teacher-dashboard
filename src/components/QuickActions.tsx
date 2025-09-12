import React from 'react';
import { 
  Plus, 
  Upload, 
  Calendar, 
  Users, 
  BookOpen, 
  BarChart3,
  Clock,
  FileText
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  hoverColor: string;
}

interface QuickActionsProps {
  onActionClick: (actionId: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const { t } = useLanguage();

  const quickActions: QuickAction[] = [
    {
      id: 'add-student',
      title: 'View Student',
      description: 'Register new student',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'create-assignment',
      title: 'Create Assignment',
      description: 'Add new homework',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100'
    },
    {
      id: 'upload-resource',
      title: 'Upload Resource',
      description: 'Share teaching materials',
      icon: Upload,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100'
    },
    {
      id: 'add-announcement',
      title: 'Add Announcement',
      description: 'Add new announcement',
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      hoverColor: 'hover:bg-indigo-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <p className="text-sm text-gray-600 mt-1">Frequently used tasks and shortcuts</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <button
              key={action.id}
              onClick={() => onActionClick(action.id)}
              className={`p-6 rounded-xl border border-gray-100 ${action.bgColor} ${action.hoverColor} transition-all duration-200 hover:shadow-md hover:scale-105 animate-in slide-in-from-bottom group min-h-[140px]`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`p-3 rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow duration-200`}>
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;