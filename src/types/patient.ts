import { z } from "zod";
import {
  patientSchema,
  prescriptionSchema,
  appointmentSchema,
  diagnosisReportSchema,
  visitLogSchema,
  treatmentPlanSchema,
  patientResourceParamsSchema,
  medicalHistorySchema,
} from "../db/schemas/patient";

export type PatientData = z.infer<typeof patientSchema>;
export type PrescriptionData = z.infer<typeof prescriptionSchema>;
export type AppointmentData = z.infer<typeof appointmentSchema>;
export type DiagnosisReportData = z.infer<typeof diagnosisReportSchema>;
export type VisitLogData = z.infer<typeof visitLogSchema>;
export type TreatmentPlanData = z.infer<typeof treatmentPlanSchema>;
export type PatientResourceParams = z.infer<typeof patientResourceParamsSchema>;
export type MedicalHistoryData = z.infer<typeof medicalHistorySchema>;
