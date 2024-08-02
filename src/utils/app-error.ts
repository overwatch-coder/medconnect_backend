import { STATUSES } from "../config/constants";

export default class AppError extends Error {
  status: boolean;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = STATUSES.FAILED;

    Error.captureStackTrace(this, this.constructor);
  }
}
