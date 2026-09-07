import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { apiKey } = await request.json();
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 });
    }

    // Verify the API key with Trading212
    const isValid = await verifyTrading212ApiKey(apiKey as string);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 400 });
    }

    // Store the connection in the database using the new model
    await db.platformConnection.upsert({
      where: {
        userId_platformId: {
          userId: session.user.id,
          platformId: 'trading212',
        },
      },
      update: {
        apiKey: apiKey as string,
        isConnected: true,
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        platformId: 'trading212',
        apiKey: apiKey as string,
        isConnected: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Trading212 connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to Trading212' },
      { status: 500 }
    );
  }
}

async function verifyTrading212ApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch('https://live.trading212.com/api/v0/equity/account/info', {
      headers: {
        'Authorization': apiKey,
      },
    });
    return response.ok;
  } catch (error) {
    console.error('Error verifying Trading212 API key:', error);
    return false;
  }
}
