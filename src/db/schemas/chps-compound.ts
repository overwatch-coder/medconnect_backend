import { z } from "zod";

export const chpsCompoundSchema = z
  .object({
    name: z.string().min(6),
    contact: z.string().min(9),
    emergencyContact: z.string().min(9),
    location: z.string(),
    district: z.string(),
    region: z.string(),
    operatingHours: z.string(),
    availableServices: z.array(z.string()).default([]),
    hasAcceptedTC: z.boolean(),
    profilePictureUrl: z.string().url(),
    authUserId: z.string(),
    createdById: z.string(),
  })
  .strict();

export const updateChpsCompoundSchema = z
  .object({
    name: z.string().min(6),
    contact: z.string().min(9),
    emergencyContact: z.string().min(9),
    location: z.string(),
    district: z.string(),
    region: z.string(),
    operatingHours: z.string(),
    availableServices: z.array(z.string()).default([]),
    hasAcceptedTC: z.boolean(),
    profilePictureUrl: z.string().url(),
  })
  .strict();

export const addTicketSchema = z
  .object({
    subject: z.string(),
    description: z.string(),
    imageUrl: z.string().url().optional().default(""),
  })
  .strict();
