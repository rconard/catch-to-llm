import React from 'react';
import { useTheme, useThemeUpdate } from '../contexts/ThemeContext';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const toggleTheme = useThemeUpdate();

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <h1>Home Page</h1>
      <p>The current theme is {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default HomePage;
