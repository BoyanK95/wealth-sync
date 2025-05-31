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
import { TooltipText } from "@/lib/constants/tooltipText";
import { TitleText } from "@/lib/constants/titleText";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// async function fetchWithRetry<T>(
//   fetchFn: () => Promise<T>,
//   maxRetries = 3,
// ): Promise<T> {
//   let retries = 0;
//   while (retries < maxRetries) {
//     try {
//       return await fetchFn();
//     } catch (error) {
//       if (error instanceof Response && error.status === 429) {
//         const waitTime = Math.min(1000 * Math.pow(2, retries), 10000);
//         await delay(waitTime);
//         retries++;
//         continue;
//       }
//       throw error;
//     }
//   }
//   throw new Error("Max retries reached");
// }

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

  console.log('test');

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const apiKey = getApiKey("trading212");
        const service = new Trading212Service(apiKey!);
        const portfolioData = await service.getPortfolio();
        console.log("portfolioData", portfolioData);
        
        const accountData = await service.getAccountInfo();
        console.log("accountData", accountData);

        setAccountData(accountData);
        setOpenPositionsPortfolio(portfolioData);
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

  const calculateAccountMetrics = useCallback(() => {
    if (!accountData) {
      return {
        totalValue: 0,
        totalInvested: 0,
        profitLoss: 0,
        profitLossPercentage: 0,
        freeCash: 0,
      };
    }

    const rate = exchangeRates.EUR ?? 1;
    const totalValue = accountData.total / rate;
    const totalInvested = accountData.invested / rate;
    const profitLoss = accountData.result / rate;
    const profitLossPercentage = (profitLoss / totalInvested) * 100;
    const freeCash = accountData.free ? accountData.free / rate : 0;

    return {
      totalValue,
      totalInvested,
      profitLoss,
      profitLossPercentage,
      freeCash,
    };
  }, [accountData, exchangeRates]);

  const calculatePortfolioMetrics = () => {
    return openPositionsPortfolio.reduce(
      (acc, item) => {
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
  console.log();

  const reloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  if (loading) return <PlatformLoadingCard platformName="Trading212" />;
  if (error)
    return <ContainerCardErrorState error={error} onRetry={reloadPage} />;
  if (!openPositionsPortfolio.length) return null;

  const metrics = calculatePortfolioMetrics();
  const accountMetrics = calculateAccountMetrics();

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
            portfolioTitle={TitleText.OPEN_POSITIONS_TOTAL_VALUE}
            tooltipText={TooltipText.OPEN_POSITIONS_TOTAL_VALUE}
          />
          <TotalInvested
            totalInvested={metrics.totalInvested}
            totalInvestedTitle={TitleText.TOTAL_INVESTED}
            tooltipText={TooltipText.TOTAL_INVESTED}
          />
          <ProfitAndLoss
            totalProfitLoss={metrics.totalProfitLoss}
            profitLossPercentage={profitLossPercentage}
            profitLossTitle={TitleText.PROFIT_LOSS}
            tooltipText={TooltipText.PROFIT_LOSS}
          />
          <Positions positions={metrics.positions} />
          <PortfolioValue
            totalValue={accountMetrics.totalValue}
            portfolioTitle={TitleText.TOTAL_ACCOUNT_VALUE}
            tooltipText={TooltipText.PORTFOLIO_VALUE}
          />
          <TotalInvested
            totalInvested={accountMetrics.totalInvested}
            totalInvestedTitle={TitleText.TOTAL_INVESTED_VALUE}
            tooltipText={TooltipText.TOTAL_INVESTED}
          />
          <ProfitAndLoss
            totalProfitLoss={accountMetrics.profitLoss}
            profitLossPercentage={accountMetrics.profitLossPercentage}
            profitLossTitle={TitleText.ACCOUNT_PROFIT_LOSS}
            tooltipText={TooltipText.ACCOUNT_PROFIT_LOSS}
          />
          <TotalInvested
            totalInvested={accountMetrics.freeCash}
            totalInvestedTitle={TitleText.FREE_CASH}
            tooltipText={TooltipText.FREE_CASH}
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
