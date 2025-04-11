import { randomBytes } from "crypto";

export function generateSessionToken() {
  return randomBytes(32).toString("hex");
}