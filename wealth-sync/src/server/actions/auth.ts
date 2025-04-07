'use server';

import { db } from "@/server/db";
import { hash } from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

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

    // Create user
    const user = await db.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword, // Store hashed password
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return { success: true, user };
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Something went wrong during registration" };
  }
}
