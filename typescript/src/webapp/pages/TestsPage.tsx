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
          <Link to="/tests/SSR">React Server Components Test</Link>
        </li>
        <li>
          <Link to="/tests/Client">React Client Components Test</Link>
        </li>
      </ul>
    </div>
  );
};

export default TestsPage;
