import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'catch-to-llm/browser.ts', // Entry point for the browser
  output: {
    file: 'dist/catch-to-llm.browser.js',
    format: 'iife', // Immediately Invoked Function Expression
    name: 'CatchToLLM', // Global variable name
    globals: {
      // Define browser globals to avoid errors when bundling
      window: 'window',
      fetch: 'fetch',
    },
  },
  plugins: [
    resolve(), // Resolve Node.js module imports
    typescript({
      tsconfig: './tsconfig.browser.json', // Your existing TypeScript configuration
    }),
  ],
});
