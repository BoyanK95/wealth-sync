import { NextResponse } from "next/server";
import { auth } from "@/server/auth";

const BINANCE_API_URL = "https://api.binance.com";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get ticker prices from Binance (no authentication needed)
    const response = await fetch(`${BINANCE_API_URL}/api/v3/ticker/price`);
    
    if (!response.ok) {
      throw new Error(`Binance API error: ${response.statusText}`);
    }
    
    const data = await response.json() as Array<{symbol: string, price: string}>;
    
    // Type-safe implementation
    const prices: Record<string, string> = {};
    data.forEach((item) => {
      prices[item.symbol] = item.price;
    });
    
    return NextResponse.json(prices);
  } catch (error) {
    console.error("Error fetching Binance prices:", error);
    return NextResponse.json(
      { error: "Failed to fetch price data" },
      { status: 500 }
    );
  }
}
