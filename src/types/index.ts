export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  attendance: number;
  performance: {
    math: number;
    science: number;
    english: number;
    overall: number;
  };
  avatar: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  class: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'image' | 'document';
  subject: string;
  class: string;
  uploadDate: string;
  size: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  subject: string;
  class: string;
  room: string;
}

export interface Language {
  code: 'en' | 'hi' | 'pa';
  name: string;
  flag: string;
}

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    pa: string;
  };
}

export interface Announcement {
  id: string;
  className: string;
  text: string;
  timestamp: string;
}
