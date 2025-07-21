"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IBestPerformingAsset } from "@/lib/contexts/PortfolioSummaryContext";
import { ArrowDown, ArrowUp, LineChart } from "lucide-react";

export const TopPerformingAssetSection: React.FC<{
  showStats: boolean;
  bestPerformingAsset: IBestPerformingAsset | null;
}> = ({ showStats, bestPerformingAsset }) => {
  const { ticker, percentageChange: bestPerformerChange } =
    bestPerformingAsset ?? {};

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Top Performing Asset
        </CardTitle>
        <LineChart className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        {showStats ? (
          <>
            <div className="text-2xl font-bold">{ticker ?? "N/A"}</div>
            <div className="flex items-center pt-1">
              {bestPerformerChange && bestPerformerChange > 0 ? (
                <ArrowUp className="mr-1 h-4 w-4 text-green-700" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4 text-red-700" />
              )}
              <span
                className={
                  bestPerformerChange && bestPerformerChange > 0
                    ? "text-green-700"
                    : "text-red-700"
                }
              >
                {bestPerformerChange && bestPerformerChange > 0 ? "+" : ""}
                {bestPerformerChange ? bestPerformerChange.toFixed(2) : "0.00"}%
              </span>
            </div>
          </>
        ) : (
          <div className="text-2xl font-bold">
            <h3>******</h3>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
