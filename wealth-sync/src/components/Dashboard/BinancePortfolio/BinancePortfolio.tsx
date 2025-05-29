"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import { Button } from "@/components/ui/button";
import { PlatformLoadingCard } from "../PlatformLoadingCard";
import PortfolioValue from "../PortfolioValue/PortfolioValue";
import TotalInvested from "../TotalInvested/TotalInvested";
import ProfitAndLoss from "../ProfitAndLoss/ProfitAndLoss";
import Positions from "../Positions/Positions";
import ContainerCardErrorState from "../ContainerCardErrorState/ContainerCardErrorState";
import { TooltipText } from "@/lib/constants/tooltipText";
import { TitleText } from "@/lib/constants/titleText";
import { BinanceService } from "@/lib/services/binanceService";

// Define interfaces for Binance data
interface BinanceAsset {
  asset: string;
  free: string;
  locked: string;
  totalValue?: number; // USD value
}

interface BinancePosition {
  symbol: string;
  asset: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
}

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

export function BinancePortfolio() {
  const [account, setAccount] = useState<any[]>([]);
  const [positions, setPositions] = useState<BinancePosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllPositions, setShowAllPositions] = useState<boolean>(false);
  const { getApiKey } = usePlatformConnection();

  useEffect(() => {
    async function fetchBinanceData() {
      try {
        setLoading(true);
        const apiKey = getApiKey("binance");
        const binanceService = new BinanceService(apiKey!);
        const binanceAccountData = await fetchWithRetry(() =>
          binanceService.getAccountInfo(),
        );
        console.log("Binance data:", binanceAccountData);
        // setAccount(binanceAccountData.balances);
      } catch (err) {
        console.error("Error fetching Binance data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch Binance data",
        );
      } finally {
        setLoading(false);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchBinanceData();
  }, [getApiKey]);

  // const calculatePortfolioMetrics = useCallback(() => {
  //   return positions.reduce(
  //     (acc, position) => {
  //       return {
  //         totalValue: acc.totalValue + position.totalValue,
  //         totalInvested: acc.totalInvested + position.totalValue, // We don't have invested amount
  //         totalProfitLoss: acc.totalProfitLoss + position.profitLoss,
  //         positions: acc.positions + 1,
  //       };
  //     },
  //     {
  //       totalValue: 0,
  //       totalInvested: 0,
  //       totalProfitLoss: 0,
  //       positions: 0,
  //     },
  //   );
  // }, [positions]);

  const reloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  if (loading) return <PlatformLoadingCard platformName="Binance" />;
  if (error)
    return <ContainerCardErrorState error={error} onRetry={reloadPage} />;
  if (!positions.length) return null;

  const toggleShowAllPositions = () => {
    setShowAllPositions((prev) => !prev);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Binance Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <PortfolioValue
            totalValue={metrics.totalValue}
            portfolioTitle={TitleText.TOTAL_ACCOUNT_VALUE}
            tooltipText={TooltipText.PORTFOLIO_VALUE}
          />
          <TotalInvested
            totalInvested={metrics.totalInvested}
            totalInvestedTitle="Estimated Value"
            tooltipText="Estimated value of your crypto assets"
          />
          <Positions positions={metrics.positions} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {showAllPositions ? "All Assets" : "Top Assets"}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleShowAllPositions}
            >
              {showAllPositions ? "Show Less" : "Show All"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!showAllPositions
              ? positions
                  .sort((a, b) => b.totalValue - a.totalValue)
                  .slice(0, 5)
                  .map((position) => (
                    <BinancePositionItem
                      key={position.symbol}
                      position={position}
                    />
                  ))
              : positions
                  .sort((a, b) => b.totalValue - a.totalValue)
                  .map((position) => (
                    <BinancePositionItem
                      key={position.symbol}
                      position={position}
                    />
                  ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function BinancePositionItem({ position }: { position: BinancePosition }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="font-medium">{position.asset}</h3>
          <p className="text-muted-foreground text-sm">
            {position.quantity.toFixed(6)} {position.asset}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">
          $
          {position.totalValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="text-muted-foreground text-sm">
          $
          {position.currentPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          })}
        </p>
      </div>
    </div>
  );
}

export default BinancePortfolio;
