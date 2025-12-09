import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const PortfolioTransactionHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>
          Complete history of your investment activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/20 flex h-[400px] w-full items-center justify-center">
          <CreditCard className="text-muted h-8 w-8" />
          <span className="text-muted ml-2">
            Transactions table will appear here
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioTransactionHistory;
