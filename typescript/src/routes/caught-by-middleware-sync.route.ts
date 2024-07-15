import { NextFunction, Request, Response, Router } from 'express';

const caughtBySyncMiddleware = Router();

// URL: http://localhost:3000/tests/caught-by-middleware
// Define a route handler for GET requests to 'tests/caught-by-middleware'
caughtBySyncMiddleware.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'Request successful',
  });
});

export { caughtBySyncMiddleware };
