import { NextFunction, Request, Response, Router } from 'express';
import { HttpError } from '../errors/http.error';

const caughtByExpress = Router();

// URL: http://localhost:3000/tests/caught-by-express
// Define a route handler for GET requests to 'tests/caught-by-express'
// No error handling is written here, so the error will be caught by Express
caughtByExpress.get('/', (req: Request, res: Response, next: NextFunction) => {
  throw new HttpError(418, 'This error will be caught by Express');
});

export { caughtByExpress };
