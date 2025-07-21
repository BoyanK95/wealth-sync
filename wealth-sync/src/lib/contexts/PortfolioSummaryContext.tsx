"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
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
  connectedPlatforms: number;
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
  connectedPlatforms: 0,
};

const PortfolioSummaryContext = createContext<IPortfolioState | null>(null);

export function PortfolioSummaryProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [portfolioData, setPortfolioData] = useState<IPortfolioState>({
    loading: true,
    error: null,
    data: initialPortfolioData,
  });

  const binance = useBinanceSummary();
  const trading212 = useTrading212Summary();

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
      connectedPlatforms: sources.length,
    };
  }, [binance.data, trading212.data]);

  useEffect(() => {
    if (isLoading) {
      setPortfolioData((prev) => ({ ...prev, loading: true }));
      return;
    }

    if (!computedPortfolio) {
      setPortfolioData({
        loading: false,
        error: "All platforms failed to load",
        data: initialPortfolioData,
      });
      return;
    }

    setPortfolioData({
      loading: false,
      error: null,
      data: computedPortfolio,
    });
  }, [isLoading, computedPortfolio]);

  return (
    <PortfolioSummaryContext.Provider value={portfolioData}>
      {children}
    </PortfolioSummaryContext.Provider>
  );
}

export function usePortfolioSummary() {
  const context = useContext(PortfolioSummaryContext);
  if (!context) {
    throw new Error(
      "usePortfolioSummary must be used within a PortfolioSummaryProvider",
    );
  }
  return context;
}
