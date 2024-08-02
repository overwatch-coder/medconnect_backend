import mongoose from "mongoose";
import AppError from "../../utils/app-error";
import { STAFF_ROLES } from "../../config/constants";
import { StaffIdGenerator } from "../../services/id";
import { StatusCodes } from "http-status-codes";

const requiredString = {
  type: String,
  required: true,
};

const role = new mongoose.Schema({
  type: {
    type: String,
    enum: STAFF_ROLES,
    required: true,
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
});

const staff = new mongoose.Schema(
  {
    staffId: requiredString,
    fullName: requiredString,
    dateOfBirth: requiredString,
    dateOfHire: requiredString,
    contact: requiredString,
    position: requiredString,
    email: {
      ...requiredString,
      unique: true,
      lowercase: true,
    },
    gender: {
      ...requiredString,
      enum: ["Male", "Female", "Other"],
    },
    workSchedule: [String],
    chpsCompoundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChpsCompound",
      required: true,
    },
  },
  { timestamps: true }
);

staff.pre("validate", async function (next) {
  const idGenerator = new StaffIdGenerator(this, this.staffId);
  const { status, data } = await idGenerator.generate();

  if (!status) {
    const error = new AppError(data, StatusCodes.PRECONDITION_FAILED);
    return next(error);
  }

  this.staffId = data;
  next();
});

export const Role = mongoose.model("Role", role);
export const Staff = mongoose.model("Staff", staff);
