"use server";

import { db } from "@/server/db";
import { hash } from "bcryptjs";
import { z } from "zod";
import { registerSchema } from "./schema";
import { generateSessionToken } from "../auth/session";

export type RegisterInput = z.infer<typeof registerSchema>;

export async function register(data: RegisterInput) {
  try {
    const validated = registerSchema.parse(data);

    const existingUser = await db.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return { error: "Email already registered. Try logging in instead." };
    }

    const hashedPassword = await hash(validated.password, 12);

    const access_token = generateSessionToken();

    const expires_at = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days

    // Create user with account and session in a transaction
    const result = await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: validated.name,
          email: validated.email,
          password: hashedPassword,
          emailVerified: new Date(),
        },
      });

      // Create OAuth-like account
      await tx.account.create({
        data: {
          userId: user.id,
          type: "oauth",
          provider: "credentials",
          providerAccountId: user.id,
          access_token,
          expires_at,
          token_type: "Bearer",
          scope: "openid profile email",
        },
      });

      // Create session
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      const sessionToken = generateSessionToken();
      const session = await tx.session.create({
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

    return { success: true, ...result };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to register user" };
  }
}
