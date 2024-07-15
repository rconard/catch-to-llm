import { NextFunction, Request, Response, Router } from 'express';
import { HttpError } from '../errors/http.error';
import { v1ToV6 } from 'uuid';

const libraryCaughtByNextCustomErrorHandler = Router();

// URL: http://localhost:3000/tests/caught-by-express
// Define a route handler for GET requests to 'tests/caught-by-express'
// No error handling is written here, so the error will be caught by Express
libraryCaughtByNextCustomErrorHandler.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    // Call to the uuid library that will cause an exception within the library itself
    v1ToV6('ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ');

    console.log('This will not be printed');
  } catch (error) {
    console.error(error.stack);
    next(error);
  }
});

export { libraryCaughtByNextCustomErrorHandler };
