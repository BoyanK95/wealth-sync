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
import type { BullsBearsAnalysis } from "@/lib/services/benzinga";
import { useTranslations } from "next-intl";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface BullsBearsAnalysisProps {
  ticker: string;
  apiKey: string;
}

export function BullsBearsAnalysisComponent({
  ticker,
  apiKey,
}: BullsBearsAnalysisProps) {
  const [analysis, setAnalysis] = useState<BullsBearsAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("NewsPage");

  useEffect(() => {
    if (!ticker.trim()) {
      setLoading(false);
      return;
    }

    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/benzinga?endpoint=bulls-bears&ticker=${encodeURIComponent(ticker)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch analysis");
        }

        const data = (await response.json()) as
          | BullsBearsAnalysis
          | { error: string };

        if ("error" in data) {
          setError(
            t("BullsBearsAnalysis.error") ||
              "No analysis data available for this ticker",
          );
          setAnalysis(null);
        } else {
          setAnalysis(data);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching bulls & bears analysis:", err);
        setError(
          t("BullsBearsAnalysis.fetchError") || "Failed to fetch analysis data",
        );
        setAnalysis(null);
      } finally {
        setLoading(false);
      }
    };

    try {
      void fetchAnalysis();
    } catch (error) {
      setError(
        t("BullsBearsAnalysis.fetchError") || "Failed to fetch analysis data",
      );
    }
  }, [ticker, apiKey, t]);

  if (loading) {
    return (
      <Card className="rounded-3xl border border-gray-200 bg-white/80 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  const getRatingColor = (rating?: string) => {
    switch (rating?.toLowerCase()) {
      case "strong buy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "buy":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case "hold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "sell":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "strong sell":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card className="rounded-3xl border border-gray-200 bg-white/80 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {t("BullsBearsAnalysis.title") || "Bulls & Bears Analysis"}
        </CardTitle>
        {analysis.analyst_rating && (
          <Badge
            className={`w-fit ${getRatingColor(analysis.analyst_rating.rating)}`}
          >
            {analysis.analyst_rating.rating}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Bullish Analysis */}
        {analysis.bullish_summary && (
          <div className="space-y-2 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/20">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <h4 className="font-medium text-green-900 dark:text-green-100">
                {t("BullsBearsAnalysis.bullish") || "Bullish"}
              </h4>
            </div>
            <p className="text-sm text-green-800 dark:text-green-200">
              {analysis.bullish_summary}
            </p>
            {analysis.analyst_rating && (
              <div className="mt-2 flex gap-4 text-xs">
                {analysis.analyst_rating.num_strong_buys !== undefined && (
                  <span className="font-medium text-green-700 dark:text-green-300">
                    🟢 Strong Buy: {analysis.analyst_rating.num_strong_buys}
                  </span>
                )}
                {analysis.analyst_rating.num_buys !== undefined && (
                  <span className="font-medium text-emerald-700 dark:text-emerald-300">
                    🟩 Buy: {analysis.analyst_rating.num_buys}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Neutral Analysis */}
        {analysis.neutral_summary && (
          <div className="space-y-2 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950/20">
            <div className="flex items-center gap-2">
              <Minus className="h-4 w-4 text-yellow-600" />
              <h4 className="font-medium text-yellow-900 dark:text-yellow-100">
                {t("BullsBearsAnalysis.neutral") || "Neutral"}
              </h4>
            </div>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              {analysis.neutral_summary}
            </p>
            {analysis.analyst_rating?.num_holds !== undefined && (
              <p className="mt-2 text-xs font-medium text-yellow-700 dark:text-yellow-300">
                🟨 Hold: {analysis.analyst_rating.num_holds}
              </p>
            )}
          </div>
        )}

        {/* Bearish Analysis */}
        {analysis.bearish_summary && (
          <div className="space-y-2 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/20">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <h4 className="font-medium text-red-900 dark:text-red-100">
                {t("BullsBearsAnalysis.bearish") || "Bearish"}
              </h4>
            </div>
            <p className="text-sm text-red-800 dark:text-red-200">
              {analysis.bearish_summary}
            </p>
            {analysis.analyst_rating && (
              <div className="mt-2 flex gap-4 text-xs">
                {analysis.analyst_rating.num_sells !== undefined && (
                  <span className="font-medium text-orange-700 dark:text-orange-300">
                    🟧 Sell: {analysis.analyst_rating.num_sells}
                  </span>
                )}
                {analysis.analyst_rating.num_strong_sells !== undefined && (
                  <span className="font-medium text-red-700 dark:text-red-300">
                    🔴 Strong Sell: {analysis.analyst_rating.num_strong_sells}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Target Price */}
        {analysis.analyst_rating?.target_price !== undefined && (
          <div className="flex items-center justify-between rounded-lg bg-linear-to-r from-blue-50 to-indigo-50 p-4 dark:from-blue-950/20 dark:to-indigo-950/20">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {t("BullsBearsAnalysis.targetPrice") || "Target Price"}
            </span>
            <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              ${analysis.analyst_rating.target_price.toFixed(2)}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
