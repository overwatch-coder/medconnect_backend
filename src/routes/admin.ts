import express from "express";
import { URLS } from "../config/constants";
import { authorizeAdmin } from "../middleware/auth-requests";
import {
  validateAdminData,
  validateUpdateAdminData,
  validateOutreachProgramData,
  validateUpdateTicketData,
} from "../middleware/validators";
import {
  addAdmin,
  fetchAdmin,
  fetchAdmins,
  editAdmin,
  removeAdmin,
  fetchCurrentAdmin,
  //
  addOutreachProgram,
  getOutreachProgram,
  getOutreachPrograms,
  editOutreachProgram,
  removeOutreachProgram,
  getTickets,
  editTicket,
} from "../controllers/admin";

const router = express.Router();

router.get(URLS.admin.me, fetchCurrentAdmin);
router
  .route(URLS.admin.all)
  .all(authorizeAdmin)
  .get(fetchAdmins)
  .post(validateAdminData, addAdmin);
router
  .route(URLS.admin.one)
  .all(authorizeAdmin)
  .get(fetchAdmin)
  .put(validateUpdateAdminData, editAdmin)
  .delete(removeAdmin);

router
  .route(URLS.admin.outreach.all)
  .all(authorizeAdmin)
  .get(getOutreachPrograms)
  .post(validateOutreachProgramData, addOutreachProgram);
router
  .route(URLS.admin.outreach.one)
  .all(authorizeAdmin)
  .get(getOutreachProgram)
  .delete(removeOutreachProgram)
  .patch(validateOutreachProgramData, editOutreachProgram);

router.get(URLS.admin.ticket.all, authorizeAdmin, getTickets);
router.patch(
  URLS.admin.ticket.one,
  authorizeAdmin,
  validateUpdateTicketData,
  editTicket
);

export const admin = router;
