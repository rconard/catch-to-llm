import React, { createContext, useContext, useState } from 'react';
// import { contextualizeError } from '../../../catch-to-llm';

const UncaughtErrorContext = createContext(null);
const CaughtErrorContext = createContext(() => {});

export const useUncaughtError = () => {
  return useContext(UncaughtErrorContext);
};

export const useCaughtError = () => {
  return useContext(CaughtErrorContext);
};

export const TestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const uncaughtError = () => {
    throw new Error('This error was not caught');
  };

  const caughtError = () => {
    try {
      throw new Error('This error was caught');
    } catch (error) {
      debugger;
      console.error(error);
      // contextualizeError(error);
    }
  }

  return (
    <UncaughtErrorContext.Provider value={uncaughtError}>
      <CaughtErrorContext.Provider value={caughtError}>
        {children}
      </CaughtErrorContext.Provider>
    </UncaughtErrorContext.Provider>
  );
};
