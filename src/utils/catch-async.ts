import { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../types/express";

type RequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;

export function catchAsync(handler: RequestHandler) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
}
