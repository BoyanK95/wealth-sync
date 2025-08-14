"use client";

import type { Trading212AccountData } from "@/app/api/platforms/trading212/account/res.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchPortfolioData } from "@/hooks/useFetchPlatformData";
import { PlatformKey } from "@/lib/constants/apiKeyStrings";
import type { PortfolioItem } from "@/lib/constants/portfolio212";
import { TitleText } from "@/lib/constants/titleText";
import { TooltipText } from "@/lib/constants/tooltipText";
import { Trading212Service } from "@/lib/services/trading212Service";
import {
  convertEurToUsdWithLiveRates,
  convertGbxToUsd,
  detectCurrency,
  fetchExchangeRates,
  isGbxTicker,
} from "@/lib/utils/currencyUtils";
import { useCallback, useEffect, useState } from "react";
import ContainerCardErrorState from "../ContainerCardErrorState/ContainerCardErrorState";
import { PlatformLoadingCard } from "../PlatformLoadingCard";
import PortfolioValue from "../PortfolioValue/PortfolioValue";
import Positions from "../Positions/Positions";
import ProfitAndLoss from "../ProfitAndLoss/ProfitAndLoss";
import ShowAllPositionsButton from "../ShowAllPositionsButton/ShowAllPositionsButton";
import TotalInvested from "../TotalInvested/TotalInvested";
import PositionItem from "./PositionItem";

export function Trading212Portfolio() {
  const [showAllPositions, setShowAllPositions] = useState<boolean>(false);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {},
  );
  const service = new Trading212Service(PlatformKey.TRADING_212!);

  const { portfolio, accountData, loading, error, refreshData } =
    useFetchPortfolioData(service, 15000);

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
    const totalValue = (accountData as Trading212AccountData).total / rate;
    const totalInvested =
      (accountData as Trading212AccountData).invested / rate;
    const profitLoss = (accountData as Trading212AccountData).result / rate;
    const profitLossPercentage = (profitLoss / totalInvested) * 100;
    const freeCash = (accountData as Trading212AccountData).free
      ? ((accountData as Trading212AccountData).free ?? 0 / rate)
      : 0;

    return {
      totalValue,
      totalInvested,
      profitLoss,
      profitLossPercentage,
      freeCash,
    };
  }, [accountData, exchangeRates]);

  const calculatePortfolioMetrics = () => {
    return (portfolio as PortfolioItem[]).reduce(
      (acc, item) => {
        const currency = detectCurrency(item.ticker);

        const rate = currency === "EUR" ? 1 : (exchangeRates[currency] ?? 1);

        const currentPriceUSD = isGbxTicker(item.ticker)
          ? convertGbxToUsd(item.currentPrice)
          : item.currentPrice / rate;

        const averagePriceUSD = isGbxTicker(item.ticker)
          ? convertGbxToUsd(item.averagePrice)
          : item.averagePrice / rate;

        // Convert profit/loss to USD - if not GBX ticker, ppl is in EUR and needs conversion

        const pplUSD = !isGbxTicker(item.ticker)
          ? convertEurToUsdWithLiveRates(item.ppl, exchangeRates)
          : item.ppl / rate;

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

  const reloadPage = useCallback(async () => {
    await refreshData();
  }, [refreshData]);

  if (loading) return <PlatformLoadingCard platformName="Trading212" />;
  if (error && !loading)
    return <ContainerCardErrorState error={error} onRetry={reloadPage} />;
  if (!portfolio.length) return null;

  //TODO use different props from portfolio and accountData instead of calculating them here
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
              ? (portfolio as PortfolioItem[])
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
              : (portfolio as PortfolioItem[])
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
            <ShowAllPositionsButton
              showAllPositions={showAllPositions}
              toggleShowAllPositions={toggleShowAllPositions}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
