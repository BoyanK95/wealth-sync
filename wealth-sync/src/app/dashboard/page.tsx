import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  CreditCard,
  DollarSign,
  ExternalLink,
  LineChart,
  PieChart,
  Plus,
  RefreshCw,
  Settings,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/server/auth";
import { Routes } from "@/lib/constants/routes";
import { Trading212Portfolio } from "@/components/Dashboard/Trading212Dashboard/Trading212Portfolio";

export const metadata: Metadata = {
  title: "Dashboard | WealthSync",
  description:
    "Manage and track your investment portfolio across multiple platforms.",
};

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;

  // Placeholder data - in a real app, this would come from your database
  const portfolioValue = 124563.89;
  const portfolioChange = 1243.45;
  const portfolioChangePercent = 1.02;
  const isPositiveChange = portfolioChange > 0;

  const connectedPlatforms = [
    {
      name: "Trading212",
      connected: true,
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Binance",
      connected: true,
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Coinbase",
      connected: false,
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Robinhood",
      connected: false,
      logo: "/placeholder.svg?height=40&width=40",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "buy",
      asset: "AAPL",
      amount: "10",
      value: 1750.3,
      date: "2023-04-05",
      platform: "Trading212",
    },
    {
      id: 2,
      type: "sell",
      asset: "BTC",
      amount: "0.25",
      value: 6543.21,
      date: "2023-04-03",
      platform: "Binance",
    },
    {
      id: 3,
      type: "buy",
      asset: "MSFT",
      amount: "5",
      value: 1250.75,
      date: "2023-04-01",
      platform: "Trading212",
    },
    {
      id: 4,
      type: "buy",
      asset: "ETH",
      amount: "1.5",
      value: 2800.5,
      date: "2023-03-28",
      platform: "Binance",
    },
  ];

  const assetAllocation = [
    { type: "Stocks", percentage: 45, value: 56053.75 },
    { type: "Crypto", percentage: 30, value: 37369.17 },
    { type: "ETFs", percentage: 15, value: 18684.58 },
    { type: "Cash", percentage: 10, value: 12456.39 },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-16 pb-12">
        <div className="container">
          <div className="flex flex-col space-y-6">
            {/* Welcome header */}
            <div className="flex flex-col space-y-2 pt-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Welcome back, {user?.name ?? "Investor"}
                </h1>
                <p className="text-muted-foreground">
                  Here&apos;s an overview of your portfolio as of{" "}
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Portfolio summary */}
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
                      className={
                        isPositiveChange ? "text-green-700" : "text-red-700"
                      }
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
                  <CardTitle className="text-sm font-medium">
                    Monthly Change
                  </CardTitle>
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

            <Trading212Portfolio />

            {/* Main content tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  {/* Portfolio chart - takes up more space */}
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Portfolio Performance</CardTitle>
                      <CardDescription>
                        Your portfolio value over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="bg-muted/20 flex h-[300px] w-full items-center justify-center">
                      <LineChart className="text-muted h-8 w-8" />
                      <span className="text-muted ml-2">
                        Portfolio chart will appear here
                      </span>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        1D
                      </Button>
                      <Button variant="outline" size="sm">
                        1W
                      </Button>
                      <Button variant="outline" size="sm">
                        1M
                      </Button>
                      <Button variant="outline" size="sm">
                        3M
                      </Button>
                      <Button variant="outline" size="sm">
                        1Y
                      </Button>
                      <Button variant="outline" size="sm">
                        All
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Asset allocation - takes up less space */}
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Asset Allocation</CardTitle>
                      <CardDescription>
                        Breakdown of your portfolio
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="bg-muted/20 flex h-[300px] w-full items-center justify-center">
                      <PieChart className="text-muted h-8 w-8" />
                      <span className="text-muted ml-2">
                        Allocation chart will appear here
                      </span>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full space-y-1">
                        {assetAllocation.map((asset) => (
                          <div
                            key={asset.type}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <div
                                className="mr-2 h-3 w-3 rounded-full"
                                style={{
                                  backgroundColor:
                                    asset.type === "Stocks"
                                      ? "#10b981"
                                      : asset.type === "Crypto"
                                        ? "#3b82f6"
                                        : asset.type === "ETFs"
                                          ? "#f59e0b"
                                          : "#6b7280",
                                }}
                              />
                              <span className="text-sm">{asset.type}</span>
                            </div>
                            <div className="text-sm">
                              {asset.percentage}% ($
                              {asset.value.toLocaleString()})
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </div>

                {/* Connected platforms and recent transactions */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Connected Platforms</CardTitle>
                      <CardDescription>
                        Manage your connected exchanges and brokerages
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {connectedPlatforms.map((platform) => (
                          <div
                            key={platform.name}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <div className="bg-muted mr-3 flex h-10 w-10 items-center justify-center rounded-full">
                                {platform.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium">{platform.name}</p>
                                <p className="text-muted-foreground text-xs">
                                  {platform.connected
                                    ? "Connected"
                                    : "Not connected"}
                                </p>
                              </div>
                            </div>
                            {platform.connected ? (
                              <Button variant="outline" size="sm">
                                Sync
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                className="bg-green-700 hover:bg-green-800"
                              >
                                Connect
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Platform
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>
                          Your latest investment activities
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={Routes.ALL_TRANSACTIONS}>
                          View All
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentTransactions.map((transaction) => (
                          <div
                            key={transaction.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <div
                                className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full ${
                                  transaction.type === "buy"
                                    ? "bg-green-100"
                                    : "bg-red-100"
                                }`}
                              >
                                {transaction.type === "buy" ? (
                                  <ArrowDown
                                    className={`h-5 w-5 text-green-700`}
                                  />
                                ) : (
                                  <ArrowUp className={`h-5 w-5 text-red-700`} />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">
                                  {transaction.asset}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  {transaction.date} • {transaction.platform}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {transaction.type === "buy" ? "+" : "-"}
                                {transaction.amount}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                ${transaction.value.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="assets" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Assets</CardTitle>
                    <CardDescription>
                      Complete breakdown of all your investments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/20 flex h-[400px] w-full items-center justify-center">
                      <CreditCard className="text-muted h-8 w-8" />
                      <span className="text-muted ml-2">
                        Assets table will appear here
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                      Complete history of your investment activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/20 flex h-[400px] w-full items-center justify-center">
                      <CreditCard className="text-muted h-8 w-8" />
                      <span className="text-muted ml-2">
                        Transactions table will appear here
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Insights</CardTitle>
                    <CardDescription>
                      Advanced analytics and recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/20 flex h-[400px] w-full items-center justify-center">
                      <BarChart3 className="text-muted h-8 w-8" />
                      <span className="text-muted ml-2">
                        Insights will appear here
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
