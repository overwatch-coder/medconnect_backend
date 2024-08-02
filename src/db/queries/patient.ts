import { checkUniques } from "./index";
import {
  Appointment,
  DiagnosisReport,
  Patient,
  VisitLog,
  MedicalHistory,
} from "../models/patient";
import { Prescription, TreatmentPlan } from "../models/patient";
import type { Model } from "mongoose";
import type {
  PatientData,
  PrescriptionData,
  TreatmentPlanData,
  PatientResourceParams,
  MedicalHistoryData,
} from "../../types/patient";

type ResourceData = PrescriptionData | TreatmentPlanData | MedicalHistoryData;

export const createPatient = async (data: PatientData) =>
  await Patient.create(data);

export const fetchPatientsByChpsId = async (chpsId: string) =>
  await Patient.find({ chpsCompoundId: chpsId });
export const fetchPatientById = async (id: string) =>
  await Patient.findById(id);
export const fetchAllPatients = async () => await Patient.find({});

export const fetchChpsPatient = async (chpsId: string, id: string) =>
  await Patient.find({ chpsCompoundId: chpsId, _id: id });

export const deleteChpsPatient = async (chpsId: string, id: string) =>
  await Patient.findOneAndDelete({ chpsCompoundId: chpsId, _id: id });

export const updateChpsPatient = async (
  chpsId: string,
  id: string,
  data: PatientData
) => {
  const updateData = await checkUniques({
    model: Patient,
    data,
    filter: { chpsCompoundId: chpsId, _id: id },
  });

  if (!updateData) return null;
  return await Patient.findByIdAndUpdate(id, updateData, { new: true });
};
export class PatientResourceQuery<T> {
  private readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public fetchResources = async (patientId: string) =>
    await this.model.find({ patientId });

  public fetchResource = async (params: PatientResourceParams) =>
    await this.model.findOne({ patientId: params.pid, _id: params.aid });

  public createResource = async (patientId: string, data: ResourceData) =>
    await this.model.create({ ...data, patientId });

  public deleteResource = async (params: PatientResourceParams) =>
    await this.model.findOneAndDelete({
      patientId: params.pid,
      _id: params.aid,
    });

  public updateResource = async (
    params: PatientResourceParams,
    data: ResourceData
  ) =>
    await this.model.findOneAndUpdate(
      { _id: params.aid, patientId: params.pid },
      data,
      { new: true, runValidators: true }
    );
}

export const TreatmentPlanQuery = new PatientResourceQuery(TreatmentPlan);
export const PresciptionQuery = new PatientResourceQuery(Prescription);
export const DiagnosisReportQuery = new PatientResourceQuery(DiagnosisReport);
export const VisitLogQuery = new PatientResourceQuery(VisitLog);
export const AppointmentQuery = new PatientResourceQuery(Appointment);
export const MedicalHistoryQuery = new PatientResourceQuery(MedicalHistory);

export type PatientResourceQueryInstance<T> = PatientResourceQuery<T>;
