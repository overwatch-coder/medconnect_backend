import express from "express";
import { URLS } from "../config/constants";
import { authorizeAdmin } from "../middleware/auth-requests";
import {
  validatePatientData,
  validatePresciptionData,
  validatePatientResourceParams,
  validateTreatmentPlanData,
  validateDiagnosisReportData,
  validateVisitLogsData,
  validateAppointmentData,
  validateMedicalHistoryData,
} from "../middleware/validators";
import {
  addPatient,
  getAllPatients,
  getChpsPatients,
  getChpsPatient,
  editChpsPatient,
  removeChpsPatient,
  prescription,
  appointment,
  treatmentPlan,
  diagnosisReport,
  visitLog,
  medicalHistory,
} from "../controllers/patient";

const router = express.Router();

router.route(URLS.patient.all).all(authorizeAdmin).get(getAllPatients);
router
  .route(URLS.patient.chps.all)
  .get(getChpsPatients)
  .post(validatePatientData, addPatient);
router
  .route(URLS.patient.chps.one)
  .get(getChpsPatient)
  .delete(removeChpsPatient)
  .patch(validatePatientData, editChpsPatient);

// prescription
router
  .route(URLS.patient.prescription.all)
  .get(prescription.getResources)
  .post(validatePresciptionData, prescription.addResource);

router
  .route(URLS.patient.prescription.one)
  .all(validatePatientResourceParams)
  .get(prescription.getResource)
  .patch(validatePresciptionData, prescription.editResource)
  .delete(prescription.removeResource);

// treatment-plans
router
  .route(URLS.patient.treatmentPlan.all)
  .get(treatmentPlan.getResources)
  .post(validateTreatmentPlanData, treatmentPlan.addResource);
router
  .route(URLS.patient.treatmentPlan.one)
  .all(validatePatientResourceParams)
  .get(treatmentPlan.getResource)
  .patch(validateTreatmentPlanData, treatmentPlan.editResource)
  .delete(treatmentPlan.removeResource);

// diagnosis-report
router
  .route(URLS.patient.diagnosisReport.all)
  .get(diagnosisReport.getResources)
  .post(validateDiagnosisReportData, diagnosisReport.addResource);
router
  .route(URLS.patient.diagnosisReport.one)
  .all(validatePatientResourceParams)
  .get(diagnosisReport.getResource)
  .patch(validateDiagnosisReportData, diagnosisReport.editResource)
  .delete(diagnosisReport.removeResource);

// visit-log
router
  .route(URLS.patient.visitLog.all)
  .get(visitLog.getResources)
  .post(validateVisitLogsData, visitLog.addResource);

router
  .route(URLS.patient.visitLog.one)
  .all(validatePatientResourceParams)
  .get(visitLog.getResource)
  .patch(validateVisitLogsData, visitLog.editResource)
  .delete(visitLog.removeResource);

// appointment
router
  .route(URLS.patient.appointment.all)
  .get(appointment.getResources)
  .post(validateAppointmentData, appointment.addResource);
router
  .route(URLS.patient.appointment.one)
  .all(validatePatientResourceParams)
  .get(appointment.getResource)
  .patch(validateAppointmentData, appointment.editResource)
  .delete(appointment.removeResource);

//medical-history
router
  .route(URLS.patient.medicalHistory.all)
  .get(medicalHistory.getResources)
  .post(validateMedicalHistoryData, medicalHistory.addResource);
router
  .route(URLS.patient.medicalHistory.one)
  .all(validatePatientResourceParams)
  .get(medicalHistory.getResource)
  .patch(validateMedicalHistoryData, medicalHistory.editResource)
  .delete(medicalHistory.removeResource);
export const patient = router;
