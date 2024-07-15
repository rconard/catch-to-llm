import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http.error';
import { logger } from '../utils/logger';

// Define an error handling middleware function
export const errorHandler = (
  error: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // Log the error for debugging purposes
  logger.error(
    `Error: ${error.statusCode} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  // Determine the status code to send in the response
  const statusCode = error.statusCode || 500;

  // Send an error response with the determined status code and error message
  res.status(statusCode).json({
    status: 'error',
    message: error.message || 'Internal server error',
  });
};
