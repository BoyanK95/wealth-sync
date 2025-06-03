import { NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import crypto from "crypto";

interface BinancePosition {
  symbol: string;
  asset: string;
  quantity: number;
  currentPrice: number;
  totalValue: number;
}

//TODO fix this route to GET the portfolio data from the Binance API corectly
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const connection = await db.platformConnection.findFirst({
      where: {
        userId: session.user.id,
        platformId: "binance",
      },
    });

    if (!connection?.apiKey) {
      return NextResponse.json(
        { error: "Binance not connected" },
        { status: 400 }
      );
    }

    // Split the combined key to get the actual API key and secret
    const [actualApiKey, apiSecret] = connection.apiKey.split(":");

    // Create signature for Binance API
    const timestamp = Date.now();
    const queryString = `timestamp=${timestamp}`;
    const signature = crypto
      .createHmac("sha256", apiSecret!)
      .update(queryString)
      .digest("hex");

    // Get account data from Binance API
    const accountResponse = await fetch(
      `https://api.binance.com/api/v3/account?${queryString}&signature=${signature}`,
      {
        headers: {
          "X-MBX-APIKEY": actualApiKey,
        },
      }
    );

    if (!accountResponse.ok) {
      console.error("Binance API error:", {
        status: accountResponse.status,
        statusText: accountResponse.statusText,
      });
      const errorText = await accountResponse.text();
      console.error("Error response:", errorText);
      return NextResponse.json(
        { error: `Binance API error: ${accountResponse.statusText}` },
        { status: accountResponse.status }
      );
    }

    const accountData = await accountResponse.json();
    
    // Get current prices from Binance
    const pricesResponse = await fetch("https://api.binance.com/api/v3/ticker/price");
    
    if (!pricesResponse.ok) {
      console.error("Binance API error:", {
        status: pricesResponse.status,
        statusText: pricesResponse.statusText,
      });
      return NextResponse.json(
        { error: `Binance API error: ${pricesResponse.statusText}` },
        { status: pricesResponse.status }
      );
    }

    const pricesData = await pricesResponse.json();
    
    // Create a map of symbol to price
    const prices: Record<string, number> = {};
    pricesData.forEach((item: { symbol: string; price: string }) => {
      prices[item.symbol] = parseFloat(item.price);
    });

    // Filter balances with non-zero amounts and create portfolio positions
    const positions: BinancePosition[] = accountData.balances
      .filter((balance: { asset: string; free: string; locked: string }) => {
        const total = parseFloat(balance.free) + parseFloat(balance.locked);
        return total > 0;
      })
      .map((balance: { asset: string; free: string; locked: string }) => {
        const asset = balance.asset;
        const quantity = parseFloat(balance.free) + parseFloat(balance.locked);
        
        // Find price for this asset (try common pairs like USDT, BTC, etc.)
        let currentPrice = 0;
        let symbol = "";
        
        if (prices[`${asset}USDT`]) {
          currentPrice = prices[`${asset}USDT`];
          symbol = `${asset}USDT`;
        } else if (prices[`${asset}BTC`]) {
          currentPrice = prices[`${asset}BTC`] * (prices['BTCUSDT'] || 0);
          symbol = `${asset}BTC`;
        } else if (asset === "USDT") {
          currentPrice = 1; // USDT is pegged to USD
          symbol = "USDT";
        }
        
        return {
          symbol,
          asset,
          quantity,
          currentPrice,
          totalValue: quantity * currentPrice,
        };
      })
      // Filter out assets with no price or zero value
      .filter((position) => position.currentPrice > 0 && position.totalValue > 0)
      // Sort by value (highest first)
      .sort((a, b) => b.totalValue - a.totalValue);

    return NextResponse.json(positions);
  } catch (error) {
    console.error("Error fetching Binance portfolio:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio data" },
      { status: 500 }
    );
  }
}