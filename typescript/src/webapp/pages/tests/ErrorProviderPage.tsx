import React from 'react';
import { useCaughtError, useUncaughtError } from '../../contexts/TestContext';

const ErrorProviderPage: React.FC = () => {
  const throwCaughtError = useCaughtError();
  const throwUncaughtError = useUncaughtError();

  return (
    <div>
      <h1>Error Test Page</h1>
      <button onClick={throwCaughtError}>Caught Error</button>
      <button onClick={throwUncaughtError}>Uncaught Error</button>
    </div>
  );
};

export default ErrorProviderPage;
