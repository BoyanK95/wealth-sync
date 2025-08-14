"use client";

import { useEffect, useMemo, useState } from "react";
import { usePlatformConnection } from "../contexts/PlatformConnectionContext";
import { useBinanceSummary } from "../hooks/useBinanceSummary";
import { useTrading212Summary } from "../hooks/useTrading212Summary";

export interface IBestPerformingAsset {
  ticker: string;
  percentageChange: number;
}

export interface ISummaryData {
  value: number;
  bestPerformingAsset: IBestPerformingAsset | null;
}

export interface ISummaryState {
  loading: boolean;
  error: unknown;
  data: ISummaryData | null;
}

export interface IPortfolioData {
  totalValue: number;
  totalChange: number;
  totalChangePercent: number;
  bestPerformingAsset: IBestPerformingAsset | null;
}

export interface IPortfolioState {
  loading: boolean;
  error: string | null;
  data: IPortfolioData;
}

const initialPortfolioData = {
  totalValue: 0,
  totalChange: 0,
  totalChangePercent: 0,
  bestPerformingAsset: null,
};

export function usePortfolioSummary(showStats: boolean) {
  const [portfolioData, setPortfolioData] = useState<IPortfolioState>({
    loading: true,
    error: null,
    data: initialPortfolioData,
  });

  const binance = useBinanceSummary(showStats);
  const trading212 = useTrading212Summary(showStats);

  const isLoading = binance.loading || trading212.loading;

  const computedPortfolio = useMemo(() => {
    const sources: ISummaryData[] = [];

    if (binance.data && !binance.error) sources.push(binance.data);
    if (trading212.data && !trading212.error) sources.push(trading212.data);

    if (sources.length === 0) return null; // All failed

    const { totalValue, totalChange, bestPerformingAsset } = sources.reduce(
      (acc, curr) => {
        acc.totalValue += curr.value;

        if (!curr.bestPerformingAsset) return acc;

        acc.totalChange += curr.bestPerformingAsset.percentageChange; // This clearly does not work yet.

        if (
          !acc.bestPerformingAsset ||
          curr.bestPerformingAsset.percentageChange >
            acc.bestPerformingAsset.percentageChange
        ) {
          acc.bestPerformingAsset = curr.bestPerformingAsset;
        }

        return acc;
      },
      {
        totalValue: 0,
        totalChange: 0,
        bestPerformingAsset: null as IBestPerformingAsset | null,
      },
    );

    const totalChangePercent =
      totalValue > 0 ? (totalChange / totalValue) * 100 : 0;

    return {
      totalValue,
      totalChange,
      totalChangePercent,
      bestPerformingAsset,
    };
  }, [binance.data, binance.error, trading212.data, trading212.error]);

  useEffect(() => {
    if (isLoading) {
      setPortfolioData((prev) => ({
        ...prev,
        loading: true,
      }));
      return;
    }

    setPortfolioData({
      loading: false,
      error: null,
      data: computedPortfolio ?? initialPortfolioData,
    });
  }, [isLoading, computedPortfolio]);

  return portfolioData;
}
