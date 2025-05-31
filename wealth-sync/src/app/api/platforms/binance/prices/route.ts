import { NextResponse } from "next/server";
import { auth } from "@/server/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get ticker prices from Binance (no authentication needed)
    const response = await fetch("https://api.binance.com/api/v3/ticker/price");
    
    if (!response.ok) {
      console.error("Binance API error:", {
        status: response.status,
        statusText: response.statusText,
      });
      return NextResponse.json(
        { error: `Binance API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const priceData = await response.json();
    
    // Convert array to object with symbol as key for easier lookup
    const prices = {};
    priceData.forEach((item) => {
      prices[item.symbol] = parseFloat(item.price);
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