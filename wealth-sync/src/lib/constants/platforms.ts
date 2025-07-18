import { Routes } from "./routes";

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
    id: "add-your-own-asset",
    name: "Add your own asset",
    logo: "/platforms/add-your-own-asset-icon.png",
    connetUrl: Routes.ADD_YOUR_OWN_ASSET,
    isConnected: false,
  },
  {
    id: "trading212",
    name: "Trading212",
    logo: "/platforms/trading-212-icon.png",
    connetUrl: Routes.CONNECT_TRADING212,
    isConnected: false,
  },
  {
    id: "etoro",
    name: "eToro",
    logo: "/platforms/etoro-logo-icon.png",
    connetUrl: Routes.CONNECT_ETORO,
    isConnected: false,
  },
  {
    id: "binance",
    name: "Binance",
    logo: "/platforms/binance-logo.jpg",
    connetUrl: Routes.CONNECT_BINANCE,
    isConnected: false,
  },
  {
    id: "crypto.com",
    name: "Crypto.com",
    logo: "/platforms/crypto-com-logo.png",
    connetUrl: Routes.COMING_SOON,
    isConnected: false,
  },
  {
    id: "coinbase",
    name: "Coinbase",
    logo: "/platforms/coinbase-logo.jpg",
    connetUrl: Routes.COMING_SOON,
    isConnected: false,
  },
  {
    id: "meta-mask",
    name: "Meta Mask",
    logo: "/platforms/meta-mask-logo.png",
    connetUrl: Routes.COMING_SOON,
    isConnected: false,
  },
  {
    id: "interactive_brokers",
    name: "Interactive Brokers",
    logo: "/platforms/ib-logo-icon.png",
    connetUrl: Routes.COMING_SOON,
    isConnected: false,
  },
  {
    id: "takion",
    name: "Takion",
    logo: "/platforms/takion-logo-icon.png",
    connetUrl: Routes.COMING_SOON,
    isConnected: false,
  },
  {
    id: "robinhood",
    name: "robinhood",
    logo: "/platforms/robinhood-logo.png",
    connetUrl: Routes.COMING_SOON,
    isConnected: false,
  },
];
