import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const PortfolioAssetsBreakdown = () => {
  //TODO create assets breakdown component with real data
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Assets</CardTitle>
        <CardDescription>
          Complete breakdown of all your investments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/20 flex h-[400px] w-full items-center justify-center">
          <CreditCard className="text-muted h-8 w-8" />
          <span className="text-muted ml-2">Assets table will appear here</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioAssetsBreakdown;
