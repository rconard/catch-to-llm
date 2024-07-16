import express, { json, urlencoded } from 'express';
import path from 'path';
import { router as API } from './routes';

const app = express();

// Middleware to parse URL-encoded bodies
app.use(urlencoded({ extended: true }));

// Serve static files from the appropriate directory
const publicPath = path.join(__dirname, '..', process.env.NODE_ENV === 'production' ? 'dist/public' : 'public');
app.use(express.static(publicPath));

// Use the defined routes
app.use('/api', API);

// Catch-all route to serve index.html (important for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

export default app;
