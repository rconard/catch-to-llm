import * as winston from 'winston';

// Define the Winston logger configuration
export const logger = winston.createLogger({
  // Set the log level to 'info' to capture logs at and above this level
  level: 'info',
  // Define the format of the log messages
  format: winston.format.combine(
    // Add a timestamp to the log messages
    winston.format.timestamp({
      // Specify the timestamp format as 'YYYY-MM-DD HH:mm:ss'
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    // Format the log messages as JSON objects
    winston.format.json()
  ),
  // Define the transports for logging
  transports: [
    // Log messages to the console
    new winston.transports.Console(),
    // Log messages to a file named 'error.log' for errors only
    new winston.transports.File({
      filename: 'error.log',
      // Only log messages with level 'error' or higher to this file
      level: 'error',
    }),
    // Log messages to a file named 'combined.log' for all levels
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
