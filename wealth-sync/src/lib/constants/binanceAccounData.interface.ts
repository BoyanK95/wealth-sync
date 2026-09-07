export interface BinanceBalance {
  asset: string;
  free: string;
  locked: string;
}

export interface BinanceAccountData {
  accountType: string;
  balances: BinanceBalance[];
  brokered: boolean;
  buyerCommission: number;
  canDeposit: boolean;
  canTrade: boolean;
  canWithdraw: boolean;
  commissionRates: {
    maker: string;
    taker: string;
    buyer: string;
    seller: string;
  };
  makerCommission: number;
  permissions: string[];
  preventSor: boolean;
  requireSelfTradePrevention: boolean;
  sellerCommission: number;
  takerCommission: number;
  uid: number;
  updateTime: number;
}

export interface BinancePosition {
  symbol: string;
  asset: string;
  quantity: number;
  currentPrice: number;
  totalValue: number;
}
