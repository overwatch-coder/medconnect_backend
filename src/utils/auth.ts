import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import type { TokenData } from "../types/chps-compound";
class AuthUtility {
  private tokenBlacklist = new Set<string>();
  private jwtSecret: string;
  private bcryptRounds = 10;

  constructor(secret: string) {
    this.jwtSecret = secret;
    this.startExpiredTokensCleanup();
  }

  private isTokenBlacklisted(token: string) {
    return this.tokenBlacklist.has(token);
  }
  private decodeToken(token: string) {
    try {
      return jwt.verify(token, this.jwtSecret) as TokenData & { iat: number };
    } catch (error) {
      return null;
    }
  }
  private startExpiredTokensCleanup() {
    setInterval(() => {
      for (const token of this.tokenBlacklist) {
        const { iat } = this.decodeToken(token) as { iat: number };
        if (Date.now() > iat) this.tokenBlacklist.delete(token);
      }
    }, 15 * 60 * 1000);
  }

  public async generateHashedPassword(password: string) {
    const salt = await bcrypt.genSalt(this.bcryptRounds);
    return await bcrypt.hash(password, salt);
  }
  public async isPasswordValid(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
  public generateToken(data: TokenData) {
    return jwt.sign(data, this.jwtSecret, { expiresIn: "1h" });
  }
  public addTokenToBlacklist(token: string) {
    this.tokenBlacklist.add(token);
  }
  public verifyToken(token: string) {
    if (this.isTokenBlacklisted(token)) return { valid: false };
    const data = this.decodeToken(token);
    return { valid: !!data, data };
  }

  public generatetempPassword() {
    return crypto
      .randomBytes(this.bcryptRounds)
      .toString("base64")
      .slice(0, this.bcryptRounds)
      .replace(/\+/g, "0")
      .replace(/\//g, "0");
  }
}

export const authUtil = new AuthUtility(config.JWT_SECRET);
