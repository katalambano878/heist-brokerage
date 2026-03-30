import { describe, expect, it } from "vitest";
import { hashToken } from "./tokenHash.js";

describe("hashToken", () => {
  it("is deterministic for same input", () => {
    const t = "refresh-token-value";
    expect(hashToken(t)).toBe(hashToken(t));
  });
});
