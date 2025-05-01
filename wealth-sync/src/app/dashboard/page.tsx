import type { Metadata } from "next";
import { auth } from "@/server/auth";
import { Trading212Portfolio } from "@/components/Dashboard/Trading212Dashboard/Trading212Portfolio";
import DashboardWelcomeHeader from "@/components/Dashboard/DashbaordWelcomeHeader/DashboardWelcomeHeader";
import AllPortfolioSummary from "@/components/Dashboard/AllPortfolioSummary/AllPortfolioSummary";
import DashboardTabs from "@/components/Dashboard/DashboardTabs/DashboardTabs";

export const metadata: Metadata = {
  title: "Dashboard | WealthSync",
  description:
    "Manage and track your investment portfolio across multiple platforms.",
};

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-16 pb-12">
        <div className="container">
          <div className="flex flex-col space-y-6">
            <DashboardWelcomeHeader user={user} />
            <AllPortfolioSummary />
            <Trading212Portfolio />
            <DashboardTabs />
          </div>
        </div>
      </main>
    </div>
  );
}
