// genai-debugging/index.ts
/**
 * @module genai-debugging
 * This module provides tools for enhancing runtime error information with code context.
 */

import path from 'path';
import fs from 'fs';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';
import * as sourceMap from 'source-map';
import * as tsEstree from '@typescript-eslint/typescript-estree';
import { base as tsBase } from './ts-base';
import ErrorStackParser from 'error-stack-parser';

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
  const originalPrepareStackTrace = Error.prepareStackTrace;
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

/**
 * @interface CodeContext
 * Represents the context surrounding a code location in both the generated
 * and original source code.
 */
interface CodeContext {
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
  errorFields?: any;
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
export async function contextualizeError(runtimeError: Error, options?: { outputFile?: string }): Promise<void> {
  const outputFile = options?.outputFile || 'error-context.json';
  const referencedScripts: CodeContext[] = [];

  // If the structuredStack is not available, create a new Error object to capture the stack trace
  const snapshotError = new Error();
  Error.captureStackTrace(snapshotError);
  
  // Handles a race condition where the script proceeds without finishing Error.captureStackTrace
  // This seems to be a case of Schrodinger's stack trace where it must be observed to exist.
  // Note that this will work regardless of whether this library was properly initialized as it does not rely on any modifications to the Error object.
  const stackLen = snapshotError.stack.length;

  // Check if our newly created error contains the attribute "catchToLLM"
  // If it does, the library has been initialized
  // If it does not, exit the function and log a warning
  if (!snapshotError.catchToLLM || (snapshotError.catchToLLM.parsedStack.length === 0)) {
    console.warn('contextualizeError was called before the library was initialized.');
    console.warn('Please ensure that the library is initialized before calling this function.');
    console.warn('Note: catch-to-llm should only be initialized or called in development environments.');
    return;
  }
  
  const runtimeStackTrace = runtimeError.catchToLLM as unknown as AugmentedStackTrace;

  let stackTraceOfRecord = runtimeStackTrace;
  // Validate stack trace
  if (!runtimeStackTrace.structuredStack || (runtimeStackTrace.structuredStack.length <= 1)) {
    const snapshotStackTrace = snapshotError.catchToLLM as unknown as AugmentedStackTrace;
    stackTraceOfRecord = snapshotStackTrace;
  }

  // TODO: Come back to this working on browser implementation
  // Parse the error stack trace provided by the runtime error
  // const parsedRuntimeErrorStack = ErrorStackParser.parse(runtimeError);
  // console.log(parsedRuntimeErrorStack);

  // Get the current filename for filtering
  const currentFilename = snapshotError.catchToLLM.parsedStack[0].fileName;

  // Filter stack frames to remove extraneous entries
  let foundNonNodeModulesFrame = false;
  const stackFrames = stackTraceOfRecord.parsedStack.filter((frame, index) => {
    // Filter out the current file
    // This is most likely to be used when the `stackTraceOfRecord` is from the snapshotError
    if (frame.fileName === currentFilename) {
      return false;
    }


    // Filter out "node:" frames as there is no reliable way to access internals
    if (frame.fileName && frame.fileName.includes('node:')) {
      return false;
    }

    // Keep all "node_modules" frames until a non-"node_modules" frame is found
    if (frame.fileName && frame.fileName.includes('node_modules')) {
      if (foundNonNodeModulesFrame) {
        return false;
      } else {
        return true;
      }
    }

    // Keep the first non-"node_modules" frame
    foundNonNodeModulesFrame = true;
    return true;
  });

  // If all remaining frames are "node_modules" frames, keep only the first one
  if (stackFrames.every(frame => frame.fileName && frame.fileName.includes('node_modules'))) {
    stackFrames.splice(1);
  }

  // Asynchronously process each frame to allow for potential delays in source map loading
  await Promise.all(
    stackFrames.map(async (stackFrame, stackIndex) => {

      // Validate frame data
      if (!stackFrame.fileName || stackFrame.lineNumber === null || stackFrame.columnNumber === null) {
        console.warn(`Incomplete stack frame data at index ${stackIndex}. Skipping...`);
        return;
      }

      try {
        // Initialize context object for the current frame
        const context: CodeContext = {
          stackIndex,
          generatedFileName: stackFrame.fileName ?? '',
          generatedFile: '',
          generatedLineNumber: stackFrame.lineNumber ?? null,
          generatedColumnNumber: stackFrame.columnNumber ?? null,
          generatedCallerLine: '',
        };

        // Extract error details for the originating frame
        if (stackIndex === 0) {
          context.errorMessage = runtimeError.message ?? '';
          
          // Initialize an empty object to store error fields
          context.errorFields = {};

          // Iterate over the runtimeError entries, excluding 'catchToLLM', 'message', and 'stack'
          for (const [key, value] of Object.entries(runtimeError)) {
            if (key !== 'catchToLLM' && key !== 'message' && key !== 'stack') {
              // Attempt to create a human-readable representation of the value
              try {
                context.errorFields[key] = JSON.stringify(value, null, 2); // Pretty-print JSON
              } catch (error) {
                // Handle cases where JSON.stringify fails (e.g., circular references)
                console.warn(`Unable to stringify property '${key}' for human-readable output.`);
                context.errorFields[key] = `[Unserializable Value - ${typeof value}]`; 
              }
            }
          }

          // // Parse error stack to extract error location details
          // const errorStackLines = runtimeError.stack?.split('\n') || [];
          // const errorFileDetails = errorStackLines[1]?.trim().match(/at\s+(.+):(\d+):(\d+)/);

          context.errorMessageStack = runtimeStackTrace.error.toString();

          if (stackFrame.fileName) {
            // context.generatedErrorLineNumber = Number(errorFileDetails[2]);
            // context.generatedErrorColumn = Number(errorFileDetails[3]) - 1;

            context.generatedErrorLineNumber = stackFrame.lineNumber;
            context.generatedErrorColumn = stackFrame.columnNumber;
          }
        }

        // Read and store generated file contents
        context.generatedFile = fs.readFileSync(stackFrame.fileName, 'utf8');
        const generatedLines = context.generatedFile.split('\n');
        context.generatedCallerLine = generatedLines[stackFrame.lineNumber - 1]?.trim() || '';

        // Extract code snippets from generated file
        extractCodeSnippets(context.generatedFile, stackFrame.lineNumber, context, 'generated');

        if (context.generatedErrorLineNumber && context.generatedErrorColumn) {
          context.generatedErrorLine = generatedLines[context.generatedErrorLineNumber - 1]?.trim() || '';
          extractCodeSnippets(
            context.generatedFile,
            context.generatedErrorLineNumber,
            context,
            'generatedError'
          );
        }

        const mapFileName = `${context.generatedFileName}.map`;
        if (fs.existsSync(mapFileName)) {
          try {
            // Load and parse the source map
            const rawSourceMap = JSON.parse(fs.readFileSync(mapFileName, 'utf8'));

            await sourceMap
              .SourceMapConsumer.with(rawSourceMap, null, async (consumer) => {
                // Calculate original position
                const originalPosition = consumer.originalPositionFor({
                  line: context.generatedLineNumber,
                  column: context.generatedColumnNumber,
                });

                // Populate context with original file details
                context.originalFileName = originalPosition.source ?? undefined;
                context.originalLineNumber = originalPosition.line;
                context.originalColumnNumber = originalPosition.column;

                // Extract original file contents and code snippets
                if (context.originalFileName && context.originalLineNumber) {
                  try {
                    let originalFileContents = await consumer.sourceContentFor(
                      context.originalFileName,
                      true
                    );

                    if (!originalFileContents) {
                      const resolvedOriginalFilePath = path.resolve(
                        path.dirname(context.generatedFileName),
                        context.originalFileName
                      );
                      originalFileContents = fs.readFileSync(
                        resolvedOriginalFilePath,
                        'utf8'
                      );
                    }

                    if (originalFileContents) {
                      context.originalFile = originalFileContents;
                      const originalLines = originalFileContents.split('\n');
                      context.originalCallerLine =
                        originalLines[context.originalLineNumber - 1]?.trim() || '';

                      // Extract original code snippets
                      extractCodeSnippets(
                        originalFileContents,
                        context.originalLineNumber,
                        context,
                        'original'
                      );

                      if (context.generatedErrorLineNumber && context.generatedErrorColumn) {
                        const originalErrorPosition = consumer.originalPositionFor({
                          line: context.generatedErrorLineNumber,
                          column: context.generatedErrorColumn,
                        });

                        context.originalErrorLineNumber = originalErrorPosition.line;
                        context.originalErrorColumn = originalErrorPosition.column;

                        if (context.originalErrorLineNumber) {
                          context.originalErrorLine =
                            originalLines[context.originalErrorLineNumber - 1]?.trim() || '';
                          extractCodeSnippets(
                            originalFileContents,
                            context.originalErrorLineNumber,
                            context,
                            'originalError'
                          );
                        }
                      }
                    }
                  } catch (err) {
                    console.warn(
                      `Error fetching original source content for: ${context.originalFileName}`,
                      err
                    );
                  }
                }
              })
              .catch((err) => {
                console.warn(
                  `Error processing source map for ${stackFrame.fileName}: ${err}`
                );
              });
          } catch (err) {
            console.warn(`Error loading or parsing source map: ${err}`);
          }
        }

        // Add the context for the current frame to the result array
        referencedScripts.push(context);
      } catch (err) {
        console.warn(`Error reading or processing file: ${stackFrame.fileName}`, err);
      }
    })
  );

  // Write the collected context information to a JSON file
  fs.writeFileSync(outputFile, JSON.stringify(referencedScripts, null, 2));
}

/**
 * @function extractCodeSnippets
 * Extracts code snippets (closure, section) from the given source code.
 *
 * @param {string} sourceCode Full source code to analyze.
 * @param {number} lineNumber Line number where the caller or error occurred (1-based).
 * @param {CodeContext} context The CodeContext object to populate with snippets.
 * @param {string} target Specifies which fields in the context to populate
 * ('generated', 'original', 'generatedError', 'originalError').
 */
function extractCodeSnippets(
  sourceCode: string,
  lineNumber: number,
  context: CodeContext,
  target: 'generated' | 'original' | 'generatedError' | 'originalError'
): void {
  // Determine if the source code is TypeScript based on file extension
  const fileName =
    target === 'generated' || target === 'generatedError'
      ? context.generatedFileName
      : context.originalFileName || '';
  const isTypescript =
    fileName.endsWith('.ts') || fileName.endsWith('.tsx');

  try {
    // Parse the source code into an AST
    const ast = isTypescript
      ? tsEstree.parse(sourceCode, { loc: true, range: true })
      : acorn.parse(sourceCode, {
          ecmaVersion: 'latest',
          sourceType: 'module',
          locations: true,
        });

    const lines = sourceCode.split('\n');

    // Walk the AST to find relevant function scopes (closures)
    walk.simple(
      ast,
      {
        FunctionDeclaration(node, state, ancestors) {
          findClosureAndSection(node, lines, lineNumber, context, target);
        },
        FunctionExpression(node, state, ancestors) {
          findClosureAndSection(node, lines, lineNumber, context, target);
        },
        ArrowFunctionExpression(node, state, ancestors) {
          findClosureAndSection(node, lines, lineNumber, context, target);
        },
      },
      tsBase
    );
  } catch (error) {
    console.warn(`Error parsing source code for ${fileName}: ${error}`);
  }
}

/**
 * @function findClosureAndSection
 * Helper function to find and set the closure and section within the
 * provided CodeContext object.
 *
 * @param {acorn.Node | tsEstree.TSESTree.Node} node The AST node
 * (function declaration, expression, or arrow function).
 * @param {string[]} lines The source code split into lines.
 * @param {number} lineNumber The line number where the caller or error occurred.
 * @param {CodeContext} context The CodeContext object to populate.
 * @param {string} target Specifies which fields in the context to populate
 * ('generated', 'original', 'generatedError', 'originalError').
 */
function findClosureAndSection(
  node: acorn.Node | tsEstree.TSESTree.Node,
  lines: string[],
  lineNumber: number,
  context: CodeContext,
  target: 'generated' | 'original' | 'generatedError' | 'originalError'
): void {
  const { start, end } = node.loc!;
  if (lineNumber >= start.line && lineNumber <= end.line) {
    const closureKey = target + 'Closure';
    const sectionKey = target + 'Section';
    (context as any)[closureKey] = lines
      .slice(start.line - 1, end.line)
      .join('\n');

    let sectionStart = start.line - 1;
    let sectionEnd = end.line;
    let bracketLevel = 0;

    // Search backwards for the start of the containing code section
    for (let i = sectionStart; i >= 0; i--) {
      const line = lines[i];
      for (let j = 0; j < line.length; j++) {
        if (line[j] === '{') {
          if (bracketLevel === 0) {
            sectionStart = i;
          }
          bracketLevel++;
        } else if (line[j] === '}') {
          bracketLevel--;
        }
      }
    }

    // Reset bracket level to search for the end of the section
    bracketLevel = 0;
    for (let i = sectionEnd; i < lines.length; i++) {
      const line = lines[i];
      for (let j = 0; j < line.length; j++) {
        if (line[j] === '{') {
          bracketLevel++;
        } else if (line[j] === '}') {
          if (bracketLevel === 0) {
            sectionEnd = i + 1;
          }
          bracketLevel--;
        }
      }
    }

    // Extract and store the code section
    (context as any)[sectionKey] = lines.slice(sectionStart, sectionEnd).join('\n');
  }
}
