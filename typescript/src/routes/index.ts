import { Router } from 'express';
import { jsonCheckRouter } from './jsoncheck.route';
import { errorRouter } from './error.route';
import { helloRouter } from './hello.route';

const router = Router();

// Use the jsonCheckRouter for the '/jsonCheck' path
router.use('/jsoncheck', jsonCheckRouter);

// Use the helloRouter for the '/hello' path
router.use('/hello', helloRouter);

// Use the errorRouter for the '/error' path
router.use('/error', errorRouter);

export { router };
