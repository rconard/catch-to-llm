// ./src/webapp/App.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TestsPage from './pages/TestsPage';
import BasicTestPage from './pages/tests/BasicTestPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tests" element={<TestsPage />} />
      <Route path="/tests/basic" element={<BasicTestPage />} />
    </Routes>
  );
};

export default App;
