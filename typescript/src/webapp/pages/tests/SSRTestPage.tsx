import React, { useEffect, useState } from 'react';

const SSRTestPage: React.FC = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    // Simulate a data fetch
    const fetchData = async () => {
      const result = await fetch('/api/data');
      const data = await result.json();
      setData(data.message);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>React Server-Side Rendering Test Page</h1>
      <p>This page demonstrates using React server-side rendering with the React Component Lifecycle.</p>
      <p>{data ? data : 'Loading...'}</p>
    </div>
  );
};

export default SSRTestPage;
