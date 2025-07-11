import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";
import crypto from "crypto";

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
        { status: 400 },
      );
    }

    // Split the combined key to get the actual API key and secret
    const [actualApiKey, apiSecret] = connection.apiKey.split(":");

    // Create signature for Binance API
    const timestamp = Date.now();
    const queryString = `timestamp=${timestamp}`;
    if (!apiSecret) {
      throw new Error("API secret is missing");
    }
    const signature = crypto
      .createHmac("sha256", apiSecret)
      .update(queryString)
      .digest("hex");

    // Call Binance API
    const response = await fetch(
      `https://api.binance.com/api/v3/account?${queryString}&signature=${signature}`,
      {
        headers: {
          "X-MBX-APIKEY": actualApiKey!,
        },
      },
    );

    if (!response.ok) {
      console.error("Binance API error:", {
        status: response.status,
        statusText: response.statusText,
      });
      const errorText = await response.text();
      console.error("Error response:", errorText);
      return NextResponse.json(
        { error: `Binance API error: ${response.statusText}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Binance account:", error);
    return NextResponse.json(
      { error: "Failed to fetch account data" },
      { status: 500 },
    );
  }
}
