"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BenzingaAPI, { type EarningsAnalysis } from "@/lib/services/benzinga";
import { useTranslations } from "next-intl";
import { BarChart3, TrendingUp, AlertCircle } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface EarningsAnalysisComponentProps {
  ticker: string;
  apiKey: string;
}

export function EarningsAnalysisComponent({
  ticker,
  apiKey,
}: EarningsAnalysisComponentProps) {
  const [analysis, setAnalysis] = useState<EarningsAnalysis | null>(null);
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
        const benzinga = new BenzingaAPI(apiKey);
        const data = await benzinga.getEarningsAnalysis(ticker);

        if (data) {
          setAnalysis(data);
          setError(null);
        } else {
          setError(
            t("EarningsAnalysis.noData") || "No earnings data available",
          );
        }
      } catch (err) {
        console.error("Error fetching earnings analysis:", err);
        setError(
          t("EarningsAnalysis.error") || "Failed to fetch earnings data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
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

  const getSurpriseColor = (surprise?: number): string => {
    if (surprise === undefined) return "text-gray-600";
    if (surprise > 0) return "text-green-600 dark:text-green-400";
    if (surprise < 0) return "text-red-600 dark:text-red-400";
    return "text-yellow-600 dark:text-yellow-400";
  };

  const getSurpriseLabel = (surprise?: number): string => {
    if (surprise === undefined) return "N/A";
    if (surprise > 0) return `+${surprise.toFixed(2)}%`;
    return `${surprise.toFixed(2)}%`;
  };

  const hasEarningsDate =
    analysis.earnings_date && new Date(analysis.earnings_date) > new Date();

  return (
    <Card className="rounded-3xl border border-gray-200 bg-white/80 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {t("EarningsAnalysis.title") || "Earnings Analysis"}
        </CardTitle>
        {analysis.earnings_date && (
          <CardDescription>
            {hasEarningsDate ? (
              <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                <AlertCircle className="h-4 w-4" />
                {t("EarningsAnalysis.upcoming") || "Upcoming"}:{" "}
                {new Date(analysis.earnings_date).toLocaleDateString()}
              </span>
            ) : (
              <span>
                {t("EarningsAnalysis.last")}{" "}
                {new Date(analysis.earnings_date).toLocaleDateString()}
              </span>
            )}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* EPS Analysis */}
          {(analysis.eps_estimate !== undefined ||
            analysis.eps_actual !== undefined) && (
            <div className="space-y-2 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                {t("EarningsAnalysis.eps") || "Earnings Per Share"}
              </h4>
              <div className="space-y-1">
                {analysis.eps_estimate !== undefined && (
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    <span className="font-medium">
                      {t("EarningsAnalysis.estimate")}{" "}
                      {t("EarningsAnalysis.eps")}:
                    </span>{" "}
                    ${analysis.eps_estimate.toFixed(2)}
                  </p>
                )}
                {analysis.eps_actual !== undefined && (
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    <span className="font-medium">
                      {t("EarningsAnalysis.actual")} {t("EarningsAnalysis.eps")}
                      :
                    </span>{" "}
                    ${analysis.eps_actual.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Revenue Analysis */}
          {(analysis.revenue_estimate !== undefined ||
            analysis.revenue_actual !== undefined) && (
            <div className="space-y-2 rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-900 dark:bg-purple-950/20">
              <h4 className="text-sm font-medium text-purple-900 dark:text-purple-100">
                {t("EarningsAnalysis.revenue") || "Revenue"}
              </h4>
              <div className="space-y-1">
                {analysis.revenue_estimate !== undefined && (
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    <span className="font-medium">
                      {t("EarningsAnalysis.estimate")}{" "}
                      {t("EarningsAnalysis.revenue")}:
                    </span>{" "}
                    ${(analysis.revenue_estimate / 1e9).toFixed(2)}B
                  </p>
                )}
                {analysis.revenue_actual !== undefined && (
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    <span className="font-medium">
                      {t("EarningsAnalysis.actual")}{" "}
                      {t("EarningsAnalysis.revenue")}:
                    </span>{" "}
                    ${(analysis.revenue_actual / 1e9).toFixed(2)}B
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Earnings Surprise */}
        {analysis.surprise !== undefined && (
          <div className="flex items-center justify-between rounded-lg bg-linear-to-r from-amber-50 to-orange-50 p-4 dark:from-amber-950/20 dark:to-orange-950/20">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-600" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {t("EarningsAnalysis.surprise") || "Earnings Surprise"}
              </span>
            </div>
            <span
              className={`text-lg font-semibold ${getSurpriseColor(analysis.surprise)}`}
            >
              {getSurpriseLabel(analysis.surprise)}
            </span>
          </div>
        )}

        {/* Summary */}
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {analysis.eps_actual &&
            analysis.eps_estimate &&
            analysis.eps_actual > analysis.eps_estimate
              ? t("EarningsAnalysis.beatsEps") ||
                "Company beat EPS expectations"
              : analysis.eps_actual &&
                  analysis.eps_estimate &&
                  analysis.eps_actual < analysis.eps_estimate
                ? t("EarningsAnalysis.missesEps") ||
                  "Company missed EPS expectations"
                : t("EarningsAnalysis.noComparison") ||
                  "EPS comparison not available"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
