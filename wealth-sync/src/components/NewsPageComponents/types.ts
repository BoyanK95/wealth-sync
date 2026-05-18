export type TickerInfoType = {
  symbol: string;
  name: string;
  price: string;
  ipo?: string;
  logo: string;
  marketCapitalization: string;
  description?: string;
  news: Array<{ headline: string; source: string; url: string }>;
};
