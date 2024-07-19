// catch-to-llm/initialize.ts

import { CatchToLLMOptions, AugmentedStackTrace } from './initialize.d';

// Create a new module declaration to avoid conflicts
declare global {
  interface Error {
    catchToLLM?: AugmentedStackTrace; 
  }
}

/**
 * Initializes the `catch-to-llm` library by overriding the default
 * `Error.prepareStackTrace` method. This modification allows the library
 * to capture and augment stack trace information.
 *
 * This function should be called only once at the beginning of the
 * application lifecycle, preferably in a development environment.
 *
 * @param options Optional configuration options.
 */
export function initializeCatchToLLM(options?: CatchToLLMOptions): void {
  const { enableServer = true, serverPort = 5001 } = options || {};

  // Store server URL if enabled
  if (enableServer) {
    // Store the server URL in a global variable accessible by the browser
    (window as any).__CATCH_TO_LLM_SERVER_URL__ = `http://localhost:${serverPort}`; 
  }

  // Override Error.prepareStackTrace to capture augmented stack traces
  Error.prepareStackTrace = (err: Error, structuredStackTrace: any[]): any => {
    // Simplify the stack trace for easier analysis
    const parsedStack = structuredStackTrace.map((frame) => {
      return {
        functionName: frame.getFunctionName()?.toString() ?? null,
        fileName: frame.getFileName()?.toString() ?? null,
        scriptNameOrSourceURL: frame.getScriptNameOrSourceURL()?.toString() ?? null,
        lineNumber: frame.getLineNumber() ?? null,
        columnNumber: frame.getColumnNumber() ?? null,
        enclosingLineNumber: frame.getEnclosingLineNumber() ?? null,
        enclosingColumnNumber: frame.getEnclosingColumnNumber() ?? null,
      };
    });
    // Attach the augmented stack trace to the error object
    (err as any).catchToLLM = {
      error: err,
      stack: err.stack,
      structuredStack: structuredStackTrace,
      parsedStack: parsedStack,
    } as AugmentedStackTrace;
    return err.stack; // Return the original stack trace
  };
}
