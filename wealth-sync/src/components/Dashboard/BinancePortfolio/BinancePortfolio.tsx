"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import { Button } from "@/components/ui/button";
import { PlatformLoadingCard } from "../PlatformLoadingCard";
import PortfolioValue from "../PortfolioValue/PortfolioValue";
import TotalInvested from "../TotalInvested/TotalInvested";
import Positions from "../Positions/Positions";
import ContainerCardErrorState from "../ContainerCardErrorState/ContainerCardErrorState";
import { TooltipText } from "@/lib/constants/tooltipText";
import { TitleText } from "@/lib/constants/titleText";
import { BinanceService } from "@/lib/services/binanceService";
import { ApiKeyStrings } from "@/lib/constants/apiKeyStrings";
import { useFetchPortfolioData } from "@/hooks/useFetchPlatformData";
import type { BinancePosition } from "@/lib/constants/binanceAccounData.interface";

export function BinancePortfolio() {
  const [showAllPositions, setShowAllPositions] = useState<boolean>(false);

  const { getApiKey } = usePlatformConnection();
  const binanceApiKey = getApiKey(ApiKeyStrings.BINANCE);
  const binanceService = new BinanceService(binanceApiKey!);
  const { portfolio, loading, error, refreshData } = useFetchPortfolioData(
    binanceService,
    15000,
  );

  const calculatePortfolioMetrics = useCallback(() => {
    return portfolio.reduce(
      (acc, position) => {
        return {
          totalValue: acc.totalValue + position.totalValue,
          totalInvested: acc.totalInvested + position.totalValue, // We don't have invested amount
          totalProfitLoss: 0, // We don't have this data
          portfolio: acc.portfolio + 1,
        };
      },
      {
        totalValue: 0,
        totalInvested: 0,
        totalProfitLoss: 0,
        portfolio: 0,
      },
    );
  }, [portfolio]);

  const reloadPage = useCallback(async () => {
    await refreshData();
  }, [refreshData]);

  if (loading) return <PlatformLoadingCard platformName="Binance" />;
  if (error)
    return <ContainerCardErrorState error={error} onRetry={reloadPage} />;

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
          <Positions portfolio={metrics.portfolio} />
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
              ? portfolio
                  .slice(0, 5)
                  .map((position) => (
                    <BinancePositionItem
                      key={position.symbol}
                      position={position}
                    />
                  ))
              : portfolio.map((position) => (
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
