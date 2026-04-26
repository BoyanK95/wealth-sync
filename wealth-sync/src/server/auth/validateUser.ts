import bcrypt from "bcryptjs";
import { db } from "../db";
export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentialsError";
  }
}

export async function validateUser(email: string, password: string) {
  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user?.password) throw new InvalidCredentialsError();
  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new InvalidCredentialsError();
  } catch (error) {
    throw error;
  }
  return user;
}
