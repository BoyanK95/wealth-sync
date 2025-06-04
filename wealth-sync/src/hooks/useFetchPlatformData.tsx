import { useState, useEffect, useCallback } from "react";
import { type Trading212Service } from "@/lib/services/trading212Service";
import { type BinanceService } from "@/lib/services/binanceService";
import type { PortfolioItem } from "@/lib/constants/portfolio212";
import type { Trading212AccountData } from "@/app/api/platforms/trading212/account/res.interface";
import { type BinanceAccountData, type BinancePosition } from "@/lib/constants/binanceAccounData.interface";

/**
 * Hook to fetch portfolio data for a specific platform using the provided service.
 * @param {Trading212Service | BinanceService} service - The service instance to use for fetching data.
 * @param {number} refreshInterval - The interval in milliseconds to refresh the data.
 */
export function useFetchPortfolioData(
  service: Trading212Service | BinanceService,
  refreshInterval = 30000,
) {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [accountData, setAccountData] = useState<
    Trading212AccountData | BinanceAccountData | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    if (!service) {
      setError("No service provided");
      setLoading(false);
      return;
    }

    try {
      const accountInfo = await service.getAccountInfo();
      const portfolioData = (await service.getPortfolio()) as
        | PortfolioItem[]
        | BinancePosition[];

      setAccountData(accountInfo);
      setPortfolio(portfolioData);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch portfolio data";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [service]);
  // Initial fetch
  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  // Set up periodic refresh
  useEffect(() => {
    if (!refreshInterval) return;

    const intervalId = setInterval(() => {
      void fetchData();
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [fetchData, refreshInterval]);

  return {
    portfolio,
    accountData,
    loading,
    error,
    lastUpdated,
    refreshData: fetchData,
  };
}
