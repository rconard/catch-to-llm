import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TestsPage from './pages/TestsPage';
import BasicTestPage from './pages/tests/BasicTestPage';
import RscTestPage from './pages/tests/RscTestPage';
import RccTestPage from './pages/tests/RccTestPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// Render the web app using React Router for client-side routing
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tests" element={<TestsPage />} />
        <Route path="/tests/basic" element={<BasicTestPage />} />
        <Route path="/tests/rsc" element={<RscTestPage />} />
        <Route path="/tests/rcc" element={<RccTestPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
