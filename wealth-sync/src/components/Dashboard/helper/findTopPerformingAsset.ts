import type { BinancePosition } from "@/lib/constants/binanceAccounData.interface";

/**
 * Find the top performing Binance asset
 * Note: Since Binance positions don't have percentage change data,
 * we'll return the asset with the highest total value as a placeholder
 */
export const findTopPerformingAsset = (positions: BinancePosition[]) => {
  if (positions.length === 0) return null;

  const topAsset = positions.reduce((prev, current) =>
    current.totalValue > prev.totalValue ? current : prev,
  );

  return {
    ticker: topAsset.symbol,
    percentageChange: 0, // Placeholder since we don't have this data for Binance
  };
};
