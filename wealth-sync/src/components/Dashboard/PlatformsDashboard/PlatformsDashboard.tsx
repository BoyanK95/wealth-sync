"use client";

import AllPortfolioSummary from "@/components/Dashboard/AllPortfolioSummary/AllPortfolioSummary";
import DashboardWelcomeHeader from "@/components/Dashboard/DashbaordWelcomeHeader/DashboardWelcomeHeader";
import DashboardTabs from "@/components/Dashboard/DashboardTabs/DashboardTabs";
import { Trading212Portfolio } from "@/components/Dashboard/Trading212Dashboard/Trading212Portfolio";
import { PlatformKey } from "@/lib/constants/apiKeyStrings";
import type { User } from "@/lib/constants/user";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import { useState } from "react";
import BinancePortfolio from "../BinancePortfolio/BinancePortfolio";
import NoPlatformsConnected from "../NoPlatformsConnected/NoPlatformsConnected";

const PlatformsDashboard = ({ user }: { user: User }) => {
  const [showStats, setShowStats] = useState<boolean>(false);
  const { connections, connectionsCount, hasFetched } = usePlatformConnection();

  if (!connectionsCount && hasFetched) {
    return <NoPlatformsConnected />;
  }

  return (
    <div className="ml-2 flex flex-col space-y-6">
      <DashboardWelcomeHeader userName={user.name} />
      <AllPortfolioSummary showStats={showStats} setShowStats={setShowStats} />
      {showStats && connections[PlatformKey.TRADING_212]?.isConnected && (
        <Trading212Portfolio />
      )}
      {showStats && connections[PlatformKey.BINANCE]?.isConnected && (
        <BinancePortfolio />
      )}
      <DashboardTabs />
    </div>
  );
};

export default PlatformsDashboard;
