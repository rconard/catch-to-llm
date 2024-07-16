import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TestsPage from './pages/TestsPage';
import BasicTestPage from './pages/tests/BasicTestPage';
import SSRTestPage from './pages/tests/SSRTestPage';
import ClientTestPage from './pages/tests/ClientTestPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tests" element={<TestsPage />} />
        <Route path="/tests/basic" element={<BasicTestPage />} />
        <Route path="/tests/SSR" element={<SSRTestPage />} />
        <Route path="/tests/Client" element={<ClientTestPage />} />
      </Routes>
    </BrowserRouter>
  );
};
