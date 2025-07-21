import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Platforms } from "@/lib/constants/platforms";
import { Wallet } from "lucide-react";

export const ConnectedPlatformsSection: React.FC<{
  connectedPlatforms: number;
}> = ({ connectedPlatforms }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Connected Platforms</CardTitle>
      <Wallet className="text-muted-foreground h-4 w-4" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{connectedPlatforms}</div>
      <p className="text-muted-foreground text-xs">
        of {Platforms.length} available integrations
      </p>
    </CardContent>
  </Card>
);
