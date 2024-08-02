import { Admin, OutreachProgram, Ticket } from "../models/admin";
import { createUser } from "./user";
import { deactivateActiveParticipations } from "./chps-compound";
import type {
  UpdateAdminData,
  CreateAdminData,
  OutreachProgramData,
  AddTicketData,
  UpdateTicketData,
} from "../../types/chps-compound";

export const createAdmin = async (data: CreateAdminData) => {
  const { email, password, name, contact } = data;
  const user = await createUser({ email, password, isSuperAdmin: true });
  return await Admin.create({ name, contact, authUserId: user._id });
};
export const getAdmin = async (id: string) => await Admin.findById(id);
export const getAdminByAuthId = async (id: string) =>
  await Admin.findOne({ authUserId: id });
export const getAdmins = async () => await Admin.find({});
export const deleteAdmin = async (id: string) =>
  await Admin.findByIdAndDelete(id);
export const updateAdmin = async (id: string, data: UpdateAdminData) =>
  await Admin.findByIdAndUpdate(id, data, { new: true });

// outreach programs
export const createOutreachProgram = async (
  adminId: string,
  data: OutreachProgramData
) => await OutreachProgram.create({ ...data, createdById: adminId });
export const fetchOutreachPrograms = async () => await OutreachProgram.find({});
export const fetchOutreachProgram = async (id: string) =>
  await OutreachProgram.findById(id);
export const updateOutreachProgram = async (
  id: string,
  data: OutreachProgramData
) => await OutreachProgram.findByIdAndUpdate(id, data, { new: true });
export const deleteOutreachProgram = async (id: string) => {
  await deactivateActiveParticipations(id);
  return await OutreachProgram.findByIdAndDelete(id);
};

// tickets
export const fetchTickets = async () => await Ticket.find({});
export const createTicket = async (cid: string, data: AddTicketData) =>
  await Ticket.create({ requestedById: cid, ...data });
export const fetchChpsTickets = async (cid: string) =>
  await Ticket.find({ requestedById: cid });
export const fetchTicket = async (cid: string, tid: string) =>
  await Ticket.findOne({ requestedById: cid, _id: tid });
export const updateTicket = async (tid: string, data: UpdateTicketData) =>
  await Ticket.findByIdAndUpdate(tid, data, { new: true });
export const deleteTicket = async (tid: string) =>
  await Ticket.findByIdAndDelete(tid);
