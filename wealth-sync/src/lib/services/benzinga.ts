/**
 * Benzinga API Service
 * Handles real-time news, analysis, and market data from Benzinga API
 */

export interface BenzingaNewsItem {
  id: string;
  title: string;
  body: string;
  created: string;
  updated: string;
  source: string;
  url: string;
  image?: string;
  tickers?: string[];
  rating?: number;
  importance?: number;
  sentiment?: string;
}

export interface BullsBearsAnalysis {
  ticker: string;
  bullish_summary: string;
  bearish_summary: string;
  neutral_summary: string;
  analyst_rating?: {
    rating: string;
    target_price?: number;
    num_strong_buys?: number;
    num_buys?: number;
    num_holds?: number;
    num_sells?: number;
    num_strong_sells?: number;
  };
}

export interface EarningsAnalysis {
  ticker: string;
  eps_estimate?: number;
  eps_actual?: number;
  revenue_estimate?: number;
  revenue_actual?: number;
  earnings_date?: string;
  surprise?: number;
}

class BenzingaAPI {
  private apiKey: string;
  private v1BaseURL = "https://api.benzinga.com/api/v1";
  private v2BaseURL = "https://api.benzinga.com/api/v2";
  private v21BaseURL = "https://api.benzinga.com/api/v2.1";
  private wsURL = "wss://api.benzinga.com/streams/v2";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Get real-time news stream via WebSocket
   */
  getNewsWebSocket(
    onMessage: (news: BenzingaNewsItem) => void,
    onError: (error: Error) => void,
  ): WebSocket | null {
    if (typeof window === "undefined") {
      return null; // SSR safe
    }

    try {
      const ws = new WebSocket(`${this.wsURL}/news?token=${this.apiKey}`);

      ws.onopen = () => {
        console.log("Benzinga news websocket connected");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch (error) {
          console.error("Failed to parse websocket message:", error);
        }
      };

      ws.onerror = (event) => {
        console.error("WebSocket error:", event);
        onError(new Error("WebSocket connection failed"));
      };

      ws.onclose = () => {
        console.log("Benzinga news websocket disconnected");
      };

      return ws;
    } catch (error) {
      onError(error instanceof Error ? error : new Error("WebSocket failed"));
      return null;
    }
  }

  /**
   * Get trending news
   */
  async getTrendingNews(limit = 25, pageNum = 1): Promise<BenzingaNewsItem[]> {
    try {
      const response = await fetch(
        `${this.v1BaseURL}/news?token=${this.apiKey}&limit=${limit}&page=${pageNum}`,
      );

      if (!response.ok) {
        console.warn(
          `Benzinga API returned ${response.status}: ${response.statusText}`,
        );
        return [];
      }

      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        console.warn("Benzinga API did not return JSON");
        return [];
      }

      const data = (await response.json()) as {
        news?: BenzingaNewsItem[];
      };
      return data.news ?? [];
    } catch (error) {
      console.error("Error fetching trending news:", error);
      return [];
    }
  }

  /**
   * Get news for specific tickers
   */
  async getTickerNews(tickers: string[]): Promise<BenzingaNewsItem[]> {
    try {
      const tickerList = tickers.join(",");

      const response = await fetch(
        `${this.v1BaseURL}/news?token=${this.apiKey}&symbols=${tickerList}`,
      );

      if (!response.ok) {
        const text = await response.text();
        console.warn("Benzinga error:", response.status, text);
        return [];
      }

      const data = (await response.json()) as {
        news?: BenzingaNewsItem[];
      };
      return data.news ?? [];
    } catch (error) {
      console.error("Error fetching ticker news:", error);
      return [];
    }
  }

  /**
   * Get bulls and bears analysis for a ticker
   */
  async getBullsBearsAnalysis(
    ticker: string,
  ): Promise<BullsBearsAnalysis | null> {
    try {
      const response = await fetch(
        `${this.v1BaseURL}/bulls_bears_say?token=${this.apiKey}&symbols=${ticker}`,
      );

      if (!response.ok) {
        console.warn(
          `Benzinga API returned ${response.status}: ${response.statusText}`,
        );
        const text = await response.text();
        console.warn("Benzinga response:", text);
        return null;
      }

      const data = await response.json();
      return data?.[0] ?? null;
    } catch (error) {
      console.error("Error fetching bulls & bears analysis:", error);
      return null;
    }
  }

  /**
   * Get earnings analysis for a ticker
   */
  async getEarningsAnalysis(ticker: string): Promise<EarningsAnalysis | null> {
    try {
      const response = await fetch(
        `https://api.benzinga.com/api/v2.1/calendar/earnings?symbols=${ticker}&token=${this.apiKey}`,
        {
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        },
      );

      if (!response.ok) {
        console.warn(
          `Benzinga API returned ${response.status}: ${response.statusText}`,
        );
        return null;
      }

      const data = await response.json();

      return data?.earnings?.[0] ?? null;
    } catch (error) {
      console.error("Error fetching earnings analysis:", error);
      return null;
    }
  }

  /**
   * Search for assets
   */
  async searchAssets(
    query: string,
  ): Promise<Array<{ symbol: string; name: string }>> {
    try {
      const response = await fetch(
        `${this.v1BaseURL}/assets/search?token=${this.apiKey}&query=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        console.warn(
          `Benzinga API returned ${response.status}: ${response.statusText}`,
        );
        return [];
      }

      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        console.warn("Benzinga API did not return JSON");
        return [];
      }

      const data = (await response.json()) as {
        assets?: Array<{ symbol: string; name: string }>;
      };
      return data.assets ?? [];
    } catch (error) {
      console.error("Error searching assets:", error);
      return [];
    }
  }
}

export default BenzingaAPI;
