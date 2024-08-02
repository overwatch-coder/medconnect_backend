const mongoose = require("mongoose");

const requiredString = { type: String, required: true };
const inventory = new mongoose.Schema(
  {
    name: requiredString,
    type: requiredString,
    manufacturer: requiredString,
    inStock: { type: Number, required: true },
    receivedDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    chpsCompoundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChpsCompound",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Inventory = mongoose.model("Inventory", inventory);
