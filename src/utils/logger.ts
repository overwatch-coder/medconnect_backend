import winston from "winston";
import { APP_LOG, REQUEST_LOG } from "../config/constants";
import { Request, NextFunction, Response } from "express";

const { timestamp, printf, combine } = winston.format;
const formatter = (log: Record<string, string>) =>
  `${log.timestamp} - ${log.level.toUpperCase()} - ${JSON.stringify(
    log.message
  )}`;

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS" }),
    printf(formatter)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: APP_LOG }),
  ],
});

const requestLogger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS" }),
    printf(formatter)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: REQUEST_LOG }),
  ],
});

export const rlogger = (req: Request, res: Response, next: NextFunction) => {
  const { ip: source, method, originalUrl: url } = req;
  requestLogger.info({ source, method, url });
  next();
};
