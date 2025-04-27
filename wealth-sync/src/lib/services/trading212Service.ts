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

interface Portfolio {
  totalValue: number;
  totalPnl: number;
  totalPnlPercentage: number;
  positions: Position[];
}

export class Trading212Service {
  constructor(private apiKey: string) {}

  private async fetchFromApi(endpoint: string) {
    const response = await fetch(`/api/platforms/trading212${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Trading212 API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getPortfolio(): Promise<Portfolio> {
    return this.fetchFromApi('/portfolio');
  }

  async getPositions(): Promise<Position[]> {
    return this.fetchFromApi('/positions');
  }
}