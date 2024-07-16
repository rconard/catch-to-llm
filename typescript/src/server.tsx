import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './webapp/App';
import { router as API } from './routes'; // Import API routes

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies (needed for API)
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Use API routes under '/api' path
app.use('/api', API);

// SSR for all other routes
app.get('*', (req, res) => {
  const html = renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>React SSR App</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script src="/bundle.js"></script> 
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
