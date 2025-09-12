import React from 'react';
import { Clock, MapPin, Book, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { TimeSlot } from '../types';

const mockSchedule: TimeSlot[] = [
  { id: '1', time: '9:00-9:45', subject: 'mathematics', class: '6A', room: 'Room 101' },
  { id: '2', time: '9:45-10:30', subject: 'science', class: '6B', room: 'Lab 1' },
  { id: '3', time: '10:45-11:30', subject: 'english', class: '7A', room: 'Room 203' },
  { id: '4', time: '11:30-12:15', subject: 'mathematics', class: '7B', room: 'Room 101' },
  { id: '5', time: '1:00-1:45', subject: 'physics', class: '8A', room: 'Lab 2' }
];

const TimeTable: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{t('timetable')}</h2>
          <p className="text-sm text-gray-600 mt-1">Today's Schedule</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Class</span>
        </button>
      </div>
      
      <div className="divide-y divide-gray-100">
        {mockSchedule.map((slot, index) => (
          <div 
            key={slot.id}
            className="p-4 hover:bg-gray-50 transition-all duration-200 animate-in slide-in-from-left"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {t(slot.subject)}
                    </h3>
                    <p className="text-sm text-gray-500">Class {slot.class}</p>
                  </div>
                  
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{slot.time}</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{slot.room}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeTable;