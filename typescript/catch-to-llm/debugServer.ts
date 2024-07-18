// catch-to-llm/debugServer.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { CodeContext } from './index.d';
import { AugmentedStackTrace } from './initialize';
import { contextualizeError as serverContextualizeError } from './index';

const app = express();
const port = 3001; // Choose a port for your debug server

app.use(bodyParser.json({ limit: '10mb' })); // Increase limit for larger code snippets
app.use(cors()); // Enable CORS

app.post('/debug', async (req, res) => {
  const data = req.body as { stackTrace: AugmentedStackTrace, error: Error };
  if (!data || !data.stackTrace || !data.error) {
    return res.status(400).send('Invalid request data.');
  }

  try {
    // Perform analysis on the server
    await serverContextualizeError(data.error, { outputFile: 'browser-error-context.json' });
    res.send('Contextualized error data received and processed.');
  } catch (error) {
    console.error('Error processing debug data:', error);
    res.status(500).send('Error processing debug data.');
  }
});

app.listen(port, () => {
  console.log(`catch-to-llm Debug server listening at http://localhost:${port}`);
});
