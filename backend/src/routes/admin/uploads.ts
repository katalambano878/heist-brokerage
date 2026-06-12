import { Router } from "express";
import type { Env } from "../../config/env.js";
import { createUploader, uploadUrl } from "../../lib/uploads.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";
import { AppError } from "../../middleware/errorHandler.js";

export function adminUploadsRouter(env: Env) {
  const r = Router();
  const auth = authMiddleware(env);
  const staff = [auth, requireRole("SUPER_ADMIN", "ADMIN", "STAFF")];
  const uploader = createUploader(env);

  r.post("/", ...staff, uploader.single("file"), (req, res, next) => {
    if (!req.file) {
      next(new AppError(400, "NO_FILE", "No file uploaded (field name: file)"));
      return;
    }
    res.status(201).json({
      url: uploadUrl(env, req.file.filename),
      filename: req.file.filename,
      size: req.file.size,
    });
  });

  return r;
}
