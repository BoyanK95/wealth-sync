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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const response = await fetch(url, options);
      if (response.status === 429) {
        const waitTime = Math.min(1000 * Math.pow(2, retries), 10000);
        await delay(waitTime);
        retries++;
        continue;
      }
      if (!response.ok) {
        throw new Error(`Trading212 API error: ${response.statusText}`);
      }
      return response;
    } catch (error) {
      if (retries === maxRetries - 1) throw error;
      retries++;
      const waitTime = Math.min(1000 * Math.pow(2, retries), 10000);
      await delay(waitTime);
    }
  }
  throw new Error('Max retries reached');
}

export class Trading212Service {
  constructor(private apiKey: string) {}

  private async fetchFromApi(endpoint: string) {
    const response = await fetchWithRetry(`/api/platforms/trading212${endpoint}`, {
      headers: {
        'Authorization': this.apiKey,
      },
    });

    return response.json();
  }

  async getPortfolio(): Promise<Portfolio> {
    return this.fetchFromApi('/portfolio');
  }

  async getPositions(): Promise<Position[]> {
    return this.fetchFromApi('/positions');
  }
}
