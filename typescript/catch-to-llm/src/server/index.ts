import express from 'express';
import cors from 'cors';
import { AugmentedStackTrace } from '../initialize.d';
import { contextualizeError as serverContextualizeError } from '../node';

const app = express();
const port = process.env.PORT || 5001;

// Enable CORS for all origins (not recommended for production)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

app.post('/contextualize', async (req, res) => {
  try {
    // Extract error data from request body
    const { errorData, options } = req.body;

    // Validate incoming data
    if (!errorData) {
      return res.status(400).json({ error: 'Missing error data.' });
    }

    const runtimeError = new Error();
    runtimeError.name = errorData.name;
    runtimeError.message = errorData.message;
    runtimeError.stack = errorData.stack;
    (runtimeError as any).catchToLLM = errorData.catchToLLM as AugmentedStackTrace;

    // Call the server-side contextualization logic
    await serverContextualizeError(runtimeError, options);

    // Respond with success
    res.json({ message: 'Contextualized error data saved.' });
  } catch (err) {
    console.error('Error processing request:', err);
    res.status(500).json({ error: 'Failed to contextualize error.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Debug server listening on port ${port}`);
});
