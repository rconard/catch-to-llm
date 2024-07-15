// .src/middlewares/json-parser.middleware.ts
import express, { json, urlencoded } from 'express';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http.error';
import { contextualizeError } from '../../genai-debugging';

// Utilize express.json() to access the raw body buffer
export const jsonParserMiddleware = express.json({
  verify: (req: Request, res: Response, buf: Buffer) => {
    try {
      const rawBody = buf.toString();
      // Check if the request has a body and a 'Content-Type' header
      if (rawBody && rawBody.length && req.headers['content-type']) {
        // Attempt to parse the request body as JSON
        JSON.parse(rawBody);
      }
    } catch (error) {
      contextualizeError(error);
      // If parsing fails, throw a custom 'HttpError' with a 400 Bad Request status
      throw new HttpError(400, 'Invalid JSON body');
    }
  },
});
