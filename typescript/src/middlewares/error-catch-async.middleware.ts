import { contextualizeError } from "../../catch-to-llm/dist";
import { HttpError } from '../errors/http.error';

export const errorCatchAsyncMiddleware = async function (req, res, next) {
  try {
    throw new HttpError(418, 'This error will be caught by Middleware');
  } catch (error) {
    contextualizeError(error);
  } finally {
    next()
  }
}
