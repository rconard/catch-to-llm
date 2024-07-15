import express, { json, urlencoded } from 'express';
import { errorHandler } from './middlewares/error-handler.middleware';
import { jsonParserMiddleware } from './middlewares/json-parser.middleware';
import { router } from './routes';
import { logger } from './utils/logger';

const app = express();

// Middleware to parse URL-encoded bodies
app.use(urlencoded({ extended: true }));

// Middleware to log incoming requests
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Custom middleware to parse JSON and handle errors
app.use(jsonParserMiddleware);

// Middleware to parse JSON bodies
// app.use(express.json({
//   verify: (_, __, buf, encoding) => {
//     if (buf && buf.length) {
//       try {
//         // Cast encoding to BufferEncoding type explicitly if it's not undefined
//         const bufferEncoding = encoding as BufferEncoding | undefined;
//         const parsedBody = JSON.parse(buf.toString(bufferEncoding));
//         console.log(parsedBody);
//       } catch (e) {
//         throw new Error('Invalid JSON');
//       }
//     }
//     return true;
//   }
// }));

// Use the defined routes
app.use('/api', router);

// Global error handling middleware
app.use(errorHandler);

export default app;
