// ./src/server.tsx

import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from "react-router-dom/server";
import { router as API } from './routes'; 
import App from './webapp/App';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use('/api', API);

app.get('*', (req, res) => {
  // Render the app to a string
  const appHtml = renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  // Send the rendered page back to the client
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>React SSR App</title>
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script src="/bundle.js"></script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
