export type TickerInfoType = {
  symbol?: string | null;
  name: string;
  price?: string | null;
  ipo?: string | null;
  logo?: string | null;
  marketCapitalization?: string | null;
  description?: string;
  news: Array<{
    headline: string;
    source: string;
    url: string;
    datetime: number;
  }>;
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
