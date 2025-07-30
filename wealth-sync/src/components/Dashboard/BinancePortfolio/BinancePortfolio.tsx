"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
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
import ShowAllPositionsButton from "../ShowAllPositionsButton/ShowAllPositionsButton";
import BinancePositionItem from "./BinancePositionItem";
import { useBinancePortfolioMetrics } from "@/hooks/useCalculatePortfolioMetrics";

export function BinancePortfolio() {
  const [showAllPositions, setShowAllPositions] = useState<boolean>(false);

  const { getApiKey } = usePlatformConnection();
  const binanceApiKey = getApiKey(ApiKeyStrings.BINANCE);
  const binanceService = new BinanceService(binanceApiKey!);
  const { portfolio, loading, error, refreshData } = useFetchPortfolioData(
    binanceService,
    15000,
  );

  // Use the custom hook for portfolio metrics calculation
  const { metrics } = useBinancePortfolioMetrics(portfolio as BinancePosition[] | null);

  const reloadPage = useCallback(async () => {
    await refreshData();
  }, [refreshData]);

  if (loading) return <PlatformLoadingCard platformName="Binance" />;
  if (error)
    return <ContainerCardErrorState error={error} onRetry={reloadPage} />;

  // If no metrics available, show loading or empty state
  if (!metrics) return <PlatformLoadingCard platformName="Binance" />;

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
          <Positions positions={metrics.portfolio} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {showAllPositions ? "All Assets" : "Top Assets"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!showAllPositions
              ? (portfolio as BinancePosition[])
                  .slice(0, 5)
                  .map((position) => (
                    <BinancePositionItem
                      key={`${position.symbol}-${Math.random().toString()}`}
                      position={position}
                    />
                  ))
              : (portfolio as BinancePosition[]).map((position) => (
                  <BinancePositionItem
                    key={`${position.symbol}-${Math.random().toString()}`}
                    position={position}
                  />
                ))}
          </div>
          <ShowAllPositionsButton
            showAllPositions={showAllPositions}
            toggleShowAllPositions={toggleShowAllPositions}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default BinancePortfolio;
