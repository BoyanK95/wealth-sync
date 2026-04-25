import bcrypt from "bcryptjs";
import { db } from "../db";

export async function validateUser(email: string, password: string) {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user?.password) throw new Error('User does not have a password!');

  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Password is invalid!');
  } catch (error) {
    throw new Error(error as string);
  }

  return user;
}
