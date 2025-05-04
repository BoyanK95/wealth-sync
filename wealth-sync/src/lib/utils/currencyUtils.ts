// Cache for currency rates to avoid excessive API calls
interface CurrencyCache {
  rates: Record<string, number>;
  timestamp: number;
  baseCurrency: string;
}

let currencyCache: CurrencyCache | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Fetches current exchange rates from a public API
 * Uses caching to minimize API calls
 */
export async function fetchExchangeRates(baseCurrency = 'USD'): Promise<Record<string, number>> {
  // Check if we have a valid cache
  const now = Date.now();
  if (currencyCache && 
      currencyCache.baseCurrency === baseCurrency && 
      now - currencyCache.timestamp < CACHE_DURATION) {
    return currencyCache.rates;
  }

  try {
    // Free currency API (consider using a more reliable paid service in production)
    const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    
    const data = await response.json();
    
    // Update cache
    currencyCache = {
      rates: data.rates,
      timestamp: now,
      baseCurrency
    };
    
    return data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    // Fallback to some default rates if API fails
    return {
      EUR: 0.91,
      GBP: 0.78,
      USD: 1.0
    };
  }
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
  if (ticker.endsWith('_US_EQ')) {
    return 'USD';
  }
  
  // Check for European equities pattern (ends with _EQ but not _US_EQ)
  if (ticker.endsWith('_EQ') && !ticker.endsWith('_US_EQ')) {
    return 'EUR';
  }
  
  // Default to USD for any other pattern
  return 'USD';
}

/**
 * Gets the currency symbol for a currency code
 */
export function getCurrencySymbol(currencyCode: string): string {
  switch (currencyCode) {
    case 'EUR': return '€';
    case 'GBP': return '£';
    case 'JPY': return '¥';
    case 'USD': 
    default: return '$';
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
  return !ticker.endsWith('US_EQ')
}

/**
 * Extracts the clean ticker name without the suffix
 */
export function getCleanTickerName(ticker: string): string {
  // Remove _US_EQ suffix
  if (ticker.endsWith('_US_EQ')) {
    return ticker.replace('_US_EQ', '');
  }
  
  // Remove _EQ suffix
  if (ticker.endsWith('_EQ')) {
    return ticker.replace('_EQ', '');
  }
  
  return ticker;
}