import React, { createContext, useContext, useState } from 'react';
// import { contextualizeError } from '../../../catch-to-llm';

const ThemeContext = createContext(null);
const ThemeUpdateContext = createContext(() => {});

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeUpdate = () => {
  return useContext(ThemeUpdateContext);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeError = () => {
    throw new Error('Error in toggleTheme');
  }

  const catchThemeError = () => {
    try {
      themeError();
    } catch (error) {
      console.error(error);
      // contextualizeError(error);
    }
  }

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};
