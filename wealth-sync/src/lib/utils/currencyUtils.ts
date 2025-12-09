import { useState, useEffect, useCallback } from "react";

// Cache for currency rates to avoid excessive API calls
interface CurrencyCache {
  rates: Record<string, number>;
  timestamp: number;
  baseCurrency: string;
}

let currencyCache: CurrencyCache | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const REALTIME_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes for real-time rates

/**
 * Fetches current exchange rates from a public API
 * Uses caching to minimize API calls
 */
export async function fetchExchangeRates(
  baseCurrency = "USD",
): Promise<Record<string, number>> {
  // Check if we have a valid cache
  const now = Date.now();
  if (
    currencyCache?.baseCurrency === baseCurrency &&
    now - currencyCache.timestamp < CACHE_DURATION
  ) {
    return currencyCache.rates;
  }

  try {
    // Free currency API (consider using a more reliable paid service in production)
    const response = await fetch(
      `https://open.er-api.com/v6/latest/${baseCurrency}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data: { rates: Record<string, number> } = await response.json() as { rates: Record<string, number> };

    // Update cache
    currencyCache = {
      rates: data.rates,
      timestamp: now,
      baseCurrency,
    };
    return data.rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    // Fallback to some default rates if API fails
    return {
      EUR: 0.91,
      GBP: 0.78,
      USD: 1.0,
    };
  }
}

/**
 * Fetches real-time exchange rates with shorter cache duration
 * Use this for applications requiring more frequent rate updates
 */
export async function fetchRealTimeExchangeRates(
  baseCurrency = "USD",
): Promise<Record<string, number>> {
  // Check if we have a valid cache for real-time (shorter duration)
  const now = Date.now();
  if (
    currencyCache?.baseCurrency === baseCurrency &&
    now - currencyCache.timestamp < REALTIME_CACHE_DURATION
  ) {
    return currencyCache.rates;
  }

  // Use the same fetch logic but with shorter cache
  return fetchExchangeRates(baseCurrency);
}

/**
 * Forces a fresh fetch of exchange rates, bypassing cache
 * Use sparingly to avoid rate limiting
 */
export async function fetchFreshExchangeRates(
  baseCurrency = "USD",
): Promise<Record<string, number>> {
  try {
    const response = await fetch(
      `https://open.er-api.com/v6/latest/${baseCurrency}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data: { rates: Record<string, number> } = await response.json();

    // Update cache with fresh data
    currencyCache = {
      rates: data.rates,
      timestamp: Date.now(),
      baseCurrency,
    };

    return data.rates;
  } catch (error) {
    console.error("Error fetching fresh exchange rates:", error);
    // Fall back to cached rates if available, otherwise use defaults
    if (currencyCache?.baseCurrency === baseCurrency) {
      return currencyCache.rates;
    }
    return {
      EUR: 0.91,
      GBP: 0.78,
      USD: 1.0,
    };
  }
}

/**
 * Gets multiple exchange rate providers for comparison
 * Returns rates from different APIs for redundancy
 */
export async function fetchExchangeRatesFromMultipleSources(
  baseCurrency = "USD",
): Promise<{
  primary: Record<string, number>;
  backup?: Record<string, number>;
  average?: Record<string, number>;
}> {
  const results: {
    primary: Record<string, number>;
    backup?: Record<string, number>;
    average?: Record<string, number>;
  } = {
    primary: {},
  };

  try {
    // Primary source (current API)
    results.primary = await fetchFreshExchangeRates(baseCurrency);

    // Backup source (you can add more APIs here)
    try {
      const backupResponse = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`,
      );
      if (backupResponse.ok) {
        const backupData: { rates: Record<string, number> } =
          await backupResponse.json();
        results.backup = backupData.rates;

        // Calculate average rates
        if (results.backup) {
          results.average = {};
          const currencies = new Set([
            ...Object.keys(results.primary),
            ...Object.keys(results.backup),
          ]);

          currencies.forEach((currency) => {
            const primaryRate = results.primary[currency] ?? 0;
            const backupRate = results.backup![currency] ?? 0;
            if (primaryRate > 0 && backupRate > 0) {
              results.average![currency] = (primaryRate + backupRate) / 2;
            } else {
              results.average![currency] = primaryRate || backupRate;
            }
          });
        }
      }
    } catch (backupError) {
      console.warn("Backup exchange rate API failed:", backupError);
    }
  } catch (error) {
    console.error("All exchange rate APIs failed:", error);
    results.primary = {
      EUR: 0.91,
      GBP: 0.78,
      USD: 1.0,
    };
  }

  return results;
}

/**
 * Detects the currency based on the ticker symbol pattern
 *
 * Pattern examples:
 * - "AAPL_US_EQ" -> USD
 * - "WDEPl_EQ" -> EUR
 */
export function detectCurrency(ticker: string): string {
  // Check for US equities pattern (ends with _US_EQ)
  if (ticker.endsWith("_US_EQ")) {
    return "USD";
  }

  // Check for European equities pattern (ends with _EQ but not _US_EQ)
  if (ticker.endsWith("_EQ") && !ticker.endsWith("_US_EQ")) {
    return "EUR";
  }

  // Default to USD for any other pattern
  return "USD";
}

/**
 * Gets the currency symbol for a currency code
 */
export function getCurrencySymbol(currencyCode: string): string {
  switch (currencyCode) {
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "JPY":
      return "¥";
    case "USD":
    default:
      return "$";
  }
}

/**
 * Converts GBX (British pence) to USD
 * Only applies to tickers ending with "_EQ" but not "_EQ_US"
 * @param value Value in GBX
 * @param exchangeRate Current GBP to USD exchange rate (default: 1.27)
 * @returns Value in USD
 */
export function convertGbxToUsd(value: number, exchangeRate = 1.27): number {
  // Convert from pence to pounds (divide by 100), then to USD
  return (value / 100) * exchangeRate;
}

/**
 * Checks if a ticker represents a GBX-denominated stock
 * @param ticker Stock ticker
 * @returns Boolean indicating if conversion is needed
 */
export function isGbxTicker(ticker: string): boolean {
  return !ticker.endsWith("US_EQ");
}

/**
 * Converts EUR (Euros) to USD (US Dollars)
 * @param value Value in EUR
 * @param exchangeRate Current EUR to USD exchange rate (default: 1.10)
 * @returns Value in USD
 */
export function convertEurToUsd(value: number, exchangeRate = 1.1): number {
  return value * exchangeRate;
}

/**
 * Converts EUR (Euros) to USD (US Dollars) using live exchange rates
 * @param value Value in EUR
 * @param exchangeRates Exchange rates object (from fetchExchangeRates with USD base)
 * @returns Value in USD
 */
export function convertEurToUsdWithLiveRates(
  value: number,
  exchangeRates: Record<string, number>,
): number {
  // When USD is the base currency, exchangeRates.EUR tells us how many EUR = 1 USD
  // To convert EUR to USD, we divide EUR by the EUR rate
  // Example: if EUR rate is 0.91, then 1 EUR = 1/0.91 = 1.099 USD
  const eurRate = exchangeRates.EUR ?? 0.91;
  return value / eurRate;
}

/**
 * Extracts the clean ticker name without the suffix
 */
export function getCleanTickerName(ticker: string): string {
  // Remove _US_EQ suffix
  if (ticker.endsWith("_US_EQ")) {
    return ticker.replace("_US_EQ", "");
  }

  // Remove _EQ suffix
  if (ticker.endsWith("_EQ")) {
    return ticker.replace("_EQ", "");
  }

  return ticker;
}

/**
 * React hook for real-time exchange rates
 * Automatically refreshes rates at specified intervals
 */
export function useRealTimeExchangeRates(
  baseCurrency = "USD",
  refreshIntervalMs = 5 * 60 * 1000, // 5 minutes default
) {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchRates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const newRates = await fetchRealTimeExchangeRates(baseCurrency);
      setRates(newRates);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch rates");
    } finally {
      setLoading(false);
    }
  }, [baseCurrency]);

  // Initial fetch
  useEffect(() => {
    void fetchRates();
  }, [fetchRates]);

  // Set up interval for automatic refresh
  useEffect(() => {
    const interval = setInterval(() => {
      void fetchRates();
    }, refreshIntervalMs);
    return () => clearInterval(interval);
  }, [fetchRates, refreshIntervalMs]);

  return {
    rates,
    loading,
    error,
    lastUpdated,
    refresh: fetchRates,
  };
}
