"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NewsResults from "./NewsResults";
import NoNewsResult from "./NoNewsResult";
import type { TickerInfoType } from "./types";
import TickerInfoComponent from "./TickerInfoComponent";
import { useTranslations } from "next-intl";
import LoadingCard from "../Common/LoadingCard";

export default function NewsPage() {
  const t = useTranslations("NewsPage");

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TickerInfoType | null>(null);

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

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
        <h1 className="text-3xl font-semibold">{t("title")}</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          {t("description")}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4 sm:flex-row"
        >
          <Input
            placeholder={t("searchPlaceholder")}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? t("searching") : t("search")}
          </Button>
        </form>

        {error && (
          <p className="text-destructive text-md mt-4 pt-3 text-center">{error}</p>
        )}
      </div>
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
