"use client";

import { useState } from "react";
import DashboardWelcomeHeader from "@/components/Dashboard/DashbaordWelcomeHeader/DashboardWelcomeHeader";
import AllPortfolioSummary from "@/components/Dashboard/AllPortfolioSummary/AllPortfolioSummary";
import DashboardTabs from "@/components/Dashboard/DashboardTabs/DashboardTabs";
import { Trading212Portfolio } from "@/components/Dashboard/Trading212Dashboard/Trading212Portfolio";
import type { User } from "@/lib/constants/user";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import NoPlatformsConnected from "../NoPlatformsConnected/NoPlatformsConnected";
import BinancePortfolio from "../BinancePortfolio/BinancePortfolio";

const PlatformsDashboard = ({ user }: { user: User }) => {
  const [showStats, setShowStats] = useState<boolean>(false);
  const { connections, hasFetched } = usePlatformConnection();

  if (!connections.length && hasFetched) {
    return <NoPlatformsConnected />;
  }

  return (
    <div className="ml-2 flex flex-col space-y-6">
      <DashboardWelcomeHeader userName={user.name} />
      <AllPortfolioSummary showStats={showStats} setShowStats={setShowStats} />
      {showStats &&
        connections.some(
          (connection) => connection.platformId === "trading212",
        ) && <Trading212Portfolio />}
      {showStats &&
        connections.some(
          (connection) => connection.platformId === "binance",
        ) && <BinancePortfolio />}
      <DashboardTabs connectedPlatforms={connections} />
    </div>
  );
};

export default PlatformsDashboard;
