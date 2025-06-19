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

export class Trading212Service {
  constructor(private apiKey: string) {}

  private async fetchFromApi(
    endpoint: string,
  ): Promise<Position[] | AccountData> {
    try {
      const response = await fetchWithRetry(
        `/api/platforms/trading212${endpoint}`,
        {
          headers: {
            Authorization: this.apiKey,
          },
        },
      );

      if (!response.ok) {
        const status = response.status;
        if (status === 403) {
          throw new Error(
            "API key unauthorized. Please reconnect your Trading212 account.",
          );
        } else if (status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        } else {
          throw new Error(`Trading212 API error: ${response.statusText}`);
        }
      }

      return response.json() as Promise<Position[] | AccountData>;
    } catch (error) {
      console.error(`Error fetching from Trading212 API (${endpoint}):`, error);
      throw error;
    }
  }
  async getPortfolio(): Promise<Position[]> {
    return this.fetchFromApi("/portfolio") as Promise<Position[]>;
  }

  async getAccountInfo() {
    return this.fetchFromApi("/account") as Promise<AccountData>;
  }
}
