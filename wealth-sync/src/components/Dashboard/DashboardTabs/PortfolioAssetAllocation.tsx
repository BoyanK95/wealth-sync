import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { assetAllocation } from "@/lib/mockData/mockData";
import { PieChart } from "lucide-react";

const PortfolioAssetAllocation = () => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
        <CardDescription>Breakdown of your portfolio</CardDescription>
      </CardHeader>
      <CardContent className="bg-muted/20 flex h-[300px] w-full items-center justify-center">
        <PieChart className="text-muted h-8 w-8" />
        <span className="text-muted ml-2">
          Allocation chart will appear here
        </span>
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-1">
          {assetAllocation.map((asset) => (
            <div key={asset.type} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="mr-2 h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      asset.type === "Stocks"
                        ? "#10b981"
                        : asset.type === "Crypto"
                          ? "#3b82f6"
                          : asset.type === "ETFs"
                            ? "#f59e0b"
                            : "#6b7280",
                  }}
                />
                <span className="text-sm">{asset.type}</span>
              </div>
              <div className="text-sm">
                {asset.percentage}% ($
                {asset.value.toLocaleString()})
              </div>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PortfolioAssetAllocation;
