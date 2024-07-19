// ./src/webapp/App.tsx

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { TestProvider } from './contexts/TestContext';
import HomePage from './pages/HomePage';
import TestsPage from './pages/TestsPage';
import BasicTestPage from './pages/tests/BasicTestPage';
import ErrorProviderPage from './pages/tests/ErrorProviderPage';
import ClientTestPage from './pages/tests/ClientTestPage';
import SSRTestPage from './pages/tests/SSRTestPage';
import { initializeCatchToLLM } from '../../catch-to-llm/dist/initialize';

const App: React.FC = () => {
  useEffect(() => {
    console.log('Initializing catch-to-llm');
    initializeCatchToLLM();
  }, []);

  return (
    <ThemeProvider>
      <TestProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/tests/basic" element={<BasicTestPage />} />
          <Route path="/tests/error" element={<ErrorProviderPage />} />
          <Route path="/tests/client" element={<ClientTestPage />} />
          <Route path="/tests/ssr" element={<SSRTestPage />} />
        </Routes>
      </TestProvider>
    </ThemeProvider>
  );
};

export default App;
