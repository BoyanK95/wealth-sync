"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import { Trading212Service } from "@/lib/services/trading212Service";

export function Trading212Portfolio() {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getApiKey } = usePlatformConnection();

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const apiKey = getApiKey("trading212");
        console.log("API Key:", apiKey);

        if (!apiKey) {
          setError("Trading212 not connected");
          return;
        }

        const service = new Trading212Service(apiKey);
        const data = await service.getPortfolio();
        console.log("Fetched portfolio:", data);

        setPortfolio(data);
      } catch (err) {
        setError("Failed to fetch portfolio data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    console.log("Porttfolio:", portfolio);

    fetchPortfolio();
  }, [getApiKey]);

  if (loading) return <div>Loading Trading212 portfolio...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!portfolio) return null;
  console.log("Portfolio:", portfolio);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading212 Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-medium">Total Value</p>
              <p className="text-2xl font-bold">
                ${portfolio.totalValue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Total P&L</p>
              <p
                className={`text-2xl font-bold ${portfolio.totalPnl >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                ${portfolio.totalPnl.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Positions</h3>
            <div className="mt-2 space-y-2">
              {portfolio.positions.map((position: any) => (
                <div
                  key={position.ticker}
                  className="flex justify-between border-b py-2"
                >
                  <div>
                    <p className="font-medium">{position.ticker}</p>
                    <p className="text-sm text-gray-500">
                      {position.quantity} shares @ ${position.averagePrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${position.value.toLocaleString()}
                    </p>
                    <p
                      className={`text-sm ${position.pnl >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      ${position.pnl.toLocaleString()} ({position.pnlPercentage}
                      %)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
