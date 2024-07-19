import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'catch-to-llm/node.ts', // Entry point for Node.js
  output: {
    file: 'dist/catch-to-llm.cjs', // CommonJS format for Node.js
    format: 'cjs',
    exports: 'named',
  },
  plugins: [
    resolve(), // Resolve Node.js module imports
    typescript({
      tsconfig: './tsconfig.server.json',
    }),
  ],
});
