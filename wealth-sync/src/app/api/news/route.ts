import { NextResponse } from "next/server";
import { env } from "@/env";

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const API_KEY = env.FINNHUB_KEY;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query")?.trim();

   if (!API_KEY) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    // Search for the symbol
    const searchResponse = await fetch(
      `${FINNHUB_BASE_URL}/search?q=${encodeURIComponent(query)}&token=${API_KEY}`,
    );

    if (!searchResponse.ok) {
      throw new Error(`Search failed: ${searchResponse.statusText}`);
    }

    const searchData = (await searchResponse.json()) as {
      result?: Array<{ symbol: string }>;
    };

    if (!searchData.result?.length) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    const symbol = searchData.result[0]!.symbol;

    // Fetch profile, quote, and news in parallel
    const [profileRes, quoteRes, newsRes] = await Promise.all([
      fetch(
        `${FINNHUB_BASE_URL}/stock/profile2?symbol=${encodeURIComponent(symbol)}&token=${API_KEY}`,
      ),
      fetch(
        `${FINNHUB_BASE_URL}/quote?symbol=${encodeURIComponent(symbol)}&token=${API_KEY}`,
      ),
      fetch(
        `${FINNHUB_BASE_URL}/company-news?symbol=${encodeURIComponent(symbol)}&from=${new Date(
          Date.now() - 7 * 24 * 60 * 60 * 1000,
        )
          .toISOString()
          .slice(
            0,
            10,
          )}&to=${new Date().toISOString().slice(0, 10)}&token=${API_KEY}`,
      ),
    ]);

    const [profileData, quoteData, newsData] = await Promise.all([
      profileRes.json() as Promise<{
        name?: string;
        finnhubIndustry?: string;
        exchange?: string;
        logo?: string;
        ipo?: string;
        marketCapitalization?: number;
      }>,
      quoteRes.json() as Promise<{ c?: number }>,
      newsRes.json() as Promise<
        Array<{ headline: string; source: string; url: string }>
      >,
    ]);

    console.log('ProfileData', profileData);
    // console.log('QuoteData', quoteData);
    // console.log('NewsData', newsData);

    return NextResponse.json({
      symbol,
      name: profileData.name,
      description: profileData.finnhubIndustry ?? profileData.exchange,
      price: quoteData.c ? `$${quoteData.c}` : undefined,
      logo: profileData.logo,
      ipo: profileData.ipo,
      marketCapitalization: profileData.marketCapitalization
        ? `$${(profileData.marketCapitalization / 1e9).toFixed(2)}B`
        : undefined,
      news: Array.isArray(newsData)
        ? newsData.slice(0, 5).map((item) => ({
            headline: item.headline,
            source: item.source,
            url: item.url,
          }))
        : [],
    });
  } catch (error) {
    console.error("Finnhub error:", error);
    return NextResponse.json(
      { error: "Unable to fetch asset data" },
      { status: 500 },
    );
  }
}
