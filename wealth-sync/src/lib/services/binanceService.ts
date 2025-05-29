import type { AccountData } from "@/app/api/platforms/trading212/account/res.interface";
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

  async getPortfolio(): Promise<Position[]> {
    return this.fetchFromApi("/portfolio") as Promise<Position[]>;
  }

  async getPositions(): Promise<Position[]> {
    return this.fetchFromApi("/positions");
  }

  async getAccountInfo() {
    return this.fetchFromApi("/account") as Promise<AccountData>;
  }
}
