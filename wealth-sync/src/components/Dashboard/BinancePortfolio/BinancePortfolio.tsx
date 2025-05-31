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
interface BinanceBalance {
  asset: string;
  free: string;
  locked: string;
}

interface BinanceAccount {
  balances: BinanceBalance[];
  accountType: string;
  canTrade: boolean;
  // other fields as needed
}

interface BinancePosition {
  symbol: string;
  asset: string;
  quantity: number;
  currentPrice: number;
  totalValue: number;
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
  const [account, setAccount] = useState<BinanceAccount | null>(null);
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
        if (!apiKey) {
          setError("Binance API key not found");
          setLoading(false);
          return;
        }

        const binanceService = new BinanceService(apiKey);

        // Fetch account data
        const accountData = await fetchWithRetry(() =>
          binanceService.getAccountInfo(),
        );
        const pricesData = await fetchWithRetry(() =>
          binanceService.getPrices(),
        );
        console.log("Binance account data:", accountData);
        console.log("Binance prices data:", pricesData);
        
        setAccount(accountData);

        // Filter non-zero balances and calculate positions
        const nonZeroBalances = accountData.balances.filter(
          (balance: BinanceBalance) =>
            parseFloat(balance.free) > 0 || parseFloat(balance.locked) > 0,
        );

        console.log("Non-zero balances:", nonZeroBalances);
        
        const calculatedPositions = nonZeroBalances
          .map((balance: BinanceBalance) => {
            const asset = balance.asset;
            const quantity =
              parseFloat(balance.free) + parseFloat(balance.locked);
            const symbol = balance.asset.split('LD')[1];
            console.log("Symbol:", symbol);
            
            const price = pricesData[`${symbol}USDT`];
            console.log("Price:", price);
            
            const totalValue = quantity * price;

            return {
              symbol,
              asset,
              quantity,
              currentPrice: price,
              totalValue,
            };
          })
          .filter((position) => position.totalValue > 0)
          .sort((a, b) => b.totalValue - a.totalValue);

        setPositions(calculatedPositions);
        console.log("Calculated positions:", calculatedPositions);
        
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

  const calculatePortfolioMetrics = useCallback(() => {
    return positions.reduce(
      (acc, position) => {
        return {
          totalValue: acc.totalValue + position.totalValue,
          totalInvested: acc.totalInvested + position.totalValue, // We don't have invested amount
          totalProfitLoss: 0, // We don't have this data
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
  }, [positions]);

  const reloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  if (loading) return <PlatformLoadingCard platformName="Binance" />;
  if (error)
    return <ContainerCardErrorState error={error} onRetry={reloadPage} />;
  if (!positions.length) return null;

  const metrics = calculatePortfolioMetrics();
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
                  .slice(0, 5)
                  .map((position) => (
                    <BinancePositionItem
                      key={position.symbol}
                      position={position}
                    />
                  ))
              : positions.map((position) => (
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
          <h3 className="font-medium">{position.symbol}</h3>
          <p className="text-muted-foreground text-sm">
            {position.quantity.toFixed(6)} {position.symbol}
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
