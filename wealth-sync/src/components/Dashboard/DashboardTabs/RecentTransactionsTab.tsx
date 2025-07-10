import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Routes } from "@/lib/constants/routes";
import { recentTransactions } from "@/lib/mockData/mockData";

const RecentTransactionsTab = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest investment activities</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={Routes.ALL_TRANSACTIONS}>
            View All
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <div
                  className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full ${
                    transaction.type === "buy" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {transaction.type === "buy" ? (
                    <ArrowDown className={`h-5 w-5 text-green-700`} />
                  ) : (
                    <ArrowUp className={`h-5 w-5 text-red-700`} />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.asset}</p>
                  <p className="text-muted-foreground text-xs">
                    {transaction.date} • {transaction.platform}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {transaction.type === "buy" ? "+" : "-"}
                  {transaction.amount}
                </p>
                <p className="text-muted-foreground text-xs">
                  ${transaction.value.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactionsTab;
