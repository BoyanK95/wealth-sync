import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user's Trading212 API key
    const connection = await db.platformConnection.findFirst({
      where: {
        userId: session.user.id,
        platformId: 'trading212',
      },
    });

    if (!connection?.apiKey) {
      return NextResponse.json({ error: 'Trading212 not connected' }, { status: 400 });
    }

    // Make request to Trading212's API
    const response = await fetch('https://live.trading212.com/api/v0/equity/portfolio', {
      headers: {
        'Authorization': `${connection.apiKey}`,
      },
    });
    console.log("Response:", response);

    if (!response.ok) {
      throw new Error('Failed to fetch from Trading212');
    }

    const data = await response.json();
    console.log("Data from GET platforms trading212 route:", data);
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error fetching Trading212 portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}