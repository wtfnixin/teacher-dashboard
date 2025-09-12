import React, { useState, useRef } from 'react';
import { Upload, File, Video, Image, Download, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useResource } from '../contexts/ResourceContext';
import { Resource } from '../types';

const ResourceManager: React.FC = () => {
  const { t } = useLanguage();
  const { resources, addResource } = useResource();
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return <File className="h-5 w-5 text-red-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-blue-500" />;
      case 'image':
        return <Image className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

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
      const newResource: Resource = {
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

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const onUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{t('resources')} Manager</h2>
        <button
          onClick={onUploadClick}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Upload Resource</span>
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

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">Drag and drop files here, or click to browse</p>
        <p className="text-sm text-gray-500 mt-1">Supports PDF, DOC, JPG, PNG, MP4</p>
      </div>

      {/* Resources List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Uploaded Resources</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {resources.map((resource, index) => (
            <div 
              key={resource.id}
              className="p-4 hover:bg-gray-50 transition-colors duration-200 animate-in slide-in-from-bottom"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getFileIcon(resource.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {resource.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {resource.subject} • {resource.class} • {resource.size}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{resource.uploadDate}</span>
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceManager;
