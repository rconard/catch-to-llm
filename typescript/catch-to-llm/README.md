# Catch-to-LLM

```typescript
// server.ts
import express from 'express';
import { initializeCatchToLLM } from 'catch-to-llm'; 
import { contextualizeError } from 'catch-to-llm/dist/node';

// Initialize catch-to-llm (server-side) 
initializeCatchToLLM();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  try {
    // ... your code that might throw an error ...
  } catch (error) {
    contextualizeError(error); 
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

```typescript
// client.ts
import { initializeCatchToLLM } from 'catch-to-llm'; 
import { contextualizeError } from 'catch-to-llm/dist/browser'; 

// Initialize catch-to-llm (client-side)
initializeCatchToLLM({ serverPort: 5001 });

// ... your client-side code ...

try {
  // ... your code that might throw an error ...
} catch (error) {
  contextualizeError(error); 
  // ... your client-side error handling ...
}
```
