import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  CreditCard,
  ExternalLink,
  LineChart,
  PieChart,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Routes } from "@/lib/constants/routes";
import {
  recentTransactions,
  assetAllocation,
  connectedPlatforms,
} from "@/lib/mockData/mockData";

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger
          className="cursor-pointer hover:text-green-700 hover:dark:text-white"
          value="overview"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          className="cursor-pointer hover:text-green-700 hover:dark:text-white"
          value="assets"
        >
          Assets
        </TabsTrigger>
        <TabsTrigger
          className="cursor-pointer hover:text-green-700 hover:dark:text-white"
          value="transactions"
        >
          Transactions
        </TabsTrigger>
        <TabsTrigger
          className="cursor-pointer hover:text-green-700 hover:dark:text-white"
          value="insights"
        >
          Insights
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Portfolio chart - takes up more space */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Your portfolio value over time</CardDescription>
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
              <CardDescription>Breakdown of your portfolio</CardDescription>
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
                          {platform.connected ? "Connected" : "Not connected"}
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
                          <ArrowDown className={`h-5 w-5 text-green-700`} />
                        ) : (
                          <ArrowUp className={`h-5 w-5 text-red-700`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.asset}</p>
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
              <span className="text-muted ml-2">Insights will appear here</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
