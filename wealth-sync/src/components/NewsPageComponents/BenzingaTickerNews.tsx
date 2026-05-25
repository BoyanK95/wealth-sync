"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BenzingaAPI, { type BenzingaNewsItem } from "@/lib/services/benzinga";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface BenzingaTickerNewsProps {
  ticker: string;
  apiKey: string;
  maxItems?: number;
}

export function BenzingaTickerNews({
  ticker,
  apiKey,
  maxItems = 10,
}: BenzingaTickerNewsProps) {
  const [news, setNews] = useState<BenzingaNewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("NewsPage");

  useEffect(() => {
    if (!ticker.trim()) {
      setNews([]);
      setLoading(false);
      return;
    }

    const fetchNews = async () => {
      try {
        setLoading(true);
        const benzinga = new BenzingaAPI(apiKey);
        const data = await benzinga.getTickerNews([ticker]);

        setNews(data.slice(0, maxItems));
        setError(null);
      } catch (err) {
        console.error("Error fetching Benzinga ticker news:", err);
        setError(
          t("BenzingaTickerNews.error") || "Failed to fetch news for this ticker",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [ticker, apiKey, maxItems, t]);

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment?.toLowerCase()) {
      case "bullish":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "bearish":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  if (loading && !news.length) {
    return (
      <Card className="rounded-3xl border border-gray-200 bg-white/80 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
        </CardContent>
      </Card>
    );
  }

  if (error || news.length === 0) {
    return null;
  }

  return (
    <Card className="rounded-3xl border border-gray-200 bg-white/80 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            {t("BenzingaTickerNews.title") || "Ticker News"}
          </CardTitle>
          {loading && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {t("BenzingaTickerNews.loading") || "Loading..."}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {news.map((item) => (
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
            >
              <div className="group rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-900 dark:hover:bg-slate-800/50">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <h3 className="line-clamp-2 flex-1 text-sm font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                      {item.title}
                    </h3>
                    {item.importance !== undefined && (
                      <Badge
                        variant="secondary"
                        className="ml-2 shrink-0"
                      >
                        {item.importance}/10
                      </Badge>
                    )}
                  </div>

                  <p className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
                    {item.body}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {item.source}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(item.created).toLocaleString()}
                    </span>

                    {item.sentiment && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <Badge className={`text-xs ${getSentimentColor(item.sentiment)}`}>
                          {item.sentiment}
                        </Badge>
                      </>
                    )}
                  </div>

                  {item.tickers && item.tickers.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tickers.slice(0, 5).map((t) => (
                        <Badge key={t} variant="outline" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                      {item.tickers.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.tickers.length - 5}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <CardDescription className="mt-4 text-center text-xs">
          {t("BenzingaTickerNews.showing") || "Showing"} {news.length} {t("BenzingaTickerNews.newsItems") || "news items"}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
