import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? JSON.parse(savedTheme) : true;
    } catch (error) {
      console.error("Could not parse theme from localStorage", error);
      return true;
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', JSON.stringify(dark));
  }, [dark]);

  const toggleTheme = () => {
    setDark(prevDark => !prevDark);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
