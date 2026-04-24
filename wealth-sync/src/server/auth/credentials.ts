import type { CredentialsConfig } from "next-auth/providers/credentials";
import { validateUser } from "./validateUser";

export const credentialsConfig: CredentialsConfig = {
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      return null;
    }

    const user = await validateUser(
      credentials.email as string,
      credentials.password as string,
    );

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    };
  },
  type: "credentials",
  id: "",
};
