import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { UI_TEXT } from '../data/siteData.js';

const SiteContext = createContext(null);

// Сайт работает только на русском языке.
const LANGUAGE = 'ru';

export function SiteProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('olan-theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('olan-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const value = useMemo(() => ({
    language: LANGUAGE,
    theme,
    setTheme,
    toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    text: UI_TEXT[LANGUAGE] || UI_TEXT.ru,
  }), [theme]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used inside SiteProvider');
  }
  return context;
}
