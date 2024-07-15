
// Define a custom error class that extends the built-in Error class
export class HttpError extends Error {
  // Property to store the HTTP status code associated with the error
  statusCode: number;
  dysFunction: () => void;

  // Constructor of the HttpError class
  constructor(statusCode: number, message: string) {
    // Call the constructor of the parent Error class with the error message
    super(message);

    // Set the name of the error to 'HttpError' for identification
    this.name = 'HttpError';

    // Assign an empty function to the 'dysFunction' property
    // Non-stringifyable properties are not included in the JSON output
    this.dysFunction = () => {};

    // Assign the provided status code to the 'statusCode' property
    this.statusCode = statusCode;
  }
}
