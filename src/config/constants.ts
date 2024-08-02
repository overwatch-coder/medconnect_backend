import path from "path";
import { medicalHistory } from "../controllers/patient";

const LOGS_DIR = path.join(__dirname, "..", "..", "logs");

export const APP_LOG = path.join(LOGS_DIR, "app.log");
export const REQUEST_LOG = path.join(LOGS_DIR, "request.log");
export const STATUSES = { SUCCESS: true, FAILED: false } as const;
export const STAFF_ROLES = ["Admin", "Staff"] as const;
export const GENDERS = ["Male", "Female", "Other"] as const;
export const TICKET_STATUSES = ["OPEN", "CLOSED"] as const;
export const TICKET_PRIORITY = ["LOW", "MEDIUM", "HIGH"] as const;
export const OUTREACH_ACTIONS = ["Participate", "Volunteer"] as const;
export const MARITAL_STATUSES = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
] as const;
export const FE_URLS = {
  DEV: "http://localhost:3000",
  VERCEL: "https://medconnect-gh.vercel.app",
  RENDER: "https://medconnect-knb2.onrender.com",
};

export const CORS_OPTIONS = {
  origin: Object.values(FE_URLS),
  credentials: true,
};

export const URLS = {
  root: "/api",
  chps: {
    root: "/chps-compound",
    all: "/",
    one: "/:id",
    inventory: { all: "/:id/inventories", one: "/:id/inventory/:vid" },
    outreachParticipation: {
      all: "/:id/outreach-participations",
      one: "/:id/outreach-participations/:pid",
    },
    ticket: { all: "/:id/tickets", one: "/:id/tickets/:tid" },
  },
  staff: {
    root: "/staff",
    all: "/",
    one: "/:id/all",
    role: "/role",
    chps: { all: "/:id", one: "/:id/:sid" },
  },
  patient: {
    root: "/patient",
    all: "/",
    chps: {
      all: "/chps/:id/",
      one: "/chps/:id/:pid",
    },
    prescription: {
      all: "/:pid/prescriptions/",
      one: "/:pid/prescriptions/:aid",
    },
    treatmentPlan: {
      all: "/:pid/treatment-plans",
      one: "/:pid/treatment-plans/:aid",
    },
    diagnosisReport: {
      all: "/:pid/diagnosis-reports",
      one: "/:pid/diagnosis-reports/:aid",
    },
    visitLog: { all: "/:pid/visit-logs", one: "/:pid/visit-logs/:aid" },
    appointment: { all: "/:pid/appointments", one: "/:pid/appointments/:aid" },
    medicalHistory: {
      all: "/:pid/medical-history",
      one: "/:pid/medical-history/:aid",
    },
  },
  inquiry: { root: "inquiries", submit: "/submit-inquiry" },
  auth: {
    root: "/auth",
    login: "/login",
    logout: "/logout",
    resetPassword: "/reset-password",
    forgotPassword: "/forgot-password",
    switch: "/switch-staff/:id",
  },
  admin: {
    root: "/admin",
    all: "/",
    one: "/:id",
    me: "/me",
    ticket: { all: "/:id/tickets", one: "/:id/tickets/:tid" },
    outreach: {
      all: "/:id/outreach-programs",
      one: "/:id/outreach-programs/:pid",
    },
  },
};

export const EMAIL = {
  reset: {
    subject: "Password Reset Request",
    getText: function (token: string, feUrl: string) {
      return `You are receiving this because you (or someone else) has requested the reset of the password for your account.\n\n
                       Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
                       ${feUrl}/reset-password?token=${token}\n\n
                       If you did not request this, please ignore this email and your password will remain unchanged.`;
    },
  },
};
