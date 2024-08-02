import express from "express";
import { URLS } from "../config/constants";
import { authorize } from "../middleware/auth-requests";
import {
  validateLoginData,
  validateForgotPasswordData,
  validateResetPasswordData,
} from "../middleware/validators";
import {
  login,
  logout,
  forgotPassword,
  resetPassword,
  getStaffAuth,
} from "../controllers/auth";

const router = express.Router();

router.post(URLS.auth.login, validateLoginData, login);
router.post(URLS.auth.logout, authorize, logout);
router.post(URLS.auth.resetPassword, validateResetPasswordData, resetPassword);
router.post(
  URLS.auth.forgotPassword,
  validateForgotPasswordData,
  forgotPassword
);
router.get(URLS.auth.switch, authorize, getStaffAuth);

export const auth = router;
