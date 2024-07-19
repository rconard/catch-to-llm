// catch-to-llm/browser.ts

import { AugmentedStackTrace } from './initialize.d';

/**
 * @async
 * @function contextualizeError (Browser Implementation)
 * Sends the error data to the Express server for processing.
 *
 * @param {Error} runtimeError The runtime error to contextualize.
 * @param {Object} [options] Optional configuration options.
 * @param {string} [options.outputFile='error-context.json'] This parameter is ignored in the browser implementation.
 *
 * @example
 * ```typescript
 * try {
 *   // Code that might throw an error...
 * } catch (error) {
 *   await contextualizeError(error);
 *   // The server will handle saving the context information.
 * }
 * ```
 */
export async function contextualizeError(runtimeError: Error, options?: { outputFile?: string }): Promise<void> {

  // Get the server URL from the global variable
  const serverUrl = (window as any).__CATCH_TO_LLM_SERVER_URL__;

  if (!serverUrl) {
    console.warn(
      'Debug server URL not found. Ensure the library is initialized with a valid server URL.'
    );
    return;
  }

  try {
    // Check if our newly created error contains the attribute "catchToLLM"
    // If it does, the library has been initialized
    // If it does not, exit the function and log a warning
    if (!runtimeError.catchToLLM || (runtimeError.catchToLLM.parsedStack.length === 0)) {
      console.warn('contextualizeError was called before the library was initialized.');
      console.warn('Please ensure that the library is initialized before calling this function.');
      console.warn('Note: catch-to-llm should only be initialized or called in development environments.');
      return;
    }

    const runtimeStackTrace = runtimeError.catchToLLM as unknown as AugmentedStackTrace;

    // Prepare the data to be sent to the server
    const errorData = {
      name: runtimeError.name,
      message: runtimeError.message,
      stack: runtimeError.stack,
      catchToLLM: runtimeStackTrace, // Send the augmented stack trace
    };

    // Send a POST request to the server
    const response = await fetch(`${serverUrl}/contextualize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ errorData, options }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error('Error sending error data to the server:', err);
  }
}
