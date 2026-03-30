import { createHash } from "node:crypto";

/** Store only hashes of refresh tokens in the database */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
