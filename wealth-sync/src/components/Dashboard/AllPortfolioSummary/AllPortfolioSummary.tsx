"use client";

import React from "react";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  DollarSign,
  LineChart,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import { useEffect, useState } from "react";
import { Trading212Service } from "@/lib/services/trading212Service";
import { PlatformLoadingCard } from "@/components/Dashboard/PlatformLoadingCard";
import { isGbxTicker } from "@/lib/utils/currencyUtils";

const AllPortfolioSummary = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const [totalChange, setTotalChange] = useState<number | null>(null);
  const [totalChangePercent, setTotalChangePercent] = useState<number | null>(
    null,
  );
  const [connectedCount, setConnectedCount] = useState(0);
  const { connections, getApiKey } = usePlatformConnection();

  useEffect(() => {
    async function fetchPortfolioData() {
      try {
        setLoading(true);
        let portfolioTotal = 0;
        let platformsConnected = 0;

        // Get Trading212 data if connected
        const trading212ApiKey = getApiKey("trading212");
        const service = new Trading212Service(trading212ApiKey!);
        const data = await service.getPortfolio();
        console.log("data", data);

        // Calculate total value from positions
        const trading212Value = data.reduce((sum, position) => {
          if (isGbxTicker(position.ticker)) {
            return sum + position.currentPrice * 0.01 * position.quantity; // Convert from pence to pounds
          }
          return sum + position.currentPrice * position.quantity;
        }, 0);
        portfolioTotal += trading212Value;
        platformsConnected++;

        // Add other platforms here as they're implemented

        setTotalValue(portfolioTotal);
        setConnectedCount(platformsConnected);

        // For now, using mock change data - this should be calculated from historical data
        setTotalChange(portfolioTotal * 0.01); // Placeholder: 1% change
        setTotalChangePercent(1.0); // Placeholder: 1%
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
        setError("Failed to load portfolio data");
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolioData();
  }, [connections, getApiKey]);

  if (loading) return <PlatformLoadingCard platformName="Portfolio" />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Portfolio Value
          </CardTitle>
          <DollarSign className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalValue ? totalValue.toLocaleString() : "0.00"}
          </div>
          <div className="flex items-center pt-1">
            {totalChange && totalChange > 0 ? (
              <ArrowUp className="mr-1 h-4 w-4 text-green-700" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4 text-red-700" />
            )}
            <span
              className={
                totalChange && totalChange > 0
                  ? "text-green-700"
                  : "text-red-700"
              }
            >
              {totalChange && totalChange > 0 ? "+" : "-"}$
              {totalChange ? Math.abs(totalChange).toLocaleString() : "0.00"} (
              {totalChangePercent ?? 0}%)
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Connected Platforms
          </CardTitle>
          <Wallet className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{connectedCount}</div>
          <p className="text-muted-foreground text-xs">
            of {connections.length} available integrations
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Top Performing Asset
          </CardTitle>
          <LineChart className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">AAPL</div>
          <div className="flex items-center pt-1">
            <ArrowUp className="mr-1 h-4 w-4 text-green-700" />
            <span className="text-green-700">+8.2%</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Change</CardTitle>
          <BarChart3 className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+4.3%</div>
          <div className="flex items-center pt-1">
            <ArrowUp className="mr-1 h-4 w-4 text-green-700" />
            <span className="text-green-700">+$5,120.45</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllPortfolioSummary;
