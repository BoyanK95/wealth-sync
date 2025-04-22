export interface Platform {
  id: string;
  name: string;
  logo?: string;
}

export const Platforms: Platform[] = [
    //TODO add more platforms
  { id: "trading212", name: "Trading212", logo: "/platforms/trading-212-icon.png" },
  { id: "etoro", name: "eToro" },
  { id: "binance", name: "Binance" },
  { id: "interactive_brokers", name: "Interactive Brokers" },
  { id: "takione", name: "Takion" },
  //   { id: "robinhood", name: "Robinhood" },
  //   { id: "coinbase", name: "Coinbase" },
];
