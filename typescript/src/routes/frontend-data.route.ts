import { NextFunction, Request, Response, Router } from 'express';

const frontendData = Router();

frontendData.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

export { frontendData };
