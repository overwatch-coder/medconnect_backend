import { ChpsCompound, OutreachParticipation } from "../models/chps-compound";
import { createUser } from "./user";
import { createRole, createStaff } from "./staff";
import { checkUniques } from "./index";
import type { ObjectId } from "mongodb";
import type {
  ChpsCompundData,
  UpdateChpsCompoundData,
  OutreachParticipationData,
  StaffData,
} from "../../types/chps-compound";

export const createChpsCompound = async (data: ChpsCompundData) => {
  const { name, email, password } = data;
  const { _id } = await createUser({ email, password, isSuperAdmin: false });
  const chpsCompound = await ChpsCompound.create({ ...data, authUserId: _id });

  const defaultStaffData: StaffData & { staffId: string } = {
    email,
    fullName: name,
    contact: data.contact,
    gender: "Other",
    staffId: "default_Staff",
    position: "Staff",
    workSchedule: [],
    dateOfBirth: new Date().toISOString(),
    dateOfHire: new Date().toISOString(),
    chpsCompoundId: chpsCompound._id.toString(),
  };

  const defaultStaff = await createStaff(defaultStaffData);
  await createRole({ type: "Staff", staffId: defaultStaff._id.toString() });
  return {
    chpsCompound: chpsCompound.toObject(),
    staff: defaultStaff.toObject(),
  };
};
export const updateChpsCompound = async (
  id: string,
  data: UpdateChpsCompoundData
) => {
  const updateData = await checkUniques({
    model: ChpsCompound,
    data,
    filter: { _id: id },
  });
  if (!updateData) return null;
  return await ChpsCompound.findByIdAndUpdate(id, data, { new: true });
};
export const getAllChpsCompounds = async () => await ChpsCompound.find({});
export const getChpsCompoundById = async (id: string) =>
  await ChpsCompound.findById(id);
export const getChpsCompoundByAuthId = async (id: string) =>
  await ChpsCompound.findOne({ authUserId: id });
export const deleteChpsCompound = async (id: ObjectId) =>
  await ChpsCompound.findByIdAndDelete(id);

//OutreachParticipation
export const createParticipation = async (
  id: string,
  data: OutreachParticipationData
) => await OutreachParticipation.create({ ...data, chpsCompoundId: id });
export const updateParticipation = async (
  chpsId: string,
  pid: string,
  data: OutreachParticipationData
) =>
  await OutreachParticipation.findOneAndUpdate(
    {
      _id: pid,
      chpsCompoundId: chpsId,
    },
    data,
    { new: true }
  );

export const deactivateActiveParticipations = async (id: string) =>
  await OutreachParticipation.updateMany(
    { outreachProgramId: id, status: true },
    { $set: { status: false } }
  );
