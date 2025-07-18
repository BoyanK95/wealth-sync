"use client";

import React from "react";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  DollarSign,
  LineChart,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import { useEffect, useState, useCallback } from "react";
import { Trading212Service } from "@/lib/services/trading212Service";
import { getCleanTickerName, isGbxTicker } from "@/lib/utils/currencyUtils";
import ContainerCardLoadingState from "../ContainerCardLoadingState/ContainerCardLoadingState.tsx";
import ContainerCardErrorState from "@/components/Dashboard/ContainerCardErrorState/ContainerCardErrorState";
import { loadingCards } from "../ContainerCardLoadingState/constants";
import { BinanceService } from "@/lib/services/binanceService";
import { ApiKeyStrings } from "@/lib/constants/apiKeyStrings";
import { calculateBinancePortfolioMetrics } from "../helper/calculateBinancePortfolioHelperFunction";
import { findTopPerformingAsset } from "../helper/findTopPerformingAsset";
import { Eye, EyeOff } from "lucide-react";
import { Platforms } from "@/lib/constants/platforms";
import { Button } from "@/components/ui/button";

const AllPortfolioSummary = ({
  showStats,
  setShowStats,
}: {
  showStats: boolean;
  setShowStats: (showStats: boolean) => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const [totalChange, setTotalChange] = useState<number | null>(null);
  const [totalChangePercent, setTotalChangePercent] = useState<number | null>(
    null,
  );
  const [connectedCount, setConnectedCount] = useState(0);
  const [topPerformingAsset, setTopPerformingAsset] = useState<string | null>(
    null,
  );
  const [bestPerformerChange, setBestPerformerChange] = useState<number | null>(
    null,
  );
  const { connections, getApiKey } = usePlatformConnection();

  const reloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    async function fetchPortfolioData() {
      try {
        setLoading(true);
        let portfolioTotal = 0;
        let platformsConnected = 0;
        let bestPerformer = { ticker: "", percentageChange: 0 };

        if (
          connections.some(
            (connection) =>
              connection.platformId === (ApiKeyStrings.TRADING_212 as string),
          )
        ) {
          const trading212ApiKey = getApiKey(ApiKeyStrings.TRADING_212);
          const service = new Trading212Service(trading212ApiKey!);
          const portfolioData = await service.getPortfolio();

          /**
           * Calculate the total open postion portfolio value by adding all open positions
           */
          const trading212Value = portfolioData.reduce((sum, position) => {
            if (isGbxTicker(position.ticker)) {
              return sum + position.currentPrice * 0.01 * position.quantity; // Convert from pence to pounds
            }
            return sum + position.currentPrice * position.quantity;
          }, 0);

          // Find top performing asset
          portfolioData.forEach((position) => {
            const percentageChange =
              position.pnlPercentage ||
              ((position.currentPrice - position.averagePrice) /
                position.averagePrice) *
                100;

            if (!isFinite(percentageChange) || isNaN(percentageChange)) {
              return;
            }

            if (percentageChange > bestPerformer.percentageChange) {
              bestPerformer = {
                ticker: getCleanTickerName(position.ticker),
                percentageChange,
              };
            }
          });

          if (bestPerformer.ticker) {
            setTopPerformingAsset(bestPerformer.ticker);
            // Use the percentage for the monthly change as a placeholder
            setBestPerformerChange(bestPerformer.percentageChange);
          }

          portfolioTotal += trading212Value;
          platformsConnected++;
        }
        if (
          connections.some(
            (connection) =>
              connection.platformId === (ApiKeyStrings.BINANCE as string),
          )
        ) {
          const binanceApiKey = getApiKey(ApiKeyStrings.BINANCE);
          const binanceService = new BinanceService(binanceApiKey!);
          const portfolioData = await binanceService.getPortfolio();

          // Calculate Binance portfolio metrics
          const binanceMetrics =
            calculateBinancePortfolioMetrics(portfolioData);

          // Find top performing Binance asset (if any)
          const topBinanceAsset = findTopPerformingAsset(portfolioData);

          if (topBinanceAsset && !bestPerformer.ticker) {
            bestPerformer = topBinanceAsset;
            setTopPerformingAsset(topBinanceAsset.ticker);
          }

          portfolioTotal += binanceMetrics!.totalValue;
          platformsConnected++;
        }
        // Add other platforms here as they're implemented

        setTotalValue(portfolioTotal);
        setConnectedCount(platformsConnected);

        // For now, using mock change portfolioData - this should be calculated from historical portfolioData
        setTotalChange(portfolioTotal * 0.01); // Placeholder: 1% change
        setTotalChangePercent(1.0); // Placeholder: 1%
      } catch (err) {
        console.error("Error fetching portfolio portfolioData:", err);
        setError("Failed to load portfolio portfolioData");
      } finally {
        setLoading(false);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPortfolioData();
  }, [connections, getApiKey]);

  if (loading) {
    return <ContainerCardLoadingState cards={loadingCards} />;
  }
  if (error) {
    return <ContainerCardErrorState error={error} onRetry={reloadPage} />;
  }

  return (
    <Card>
      <div className="ml-5 flex items-center space-x-2">
        <h2 className="text-xl font-semibold">Portfolio Summary</h2>
        <Button
          variant="ghost"
          onClick={() => setShowStats(!showStats)}
          className="cursor-pointer text-gray-400 dark:hover:text-gray-200"
        >
          {showStats ? (
            <Eye className="h-6 w-6" />
          ) : (
            <EyeOff className="h-6 w-6" />
          )}
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                    {totalChange
                      ? Math.abs(totalChange).toLocaleString()
                      : "0.00"}{" "}
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Connected Platforms
            </CardTitle>
            <Wallet className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedCount}</div>
            <p className="text-muted-foreground text-xs">
              of {Platforms.length} available integrations
            </p>
          </CardContent>
        </Card>
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
                <div className="text-2xl font-bold">
                  {topPerformingAsset ?? "N/A"}
                </div>
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
                    {bestPerformerChange
                      ? bestPerformerChange.toFixed(2)
                      : "0.00"}
                    %
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Change
            </CardTitle>
            <BarChart3 className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            {showStats ? (
              <>
                <div className="text-2xl font-bold">+4.3%</div>
                <div className="flex items-center pt-1">
                  <ArrowUp className="mr-1 h-4 w-4 text-green-700" />
                  <span className="text-green-700">+$5,120.45</span>
                </div>
              </>
            ) : (
              <div className="text-2xl font-bold">
                <h3>******</h3>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Card>
  );
};

export default AllPortfolioSummary;
