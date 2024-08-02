import mongoose from "mongoose";
import { config } from "./env";

export const dbConnect = async function () {
  try {
    await mongoose.connect(config.ATLAS_URI);
    return true;
  } catch (err) {
    console.log({ DB_CONN_ERR: err });
    return false;
  }
};
