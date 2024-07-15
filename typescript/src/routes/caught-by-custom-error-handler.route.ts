import { NextFunction, Request, Response, Router } from 'express';
import { HttpError } from '../errors/http.error';

const caughtByCustomErrorHandler = Router();

// URL: http://localhost:3000/tests/caught-by-custom-error-handler
// Define a route handler for GET requests to 'tests/caught-by-custom-error-handler'
// No error handling is written here, so the error will be caught by the custom error handler
caughtByCustomErrorHandler.get('/', (req: Request, res: Response, next: NextFunction) => {
  throw new HttpError(418, 'This error will be caught by the Custom Error Handler');
});

export { caughtByCustomErrorHandler };
