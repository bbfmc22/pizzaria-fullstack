import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const VALID_THEMES = ['light', 'dark'];

export function ThemeProvider({ children }) {
  // Inicializa o tema com 'dark' mas vamos tentar sobrescrever no useEffect
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Tenta carregar do localStorage
    const savedTheme = localStorage.getItem('theme');
    if (VALID_THEMES.includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      // Se não existir localStorage, tenta detectar pelo sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    // Aplica o tema via atributo data-theme no <html>
    document.documentElement.setAttribute('data-theme', theme);
    // Guarda no localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
