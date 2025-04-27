import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    console.log('Fetched connections:', connections);
    

    return NextResponse.json(connections);
  } catch (error) {
    console.error('Error fetching platform connections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch platform connections' },
      { status: 500 }
    );
  }
}