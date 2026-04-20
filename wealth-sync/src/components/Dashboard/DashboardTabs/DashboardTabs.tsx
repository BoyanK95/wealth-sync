'use client";'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConnectedPlatformsTab from "./ConnectedPlatformsTab";
import PortfolioChart from "./PortfolioChart";
import PortfolioAssetAllocation from "./PortfolioAssetAllocation";
import PortfolioAssetsBreakdown from "./PortfolioAssetsBreakdown";
import PortfolioTransactionHistory from "./PortfolioTransactionHistory";
import PortfolioAiAnalytics from "./PortfolioAiAnalytics";
import { useTranslations } from "next-intl";

const DashboardTabs = () => {
  const t = useTranslations("DashboardTabs");

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger
          className="cursor-pointer hover:text-green-700 hover:dark:text-white"
          value="overview"
        >
          {t("overview")}
        </TabsTrigger>
        <TabsTrigger
          className="cursor-pointer hover:text-green-700 hover:dark:text-white"
          value="assets"
        >
          {t("assets")}
        </TabsTrigger>
        <TabsTrigger
          className="cursor-pointer hover:text-green-700 hover:dark:text-white"
          value="transactions"
        >
          {t("transactions")}
        </TabsTrigger>
        <TabsTrigger
          className="cursor-pointer hover:text-green-700 hover:dark:text-white"
          value="insights"
        >
          {t("AIInsights")}
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
