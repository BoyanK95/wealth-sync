import type { BinancePosition } from "@/lib/constants/binanceAccounData.interface";

/**
 * Calculate portfolio metrics for Binance positions
 */
export const calculateBinancePortfolioMetrics = (
  portfolio: BinancePosition[],
) => {
  if (!portfolio) return undefined;

  return portfolio.reduce(
    (acc, position) => {
      return {
        totalValue: acc.totalValue + position.totalValue,
        portfolio: acc.portfolio + 1,
        positionCount: acc.positionCount + 1,
      };
    },
    {
      totalValue: 0,
      portfolio: 0,
      positionCount: 0,
    },
  );
};
