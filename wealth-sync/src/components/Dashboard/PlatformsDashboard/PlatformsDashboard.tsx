"use client";

import DashboardWelcomeHeader from "@/components/Dashboard/DashbaordWelcomeHeader/DashboardWelcomeHeader";
import AllPortfolioSummary from "@/components/Dashboard/AllPortfolioSummary/AllPortfolioSummary";
import DashboardTabs from "@/components/Dashboard/DashboardTabs/DashboardTabs";
import { Trading212Portfolio } from "@/components/Dashboard/Trading212Dashboard/Trading212Portfolio";
import type { User } from "@/lib/constants/user";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import NoPlatformsConnected from "../NoPlatformsConnected/NoPlatformsConnected";
import BinancePortfolio from "../BinancePortfolio/BinancePortfolio";

const PlatformsDashboard = ({ user }: { user: User }) => {
  const { connections } = usePlatformConnection();

  if (!connections.length) {
    return <NoPlatformsConnected />;
  }

  return (
    <div className="flex flex-col space-y-6">
      <DashboardWelcomeHeader userName={user.name} />
      {connections.length && <AllPortfolioSummary />}
      {connections.some(
        (connection) => connection.platformId === "trading212",
      ) && <Trading212Portfolio />}
      {connections.some(
        (connection) => connection.platformId === "binance",
      ) && <BinancePortfolio />}
      <DashboardTabs connectedPlatforms={connections} />
    </div>
  );
};

export default PlatformsDashboard;
