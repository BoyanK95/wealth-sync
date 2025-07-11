export interface Platform {
  id: string;
  name: string;
  logo?: string;
  connetUrl?: string;
  isConnected?: boolean;
}

export const Platforms: Platform[] = [
  //TODO add more platforms
  {
    id: "trading212",
    name: "Trading212",
    logo: "/platforms/trading-212-icon.png",
    connetUrl: "/connect/trading212",
    isConnected: false,
  },
  {
    id: "etoro",
    name: "eToro",
    logo: "/platforms/etoro-logo-icon.png",
    connetUrl: "/connect/etoro",
  },
  {
    id: "binance",
    name: "Binance",
    logo: "/platforms/binance-logo.jpg",
    connetUrl: "/connect/binance",
    isConnected: false,
  },
  {
    id: "interactive_brokers",
    name: "Interactive Brokers",
    logo: "/platforms/ib-logo-icon.png",
    connetUrl: "/connect/interactive-brokers",
    isConnected: false,
  },
  {
    id: "takion",
    name: "Takion",
    logo: "/platforms/takion-logo-icon.png",
    connetUrl: "/connect/takion",
    isConnected: false,
  },
  //   { id: "robinhood", name: "Robinhood" },
  //   { id: "coinbase", name: "Coinbase" },
];
