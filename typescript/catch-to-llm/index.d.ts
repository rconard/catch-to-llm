// catch-to-llm/index.d.ts

/**
 * @module catch-to-llm
 * This module provides tools for enhancing runtime error information with code context.
 */

/**
 * @interface CodeContext
 * Represents the context surrounding a code location in both the generated
 * and original source code.
 */
export interface CodeContext {
  /** Index of the stack frame in the error's stack trace. */
  stackIndex: number;
  /** Filename of the generated code. */
  generatedFileName: string;
  /** Contents of the generated code. */
  generatedFile: string;
  /** Line number in the generated code (1-based). */
  generatedLineNumber: number;
  /** Column number in the generated code (0-based). */
  generatedColumnNumber: number;
  /** Contents of the line containing the caller in the generated code. */
  generatedCallerLine: string;
  /** Nearest enclosing function or arrow function scope in the generated code. */
  generatedClosure?: string;
  /**
   * Code section (block delimited by curly braces) in the generated code
   * surrounding the closure at the root level of the source file.
   */
  generatedSection?: string;
  /** Line number where the error occurred in the generated code (1-based). */
  generatedErrorLineNumber?: number;
  /** Line  where the error occurred in the generated code. */
  generatedErrorLine?: string;
  /** Column number where the error occurred in the generated code (0-based). */
  generatedErrorColumn?: number;
  /**
   * Nearest enclosing function or arrow function scope of the error location
   * in the generated code.
   */
  generatedErrorClosure?: string;
  /**
   * Code section (block delimited by curly braces) in the generated code
   * surrounding the closure of the error location.
   */
  generatedErrorSection?: string;
  /** Filename of the original source code (if available). */
  originalFileName?: string;
  /** Contents of the original source file (if available). */
  originalFile?: string;
  /** Line number in the original source code (1-based, if available). */
  originalLineNumber?: number;
  /** Column number in the original source code (0-based, if available). */
  originalColumnNumber?: number;
  /** Contents of the line containing the caller in the original source (if available). */
  originalCallerLine?: string;
  /** Nearest enclosing function or arrow function scope in the original source code. */
  originalClosure?: string;
  /**
   * Code section (block delimited by curly braces) in the original source code
   * surrounding the closure at the root level of the source file.
   */
  originalSection?: string;
  /** Line number where the error occurred in the original source code (1-based). */
  originalErrorLineNumber?: number;
  /** Line  where the error occurred in the original source code. */
  originalErrorLine?: string;
  /** Column number where the error occurred in the original source code (0-based). */
  originalErrorColumn?: number;
  /**
   * Nearest enclosing function or arrow function scope of the error location
   * in the original source code.
   */
  originalErrorClosure?: string;
  /**
   * Code section (block delimited by curly braces) in the original source code
   * surrounding the closure of the error location.
   */
  originalErrorSection?: string;
  /** The error message from the runtime error. Only populated for the stack entry that represents the origin of the error. */
  errorMessage?: string;
  /**
   * The error message from the first line of the runtime error stack which may differ from the `message` field.
   * Only populated for the stack entry that represents the origin of the error.
   */
  errorMessageStack?: string;
  /** HTTP status code associated with the error (if available). */
  errorFields?: Record<string, unknown>;
}

/**
 * @async
 * @function contextualizeError
 * Extracts contextual information from a runtime error's stack trace,
 * including source mapped locations.
 *
 * This function analyzes the stack trace and provides enriched information
 * about each stack frame, such as:
 * - File names and line numbers in both generated and original source code.
 * - Relevant code snippets: the caller line, enclosing function closure,
 *   and surrounding code section.
 * - For the stack frame where the error originated, additional information
 *   is extracted, such as the specific error location (line/column) and
 *   associated code snippets (closure/section).
 *
 * The extracted context is written to an 'error-context.json' file in the
 * current working directory.
 *
 * @param {Error} runtimeError The runtime error to contextualize.
 * @param {Object} [options] Optional configuration options.
 * @param {string} [options.outputFile='error-context.json'] The file path to write the contextualized error information.
 *
 * @example
 * ```typescript
 * try {
 *   // Code that might throw an error...
 * } catch (error) {
 *   await contextualizeError(error);
 *   // Check 'error-context.json' for detailed context.
 * }
 * ```
 */
export declare function contextualizeError(
  runtimeError: Error,
  options?: { outputFile?: string }
): Promise<void>;
