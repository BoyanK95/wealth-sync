"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import { Trading212Service } from "@/lib/services/trading212Service";
import { Button } from "@/components/ui/button";
import type { PortfolioItem } from "@/lib/constants/portfolio212";
import PositionItem from "./PositionItem";
import {
  convertGbxToUsd,
  detectCurrency,
  fetchExchangeRates,
  isGbxTicker,
} from "@/lib/utils/currencyUtils";
import { PlatformLoadingCard } from "../PlatformLoadingCard";
import PortfolioValue from "../PortfolioValue/PortfolioValue";
import TotalInvested from "../TotalInvested/TotalInvested";
import ProfitAndLoss from "../ProfitAndLoss/ProfitAndLoss";
import Positions from "../Positions/Positions";
import ContainerCardErrorState from "../ContainerCardErrorState/ContainerCardErrorState";
import type { AccountData } from "@/app/api/platforms/trading212/account/res.interface";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  maxRetries = 3,
): Promise<T> {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await fetchFn();
    } catch (error) {
      if (error instanceof Response && error.status === 429) {
        const waitTime = Math.min(1000 * Math.pow(2, retries), 10000);
        await delay(waitTime);
        retries++;
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries reached");
}

export function Trading212Portfolio() {
  const [openPositionsPortfolio, setOpenPositionsPortfolio] = useState<
    PortfolioItem[]
  >([]);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllPositions, setShowAllPositions] = useState<boolean>(false);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {},
  );
  const { getApiKey } = usePlatformConnection();

  // Fetch exchange rates on component mount
  useEffect(() => {
    async function loadExchangeRates() {
      try {
        const rates = await fetchExchangeRates("USD");
        // console.log("Exchange rates:", rates);

        setExchangeRates(rates);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
        // Set fallback rates
        setExchangeRates({
          EUR: 0.91,
          GBP: 0.78,
          USD: 1.0,
        });
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadExchangeRates();
  }, []);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const apiKey = getApiKey("trading212");
        const service = new Trading212Service(apiKey!);
        const portfolioData = await fetchWithRetry(() =>
          service.getPortfolio(),
        );
        const accountData = await fetchWithRetry(() =>
          service.getAccountInfo(),
        );
        setAccountData(accountData);
        setOpenPositionsPortfolio(portfolioData);
        // console.log("accountData", accountData);
        // console.log("portfolioData", portfolioData);
      } catch (err) {
        setError("Failed to fetch openPositionsPortfolio portfolioData");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPortfolio();
  }, [getApiKey, openPositionsPortfolio]);

  const calculateTotalValue = useCallback(() => {
    if (!accountData) return 0;
    const rate = exchangeRates.EUR ?? 1;
    return accountData.total / rate;
  }, [accountData, exchangeRates]);

  const calculatePortfolioMetrics = () => {
    return openPositionsPortfolio.reduce(
      (acc, item) => {
        // Detect currency for this position
        const currency = detectCurrency(item.ticker);

        // Get exchange rate (default to 1 if not found)
        const rate = currency === "USD" ? 1 : (exchangeRates[currency] ?? 1);

        // Convert to USD using real-time rates
        const currentPriceUSD = isGbxTicker(item.ticker)
          ? convertGbxToUsd(item.currentPrice)
          : item.currentPrice / rate;

        const averagePriceUSD = isGbxTicker(item.ticker)
          ? convertGbxToUsd(item.averagePrice)
          : item.averagePrice / rate;

        const pplUSD = item.ppl / rate;

        // Calculate position metrics
        const positionValue = item.quantity * currentPriceUSD;
        const investedValue = item.quantity * averagePriceUSD;

        return {
          totalValue: acc.totalValue + positionValue,
          totalInvested: acc.totalInvested + investedValue,
          totalProfitLoss: acc.totalProfitLoss + pplUSD,
          positions: acc.positions + 1,
        };
      },
      {
        totalValue: 0,
        totalInvested: 0,
        totalProfitLoss: 0,
        positions: 0,
      },
    );
  };

  const reloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  if (loading) return <PlatformLoadingCard platformName="Trading212" />;
  if (error)
    return <ContainerCardErrorState error={error} onRetry={reloadPage} />;
  if (!openPositionsPortfolio.length) return null;

  const metrics = calculatePortfolioMetrics();

  const toggleShowAllPositions = () => {
    setShowAllPositions((prev) => !prev);
  };

  const profitLossPercentage =
    (metrics.totalProfitLoss / metrics.totalInvested) * 100;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Trading212 Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <PortfolioValue
            totalValue={metrics.totalValue}
            portfolioTitle="Open Positions Portfolio Value"
            tooltipText="Total value of all your open positions."
          />
          <TotalInvested totalInvested={metrics.totalInvested} />
          <ProfitAndLoss
            totalProfitLoss={metrics.totalProfitLoss}
            profitLossPercentage={profitLossPercentage}
          />
          <Positions positions={metrics.positions} />
          <PortfolioValue
            totalValue={calculateTotalValue()}
            portfolioTitle="Total Account Value"
            tooltipText="Total value of your account, including open and closed positions and cash."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {showAllPositions ? "All Holdings" : "Top Holdings"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!showAllPositions
              ? openPositionsPortfolio
                  .sort(
                    (a, b) =>
                      b.quantity * b.currentPrice - a.quantity * a.currentPrice,
                  )
                  .slice(0, 5)
                  .map((item) => (
                    <PositionItem
                      key={item.ticker}
                      item={item}
                      exchangeRates={exchangeRates}
                    />
                  ))
              : openPositionsPortfolio
                  .sort(
                    (a, b) =>
                      b.quantity * b.currentPrice - a.quantity * a.currentPrice,
                  )
                  .map((item) => (
                    <PositionItem
                      key={item.ticker}
                      item={item}
                      exchangeRates={exchangeRates}
                    />
                  ))}
            <div className="mt-4 flex justify-center">
              <Button
                onClick={toggleShowAllPositions}
                className="cursor-pointer"
              >
                {showAllPositions ? "Show Less" : "View All Positions"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
