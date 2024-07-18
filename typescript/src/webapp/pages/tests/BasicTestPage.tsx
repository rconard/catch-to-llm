import React, { useState, useEffect } from 'react';

const BasicTestPage: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <h1>Basic Test Page</h1>
      <p>This page performs a simple test.</p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default BasicTestPage;
