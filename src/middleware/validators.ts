import { z } from "zod";
import {
  adminSchema,
  outreachParticipationSchema,
  outreachProgramSchema,
  updateAmdinSchema,
  updateTicketSchema,
} from "../db/schemas/admin";
import { staffSchema, roleSchema } from "../db/schemas/staff";
import { inventorySchema } from "../db/schemas/inventory";
import {
  addTicketSchema,
  chpsCompoundSchema,
  updateChpsCompoundSchema,
} from "../db/schemas/chps-compound";
import {
  userSchema,
  forgotPasswordData,
  resetPasswordDataSchema,
} from "../db/schemas/user";
import type { Request, Response, NextFunction } from "express";
import {
  appointmentSchema,
  diagnosisReportSchema,
  patientSchema,
  prescriptionSchema,
  treatmentPlanSchema,
  visitLogSchema,
  patientResourceParamsSchema,
  medicalHistorySchema,
} from "../db/schemas/patient";

function validateData(schema: z.ZodObject<any, any> | z.ZodEffects<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
}

function validateParams(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (err) {
      next(err);
    }
  };
}

const standardRequestParams = z.object({
  id: z.string().min(24),
  user: z.string().min(24),
});

//general
export const validateStandardParams = validateParams(standardRequestParams);

//auth
export const validateLoginData = validateData(userSchema);
export const validateForgotPasswordData = validateData(forgotPasswordData);
export const validateResetPasswordData = validateData(resetPasswordDataSchema);
//admin
export const validateOutreachProgramData = validateData(outreachProgramSchema);
export const validateUpdateAdminData = validateData(updateAmdinSchema);
export const validateUpdateTicketData = validateData(updateTicketSchema);
export const validateAdminData = validateData(
  adminSchema.omit({ authUserId: true })
);
//staff
export const validateStaffData = validateData(staffSchema);
export const validateRoleData = validateData(roleSchema);
export const validateUpdateStaffData = validateData(
  staffSchema.merge(z.object({ staffId: z.string() }))
);
//chps
export const validateInventoryData = validateData(inventorySchema);
export const validateChpsUpdateData = validateData(updateChpsCompoundSchema);
export const validateChpsRequestParams = validateParams(standardRequestParams);
export const validateAddTicketData = validateData(addTicketSchema);
export const validateChpsCompoundData = validateData(
  chpsCompoundSchema
    .omit({ authUserId: true })
    .merge(userSchema.omit({ password: true }))
);
export const validateOutreachParticipationData = validateData(
  outreachParticipationSchema
);
// Patient
export const validatePatientData = validateData(patientSchema);
export const validatePresciptionData = validateData(prescriptionSchema);
export const validateAppointmentData = validateData(appointmentSchema);
export const validateTreatmentPlanData = validateData(treatmentPlanSchema);
export const validateDiagnosisReportData = validateData(diagnosisReportSchema);
export const validateVisitLogsData = validateData(visitLogSchema);
export const validateMedicalHistoryData = validateData(medicalHistorySchema);
export const validatePatientResourceParams = validateParams(
  patientResourceParamsSchema
);
