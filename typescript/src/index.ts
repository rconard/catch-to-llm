import dotenv from 'dotenv';
import app from './app';
import { initializeCatchToLLM } from '../genai-debugging';

dotenv.config(); // Load environment variables from .env

initializeCatchToLLM();

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});
