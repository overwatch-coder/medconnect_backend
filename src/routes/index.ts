import express from "express";
import { URLS } from "../config/constants";
import { auth } from "./auth";
import { admin } from "./admin";
import { chps } from "./chps-compund";
import { staff } from "./staff";
import { inquiry } from "./inquiry";
import { patient } from "./patient";
import { authorize } from "../middleware/auth-requests";
import { uploadRouter } from "./test-upload";

const router = express.Router();

router.use(URLS.auth.root, auth);
router.use(URLS.admin.root, authorize, admin);
router.use(URLS.chps.root, authorize, chps);
router.use(URLS.staff.root, authorize, staff);
router.use(URLS.patient.root, authorize, patient);
router.use(URLS.inquiry.root, authorize, inquiry);
router.use("/upload", authorize, uploadRouter); //TODO: DELETE THIS.IT WAS JUST FOR DEMO PURPOSES


export const api = router;
