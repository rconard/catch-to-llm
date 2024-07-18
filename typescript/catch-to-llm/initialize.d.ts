// catch-to-llm/initialize.d.ts

/**
 * @interface StackFrame
 * Represents a single frame in a stack trace.
 */
export interface StackFrame {
  /** Returns the name of the function associated with this stack frame. */
  getFunctionName: () => string | null;
  /** Returns the filename or URL associated with this stack frame. */
  getFileName: () => string | null;
  /** Returns the script name or URL associated with this stack frame. */
  getScriptNameOrSourceURL: () => string | null;
  /** Returns the line number associated with this stack frame. */
  getLineNumber: () => number | null;
  /** Returns the column number associated with this stack frame. */
  getColumnNumber: () => number | null;
  /**
   * Returns the line number of the enclosing function or eval associated
   * with this stack frame.
   */
  getEnclosingLineNumber: () => number | null;
  /**
   * Returns the column number of the enclosing function or eval associated
   * with this stack frame.
   */
  getEnclosingColumnNumber: () => number | null;
  /** Returns whether this stack frame is known to be a constructor call. */
  isConstructor: () => boolean | null;
  /** Returns whether this stack frame was invoked as an eval. */
  isEval: () => boolean | null;
  /** Returns whether this stack frame is part of native code. */
  isNative: () => boolean | null;
  /** Returns whether this stack frame was invoked as a top-level function. */
  isToplevel: () => boolean | null;
  /** Returns whether this stack frame is an async function. */
  isAsync: () => boolean | null;
  /** Returns whether this stack frame is a Wasm function. */
  isWasm: () => boolean | null;
}

/**
 * @interface AugmentedStackTrace
 * Extends the standard Error object with additional stack trace information.
 */
export interface AugmentedStackTrace {
  /** The original Error object. */
  error: Error;
  /** The formatted stack trace string. */
  stack: string;
  /** An array of structured stack frames. */
  structuredStack: StackFrame[];
  /** An array of parsed stack frames with simplified properties. */
  parsedStack: {
    /** The name of the function. */
    functionName?: string | null;
    /** The filename associated with the stack frame. */
    fileName: string | null;
    /** The script name or URL associated with the stack frame. */
    scriptNameOrSourceURL?: string | null;
    /** The line number in the file. */
    lineNumber: number | null;
    /** The line number of the enclosing function or eval. */
    enclosingLineNumber?: number | null;
    /** The column number in the file. */
    columnNumber: number | null;
    /** The column number of the enclosing function or eval. */
    enclosingColumnNumber?: number | null;
  }[];
}

export interface CatchToLLMOptions {
  /** Enables or disables the debug server. Defaults to true. */
  enableServer?: boolean;
  /** The port for the debug server to listen on. Defaults to 5001. */
  serverPort?: number;
}

/**
 * Initializes the catch-to-llm library by overriding the default
 * `Error.prepareStackTrace` method. This modification allows the library
 * to capture and augment stack trace information.
 * 
 * This function should be called only once at the beginning of the
 * application lifecycle, preferably in a development environment.
 *
 * @param options Optional configuration options.
 *
 * @example
 * ```typescript
 * // Initialize the library with default options
 * initializeCatchToLLM();
 *
 * // Initialize the library with custom options
 * initializeCatchToLLM({ enableServer: false, serverPort: 5002 });
 *
 * try {
 *   // Code that might throw an error
 * } catch (error) {
 *   // Handle the error with enhanced stack trace information
 *   console.error(error);
 * }
 * ```
 */
export declare const initializeCatchToLLM: (options?: CatchToLLMOptions) => void;
