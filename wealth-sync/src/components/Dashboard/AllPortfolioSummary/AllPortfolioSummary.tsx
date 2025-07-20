"use client";

import ContainerCardErrorState from "@/components/Dashboard/ContainerCardErrorState/ContainerCardErrorState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Platforms } from "@/lib/constants/platforms";
import { usePortfolioSummary } from "@/lib/contexts/PortfolioSummaryContext";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  DollarSign,
  Eye,
  EyeOff,
  LineChart,
  Wallet,
} from "lucide-react";
import { useCallback } from "react";
import { loadingCards } from "../ContainerCardLoadingState/constants";
import ContainerCardLoadingState from "../ContainerCardLoadingState/ContainerCardLoadingState.tsx";

const AllPortfolioSummary = ({
  showStats,
  setShowStats,
}: {
  showStats: boolean;
  setShowStats: (showStats: boolean) => void;
}) => {
  const { loading, error, ...portfolioData } = usePortfolioSummary();
  const reloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  if (loading) {
    return <ContainerCardLoadingState cards={loadingCards} />;
  }

  if (error) {
    return <ContainerCardErrorState error={error} onRetry={reloadPage} />;
  }

  const { totalValue, totalChange, totalChangePercent } = portfolioData;
  const { ticker: bestPerformingAsset, percentageChange: bestPerformerChange } =
    portfolioData.bestPerformingAsset || {};

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
            <div className="text-2xl font-bold">
              {portfolioData.connectedPlatforms}
            </div>
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
                  {bestPerformingAsset ?? "N/A"}
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
