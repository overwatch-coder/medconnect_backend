import { Staff, Role } from "../models/staff";
import { checkUniques } from "./index";
import { getChpsCompoundByAuthId } from "./chps-compound";
import { getUserById } from "./user";

import type { StaffData, RoleData } from "../../types/chps-compound";

//Roles
export const createRole = async (data: RoleData) => await Role.create(data);
export const getRoleByStaffId = async (id: string) =>
  await Role.findOne({ staffId: id });
export const updateRole = async (data: RoleData) =>
  await Role.findOneAndUpdate({ staffId: data.staffId }, data, { new: true });

//Staff
export const getStaffById = async (id: string) => await Staff.findById(id);
export const getChpsStaff = async (cid: string, id: string) =>
  await Staff.find({ chpsCompoundId: cid, _id: id });
export const createStaff = async (data: StaffData) => {
  const staff = await Staff.create(data);
  await createRole({ type: "Staff", staffId: staff._id.toString() });
  return staff;
};
export const removeStaff = async (cid: string, id: string) =>
  await Staff.findOneAndDelete({ chpsCompoundId: cid, _id: id });

export const getDefaultStaff = async (userId: string) => {
  const chps = await getChpsCompoundByAuthId(userId);
  return await Staff.findOne({
    chpsCompoundId: chps?._id,
    staffId: "default_Staff",
  });
};
export const getStaffs = async (authId: string) => {
  const user = await getUserById(authId);
  if (user?.isSuperAdmin) return await Staff.find({});

  const chps = await getChpsCompoundByAuthId(authId);
  return Staff.find({ chpsCompoundId: chps!._id });
};

export const editStaff = async (cid: string, id: string, data: StaffData) => {
  const updateData = await checkUniques({
    model: Staff,
    data,
    filter: { chpsCompoundId: cid, _id: id },
  });

  if (!updateData) return null;
  return Staff.findByIdAndUpdate(id, updateData, { new: true });
};
