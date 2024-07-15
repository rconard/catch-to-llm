import { NextFunction, Request, Response, Router } from 'express';
import { HttpError } from '../errors/http.error';

const caughtByNextExpress = Router();

// URL: http://localhost:3000/tests/caught-by-express
// Define a route handler for GET requests to 'tests/caught-by-express'
// No error handling is written here, so the error will be caught by Express
caughtByNextExpress.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new HttpError(418, 'This error will be caught by Express using next(error)');
  } catch (error) {
    next(error);
  }
});

export { caughtByNextExpress };
