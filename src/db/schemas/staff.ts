import { z } from "zod";
import { STAFF_ROLES } from "../../config/constants";

export const roleSchema = z.object({
  type: z.enum(STAFF_ROLES),
  staffId: z.string(),
});

export const staffSchema = z
  .object({
    fullName: z.string(),
    dateOfBirth: z.string(),
    dateOfHire: z.string(),
    position: z.string(),
    email: z.string().email(),
    contact: z.string().min(8),
    gender: z.enum(["Male", "Female", "Other"]),
    workSchedule: z.array(z.string()),
    chpsCompoundId: z.string(),
  })
  .strict();
