import { compare } from "bcryptjs";
import type { CredentialsConfig } from "next-auth/providers/credentials";
import { db } from "../db";

export const credentialsConfig: CredentialsConfig = {
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" }
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      return null;
    }

    const user = await db.user.findUnique({
      where: { email: credentials.email }
    });

    if (!user || !user.password) {
      return null;
    }

    const isPasswordValid = await compare(credentials.password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    };
  },
  type: "credentials",
  id: "",
  name: ""
};