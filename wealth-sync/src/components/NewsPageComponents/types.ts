export type TickerInfoType = {
  symbol: string;
  name: string;
  price: string;
  ipo?: string;
  logo: string;
  marketCapitalization: string;
  description?: string;
  news: Array<{ headline: string; source: string; url: string; datetime: number }>;
  quote?: {
    c?: number; // Current price
    d?: number; // Change
    dp?: number; // Daily % change
    h?: number; // High
    l?: number; // Low
    o?: number; // Open
    pc?: number; // Previous close
    t?: number; // Timestamp
  };
};
