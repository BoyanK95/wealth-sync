import { useEffect, useState, useCallback } from "react";
import BenzingaAPI, { type BenzingaNewsItem } from "@/lib/services/benzinga";

export interface UseBenzingaNewsOptions {
  apiKey: string;
  maxItems?: number;
  onError?: (error: Error) => void;
}

export function useBenzingaRealtimeNews(options: UseBenzingaNewsOptions) {
  const [news, setNews] = useState<BenzingaNewsItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [wsInstance, setWsInstance] = useState<WebSocket | null>(null);

  const maxItems = options.maxItems ?? 50;

  useEffect(() => {
    const benzinga = new BenzingaAPI(options.apiKey);

    const handleMessage = (newsItem: BenzingaNewsItem) => {
      setNews((prevNews) => {
        const updated = [newsItem, ...prevNews];
        return updated.slice(0, maxItems);
      });
    };

    const handleError = (err: Error) => {
      setError(err);
      setIsConnected(false);
      options.onError?.(err);
    };

    const ws = benzinga.getNewsWebSocket(handleMessage, handleError);
    if (ws) {
      setWsInstance(ws);
      setIsConnected(true);
    }

    return () => {
      if (ws) {
        ws.close();
        setIsConnected(false);
      }
    };
  }, [options.apiKey, maxItems, options]);

  const reconnect = useCallback(() => {
    if (wsInstance) {
      wsInstance.close();
    }
    setNews([]);
    setError(null);
  }, [wsInstance]);

  return {
    news,
    isConnected,
    error,
    reconnect,
  };
}

export function useBenzingaTrendingNews(options: UseBenzingaNewsOptions) {
  const [news, setNews] = useState<BenzingaNewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const benzinga = new BenzingaAPI(options.apiKey);

    setLoading(true);
    benzinga
      .getTrendingNews(options.maxItems ?? 25)
      .then((data) => {
        setNews(data);
        setError(null);
      })
      .catch((err: Error) => {
        setError(err);
        options.onError?.(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [options.apiKey, options]);

  return { news, loading, error };
}

export function useBenzingaTickerNews(
  ticker: string,
  options: UseBenzingaNewsOptions,
) {
  const [news, setNews] = useState<BenzingaNewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!ticker.trim()) {
      setNews([]);
      return;
    }

    const benzinga = new BenzingaAPI(options.apiKey);

    setLoading(true);
    benzinga
      .getTickerNews([ticker])
      .then((data) => {
        setNews(data.slice(0, options.maxItems ?? 10));
        setError(null);
      })
      .catch((err: Error) => {
        setError(err);
        options.onError?.(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ticker, options.apiKey, options]);

  return { news, loading, error };
}
