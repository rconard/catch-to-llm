import fs from 'fs';
import { NextFunction, Request, Response, Router } from 'express';
import { HttpError } from '../errors/http.error';
import { contextualizeError } from '../../genai-debugging';

// Node Error handling internals
// https://github.com/nodejs/node/blob/b4e8f1b6bb3616ba222c4513218aa1fa9d543d8e/lib/internal/errors.js#L892

const errorRouter = Router();

// Define a route handler for GET requests to '/error'
errorRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    // Intentionally throw an error to be caught by the error handling middleware
    throw new HttpError(500, 'This is a test error');
  } catch (error) {
    contextualizeError(error);

    // Respond with a 500 Internal Server Error status code and the error message
    res.status(500).send('An error occurred');
  }
});

export { errorRouter };
