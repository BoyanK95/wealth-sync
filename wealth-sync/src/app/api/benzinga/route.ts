import { NextResponse } from "next/server";
import { env } from "@/env";
import BenzingaAPI from "@/lib/services/benzinga";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const endpoint = url.searchParams.get("endpoint");
  const ticker = url.searchParams.get("ticker");

  if (!env.BENZINGA_APIKEY) {
    return NextResponse.json(
      { error: "Benzinga API key not configured" },
      { status: 500 },
    );
  }

  try {
    const benzinga = new BenzingaAPI(env.BENZINGA_APIKEY);

    switch (endpoint) {
      case "trending":
        const trending = await benzinga.getTrendingNews(25);
        return NextResponse.json({ news: trending });

      case "ticker-news":
        if (!ticker) {
          return NextResponse.json(
            { error: "Ticker parameter required" },
            { status: 400 },
          );
        }
        const tickerNews = await benzinga.getTickerNews([ticker]);
        return NextResponse.json({ news: tickerNews });

      case "bulls-bears":
        if (!ticker) {
          return NextResponse.json(
            { error: "Ticker parameter required" },
            { status: 400 },
          );
        }
        const analysis = await benzinga.getBullsBearsAnalysis(ticker);
        return NextResponse.json(analysis ?? {});

      case "earnings":
        if (!ticker) {
          return NextResponse.json(
            { error: "Ticker parameter required" },
            { status: 400 },
          );
        }
        try {
          const earnings = await benzinga.getEarningsAnalysis(ticker);
          return NextResponse.json(earnings ?? {});
        } catch (error) {
          console.error("Finnhub error:", error);
          return NextResponse.json(
            { error: "Unable to fetch asset data" },
            { status: 500 },
          );
        }

      case "search":
        const query = url.searchParams.get("query");
        if (!query) {
          return NextResponse.json(
            { error: "Query parameter required" },
            { status: 400 },
          );
        }
        const results = await benzinga.searchAssets(query);
        return NextResponse.json({ assets: results });

      default:
        return NextResponse.json(
          { error: "Unknown endpoint" },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("Benzinga API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Benzinga data" },
      { status: 500 },
    );
  }
}
