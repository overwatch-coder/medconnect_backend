import { z } from "zod";

export const inventorySchema = z
  .object({
    name: z.string(),
    type: z.string(),
    inStock: z.number(),
    receivedDate: z.string(),
    expiryDate: z.string(),
    manufacturer: z.string(),
  })
  .strict();
