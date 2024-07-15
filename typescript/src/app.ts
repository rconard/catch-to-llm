import express, { json, urlencoded } from 'express';
import { router } from './routes';

const app = express();

// Middleware to parse URL-encoded bodies
app.use(urlencoded({ extended: true }));

// Use the defined routes
app.use('/tests', router);

export default app;
