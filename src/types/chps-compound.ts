import { z } from "zod";
import { STAFF_ROLES } from "../config/constants";
import {
  updateAmdinSchema,
  createAdminSchema,
  outreachProgramSchema,
  outreachParticipationSchema,
  updateTicketSchema,
} from "../db/schemas/admin";
import { roleSchema, staffSchema } from "../db/schemas/staff";
import { userSchema, resetPasswordDataSchema } from "../db/schemas/user";
import { inventorySchema } from "../db/schemas/inventory";
import {
  addTicketSchema,
  chpsCompoundSchema,
  updateChpsCompoundSchema,
} from "../db/schemas/chps-compound";

type ChpsData = z.infer<typeof chpsCompoundSchema>;
export type UpdateAdminData = z.infer<typeof updateAmdinSchema>;
export type CreateAdminData = z.infer<typeof createAdminSchema>;
export type OutreachProgramData = z.infer<typeof outreachProgramSchema>;
export type AddTicketData = z.infer<typeof addTicketSchema>;
export type UpdateTicketData = z.infer<typeof updateTicketSchema>;
export type OutreachParticipationData = z.infer<
  typeof outreachParticipationSchema
>;

export type LoginData = z.infer<typeof userSchema>;
export type UserData = z.infer<typeof userSchema>;
export type RoleData = z.infer<typeof roleSchema>;
export type StaffData = z.infer<typeof staffSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordDataSchema>;
export type ChpsCompundData = ChpsData & UserData;
export type UpdateChpsCompoundData = z.infer<typeof updateChpsCompoundSchema>;
export type InventoryData = z.infer<typeof inventorySchema>;
export type TokenData = {
  user: string;
  actor: string;
  role: (typeof STAFF_ROLES)[number];
};
