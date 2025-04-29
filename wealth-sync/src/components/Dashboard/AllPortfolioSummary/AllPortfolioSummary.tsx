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
import {
  portfolioValue,
  portfolioChange,
  portfolioChangePercent,
  isPositiveChange,
  connectedPlatforms,
} from "@/lib/mockData/mockData";

const AllPortfolioSummary = () => {
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
            ${portfolioValue.toLocaleString()}
          </div>
          <div className="flex items-center pt-1">
            {isPositiveChange ? (
              <ArrowUp className="mr-1 h-4 w-4 text-green-700" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4 text-red-700" />
            )}
            <span
              className={isPositiveChange ? "text-green-700" : "text-red-700"}
            >
              {isPositiveChange ? "+" : "-"}$
              {Math.abs(portfolioChange).toLocaleString()} (
              {portfolioChangePercent}%)
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
          <div className="text-2xl font-bold">
            {connectedPlatforms.filter((p) => p.connected).length}
          </div>
          <p className="text-muted-foreground text-xs">
            of {connectedPlatforms.length} available integrations
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
