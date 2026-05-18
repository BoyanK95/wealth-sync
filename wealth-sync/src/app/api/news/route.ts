import { NextResponse } from "next/server";

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query")?.trim();

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  if (!FINNHUB_API_KEY) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    const searchRes = await fetch(
      `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${FINNHUB_API_KEY}`,
    );
    const searchData = await searchRes.json();

    if (!searchRes.ok || !searchData.result?.length) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    const symbol = searchData.result[0].symbol;
    const profileRes = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`,
    );
    const quoteRes = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`,
    );
    const newsRes = await fetch(
      `https://finnhub.io/api/v1/company-news?symbol=${encodeURIComponent(symbol)}&from=${new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000,
      )
        .toISOString()
        .slice(
          0,
          10,
        )}&to=${new Date().toISOString().slice(0, 10)}&token=${FINNHUB_API_KEY}`,
    );

    const profile = await profileRes.json();
    const quote = await quoteRes.json();
    const news = await newsRes.json();

    return NextResponse.json({
      symbol,
      name: profile.name,
      description: profile.finnhubIndustry || profile.exchange,
      price: quote.c ? `$${quote.c}` : undefined,
      news: Array.isArray(news)
        ? news.slice(0, 5).map((item: any) => ({
            headline: item.headline,
            source: item.source,
            url: item.url,
          }))
        : [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch asset data" },
      { status: 500 },
    );
  }
}
