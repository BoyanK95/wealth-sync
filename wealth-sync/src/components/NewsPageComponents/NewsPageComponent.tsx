"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NewsResults from "./NewsResults";
import NoNewsResult from "./NoNewsResult";

interface NewsType {
  symbol?: string;
  name?: string;
  price?: string;
  description?: string;
  news: Array<{ headline: string; source: string; url: string }>;
}

export default function NewsPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    symbol?: string;
    name?: string;
    price?: string;
    description?: string;
    news?: Array<{ headline: string; source: string; url: string }>;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `/api/news?query=${encodeURIComponent(query)}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to load asset data");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  console.log("Result", result);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
        <h1 className="text-3xl font-semibold">
          Search market news and asset information
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Enter a ticker symbol or company name to get a quick summary and the
          latest news for that asset.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4 sm:flex-row"
        >
          <Input
            placeholder="e.g. AAPL or Apple"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Searching…" : "Search"}
          </Button>
        </form>

        {error && <p className="text-destructive mt-4 text-sm">{error}</p>}
      </div>

      {result && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
            <h2 className="text-xl font-semibold">
              {result.name ?? result.symbol ?? "Asset info"}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {result.description ?? "No description available."}
            </p>
            {result.price && (
              <p className="mt-4 text-lg font-medium">
                Current price: {result.price}
              </p>
            )}
          </div>

          {result.news?.length ? (
            <NewsResults result={result as NewsType} />
          ) : (
            <NoNewsResult />
          )}
        </div>
      )}
    </div>
  );
}
