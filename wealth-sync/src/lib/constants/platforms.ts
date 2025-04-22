export interface Platform {
  id: string;
  name: string;
  logo?: string;
}

export const Platforms: Platform[] = [
  //TODO add more platforms
  {
    id: "trading212",
    name: "Trading212",
    logo: "/platforms/trading-212-icon.png",
  },
  { id: "etoro", name: "eToro", logo: "/platforms/etoro-logo-icon.png" },
  { id: "binance", name: "Binance", logo: "/platforms/binance-logo.png" },
  { id: "interactive_brokers", name: "Interactive Brokers" },
  { id: "takione", name: "Takion" },
  //   { id: "robinhood", name: "Robinhood" },
  //   { id: "coinbase", name: "Coinbase" },
];
