import { PlatformKey } from "@/lib/constants/apiKeyStrings";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import { BinanceService } from "@/lib/services/binanceService";
import { useEffect, useState } from "react";
import { calculateBinancePortfolioMetrics } from "../../components/Dashboard/helper/calculateBinancePortfolioHelperFunction";
import { findTopPerformingAsset } from "../../components/Dashboard/helper/findTopPerformingAsset";
import type { ISummaryState } from "./usePortfolioSummary";

export const useBinanceSummary = (showStats: boolean) => {
  const { connections, loading: connectionsLoading } = usePlatformConnection();
  const [state, setState] = useState<ISummaryState>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchBinanceSummary = async () => {
      try {
        setState({
          data: null,
          error: null,
          loading: true,
        });

        const binanceService = new BinanceService(PlatformKey.BINANCE);
        const portfolio = await binanceService.getPortfolio();

        // Calculate Binance portfolio metrics
        const binanceMetrics = calculateBinancePortfolioMetrics(portfolio);

        // Find top performing Binance asset (if any)
        const topBinanceAsset = findTopPerformingAsset(portfolio);

        setState({
          data: {
            value: binanceMetrics!.totalValue,
            bestPerformingAsset: topBinanceAsset,
          },
          error: null,
          loading: false,
        });
      } catch (error) {
        setState({
          data: null,
          error: error,
          loading: false,
        });
        console.error("Error fetching portfolio data for Binance:", error);
      }
    };

    if (
      showStats &&
      !connectionsLoading &&
      connections[PlatformKey.BINANCE]?.isConnected
    )
      void fetchBinanceSummary();
  }, [connections, showStats, connectionsLoading]);

  return state;
};
