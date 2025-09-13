import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Translations } from '../types';

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
];

const translations: Translations = {
  dashboard: {
    en: 'Dashboard',
    hi: 'डैशबोर्ड',
    pa: 'ਡੈਸ਼ਬੋਰਡ'
  },
  students: {
    en: 'Students',
    hi: 'छात्र',
    pa: 'ਵਿਦਿਆਰਥੀ'
  },
  performance: {
    en: 'Performance',
    hi: 'प्रदर्शन',
    pa: 'ਪ੍ਰਦਰਸ਼ਨ'
  },
  timetable: {
    en: 'Timetable',
    hi: 'समय सारणी',
    pa: 'ਸਮਾਂ ਸਾਰਣੀ'
  },
  announcement: {
    en: 'Announcement',
    hi: 'घोषणा',
    pa: 'ਘੋਸ਼ਣਾ'
  },
  resources: {
    en: 'Resources',
    hi: 'संसाधन',
    pa: 'ਸਰੋਤ'
  },
  homework: {
    en: 'Homework',
    hi: 'गृहकार्य',
    pa: 'ਘਰ ਦਾ ਕੰਮ'
  },
  selectClass: {
    en: 'Select Class',
    hi: 'कक्षा चुनें',
    pa: 'ਜਮਾਤ ਚੁਣੋ'
  },
  attendance: {
    en: 'Attendance',
    hi: 'उपस्थिति',
    pa: 'ਹਾਜ਼ਰੀ'
  },
  mathematics: {
    en: 'Mathematics',
    hi: 'गणित',
    pa: 'ਗਣਿਤ'
  },
  science: {
    en: 'Science',
    hi: 'विज्ञान',
    pa: 'ਵਿਗਿਆਨ'
  },
  english: {
    en: 'English',
    hi: 'अंग्रेजी',
    pa: 'ਅੰਗਰੇਜ਼ੀ'
  },
  physics: {
    en: 'Physics',
    hi: 'भौतिकी',
    pa: 'ਭੌਤਿਕ ਵਿਗਿਆਨ'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  languages: Language[];
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(languages[0]);

  const t = (key: string): string => {
    return translations[key]?.[language.code] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};