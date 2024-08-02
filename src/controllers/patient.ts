import AppError from "../utils/app-error";
import { catchAsync } from "../utils/catch-async";
import { STATUSES } from "../config/constants";
import { StatusCodes } from "http-status-codes";
import {
  createPatient,
  fetchAllPatients,
  fetchPatientsByChpsId,
  fetchChpsPatient,
  deleteChpsPatient,
  updateChpsPatient,
  PresciptionQuery,
  TreatmentPlanQuery,
  DiagnosisReportQuery,
  VisitLogQuery,
  AppointmentQuery,
  MedicalHistoryQuery,
} from "../db/queries/patient";
import type { PatientResourceQueryInstance } from "../db/queries/patient";
import type { PatientData, PatientResourceParams } from "../types/patient";

export const addPatient = catchAsync(async (req, res) => {
  const { id: chpsCompoundId } = req.params;
  const data = { ...(req.body as PatientData), chpsCompoundId };
  const patient = await createPatient(data);

  return res
    .status(StatusCodes.CREATED)
    .json({ status: STATUSES.SUCCESS, data: patient });
});

export const getAllPatients = catchAsync(async (req, res) => {
  //modify to allow only for super admins
  const patients = await fetchAllPatients();
  return res.json({ status: STATUSES.SUCCESS, data: patients });
});

export const getChpsPatients = catchAsync(async (req, res) => {
  const { id } = req.params;
  const patients = await fetchPatientsByChpsId(id);
  return res.json({ status: STATUSES.SUCCESS, data: patients });
});

export const getChpsPatient = catchAsync(async (req, res, next) => {
  const { id: chpsId, pid: patientId } = req.params;
  const patient = await fetchChpsPatient(chpsId, patientId);

  if (!patient) return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  return res.json({ status: STATUSES.SUCCESS, data: patient });
});

export const removeChpsPatient = catchAsync(async (req, res, next) => {
  const { id: chpsId, pid: patientId } = req.params;
  const patient = await deleteChpsPatient(chpsId, patientId);

  if (!patient) return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.NO_CONTENT).json({ status: STATUSES.SUCCESS });
});

export const editChpsPatient = catchAsync(async (req, res, next) => {
  const { id: chpsId, pid: patientId } = req.params;
  const data = req.body as PatientData;
  const patient = await updateChpsPatient(chpsId, patientId, data);

  if (!patient) return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  return res.json({ status: STATUSES.SUCCESS, data: patient });
});

class PatientResourceController<T> {
  private readonly instance: PatientResourceQueryInstance<T>;

  constructor(instance: PatientResourceQueryInstance<T>) {
    this.instance = instance;
  }

  public getResources = catchAsync(async (req, res) => {
    const patientId = req.params.pid;
    const resources = await this.instance.fetchResources(patientId);
    return res.json({ status: STATUSES.SUCCESS, data: resources });
  });

  public getResource = catchAsync(async (req, res, next) => {
    const params = req.params as PatientResourceParams;
    const resource = await this.instance.fetchResource(params);

    if (!resource)
      return next(new AppError("Not Found", StatusCodes.NOT_FOUND));

    return res.json({ status: STATUSES.SUCCESS, data: resource });
  });

  public removeResource = catchAsync(async (req, res, next) => {
    const params = req.params as PatientResourceParams;
    const resource = await this.instance.deleteResource(params);

    if (!resource)
      return next(new AppError("Not Found", StatusCodes.NOT_FOUND));

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ status: STATUSES.SUCCESS });
  });

  public editResource = catchAsync(async (req, res, next) => {
    const params = req.params as PatientResourceParams;
    const data = req.body;
    const prescription = await this.instance.updateResource(params, data);

    if (!prescription)
      return next(new AppError("Not Found", StatusCodes.NOT_FOUND));

    return res.json({ status: STATUSES.SUCCESS, data: prescription });
  });

  public addResource = catchAsync(async (req, res) => {
    const patientId = req.params.pid;
    const data = req.body;
    const prescription = await this.instance.createResource(patientId, data);
    return res
      .status(StatusCodes.CREATED)
      .json({ status: STATUSES.SUCCESS, data: prescription });
  });
}

export const visitLog = new PatientResourceController(VisitLogQuery);
export const prescription = new PatientResourceController(PresciptionQuery);
export const appointment = new PatientResourceController(AppointmentQuery);
export const treatmentPlan = new PatientResourceController(TreatmentPlanQuery);
export const diagnosisReport = new PatientResourceController(
  DiagnosisReportQuery
);
export const medicalHistory = new PatientResourceController(
  MedicalHistoryQuery
);
