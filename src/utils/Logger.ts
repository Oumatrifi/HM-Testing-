import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';

const logsDir = path.resolve(process.cwd(), 'outputs/logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

export const Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] [${level}]: ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'execution.log'),
    }),
  ],
});
