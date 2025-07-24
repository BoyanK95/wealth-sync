import { ApiKeyStrings } from "@/lib/constants/apiKeyStrings";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import { BinanceService } from "@/lib/services/binanceService";
import { useEffect, useState } from "react";
import { calculateBinancePortfolioMetrics } from "../../components/Dashboard/helper/calculateBinancePortfolioHelperFunction";
import { findTopPerformingAsset } from "../../components/Dashboard/helper/findTopPerformingAsset";
import type { ISummaryState } from "../contexts/PortfolioSummaryContext";

export const useBinanceSummary = () => {
  const { connections, getApiKey } = usePlatformConnection();
  const [state, setState] = useState<ISummaryState>({
    data: null,
    loading: false,
    error: null,
    hasFetched: false,
  });

  useEffect(() => {
    const fetchBinanceSummary = async () => {
      try {
        setState({
          data: null,
          error: null,
          loading: true,
          hasFetched: false,
        });

        const binanceApiKey = getApiKey(ApiKeyStrings.BINANCE);
        const binanceService = new BinanceService(binanceApiKey!);
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
          hasFetched: true,
        });
      } catch (error) {
        setState({
          data: null,
          error: error,
          loading: false,
          hasFetched: false,
        });
        console.error("Error fetching portfolio data for Binance:", error);
      }
    };

    if (
      connections.some(
        (connection) =>
          connection.platformId === (ApiKeyStrings.BINANCE as string),
      )
    )
      void fetchBinanceSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connections.length]);

  return state;
};
