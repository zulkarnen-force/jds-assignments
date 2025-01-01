import winston from "winston";
import path from "path";
import fs from "fs";
import config from "@config/index"
import DailyRotateFile from "winston-daily-rotate-file";

// const logger = winston.createLogger({
//   level: "debug",
//   format: winston.format.json(),
//   transports: [new winston.transports.Console({})],
// });



// Define the log directory and filename
// const logDir = path.join(__dirname, 'logs');
const logDir = path.resolve('logs');
const logFileName = 'app.log';

// Create the log directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}


// Define a custom log format function
const customFormat = winston.format((info) => {
  const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  info.timestamp = timestamp;
  return info;
});

// Define the transport for daily log rotation
const transformFile : DailyRotateFile= new DailyRotateFile({
  handleExceptions : true,
  filename: path.join(logDir, 'app-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m', // Rotate logs when they reach 20MB
  maxFiles: '7d', // Keep logs for 14 days
});
const transformConsole = new winston.transports.Console({
  // handleExceptions : true,
});
// Define transport options based on tipe
let transportOptions = !config.LogFile ? [transformConsole] : [transformFile];
// Create a Winston logger instance with daily log rotation
export const logger = winston.createLogger({
  level: 'debug', // Set the log level
  format: !config.LogFile ? winston.format.json() : winston.format.combine(
    winston.format.timestamp(), // Add a timestamp to each log entry
    customFormat(), // Apply the custom log format
    winston.format.json() // Log entries as JSON
  ),
  transports: transportOptions,
  defaultMeta: ''
});

if (config.LogFile) logger.exceptions.handle(transformFile);



// export {
//   logger, logging
// }

