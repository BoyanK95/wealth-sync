"use client";

import { useEffect, useState } from "react";
import NewsResults from "./NewsResults";
import NoNewsResult from "./NoNewsResult";
import type { TickerInfoType } from "./types";
import TickerInfoComponent from "./TickerInfoComponent";
import LoadingCard from "../Common/LoadingCard";
import TickerSearchForm from "./TickerSearchForm";
import { toast } from "sonner";

export default function NewsPage() {
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
    <div className="mx-auto mt-13 max-w-4xl px-4 py-10">
      <TickerSearchForm
        query={query}
        setQuery={setQuery}
        loading={loading}
        handleTickerSearch={handleTickerSearch}
        error={error}
        fetchRecentNews={fetchRecentNews}
      />
      {loading && <LoadingCard />}
      {result && (
        <div className="space-y-6">
          <TickerInfoComponent result={result} />

          {result.news?.length ? (
            <NewsResults result={result} />
          ) : (
            <NoNewsResult />
          )}
        </div>
      )}
    </div>
  );
}
