import { Request, Response, Router } from 'express';

const helloRouter = Router();

// Define a route handler for GET requests to '/hello'
helloRouter.get('/', (req: Request, res: Response) => {
  // Send a JSON response with a 'foobar' message
  res.json({ message: 'foobar' });
});

export { helloRouter };
