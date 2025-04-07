'use server';

import { db } from "@/server/db";
import { hash } from "bcryptjs";
import { z } from "zod";
// import { registerSchema } from "./schema";
import { generateSessionToken } from "../auth/session";
import { registerSchema } from "./schema";
// import { generateSessionToken } from "../auth/session";

export type RegisterInput = z.infer<typeof registerSchema>;

export async function register(data: RegisterInput) {
  try {
    const validated = registerSchema.parse(data);

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return { error: "Email already registered. Try logging in instead." };
    }

    // Hash the password
    const hashedPassword = await hash(validated.password, 12);

    // Create user with account in a transaction
    const result = await db.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          name: validated.name,
          email: validated.email,
          password: hashedPassword,
        },
      });

      // Create account
      await tx.account.create({
        data: {
          userId: user.id,
          type: "credentials",
          provider: "credentials",
          providerAccountId: user.id,
        },
      });

      // Create session
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      const sessionToken = generateSessionToken();
      await tx.session.create({
        data: {
          sessionToken,
          userId: user.id,
          expires: new Date(Date.now() + thirtyDays),
        },
      });

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        sessionToken,
      };
    });

    return {
      success: true,
      user: result.user,
      sessionToken: result.sessionToken,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to register user" };
  }
}
