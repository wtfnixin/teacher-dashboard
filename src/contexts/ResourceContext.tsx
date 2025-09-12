import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Resource, Assignment } from '../types';

interface ResourceContextType {
  resources: Resource[];
  addResource: (resource: Resource) => void;
}

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export const useResource = () => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error('useResource must be used within a ResourceProvider');
  }
  return context;
};

interface ResourceProviderProps {
  children: ReactNode;
}

const initialResources: Resource[] = [
  {
    id: '1',
    name: 'Algebra Basics.pdf',
    type: 'pdf',
    subject: 'Mathematics',
    class: '6A',
    uploadDate: '2024-01-15',
    size: '2.3 MB'
  },
  {
    id: '2',
    name: 'Plant Biology Video.mp4',
    type: 'video',
    subject: 'Science',
    class: '6A',
    uploadDate: '2024-01-14',
    size: '45.2 MB'
  },
  {
    id: '3',
    name: 'Grammar Rules.docx',
    type: 'document',
    subject: 'English',
    class: '6A',
    uploadDate: '2024-01-13',
    size: '1.8 MB'
  }
];

export const ResourceProvider: React.FC<ResourceProviderProps> = ({ children }) => {
  const [resources, setResources] = useState<Resource[]>(initialResources);

  const addResource = (resource: Resource) => {
    setResources(prev => [resource, ...prev]);
  };

  return (
    <ResourceContext.Provider value={{ resources, addResource }}>
      {children}
    </ResourceContext.Provider>
  );
};
