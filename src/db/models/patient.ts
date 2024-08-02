import mongoose from "mongoose";
import AppError from "../../utils/app-error";
import { GENDERS, MARITAL_STATUSES } from "../../config/constants";
import { PatientIdGenerator, PatientMiscIdGenerator } from "../../services/id";
import { StatusCodes } from "http-status-codes";

const requiredString = { type: String, required: true };
const requiredBool = { type: Boolean, required: true };
const requiredDate = { type: Date, required: true };

const additionals = new mongoose.Schema({
  bloodGroup: requiredString,
  allergies: { type: [String], default: [] },
  knownCondition: String,
  primaryPhysician: String,
  insuranceProvider: String,
  insurancePolicyNumber: String,
});
const emergencyContacts = new mongoose.Schema({
  name: requiredString,
  relationship: requiredString,
  address: requiredString,
  contact: requiredString,
});
const patient = new mongoose.Schema(
  {
    patientId: requiredString,
    firstName: requiredString,
    lastName: requiredString,
    dateOfBirth: requiredString,
    gender: {
      type: String,
      required: true,
      enum: GENDERS,
    },
    maritalStatus: {
      type: String,
      required: true,
      enum: MARITAL_STATUSES,
    },
    nationalId: {
      ...requiredString,
      unique: true,
    },
    email: {
      ...requiredString,
      unique: true,
    },
    contact: requiredString,
    location: requiredString,
    district: requiredString,
    profilePictureUrl: {
      type: String,
      default: "",
    },
    additional: { type: additionals, required: true },
    emergencyContacts: { type: [emergencyContacts], required: true },
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

const medication = new mongoose.Schema({
  name: requiredString,
  dosage: requiredString,
  frequency: requiredString,
  duration: requiredString,
});
const prescription = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  prescriptionId: requiredString,
  notes: requiredString,
  healthOfficialName: requiredString,
  date: requiredDate,
  medication: { type: medication, required: true },
});

const treatmentPlan = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  treatmentPlanId: requiredString,
  name: requiredString,
  startDate: requiredDate,
  endDate: requiredDate,
  objective: requiredString,
  medicationName: requiredString,
  followUpSchedule: requiredString,
  notes: requiredString,
});

const diagnosisReport = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  diagnosisReportId: requiredString,
  doctorName: requiredString,
  date: requiredDate,
  followUpDate: requiredDate,
  notes: requiredString,
  symptoms: requiredString,
  finalDiagnosis: requiredString,
  recommendedTest: requiredString,
});

const visitLog = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  visitLogId: requiredString,
  date: requiredDate,
  purpose: requiredString,
  official: requiredString,
  notes: requiredString,
});

const appointment = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  date: requiredString,
  official: requiredString,
  isClosed: {
    ...requiredBool,
    default: false,
  },
});

const medicalHistory = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  description: requiredString,
  cause: requiredString,
  hospitalizationDate: requiredDate,
  formUrl: requiredString,
  date: requiredDate,
  hadSurgeryComplication: requiredBool,
  wasSurgeryRequired: requiredBool,
  hasBreathingProblem: requiredBool,
  hasSkinProblem: requiredBool,
});

patient.pre("validate", async function (next) {
  const idGenerator = new PatientIdGenerator(this, this.patientId);
  const { status, data } = await idGenerator.generate();

  if (!status) {
    const error = new AppError(data, StatusCodes.PRECONDITION_FAILED);
    return next(error);
  }

  this.patientId = data;
  next();
});

prescription.pre("validate", async function (this, next) {
  const idGenerator = new PatientMiscIdGenerator(
    "Prescription",
    this,
    this.prescriptionId
  );

  const { status, data } = await idGenerator.generate();

  if (!status) {
    const error = new AppError(data, StatusCodes.PRECONDITION_FAILED);
    return next(error);
  }

  this.prescriptionId = data;
  next();
});

treatmentPlan.pre("validate", async function (next) {
  const idGenerator = new PatientMiscIdGenerator(
    "TreatmentPlan",
    this,
    this.treatmentPlanId
  );

  const { status, data } = await idGenerator.generate();

  if (!status) {
    const error = new AppError(data, StatusCodes.PRECONDITION_FAILED);
    return next(error);
  }

  this.treatmentPlanId = data;
  next();
});

visitLog.pre("validate", async function (this, next) {
  const idGenerator = new PatientMiscIdGenerator(
    "VisitLog",
    this,
    this.visitLogId
  );
  const { status, data } = await idGenerator.generate();

  if (!status) {
    const error = new AppError(data, StatusCodes.PRECONDITION_FAILED);
    return next(error);
  }

  this.visitLogId = data;
  next();
});

diagnosisReport.pre("validate", async function (this, next) {
  const idGenerator = new PatientMiscIdGenerator(
    "DiagnosisReport",
    this,
    this.diagnosisReportId
  );
  const { status, data } = await idGenerator.generate();

  if (!status) {
    const error = new AppError(data, StatusCodes.PRECONDITION_FAILED);
    return next(error);
  }

  this.diagnosisReportId = data;
  next();
});

export const Patient = mongoose.model("Patient", patient);
export const Prescription = mongoose.model("Prescription", prescription);
export const TreatmentPlan = mongoose.model("TreatmentPlan", treatmentPlan);
export const VisitLog = mongoose.model("VisitLog", visitLog);
export const Appointment = mongoose.model("Appointment", appointment);
export const MedicalHistory = mongoose.model("MedicalHistory", medicalHistory);
export const DiagnosisReport = mongoose.model(
  "DiagnosisReport",
  diagnosisReport
);
