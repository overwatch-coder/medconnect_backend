import { User, ResetToken } from "../models/user";
import { authUtil } from "../../utils/auth";
import type { ObjectId } from "mongodb";
import type { UserData } from "../../types/chps-compound";

//User
export const createUser = async (data: UserData) => {
  const hashedPassword = await authUtil.generateHashedPassword(data.password);
  return await User.create({ ...data, password: hashedPassword });
};
export const getUserById = async (id: string) => await User.findById(id);
export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const updateUserPassword = async (id: string, password: string) => {
  const hashedPassword = await authUtil.generateHashedPassword(password);
  return await User.findByIdAndUpdate(id, { password: hashedPassword });
};

//Reset Token
export const createResetToken = async (user: ObjectId) => {
  const token = crypto.randomUUID();
  return await ResetToken.create({ user, token });
};

export const getResetToken = async (user: ObjectId, token: string) => {
  return await ResetToken.findOne({ user, token });
};
export const deleteResetToken = async (id: string) =>
  await ResetToken.findByIdAndDelete(id);
