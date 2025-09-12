import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnnouncementItem {
  id: number;
  className: string;
  text: string;
  timestamp: Date;
}

interface NotificationContextType {
  announcements: AnnouncementItem[];
  addAnnouncement: (announcement: AnnouncementItem) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);

  const addAnnouncement = (announcement: AnnouncementItem) => {
    setAnnouncements(prev => [announcement, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{ announcements, addAnnouncement }}>
      {children}
    </NotificationContext.Provider>
  );
};
