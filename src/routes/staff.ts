import express from "express";
import { URLS } from "../config/constants";
import {
  addStaff,
  getAllStaff,
  getStaff,
  updateStaff,
  deleteStaff,
  editRole,
} from "../controllers/staff";
import {
  validateRoleData,
  validateStaffData,
  validateUpdateStaffData,
} from "../middleware/validators";
import { authorizeAdmin } from "../middleware/auth-requests";

const router = express.Router();

router
  .route(URLS.staff.all)
  .all(authorizeAdmin)
  // .get(getAllStaff)
  .post(validateStaffData, addStaff);

router.get(URLS.staff.chps.all, getAllStaff);
router
  .route(URLS.staff.chps.one)
  .get(getStaff)
  .delete(deleteStaff)
  .put(validateUpdateStaffData, updateStaff);

router.patch(URLS.staff.role, authorizeAdmin, validateRoleData, editRole);

export const staff = router;
