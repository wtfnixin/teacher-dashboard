import React, { useState } from 'react';
import { BookOpen, Calendar, CheckCircle, Clock, Plus, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useResource } from '../contexts/ResourceContext';
import { Assignment, Resource } from '../types';

const HomeworkManager: React.FC = () => {
  const { t } = useLanguage();
  const { resources, addResource } = useResource();
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted'>('all');

  const assignments: Assignment[] = resources.map(resource => ({
    id: resource.id,
    title: resource.name,
    subject: resource.subject,
    dueDate: '2024-01-20', // Default due date
    status: 'pending' as const,
    class: resource.class
  }));

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'submitted':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredAssignments = filter === 'all' ? assignments : assignments.filter(a => a.status === filter);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const inferFileType = (fileName: string): Resource['type'] => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (!ext) return 'document';
    if (ext === 'pdf') return 'pdf';
    if (['mp4', 'mov', 'avi'].includes(ext)) return 'video';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'image';
    if (['doc', 'docx', 'txt', 'ppt', 'pptx'].includes(ext)) return 'document';
    return 'document';
  };

  const formatFileSize = (size: number): string => {
    if (size < 1024) return size + ' B';
    else if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    else return (size / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newResource = {
        id: Date.now().toString() + i,
        name: file.name,
        type: inferFileType(file.name),
        subject: 'General',
        class: 'All',
        uploadDate: new Date().toISOString().split('T')[0],
        size: formatFileSize(file.size)
      };
      addResource(newResource);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleNewAssignment = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{t('homework')} Manager</h2>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
            </select>
          </div>
          <button
            onClick={handleNewAssignment}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            <span>New Assignment</span>
          </button>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={onFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.mov,.avi"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Assignments</h3>
          <p className="text-sm text-gray-600 mt-1">{filteredAssignments.length} assignments</p>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredAssignments.map((assignment, index) => (
            <div 
              key={assignment.id}
              className="p-4 hover:bg-gray-50 transition-colors duration-200 animate-in slide-in-from-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {assignment.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {assignment.subject} • Class {assignment.class}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{assignment.dueDate}</span>
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                        {getStatusIcon(assignment.status)}
                        <span className="capitalize">{assignment.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeworkManager;