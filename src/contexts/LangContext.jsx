import { createContext, useContext, useState } from 'react';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('mimi_lang') || 'FR'
  );

  const toggle = () => {
    const next = lang === 'FR' ? 'EN' : 'FR';
    localStorage.setItem('mimi_lang', next);
    setLang(next);
  };

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
