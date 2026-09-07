import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const connection = await db.platformConnection.findFirst({
      where: {
        userId: session.user.id,
        platformId: 'trading212',
      },
    });

    if (!connection?.apiKey) {
      return NextResponse.json({ error: 'Trading212 not connected' }, { status: 400 });
    }

    const response = await fetch('https://live.trading212.com/api/v0/equity/positions', {
      headers: {
        'Authorization': `${connection.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Trading212');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Trading212 positions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch positions data' },
      { status: 500 }
    );
  }
}