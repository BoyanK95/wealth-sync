import { validateUser } from "@/server/auth/validateUser";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response("Missing credentials", { status: 400 });
  }

  const user = await validateUser(email, password);

  if (!user) {
    return new Response("Invalid credentials", { status: 401 });
  }

  const accessToken = sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });

  const refreshToken = sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" },
  );

  return Response.json({
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}
