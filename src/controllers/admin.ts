import AppError from "../utils/app-error";
import { catchAsync } from "../utils/catch-async";
import { STATUSES } from "../config/constants";
import { StatusCodes } from "http-status-codes";
import {
  createAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  createOutreachProgram,
  fetchOutreachProgram,
  fetchOutreachPrograms,
  updateOutreachProgram,
  deleteOutreachProgram,
  fetchTickets,
  updateTicket,
} from "../db/queries/admin";
import type {
  UpdateAdminData,
  CreateAdminData,
  OutreachProgramData,
} from "../types/chps-compound";

export const addAdmin = catchAsync(async (req, res) => {
  const data = req.body as CreateAdminData;
  const admin = await createAdmin(data);
  return res
    .status(StatusCodes.CREATED)
    .json({ status: STATUSES.SUCCESS, data: admin });
});

export const fetchAdmin = catchAsync(async (req, res, next) => {
  const admin = await getAdmin(req.params.id);
  if (!admin) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  return res.json({ status: STATUSES.SUCCESS, data: admin });
});
export const fetchCurrentAdmin = catchAsync(async (req, res, next) => {
  const admin = await getAdmin(req.auth!.actor);
  if (!admin) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  return res.json({ status: STATUSES.SUCCESS, data: admin });
});

export const fetchAdmins = catchAsync(async (req, res) => {
  const admins = await getAdmins();
  return res.json({ status: STATUSES.SUCCESS, data: admins });
});

export const editAdmin = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body as UpdateAdminData;
  const updatedAdmin = await updateAdmin(id, data);

  if (!updatedAdmin) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  return res.json({ status: STATUSES.SUCCESS, data: updatedAdmin });
});

export const removeAdmin = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deletedAdmin = await deleteAdmin(id);

  if (!deletedAdmin) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  return res.status(StatusCodes.NO_CONTENT).json({ status: STATUSES.SUCCESS });
});

// outreach program
export const addOutreachProgram = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body as OutreachProgramData;
  const program = await createOutreachProgram(id, data);
  return res
    .status(StatusCodes.CREATED)
    .json({ status: STATUSES.SUCCESS, data: program });
});

export const getOutreachProgram = catchAsync(async (req, res, next) => {
  const program = await fetchOutreachProgram(req.params.pid);
  if (!program) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  return res.json({ status: STATUSES.SUCCESS, data: program });
});

export const getOutreachPrograms = catchAsync(async (req, res) => {
  const programs = await fetchOutreachPrograms();
  return res.json({ status: STATUSES.SUCCESS, data: programs });
});

export const editOutreachProgram = catchAsync(async (req, res, next) => {
  const pid = req.params.pid;
  const data = req.body as OutreachProgramData;
  const program = await updateOutreachProgram(pid, data);

  if (!program) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  return res.json({ status: STATUSES.SUCCESS, data: program });
});

export const removeOutreachProgram = catchAsync(async (req, res, next) => {
  const program = await deleteOutreachProgram(req.params.pid);

  if (!program) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  return res.status(StatusCodes.NO_CONTENT).json({ status: STATUSES.SUCCESS });
});

// ticket
export const getTickets = catchAsync(async (req, res) => {
  const tickets = await fetchTickets();
  return res.json({ status: STATUSES.SUCCESS, data: tickets });
});
export const editTicket = catchAsync(async (req, res, next) => {
  const ticketId = req.params.tid;
  const data = req.body;
  const ticket = await updateTicket(ticketId, data);

  if (!ticket) return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  return res.json({ status: STATUSES.SUCCESS, data: ticket });
});
