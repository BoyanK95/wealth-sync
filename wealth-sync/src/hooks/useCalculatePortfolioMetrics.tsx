import { useCallback, useMemo } from "react";
import type { BinancePosition } from "@/lib/constants/binanceAccounData.interface";

// Generic portfolio metrics interface
export interface PortfolioMetrics {
  totalValue: number;
  totalInvested: number;
  totalProfitLoss: number;
  portfolio: number; // number of positions
}

// Position interface that can accommodate different platform position types
interface BasePosition {
  totalValue: number;
}

/**
 * Custom hook for calculating portfolio metrics for Binance positions
 * @param portfolio - Array of BinancePosition objects
 * @returns Portfolio metrics and calculation function
 */
export const useBinancePortfolioMetrics = (portfolio: BinancePosition[] | null) => {
  const calculatePortfolioMetrics = useCallback((): PortfolioMetrics | undefined => {
    if (!portfolio) return undefined;

    return portfolio.reduce(
      (acc, position) => {
        return {
          totalValue: acc.totalValue + position.totalValue,
          totalInvested: acc.totalInvested + position.totalValue, // We don't have invested amount for Binance
          totalProfitLoss: 0, // We don't have this data for Binance
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

  const metrics = useMemo(() => calculatePortfolioMetrics(), [calculatePortfolioMetrics]);

  return {
    metrics,
    calculatePortfolioMetrics,
  };
};

/**
 * Generic hook for calculating portfolio metrics for any position type
 * @param portfolio - Array of positions with at least a totalValue property
 * @param calculateInvested - Optional function to calculate invested amount per position
 * @param calculateProfitLoss - Optional function to calculate profit/loss per position
 * @returns Portfolio metrics and calculation function
 */
export const useGenericPortfolioMetrics = <T extends BasePosition>(
  portfolio: T[] | null,
  calculateInvested?: (position: T) => number,
  calculateProfitLoss?: (position: T) => number,
) => {
  const calculatePortfolioMetrics = useCallback((): PortfolioMetrics | undefined => {
    if (!portfolio) return undefined;

    return portfolio.reduce(
      (acc, position) => {
        const invested = calculateInvested ? calculateInvested(position) : position.totalValue;
        const profitLoss = calculateProfitLoss ? calculateProfitLoss(position) : 0;

        return {
          totalValue: acc.totalValue + position.totalValue,
          totalInvested: acc.totalInvested + invested,
          totalProfitLoss: acc.totalProfitLoss + profitLoss,
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
  }, [portfolio, calculateInvested, calculateProfitLoss]);

  const metrics = useMemo(() => calculatePortfolioMetrics(), [calculatePortfolioMetrics]);

  return {
    metrics,
    calculatePortfolioMetrics,
  };
};