import { Router } from "express";

export function healthRouter() {
  const r = Router();
  r.get("/health", (_req, res) => {
    res.json({ ok: true, time: new Date().toISOString() });
  });
  return r;
}
