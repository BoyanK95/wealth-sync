import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

// Simple in-memory rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // adjust this based on Trading212's limits
const requestLog = new Map<string, number[]>();

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, headers: HeadersInit, maxRetries = 3) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const response = await fetch(url, { headers });
      
      if (response.status === 429) {
        const waitTime = Math.min(1000 * Math.pow(2, retries), 10000);
        await delay(waitTime);
        retries++;
        continue;
      }
      
      return response;
    } catch (error) {
    if (retries === maxRetries - 1) throw error;
      retries++;
      const waitTime = Math.min(1000 * Math.pow(2, retries), 10000);
      await delay(waitTime);
    }
  }
  throw new Error('Max retries reached');
}

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const userRequests = requestLog.get(userId) || [];
  const recentRequests = userRequests.filter(time => time > now - RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  requestLog.set(userId, [...recentRequests, now]);
  return false;
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (isRateLimited(session.user.id)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
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

    const response = await fetchWithRetry(
      'https://live.trading212.com/api/v0/equity/portfolio',
      { 'Authorization': connection.apiKey }
    );

    if (!response.ok) {
      console.error('Trading212 API error:', {
        status: response.status,
        statusText: response.statusText,
      });
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return NextResponse.json(
        { error: `Trading212 API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error fetching Trading212 portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}
