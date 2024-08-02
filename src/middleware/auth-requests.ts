import AppError from "../utils/app-error";
import { catchAsync } from "../utils/catch-async";
import { authUtil } from "../utils/auth";
import { StatusCodes } from "http-status-codes";
import type { TokenData } from "../types/chps-compound";
import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../types/express";

export function authorize(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return next(new AppError("Not allowed", StatusCodes.UNAUTHORIZED));
  }

  const token = auth.split(" ")[1];
  const { valid, data } = authUtil.verifyToken(token);

  if (!valid) {
    const message = "Invalid or Expired token";
    return next(new AppError(message, StatusCodes.FORBIDDEN));
  }

  req.auth = data as TokenData;
  return next();
}

export const authorizeAdmin = catchAsync(
  async (req, res: Response, next: NextFunction) => {
    const auth = req.auth!;

    if (auth.role === "Admin") return next();
    return next(new AppError("Not allowed", StatusCodes.UNAUTHORIZED));
  }
);
