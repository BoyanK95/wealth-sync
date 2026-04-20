import bcrypt from "bcryptjs";
import { db } from "../db";

export async function validateUser(email: string, password: string) {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user?.password) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) return null;

  return user;
}
