import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConnectedPlatformsTab from "./ConnectedPlatformsTab";
import PortfolioChart from "./PortfolioChart";
import PortfolioAssetAllocation from "./PortfolioAssetAllocation";
import PortfolioAssetsBreakdown from "./PortfolioAssetsBreakdown";
import PortfolioTransactionHistory from "./PortfolioTransactionHistory";
import PortfolioAiAnalytics from "./PortfolioAiAnalytics";

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
        <PortfolioAssetsBreakdown />
      </TabsContent>

      <TabsContent value="transactions" className="space-y-4">
        <PortfolioTransactionHistory />
      </TabsContent>

      <TabsContent value="insights" className="space-y-4">
        <PortfolioAiAnalytics />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
