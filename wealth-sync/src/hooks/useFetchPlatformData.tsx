import { useState, useEffect, useCallback } from "react";
import { Trading212Service } from "@/lib/services/trading212Service";
import type { PortfolioItem } from "@/lib/constants/portfolio212";
import type { AccountData } from "@/app/api/platforms/trading212/account/res.interface";

export function useFetchPortfolioData(apiKey: string, refreshInterval = 30000) {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    if (!apiKey) {
      setError("No API key provided");
      setLoading(false);
      return;
    }

    try {
      const service = new Trading212Service(apiKey);

      const accountInfo = await service.getAccountInfo();
      const portfolioData = await service.getPortfolio();

      setAccountData(accountInfo);
      setPortfolio(portfolioData);
      console.log("accountInfo", accountInfo);
      console.log("portfolioData", portfolioData);

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
  }, [apiKey]);

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
