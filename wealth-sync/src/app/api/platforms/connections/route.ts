import type { PlatformKey } from "@/lib/constants/apiKeyStrings";
import type { IPlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const connections = await db.platformConnection.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        platformId: true,
        apiKey: true,
        isConnected: true,
      },
    });

    const responseDto = connections?.reduce(
      (acc, curr) => {
        acc[curr.platformId as PlatformKey] = curr;

        return acc;
      },
      {} as Record<PlatformKey, IPlatformConnection>,
    );

    return NextResponse.json(responseDto);
  } catch (error) {
    console.error("Error fetching platform connections:", error);
    return NextResponse.json(
      { error: "Failed to fetch platform connections" },
      { status: 500 },
    );
  }
}
