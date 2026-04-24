import { verify, sign } from "jsonwebtoken";

export async function POST(req: Request) {
  const { refreshToken } = await req.json();

  if (!refreshToken) {
    return new Response("Missing token", { status: 400 });
  }

  try {
    const decoded: unknown = verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

    const newAccessToken = sign(
      { userId: (decoded as { userId: string }).userId },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" },
    );

    return Response.json({ accessToken: newAccessToken });
  } catch {
    return new Response("Invalid refresh token", { status: 401 });
  }
}
