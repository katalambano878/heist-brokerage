import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import type { Env } from "../config/env.js";
import { AppError } from "../middleware/errorHandler.js";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

export function createUploader(env: Env) {
  fs.mkdirSync(env.UPLOAD_DIR, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, env.UPLOAD_DIR),
    filename: (_req, file, cb) => {
      const id = crypto.randomBytes(8).toString("hex");
      cb(null, `${Date.now()}-${id}${EXT[file.mimetype] ?? ".bin"}`);
    },
  });

  return multer({
    storage,
    limits: { fileSize: 8 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (!ALLOWED.has(file.mimetype)) {
        cb(new AppError(400, "INVALID_FILE", "Only JPEG, PNG, WebP or AVIF images are allowed"));
        return;
      }
      cb(null, true);
    },
  });
}

const DOCUMENT_EXT: Record<string, string> = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
};

function documentExtension(file: { mimetype: string; originalname: string }): string | null {
  if (DOCUMENT_EXT[file.mimetype]) return DOCUMENT_EXT[file.mimetype];
  if (file.mimetype !== "application/octet-stream" && file.mimetype !== "") return null;
  const name = file.originalname.toLowerCase();
  if (name.endsWith(".pdf")) return ".pdf";
  if (name.endsWith(".docx")) return ".docx";
  if (name.endsWith(".doc")) return ".doc";
  return null;
}

/** PDF or Word CV uploads. Separate from image uploads so portraits stay images only. */
export function createDocumentUploader(env: Env) {
  fs.mkdirSync(env.UPLOAD_DIR, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, env.UPLOAD_DIR),
    filename: (_req, file, cb) => {
      const id = crypto.randomBytes(8).toString("hex");
      cb(null, `${Date.now()}-${id}${documentExtension(file) ?? ".bin"}`);
    },
  });

  return multer({
    storage,
    limits: { fileSize: 12 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (!documentExtension(file)) {
        cb(new AppError(400, "INVALID_FILE", "Upload a PDF or Word file."));
        return;
      }
      cb(null, true);
    },
  });
}

export function uploadUrl(env: Env, filename: string): string {
  return `${env.PUBLIC_API_URL}/uploads/${path.basename(filename)}`;
}
