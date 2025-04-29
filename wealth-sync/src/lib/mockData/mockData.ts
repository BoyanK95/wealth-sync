//TODO DELET MOCK DATA
// Placeholder data - in a real app, this would come from your database
export const portfolioValue = 124563.89;
export const portfolioChange = 1243.45;
export const portfolioChangePercent = 1.02;
export const isPositiveChange = portfolioChange > 0;

export const connectedPlatforms = [
  {
    name: "Trading212",
    connected: true,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Binance",
    connected: true,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Coinbase",
    connected: false,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Robinhood",
    connected: false,
    logo: "/placeholder.svg?height=40&width=40",
  },
];

export const recentTransactions = [
  {
    id: 1,
    type: "buy",
    asset: "AAPL",
    amount: "10",
    value: 1750.3,
    date: "2023-04-05",
    platform: "Trading212",
  },
  {
    id: 2,
    type: "sell",
    asset: "BTC",
    amount: "0.25",
    value: 6543.21,
    date: "2023-04-03",
    platform: "Binance",
  },
  {
    id: 3,
    type: "buy",
    asset: "MSFT",
    amount: "5",
    value: 1250.75,
    date: "2023-04-01",
    platform: "Trading212",
  },
  {
    id: 4,
    type: "buy",
    asset: "ETH",
    amount: "1.5",
    value: 2800.5,
    date: "2023-03-28",
    platform: "Binance",
  },
];

export const assetAllocation = [
  { type: "Stocks", percentage: 45, value: 56053.75 },
  { type: "Crypto", percentage: 30, value: 37369.17 },
  { type: "ETFs", percentage: 15, value: 18684.58 },
  { type: "Cash", percentage: 10, value: 12456.39 },
];
