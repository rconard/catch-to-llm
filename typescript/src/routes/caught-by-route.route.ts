import { NextFunction, Request, Response, Router } from 'express';
import { HttpError } from '../errors/http.error';
import { contextualizeError } from '../../catch-to-llm/dist';

const caughtByRoute = Router();

// URL: http://localhost:3000/tests/caught-by-route
// Define a route handler for GET requests to 'tests/caught-by-route'
caughtByRoute.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new HttpError(418, 'This error will be caught by Route');
  } catch (error) {
    debugger;
    contextualizeError(error);
  } finally {
    res.status(200).send('Error caught by Route');
  }
});

export { caughtByRoute };
