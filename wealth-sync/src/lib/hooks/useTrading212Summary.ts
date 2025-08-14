import { PlatformKey } from "@/lib/constants/apiKeyStrings";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import { Trading212Service } from "@/lib/services/trading212Service";
import { getCleanTickerName, isGbxTicker } from "@/lib/utils/currencyUtils";
import { useEffect, useState } from "react";
import type {
  ISummaryState,
  IBestPerformingAsset,
} from "./usePortfolioSummary";

export const useTrading212Summary = (showStats: boolean) => {
  const { connections, loading: connectionsLoading } = usePlatformConnection();
  const [state, setState] = useState<ISummaryState>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchTrading212Summary = async () => {
      try {
        setState({
          data: null,
          error: null,
          loading: true,
        });

        const trading212ApiKey = connections[PlatformKey.TRADING_212]?.apiKey;
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
        const bestTrading212Performer = portfolioData.reduce(
          (bestPerformer, position) => {
            const percentageChange =
              position.pnlPercentage ||
              ((position.currentPrice - position.averagePrice) /
                position.averagePrice) *
                100;

            if (!isFinite(percentageChange) || isNaN(percentageChange)) {
              return bestPerformer;
            }

            if (percentageChange > bestPerformer.percentageChange) {
              bestPerformer = {
                ticker: getCleanTickerName(position.ticker),
                percentageChange: percentageChange,
              };
            }

            return bestPerformer;
          },
          {} as IBestPerformingAsset,
        );

        setState({
          data: {
            value: trading212Value,
            bestPerformingAsset: bestTrading212Performer,
          },
          error: null,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching portfolio data for Trading212:", error);
        setState({
          data: null,
          error: error,
          loading: false,
        });
      }
    };

    if (
      showStats &&
      !connectionsLoading &&
      connections[PlatformKey.TRADING_212]?.isConnected
    )
      void fetchTrading212Summary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connections, showStats, connectionsLoading]);

  return state;
};
