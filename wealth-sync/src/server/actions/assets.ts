"use server";

import { z } from "zod";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { env } from "@/env";
import {
  CATEGORIES,
  type Asset,
  type AssetCategory,
} from "@/components/AddOwnAssetComponents/types";

const inputSchema = z.object({
  category: z.enum(CATEGORIES),
  values: z.record(z.string(), z.string()),
});

type Result = { success: true } | { success: false; error: string };

function numberValue(values: Record<string, string>, key: string) {
  const value = Number(values[key]);
  return Number.isFinite(value) && value >= 0 ? value : null;
}

async function fetchFinnhubQuote(symbol: string) {
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${encodeURIComponent(env.FINNHUB_KEY)}`,
    { next: { revalidate: 0 } },
  );
  if (!response.ok) throw new Error("Price provider unavailable");
  const quote = (await response.json()) as { c?: number; dp?: number };
  if (!quote.c || !Number.isFinite(quote.c)) {
    throw new Error("No current price found for that symbol");
  }
  return { price: quote.c, changePercent: quote.dp ?? null };
}

export async function getOwnAssets(): Promise<Asset[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  const rows = await db.asset.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    category: row.category as AssetCategory,
    symbol: row.symbol ?? undefined,
    quantity: row.quantity,
    unit: row.unit,
    buyPrice: row.buyPrice,
    currentPrice: row.currentPrice,
    interestRate: row.interestRate ?? undefined,
    changePercent: row.changePercent,
    changeLabel:
      row.category === "stock"
        ? "1D"
        : row.category === "crypto"
          ? "24h"
          : undefined,
  }));
}

export async function createOwnAsset(input: unknown): Promise<Result> {
  const session = await auth();
  if (!session?.user?.id)
    return { success: false, error: "Please sign in to add an asset" };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success)
    return { success: false, error: "Invalid asset details" };
  const { category, values } = parsed.data;
  const quantity = category === "savings" ? 1 : numberValue(values, "quantity");
  const buyPrice =
    category === "savings"
      ? numberValue(values, "balance")
      : numberValue(values, "buyPrice");
  if (quantity === null || quantity <= 0 || buyPrice === null) {
    return {
      success: false,
      error: "Enter a valid quantity and purchase price",
    };
  }

  let name = values.name?.trim();
  let symbol: string | null = null;
  let unit = "item";
  let currentPrice: number;
  let changePercent: number | null = null;
  let interestRate: number | null = null;
  let details: Record<string, string> = {};

  try {
    if (category === "stock" || category === "crypto") {
      symbol = values.ticker?.trim().toUpperCase() ?? "";
      if (!/^[A-Z0-9.-]{1,20}$/.test(symbol))
        return { success: false, error: "Enter a valid ticker symbol" };
      const quoteSymbol =
        category === "crypto" ? `BINANCE:${symbol}USDT` : symbol;
      const quote = await fetchFinnhubQuote(quoteSymbol);
      currentPrice = quote.price;
      changePercent = quote.changePercent;
      name ??= symbol;
      unit = category === "crypto" ? symbol : "shares";
    } else if (category === "metal") {
      symbol = values.metal ?? "XAU";
      unit = values.unit ?? "oz";
      name =
        (
          {
            XAU: "Gold",
            XAG: "Silver",
            XPT: "Platinum",
            XPD: "Palladium",
          } as Record<string, string>
        )[symbol] ?? symbol;
      const quote = await fetchFinnhubQuote(`OANDA:${symbol}_USD`);
      const unitInOunces =
        unit === "g" ? 1 / 31.1034768 : unit === "kg" ? 1000 / 31.1034768 : 1;
      currentPrice = quote.price * unitInOunces;
      changePercent = quote.changePercent;
    } else if (category === "savings") {
      currentPrice = buyPrice;
      name = values.institution?.trim() ?? values.accountType ?? "Savings";
      interestRate = numberValue(values, "interestRate");
      unit = values.currency ?? "USD";
      details = {
        accountType: values.accountType ?? "savingsAccount",
        currency: unit,
        maturityDate: values.maturityDate ?? "",
      };
    } else {
      const currentValue = numberValue(values, "currentValue");
      if (!currentValue)
        return { success: false, error: "Enter a valid current value" };
      currentPrice = currentValue / quantity;
      name ??= category === "realEstate" ? "Real estate" : "Other asset";
    }

    await db.asset.create({
      data: {
        userId: session.user.id,
        category,
        name: name || category,
        symbol,
        quantity,
        unit,
        buyPrice,
        currentPrice,
        changePercent,
        interestRate,
        purchaseDate: values.purchaseDate
          ? new Date(`${values.purchaseDate}T00:00:00.000Z`)
          : null,
        notes: values.notes?.trim() ?? null,
        details,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Create asset failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to add asset",
    };
  }
}
