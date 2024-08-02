import mongoose from "mongoose";
import AppError from "../../utils/app-error";
import { TICKET_PRIORITY, TICKET_STATUSES } from "../../config/constants";
import { TicketIdGenerator } from "../../services/id";
import { StatusCodes } from "http-status-codes";

const requiredString = { type: String, required: true };

const admin = new mongoose.Schema(
  {
    name: requiredString,
    contact: requiredString,
    authUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profilePictureUrl: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

const outreachProgram = new mongoose.Schema(
  {
    title: requiredString,
    description: requiredString,
    organizerName: requiredString,
    organizerPhone: requiredString,
    organization: requiredString,
    location: requiredString,
    targetGroup: requiredString,
    programDate: requiredString,
    programStartTime: requiredString,
    estimatedAudience: { type: Number, required: true },
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

const ticket = new mongoose.Schema(
  {
    ticketId: requiredString,
    subject: requiredString,
    description: requiredString,
    imageUrl: requiredString,
    requestedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChpsCompund",
      required: true,
    },
    status: {
      type: String,
      enum: TICKET_STATUSES,
      default: TICKET_STATUSES[0],
    },
    priority: {
      type: String,
      enum: TICKET_PRIORITY,
      default: TICKET_PRIORITY[0],
    },
  },
  { timestamps: true }
);

ticket.pre("validate", async function (next) {
  const idGenerator = new TicketIdGenerator(this, this.ticketId);
  const { status, data } = await idGenerator.generate();

  if (!status) {
    const error = new AppError(data, StatusCodes.PRECONDITION_FAILED);
    return next(error);
  }

  this.ticketId = data;
  next();
});

export const Admin = mongoose.model("Admin", admin);
export const Ticket = mongoose.model("Ticket", ticket);
export const OutreachProgram = mongoose.model(
  "OutreachProgram",
  outreachProgram
);
