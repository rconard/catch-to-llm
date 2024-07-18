import React from 'react';
import { Link } from 'react-router-dom';

const TestsPage: React.FC = () => {
  return (
    <div>
      <h1>Test Pages</h1>
      <ul>
        <li>
          <Link to="/tests/basic">Basic Test</Link>
        </li>
        <li>
          <Link to="/tests/error">React Context Provider Error Test</Link>
        </li>
        <li>
          <Link to="/tests/client">React Browser Test</Link>
        </li>
        <li>
          <Link to="/tests/ssr">React SSR Test</Link>
        </li>
      </ul>
    </div>
  );
};

export default TestsPage;
