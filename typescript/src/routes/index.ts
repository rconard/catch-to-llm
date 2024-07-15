import { Router } from 'express';
import { errorHandler } from '../middlewares/error-handler.middleware';
import { errorCatchSyncMiddleware } from '../middlewares/error-catch-sync.middleware';
import { errorCatchAsyncMiddleware } from '../middlewares/error-catch-async.middleware';
import { caughtByRoute } from './caught-by-route.route';
import { caughtByExpress } from './caught-by-express.route';
import { caughtByNextExpress } from './caught-by-next-express.route';
import { caughtByCustomErrorHandler } from './caught-by-custom-error-handler.route';
import { caughtByNextCustomErrorHandler } from './caught-by-next-custom-error-handler.route';
import { caughtByAsyncMiddleware } from './caught-by-middleware-async.route';
import { caughtBySyncMiddleware } from './caught-by-middleware-sync.route';
import { libraryCaughtByNextCustomErrorHandler } from './library-caught-by-next-custom-error-handler.route';

const router = Router();

// Use the caughtByRoute for the '/caught-by-route' path
// Send a GET request
router.use('/caught-by-route', caughtByRoute);

// Use the caughtByExpress for the '/caught-by-express' path
// Send a GET request
router.use('/caught-by-express', caughtByExpress);

// Use the caughtByNextExpress for the '/caught-by-express' path
// Send a GET request
router.use('/caught-by-next-express', caughtByNextExpress);

// Use the caughtByCustomErrorHandler for the '/caught-by-custom-error-handler' path
// Send a GET request
router.use('/caught-by-custom-error-handler', caughtByCustomErrorHandler, errorHandler);

// Use the caughtByNextCustomErrorHandler for the '/caught-by-next-custom-error-handler' path
// Send a GET request
router.use('/caught-by-next-custom-error-handler', caughtByNextCustomErrorHandler, errorHandler);

// Use the caughtByAsyncMiddleware for the '/caught-by-middleware' path
// Send a GET request
router.use('/caught-by-middleware-sync', errorCatchSyncMiddleware, caughtBySyncMiddleware);

// Use the caughtByAsyncMiddleware for the '/caught-by-middleware' path
// Send a GET request
router.use('/caught-by-middleware-async', errorCatchAsyncMiddleware, caughtByAsyncMiddleware);

// Use the libraryCaughtByNextCustomErrorHandler for the '/caught-by-next-custom-error-handler' path
// Send a GET request
router.use('/library-caught-by-next-custom-error-handler', libraryCaughtByNextCustomErrorHandler, errorHandler);

export { router };
