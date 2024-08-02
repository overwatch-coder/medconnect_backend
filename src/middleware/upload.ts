import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import crypto from "crypto";
import { AuthenticatedRequest } from "../types/express";

// Configure S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Configure multer for handling file uploads
export const upload = multer({ storage: multer.memoryStorage() });

// Function to generate a unique filename
function generateUniqueFilename(originalname: string): string {
  const hash = crypto.randomBytes(16).toString("hex");
  return `${hash}-${originalname}`;
}

// Middleware function
export const uploadToS3Express = () => {
  const bucketName = process.env.BUCKET_NAME;
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const file = req.file;
    const key = generateUniqueFilename(file.originalname);

    try {
      const params = {
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      const cloudFrontUrl = `${process.env.CLOUDFRONT_URL}/${key}`;

      req.fileUrl = cloudFrontUrl;

      next();
    } catch (error) {
      console.error("Error uploading file: ", error);
      res.status(500).send("Error uploading file");
    }
  };
};
