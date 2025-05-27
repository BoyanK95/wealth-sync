import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { apiKey, apiSecret } = await request.json();

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "API key and secret are required" },
        { status: 400 },
      );
    }

    // Store the connection in the database
    await db.platformConnection.upsert({
      where: {
        userId_platformId: {
          userId: session.user.id,
          platformId: "binance",
        },
      },
      update: {
        apiKey: apiKey as string,
        apiSecret: apiSecret as string,
        isConnected: true,
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        platformId: "binance",
        apiKey: apiKey as string,
        apiSecret: apiSecret as string,
        isConnected: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Binance connection error:", error);
    return NextResponse.json(
      { error: "Failed to connect to Binance" },
      { status: 500 },
    );
  }
}
