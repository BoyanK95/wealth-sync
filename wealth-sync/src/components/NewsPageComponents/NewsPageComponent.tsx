"use client";

import { useEffect, useState } from "react";
import NewsResults from "./NewsResults";
import NoNewsResult from "./NoNewsResult";
import type { TickerInfoType } from "./types";
import TickerInfoComponent from "./TickerInfoComponent";
import LoadingCard from "../Common/LoadingCard";
import TickerSearchForm from "./TickerSearchForm";
import { toast } from "sonner";
import { RealtimeTrendingNews } from "./RealtimeTrendingNews";
import { BullsBearsAnalysisComponent } from "./BullsBearsAnalysis";
import { EarningsAnalysisComponent } from "./EarningsAnalysis";
import { BenzingaTickerNews } from "./BenzingaTickerNews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Newspaper, TrendingUp, Calendar, Radio } from "lucide-react";

export default function NewsPage({
  benzingaApiKey,
}: {
  benzingaApiKey?: string;
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TickerInfoType | null>(null);

  useEffect(() => {
    void fetchRecentNews();
  }, []);

  async function fetchRecentNews() {
    setQuery("");
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/news");
      const data = (await response.json()) as TickerInfoType & {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to load asset data");
      }
      setResult(data);
    } catch (err) {
      console.error("Failed to fetch recent news:", err);
      toast.error("Failed to load news!");
      setError(
        "Failed to load recent news" +
          (err instanceof Error ? `: ${err.message}` : ""),
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleTickerSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(
        `/api/news?query=${encodeURIComponent(trimmedQuery)}`,
      );
      const data = (await response.json()) as TickerInfoType & {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to load asset data");
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
      setQuery("");
    }
  }

  return (
    <div className="mx-auto mt-13 max-w-5xl px-4 py-10">
      <TickerSearchForm
        query={query}
        setQuery={setQuery}
        loading={loading}
        handleTickerSearch={handleTickerSearch}
        error={error}
        fetchRecentNews={fetchRecentNews}
      />

      {benzingaApiKey && (
        <div className="mb-6">
          <RealtimeTrendingNews apiKey={benzingaApiKey} maxItems={15} />
        </div>
      )}

      {loading && <LoadingCard />}

      {result && (
        <div className="space-y-6">
          <TickerInfoComponent result={result} />

          {benzingaApiKey && result.symbol ? (
            <Tabs defaultValue="news" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="news" className="gap-2">
                  <Newspaper className="size-4" />
                  <span className="hidden sm:inline">News</span>
                </TabsTrigger>
                <TabsTrigger value="bulls-bears" className="gap-2">
                  <TrendingUp className="size-4" />
                  <span className="hidden sm:inline">Bulls & Bears</span>
                </TabsTrigger>
                <TabsTrigger value="earnings" className="gap-2">
                  <Calendar className="size-4" />
                  <span className="hidden sm:inline">Earnings</span>
                </TabsTrigger>
                <TabsTrigger value="benzinga" className="gap-2">
                  <Radio className="size-4" />
                  <span className="hidden sm:inline">Benzinga</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="news" className="mt-6">
                {result.news?.length ? (
                  <NewsResults result={result} />
                ) : (
                  <NoNewsResult />
                )}
              </TabsContent>

              <TabsContent value="bulls-bears" className="mt-6">
                <BullsBearsAnalysisComponent
                  ticker={result.symbol}
                  apiKey={benzingaApiKey}
                />
              </TabsContent>

              <TabsContent value="earnings" className="mt-6">
                <EarningsAnalysisComponent
                  ticker={result.symbol}
                  apiKey={benzingaApiKey}
                />
              </TabsContent>

              <TabsContent value="benzinga" className="mt-6">
                <BenzingaTickerNews
                  ticker={result.symbol}
                  apiKey={benzingaApiKey}
                  maxItems={10}
                />
              </TabsContent>
            </Tabs>
          ) : (
            <>
              {result.news?.length ? (
                <NewsResults result={result} />
              ) : (
                <NoNewsResult />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
