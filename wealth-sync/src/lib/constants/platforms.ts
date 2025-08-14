import { PlatformKey } from "./apiKeyStrings";
import { Routes } from "./routes";

export interface Platform {
  id: string;
  name: string;
  logo?: string;
  connectUrl?: string;
  platformKey: PlatformKey;
  isConnected?: boolean;
}

export const Platforms: Platform[] = [
  //TODO add more platforms
  {
    id: "add-your-own-asset",
    name: "Add your own asset",
    logo: "/platforms/add-your-own-asset-icon.png",
    connectUrl: Routes.ADD_YOUR_OWN_ASSET,
    platformKey: PlatformKey.NONE,
    isConnected: false,
  },
  {
    id: "trading212",
    name: "Trading212",
    logo: "/platforms/trading-212-icon.png",
    connectUrl: Routes.CONNECT_TRADING212,
    platformKey: PlatformKey.TRADING_212,
    isConnected: false,
  },
  {
    id: "etoro",
    name: "eToro",
    logo: "/platforms/etoro-logo-icon.png",
    connectUrl: Routes.CONNECT_ETORO,
    platformKey: PlatformKey.E_TORO,
    isConnected: false,
  },
  {
    id: "binance",
    name: "Binance",
    logo: "/platforms/binance-logo.jpg",
    connectUrl: Routes.CONNECT_BINANCE,
    platformKey: PlatformKey.BINANCE,
    isConnected: false,
  },
  {
    id: "crypto.com",
    name: "Crypto.com",
    logo: "/platforms/crypto-com-logo.png",
    connectUrl: Routes.CONNECT_CRYPTO_COM,
    platformKey: PlatformKey.CRYPTO_COM,
    isConnected: false,
  },
  {
    id: "coinbase",
    name: "Coinbase",
    logo: "/platforms/coinbase-logo.jpg",
    connectUrl: Routes.CONNECT_COINBASE,
    platformKey: PlatformKey.COINBASE,
    isConnected: false,
  },
  {
    id: "meta-mask",
    name: "Meta Mask",
    logo: "/platforms/meta-mask-logo.png",
    connectUrl: Routes.CONNECT_META_MASK,
    platformKey: PlatformKey.META_MASK,
    isConnected: false,
  },
  {
    id: "interactive_brokers",
    name: "Interactive Brokers",
    logo: "/platforms/ib-logo-icon.png",
    connectUrl: Routes.CONNECT_INTERACTIVE_BROKERS,
    platformKey: PlatformKey.INTERACTIVE_BROKERS,
    isConnected: false,
  },
  {
    id: "takion",
    name: "Takion",
    logo: "/platforms/takion-logo-icon.png",
    connectUrl: Routes.CONNECT_TAKION,
    platformKey: PlatformKey.TAKIONE,
    isConnected: false,
  },
  {
    id: "robinhood",
    name: "robinhood",
    logo: "/platforms/robinhood-logo.png",
    connectUrl: Routes.CONNECT_ROBINHOOD,
    platformKey: PlatformKey.ROBINHOOD,
    isConnected: false,
  },
];
