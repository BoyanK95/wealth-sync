import type {
  BinanceAccountData,
  BinancePosition,
} from "../constants/binanceAccounData.interface";
import { fetchWithRetry } from "../utils/fetchWithRetry";

interface Position {
  ticker: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  value: number;
  fxPpl: number;
  ppl: number;
  maxBuy: number;
  maxSell: number;
  pieQuantity: number;
  initialFillDate: string;
  pnlPercentage: number;
}

export class BinanceService {
  constructor(private apiKey: string) {}

  private async fetchFromApi(endpoint: string) {
    const response = await fetchWithRetry(`/api/platforms/binance${endpoint}`, {
      headers: {
        Authorization: this.apiKey,
      },
    });

    return response.json();
  }

  async getPortfolio(): Promise<BinancePosition[]> {
    const [accountData, pricesData] = await Promise.all([
      this.getAccountInfo(),
      this.getPrices(),
    ]);

    const nonZeroBalances = accountData.balances.filter(
      (balance) =>
        parseFloat(balance.free) > 0 || parseFloat(balance.locked) > 0,
    );

    const calculatedPositions = nonZeroBalances
      .map((balance) => {
        const asset = balance.asset;
        const quantity = parseFloat(balance.free) + parseFloat(balance.locked);
        const symbol = balance.asset.split("LD")[1] ?? balance.asset;
        const priceKey = `${symbol}USDT`;
        const price = pricesData[priceKey] ?? 0;
        const totalValue = quantity * price;

        return {
          symbol,
          asset,
          quantity,
          currentPrice: price,
          totalValue,
        };
      })
      .filter((position) => position.totalValue > 0)
      .sort((a, b) => b.totalValue - a.totalValue);

    return calculatedPositions;
  }

  async getPositions(): Promise<Position[]> {
    return this.fetchFromApi("/positions");
  }

  async getPrices(): Promise<Record<string, number>> {
    return this.fetchFromApi("/prices");
  }

  async getAccountInfo() {
    return this.fetchFromApi("/account") as Promise<BinanceAccountData>;
  }
}
