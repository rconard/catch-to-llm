import { NextFunction, Request, Response, Router } from 'express';

const jsonCheckRouter = Router();

// Define a route handler for POST requests to '/echo'
jsonCheckRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    // Send the received JSON data back in the response
    res.json(req.body);
  } catch (error) {
    // Log the error for debugging
    console.error('Error processing echo request:', error);
    // Send a 500 Internal Server Error response
    res.status(500).send('Error processing request');

    // Pass the error to the next middleware function
    next(error);
  }
});

export { jsonCheckRouter };
