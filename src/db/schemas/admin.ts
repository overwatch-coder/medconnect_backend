import { z } from "zod";
import {
  OUTREACH_ACTIONS,
  TICKET_PRIORITY,
  TICKET_STATUSES,
} from "../../config/constants";

export const adminSchema = z
  .object({
    name: z.string().min(5),
    contact: z.string().min(9),
    authUserId: z.string(),
    profilePictureUrl: z.string().url(),
  })
  .strict();

export const createAdminSchema = z
  .object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(8),
    contact: z.string().min(9),
    profilePictureUrl: z.string().url(),
  })
  .strict();

export const updateAmdinSchema = z
  .object({
    contact: z.string().min(9),
    profilePictureUrl: z.string().url(),
  })
  .strict();

export const outreachProgramSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    organizerName: z.string(),
    organizerPhone: z.string(),
    organization: z.string(),
    location: z.string(),
    targetGroup: z.string(),
    estimatedAudience: z.number(),
    programDate: z.string(),
    programStartTime: z.string(),
  })
  .strict();

export const outreachParticipationSchema = z
  .object({
    outreachProgramId: z.string(),
    choice: z.enum(OUTREACH_ACTIONS),
    supportType: z.string().optional(),
    status: z.boolean(),
  })
  .strict();

export const updateTicketSchema = z
  .object({
    status: z.enum(TICKET_STATUSES),
    priority: z.enum(TICKET_PRIORITY),
  })
  .strict();
