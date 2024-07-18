
export interface StackFrame {
  getFileName: () => string | null;
  getLineNumber: () => number | null;
  getColumnNumber: () => number | null;
};

export interface AugmentedStackTrace {
  error: Error;
  stack: string;
  structuredStack: StackFrame[];
  parsedStack: {
    functionName?: string | null;
    fileName: string | null;
    scriptNameOrSourceURL?: string | null;
    lineNumber: number | null;
    enclosingLineNumber?: number | null;
    columnNumber: number | null;
    enclosingColumnNumber?: number | null;
  }[];
};

/**
 * Modified implementation of `Error.prepareStackTrace` with simple
 * concatenation of stack frames.
 * Adapted from Source: https://github.com/nodejs/node/blob/main/lib/internal/errors.js
 * Read more about `Error.prepareStackTrace` at https://v8.dev/docs/stack-trace-api#customizing-stack-traces.
 */
function defaultPrepareStackTrace(error, trace) {
  const kIsNodeError = Symbol('kIsNodeError');

  // Normal error formatting:
  //
  // Error: Message
  //     at function (file)
  //     at file
  let errorString;
  if (kIsNodeError in error) {
    errorString = `${error.name} [${error.code}]: ${error.message}`;
  } else {
    errorString = error.toString();
  }
  if (trace.length === 0) {
    return errorString;
  }
  return `${errorString}\n    at ${trace.join('\n    at ')}`;
}

// Create a new module declaration to avoid conflicts
declare global {
  interface Error {
    catchToLLM?: AugmentedStackTrace; 
  }
}

// Run at the beginning of application to initialize the error handling
// Only initialize in development environment
export const initializeCatchToLLM = () => {
  // Override the default Error.prepareStackTrace to return AugmentedStackTrace
  Error.prepareStackTrace = (error, structuredStack): AugmentedStackTrace => {
    (error as any).catchToLLM = {
      error,
      structuredStack: structuredStack as StackFrame[],
      parsedStack: structuredStack.map((frame) => ({
        functionName: frame.getFunctionName(),
        fileName: frame.getFileName(),
        scriptNameOrSourceURL: frame.getScriptNameOrSourceURL(),
        lineNumber: frame.getLineNumber(),
        enclosingLineNumber: frame.getEnclosingLineNumber(),
        columnNumber: frame.getColumnNumber(),
        enclosingColumnNumber: frame.getEnclosingColumnNumber(),
      })),
    };

    const stack = defaultPrepareStackTrace(error, structuredStack);
    return stack;
  };
}
