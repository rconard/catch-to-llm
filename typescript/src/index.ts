import app from './app';
import { initializeCatchToLLM } from '../genai-debugging';

initializeCatchToLLM();

const PORT = process.env.PORT || 3000;

app.listen(PORT);
