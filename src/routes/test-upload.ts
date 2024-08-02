import express from "express";
import { URLS } from "../config/constants";
import { upload, uploadToS3Express } from "../middleware/upload";
import { catchAsync } from "../utils/catch-async";
// const { submitInquiry } = require("../controllers/inquiry");

const router = express.Router();
router.post(
  "/",
  upload.single("image"),
  uploadToS3Express(),
  catchAsync(async (req, res) => {
    try {
      if (!req?.fileUrl) {
        res.json({ fileUrl: "NOT FOUND" });
      } else res.json({ fileUrl: req?.fileUrl });
    } catch (error) {
      res.json({ message: "NOTFOUND" });
    }
  })
);

export const uploadRouter = router;
