"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import { Trading212Service } from "@/lib/services/trading212Service";
import { Button } from "@/components/ui/button";
import type { PortfolioItem } from "@/lib/constants/portfolio212";
import PositionItem from "./PositionItem";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  maxRetries = 3,
): Promise<T> {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await fetchFn();
    } catch (error) {
      if (error instanceof Response && error.status === 429) {
        const waitTime = Math.min(1000 * Math.pow(2, retries), 10000);
        await delay(waitTime);
        retries++;
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries reached");
}

export function Trading212Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllPositions, setShowAllPositions] = useState<boolean>(false);
  const { getApiKey } = usePlatformConnection();

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const apiKey = getApiKey("trading212");
        // console.log("Api key in Trading212Portofolio:", apiKey);

        const service = new Trading212Service(apiKey!);
        const data = await fetchWithRetry(() => service.getPortfolio());
        setPortfolio(data);
        console.log("Portfolio:", data);
      } catch (err) {
        setError("Failed to fetch portfolio data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, [getApiKey, portfolio]);

  const calculatePortfolioMetrics = () => {
    return portfolio.reduce(
      (acc, item) => {
        const positionValue = item.quantity * item.currentPrice;
        const investedValue = item.quantity * item.averagePrice;
        const profitLoss = item.ppl;

        return {
          totalValue: acc.totalValue + positionValue,
          totalInvested: acc.totalInvested + investedValue,
          totalProfitLoss: acc.totalProfitLoss + profitLoss,
          positions: acc.positions + 1,
        };
      },
      {
        totalValue: 0,
        totalInvested: 0,
        totalProfitLoss: 0,
        positions: 0,
      },
    );
  };

  if (loading) return <div>Loading Trading212 portfolio...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!portfolio.length) return null;

  const metrics = calculatePortfolioMetrics();

  const toggleShowAllPositions = () => {
    setShowAllPositions((prev) => !prev);
  };
  const profitLossPercentage =
    (metrics.totalProfitLoss / metrics.totalInvested) * 100;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Trading212 Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Portfolio Value</p>
            <p className="text-2xl font-bold">
              $
              {metrics.totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Total Invested</p>
            <p className="text-2xl font-bold">
              $
              {metrics.totalInvested.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Profit/Loss</p>
            <p
              className={`text-2xl font-bold ${metrics.totalProfitLoss >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              $
              {metrics.totalProfitLoss.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <span className="ml-1 text-sm">
                ({profitLossPercentage.toFixed(2)}%)
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Positions</p>
            <p className="text-2xl font-bold">{metrics.positions}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!showAllPositions
              ? portfolio
                  .sort(
                    (a, b) =>
                      b.quantity * b.currentPrice - a.quantity * a.currentPrice,
                  )
                  .slice(0, 5)
                  .map((item) => <PositionItem key={item.ticker} item={item} />)
              : portfolio
                  .sort(
                    (a, b) =>
                      b.quantity * b.currentPrice - a.quantity * a.currentPrice,
                  )
                  .map((item) => (
                    <PositionItem key={item.ticker} item={item} />
                  ))}
            <div className="mt-4 flex justify-center">
              <Button
                onClick={toggleShowAllPositions}
                className="cursor-pointer"
              >
                {showAllPositions ? "Show Less" : "View All Positions"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
