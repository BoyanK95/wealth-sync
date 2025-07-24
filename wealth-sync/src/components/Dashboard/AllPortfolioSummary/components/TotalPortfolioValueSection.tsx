"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IPortfolioData } from "@/lib/contexts/PortfolioSummaryContext";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";

export const TotalPortfolioValueSection = ({
  showStats,
  portfolioData,
}: {
  showStats: boolean;
  portfolioData: IPortfolioData;
}) => {
  const { totalValue, totalChange, totalChangePercent } = portfolioData;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Total Open Positions Portfolio Value
        </CardTitle>
        <DollarSign className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        {showStats ? (
          <>
            <div className="text-2xl font-bold">
              {totalValue ? totalValue.toLocaleString() : "0.00"}
            </div>
            <div className="flex items-center pt-1">
              {totalChange && totalChange > 0 ? (
                <ArrowUp className="mr-1 h-4 w-4 text-green-700" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4 text-red-700" />
              )}
              <span
                className={
                  totalChange && totalChange > 0
                    ? "text-green-700"
                    : "text-red-700"
                }
              >
                {totalChange && totalChange > 0 ? "+" : "-"}$
                {totalChange ? Math.abs(totalChange).toLocaleString() : "0.00"}{" "}
                ({totalChangePercent ?? 0}%)
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
