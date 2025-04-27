export class Trading212Api {
  private baseUrl = 'https://live.trading212.com/api/v0';
  
  constructor(private apiKey: string) {}

  private async fetch(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Authorization': this.apiKey,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Trading212 API error: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Get account information
  async getAccountInfo() {
    return this.fetch('/equity/account/info');
  }

  // Get portfolio
  async getPortfolio() {
    return this.fetch('/equity/portfolio');
  }

  // Get positions
  async getPositions() {
    return this.fetch('/equity/positions');
  }

  // Get transactions history
  async getTransactions(from: string, to: string) {
    return this.fetch(`/equity/transactions?from=${from}&to=${to}`);
  }
}