import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../data/languages';
import { getTranslatedText } from '../data/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (hiText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    // Check URL query parameter first ?lang=ta
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && SUPPORTED_LANGUAGES.some((l) => l.code === langParam)) {
      return langParam as Language;
    }

    const saved = localStorage.getItem('yojnasaathi_lang') || localStorage.getItem('yojanasaathi_lang');
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      return saved as Language;
    }
    return DEFAULT_LANGUAGE as Language;
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('yojnasaathi_lang', newLang);

    // Update URL query param without full page reload if possible
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.replaceState({}, '', url.toString());

    // Update DOM html lang and direction (RTL for Urdu/Sindhi)
    const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = langObj?.dir || 'ltr';
  };

  const toggleLang = () => {
    setLang(lang === 'hi' ? 'en' : 'hi');
  };

  const t = (hiText: string, enText: string): string => {
    return getTranslatedText(hiText, enText, lang);
  };

  useEffect(() => {
    const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = langObj?.dir || 'ltr';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
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

