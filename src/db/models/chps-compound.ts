import mongoose from "mongoose";
import { OUTREACH_ACTIONS } from "../../config/constants";

const requiredString = {
  type: String,
  required: true,
};

const chpsCompound = new mongoose.Schema({
  name: {
    unique: true,
    ...requiredString,
  },
  contact: requiredString,
  emergencyContact: requiredString,
  location: requiredString,
  region: requiredString,
  district: requiredString,
  operatingHours: requiredString,
  availableServices: {
    type: [String],
    default: [],
  },
  hasAcceptedTC: {
    type: Boolean,
    required: true,
  },
  profilePictureUrl: {
    type: String,
    default: "",
  },
  authUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

chpsCompound.methods.getInitials = function (): string {
  const words = this.name.split(" ");
  let initials = "";
  if (words.length === 1) {
    const word = words[0];
    initials = word.charAt(0) + word.charAt(word.length - 1);
  } else {
    initials = words[0].charAt(0) + words[1].charAt(0);
  }

  return initials.toUpperCase();
};

const outreachParticipation = new mongoose.Schema(
  {
    outreachProgramId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OutreachProgram",
      required: true,
    },
    chpsCompoundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChpsCompound",
      required: true,
    },
    choice: { type: String, enum: OUTREACH_ACTIONS, required: true },
    supportType: { type: String, required: false },
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const ChpsCompound = mongoose.model("ChpsCompound", chpsCompound);
export const OutreachParticipation = mongoose.model(
  "OutreachParticipation",
  outreachParticipation
);
