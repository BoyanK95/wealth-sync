import type { PortfolioItem } from "@/lib/constants/portfolio212";
import {
  detectCurrency,
  getCurrencySymbol,
  getCleanTickerName,
  isGbxTicker,
  convertGbxToUsd,
} from "@/lib/utils/currencyUtils";
import React from "react";

interface PositionItemProps {
  item: PortfolioItem;
  exchangeRates?: Record<string, number>;
}

const PositionItem = ({ item, exchangeRates }: PositionItemProps) => {
  // Detect currency for this position
  const currency = detectCurrency(item.ticker);
  const currencySymbol = getCurrencySymbol(currency);

  // Get clean ticker name without suffixes
  const cleanTickerName = getCleanTickerName(item.ticker);

  // Get exchange rate (default to 1 if not found)
  const rate = currency === "USD" ? 1 : (exchangeRates?.[currency] ?? 1);

  // Convert values to USD
  const currentPriceUSD = isGbxTicker(item.ticker)
    ? convertGbxToUsd(item.currentPrice)
    : item.currentPrice / rate;

  const positionValueUSD = item.quantity * currentPriceUSD;
  const profitLossUSD = item.ppl / rate;

  // Original value in the native currency
  const nativeValue = item.quantity * item.currentPrice;

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{cleanTickerName}</p>
        <p className="text-muted-foreground text-sm">
          {item.quantity.toFixed(2)} shares @ ${item.currentPrice.toFixed(2)}
          {currency !== "USD" && (
            <span className="ml-1 text-xs">
              ({currencySymbol}
              {nativeValue.toFixed(2)})
            </span>
          )}
        </p>
      </div>
      <div className="text-right">
        <p className="font-medium">
          $
          {positionValueUSD.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p
          className={`text-sm ${profitLossUSD >= 0 ? "text-green-500" : "text-red-500"}`}
        >
          ${profitLossUSD.toFixed(2)}
          <span className="ml-1 text-xs">
            (
            {(
              (profitLossUSD / ((item.quantity * item.averagePrice) / rate)) *
              100
            ).toFixed(2)}
            %)
          </span>
        </p>
      </div>
    </div>
  );
};

export default PositionItem;
