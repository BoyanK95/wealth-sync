import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, CreditCard } from "lucide-react";
import ConnectedPlatformsTab from "./ConnectedPlatformsTab";
import PortfolioChart from "./PortfolioChart";
import PortfolioAssetAllocation from "./PortfolioAssetAllocation";

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
          AI Insights
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <PortfolioChart />
          <PortfolioAssetAllocation />
        </div>
        <ConnectedPlatformsTab />
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
