import express from "express";
import { URLS } from "../config/constants";
import {
  createCompound,
  getCompound,
  getCompounds,
  deleteCompound,
  updateCompound,
  addInventory,
  getInventory,
  getInventories,
  updateInventory,
  deleteInventory,
  addOutreachParticipation,
  updateOutreachParticipation,
  getTicket,
  getTickets,
  addTicket,
} from "../controllers/chps-compound";
import {
  validateAddTicketData,
  validateChpsCompoundData,
  validateChpsUpdateData,
  validateInventoryData,
  validateOutreachParticipationData,
} from "../middleware/validators";
import { authorizeAdmin } from "../middleware/auth-requests";

const router = express.Router();

router
  .route(URLS.chps.all)
  .all(authorizeAdmin)
  .post(validateChpsCompoundData, createCompound)
  .get(getCompounds);

router
  .route(URLS.chps.one)
  .get(getCompound)
  .put(validateChpsUpdateData, updateCompound)
  .delete(authorizeAdmin, deleteCompound);

router
  .route(URLS.chps.inventory.all)
  .get(getInventories)
  .post(validateInventoryData, addInventory);
router
  .route(URLS.chps.inventory.one)
  .get(getInventory)
  .patch(validateInventoryData, updateInventory)
  .delete(deleteInventory);

router.post(
  URLS.chps.outreachParticipation.all,
  validateOutreachParticipationData,
  addOutreachParticipation
);
router.patch(
  URLS.chps.outreachParticipation.one,
  validateOutreachParticipationData,
  updateOutreachParticipation
);

//tickets
router
  .route(URLS.chps.ticket.all)
  .get(getTickets)
  .post(validateAddTicketData, addTicket);
router.get(URLS.chps.ticket.one, getTicket);

export const chps = router;
