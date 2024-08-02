import express from "express";
import { URLS } from "../config/constants";
// const {
//   getAllPrescriptions,
//   getPrescriptionById,
//   createPrescription,
//   updatePrescription,
//   deletePrescription,
// } = require("../controllers/prescription");

const router = express.Router();

// router.get(URLS.prescription.all, getAllPrescriptions);
// router.post(URLS.prescription.all, createPrescription);
// router.get(URLS.prescription.one, getPrescriptionById);
// router.put(URLS.prescription.one, updatePrescription);
// router.delete(URLS.prescription.one, deletePrescription);

export const prescription = router;
