import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Routes } from "@/lib/constants/routes";
import type { PlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import RecentTransactionsTab from "./RecentTransactionsTab";

const ConnectedPlatformsTab = ({
  connectedPlatforms,
}: {
  connectedPlatforms: PlatformConnection[];
}) => {
  return (
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
                key={platform.platformId}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="bg-muted mr-3 flex h-10 w-10 items-center justify-center rounded-full">
                    {platform.platformId.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{platform.platformId}</p>
                    <p className="text-muted-foreground text-xs">
                      {platform.isConnected ? "Connected" : "Not connected"}
                    </p>
                  </div>
                </div>
                {platform.isConnected ? (
                  <Button variant="outline" size="sm">
                    Sync
                  </Button>
                ) : (
                  <Button size="sm" className="bg-green-700 hover:bg-green-800">
                    Connect
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link href={Routes.INTEGRATIONS} className="w-full">
            <Button variant="outline" className="w-full cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Add New Platform
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <RecentTransactionsTab />
    </div>
  );
};

export default ConnectedPlatformsTab;
