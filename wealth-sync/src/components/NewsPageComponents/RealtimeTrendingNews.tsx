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
import type { BenzingaNewsItem } from "@/lib/services/benzinga";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { AlertCircle, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RealtimeTrendingNewsProps {
  apiKey: string;
  maxItems?: number;
}

export function RealtimeTrendingNews({
  apiKey,
  maxItems = 15,
}: RealtimeTrendingNewsProps) {
  const [news, setNews] = useState<BenzingaNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const t = useTranslations("NewsPage");

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const fetchTrendingNews = async () => {
      try {
        const response = await fetch("/api/benzinga?endpoint=trending");
        if (!response.ok) {
          throw new Error("Failed to fetch trending news");
        }
        const data = (await response.json()) as { news?: BenzingaNewsItem[] };
        setNews((data.news ?? []).slice(0, maxItems));
        setHasError(false);
        setIsLoading(false);
        setIsConnected(true);
      } catch (error) {
        console.error("Error fetching trending news:", error);
        setHasError(true);
        setIsConnected(false);
        setIsLoading(false);
      }
    };

    // Fetch immediately
    fetchTrendingNews();

    // Poll every 30 seconds for new news
    pollInterval = setInterval(fetchTrendingNews, 30000);

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [maxItems]);

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

  const getImportanceVariant = (
    importance?: number,
  ): "default" | "secondary" | "destructive" | "outline" => {
    if (importance === undefined) return "outline";
    if (importance >= 8) return "destructive";
    if (importance >= 5) return "default";
    return "secondary";
  };

  return (
    <Card className="rounded-3xl border border-gray-200 bg-white/80 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <CardTitle>
            {t("RealtimeTrendingNews.title") || "Real-time Trending News"}
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          {isConnected && (
            <Badge variant="outline" className="bg-green-50 text-green-700">
              <span className="relative mr-1 h-2 w-2 rounded-full bg-green-600">
                <span className="absolute h-full w-full animate-ping rounded-full bg-green-600" />
              </span>
              Live
            </Badge>
          )}
          {hasError && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
              <span className="relative mr-1 h-2 w-2 rounded-full bg-yellow-600">
                <span className="absolute h-full w-full animate-pulse rounded-full bg-yellow-600" />
              </span>
              Reconnecting...
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {hasError && !isConnected && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {t("RealtimeTrendingNews.error") ||
                "Unable to connect to real-time news stream"}
            </AlertDescription>
          </Alert>
        )}

        {news.length === 0 && !hasError && (
          <p className="text-center text-sm text-slate-500">
            {isConnected
              ? t("RealtimeTrendingNews.waiting") || "Waiting for news..."
              : t("RealtimeTrendingNews.connecting") ||
                "Connecting to news stream..."}
          </p>
        )}

        <div className="space-y-3">
          {news.map((item) => (
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
            >
              <div className="rounded-lg border border-gray-200 p-3 transition-all hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:bg-slate-800/50">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="line-clamp-2 text-sm leading-snug font-medium text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h4>
                    <p className="mt-1 line-clamp-1 text-xs text-gray-600 dark:text-gray-400">
                      {item.source}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(item.created).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {item.importance !== undefined && (
                      <Badge variant={getImportanceVariant(item.importance)}>
                        {item.importance}/10
                      </Badge>
                    )}
                    {item.sentiment && (
                      <Badge className={getSentimentColor(item.sentiment)}>
                        {item.sentiment}
                      </Badge>
                    )}
                  </div>
                </div>

                {item.tickers && item.tickers.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.tickers.slice(0, 3).map((ticker) => (
                      <Badge
                        key={ticker}
                        variant="secondary"
                        className="text-xs"
                      >
                        {ticker}
                      </Badge>
                    ))}
                    {item.tickers.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{item.tickers.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {isConnected && (
          <CardDescription className="text-center text-xs">
            {t("RealtimeTrendingNews.showing") || "Showing latest"}{" "}
            {news.length} {t("RealtimeTrendingNews.news") || "news"}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
