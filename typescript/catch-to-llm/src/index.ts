// catch-to-llm/index.ts

import { AugmentedStackTrace } from './initialize.d';

// Dynamically import the correct contextualizeError function
const contextualizeError =
  typeof window !== 'undefined' // Check if running in a browser
    ? (async (runtimeError: Error, options?: { outputFile?: string }): Promise<void> => {
        const { contextualizeError: browserContextualizeError } = await import(
          './browser' // Import the browser version
        );
        return browserContextualizeError(runtimeError, options);
      })
    : (async (runtimeError: Error, options?: { outputFile?: string }): Promise<void> => {
        const { contextualizeError: nodeContextualizeError } = await import(
          './node' // Import the Node.js version
        );
        return nodeContextualizeError(runtimeError, options);
      });

export { contextualizeError }; 
