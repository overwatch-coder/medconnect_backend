import type { Request } from "express";
import type { TokenData } from "./chps-compound";

export interface AuthenticatedRequest extends Request {
  auth?: TokenData;
  fileUrl?: string;
}

