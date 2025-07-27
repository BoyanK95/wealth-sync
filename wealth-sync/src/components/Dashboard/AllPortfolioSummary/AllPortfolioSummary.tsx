"use client";

import ContainerCardErrorState from "@/components/Dashboard/ContainerCardErrorState/ContainerCardErrorState";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useCallback } from "react";
import { loadingCards } from "../ContainerCardLoadingState/constants";
import ContainerCardLoadingState from "../ContainerCardLoadingState/ContainerCardLoadingState.tsx";
import {
  ConnectedPlatformsSection,
  MonthlyChangeSection,
  TopPerformingAssetSection,
  TotalPortfolioValueSection,
} from "./components";
import { usePortfolioSummary } from "@/lib/hooks/usePortfolioSummary";

const AllPortfolioSummary = ({
  showStats,
  setShowStats,
}: {
  showStats: boolean;
  setShowStats: (showStats: boolean) => void;
}) => {
  const { loading, error, data: portfolioData } = usePortfolioSummary();
  const reloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  if (loading) {
    return <ContainerCardLoadingState cards={loadingCards} />;
  }

  if (error) {
    return <ContainerCardErrorState error={error} onRetry={reloadPage} />;
  }

  return (
    <>
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
        <TotalPortfolioValueSection
          showStats={showStats}
          portfolioData={portfolioData}
        />
        <ConnectedPlatformsSection
          connectedPlatforms={portfolioData.connectedPlatforms}
        />
        <TopPerformingAssetSection
          showStats={showStats}
          bestPerformingAsset={portfolioData.bestPerformingAsset}
        />
        <MonthlyChangeSection showStats={showStats} />
      </div>
    </>
  );
};

export default AllPortfolioSummary;
