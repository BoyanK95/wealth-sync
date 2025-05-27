"use client";

import DashboardWelcomeHeader from "@/components/Dashboard/DashbaordWelcomeHeader/DashboardWelcomeHeader";
import AllPortfolioSummary from "@/components/Dashboard/AllPortfolioSummary/AllPortfolioSummary";
import DashboardTabs from "@/components/Dashboard/DashboardTabs/DashboardTabs";
import { Trading212Portfolio } from "@/components/Dashboard/Trading212Dashboard/Trading212Portfolio";
import type { User } from "@/lib/constants/user";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import NoPlatformsConnected from "../NoPlatformsConnected/NoPlatformsConnected";

const PlatformsDashboard = ({ user }: { user: User }) => {
  const { connections } = usePlatformConnection();

    console.log("connections", connections);


  if (!connections.length) {
    return <NoPlatformsConnected />;
  }

  return (
    <div className="flex flex-col space-y-6">
      <DashboardWelcomeHeader user={user} />
      <AllPortfolioSummary />
      <Trading212Portfolio />
      <DashboardTabs />
    </div>
  );
};

export default PlatformsDashboard;
