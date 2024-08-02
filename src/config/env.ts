import dotenv from "dotenv";
import { z } from "zod";
import { FE_URLS } from "./constants";

const EnvSchema = z.object({
  PORT: z.coerce.number(),
  ATLAS_URI: z.string(),
  JWT_SECRET: z.string(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.coerce.number(),
  EMAIL_USER: z.string().email(),
  EMAIL_PASSWORD: z.string(),
  NODE_ENV: z.enum(["development", "production"]),
});

dotenv.config();

try {
  EnvSchema.parse(process.env);
} catch (err) {
  process.exit(1);
}

export const config = EnvSchema.parse(process.env);
export const getFEUrl = () =>
  config.NODE_ENV === "development" ? FE_URLS.DEV : FE_URLS.VERCEL;
