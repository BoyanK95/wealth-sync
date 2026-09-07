import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

export function PlatformLoadingCard({ platformName }: { platformName: string }) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <RefreshCw className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-sm font-medium">Loading {platformName} data...</p>
        </div>
      </div>
      
      <CardHeader className="opacity-50">
        <div className="h-6 w-48 animate-pulse rounded-md bg-muted" />
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4 opacity-50">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
            <div className="h-8 w-32 animate-pulse rounded-md bg-muted" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}