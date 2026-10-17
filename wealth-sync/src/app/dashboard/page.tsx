import type { Metadata } from "next";
import { auth } from "@/server/auth";
import type { User } from "@/lib/constants/user";
import PlatformsDashboard from "@/components/Dashboard/PlatformsDashboard/PlatformsDashboard";
import { getOwnAssets } from "@/server/actions/assets";

export const metadata: Metadata = {
  title: "Dashboard | WealthSync",
  description:
    "Manage and track your investment portfolio across multiple platforms.",
};

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;
  const assets = await getOwnAssets();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-16 pb-12">
        <PlatformsDashboard user={user as User} customAssets={assets} />
      </main>
    </div>
  );
}
