import React from 'react';
import { TrendingUp, TrendingDown, Users, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PerformanceMonitor: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      title: 'Class Average',
      value: '84.2%',
      change: '+2.4%',
      trend: 'up',
      color: 'blue',
      icon: Award
    },
    {
      title: 'Attendance Rate',
      value: '92.1%',
      change: '+1.2%',
      trend: 'up',
      color: 'green',
      icon: Users
    },
    {
      title: 'Assignment Completion',
      value: '78.5%',
      change: '-3.1%',
      trend: 'down',
      color: 'purple',
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">{t('performance')} Monitor</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={stat.title}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 animate-in slide-in-from-bottom"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>
        <div className="space-y-4">
          {[
            { subject: 'Mathematics', score: 85, color: 'blue' },
            { subject: 'Science', score: 78, color: 'green' },
            { subject: 'English', score: 92, color: 'purple' },
            { subject: 'History', score: 74, color: 'orange' }
          ].map((subject, index) => (
            <div key={subject.subject} className="animate-in slide-in-from-right" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{subject.subject}</span>
                <span className="text-sm text-gray-600">{subject.score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r from-${subject.color}-400 to-${subject.color}-600 h-2 rounded-full transition-all duration-1000`}
                  style={{ width: `${subject.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;