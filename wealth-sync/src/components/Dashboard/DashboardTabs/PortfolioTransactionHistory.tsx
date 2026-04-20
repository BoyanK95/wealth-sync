'use client"';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";

const PortfolioTransactionHistory = () => {
  const t = useTranslations("PortfolioTransactionHistory");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/20 flex h-[400px] w-full items-center justify-center">
          <CreditCard className="text-muted h-8 w-8" />
          {/* TODO create transaction history component with real data */}
          <span className="text-muted ml-2">{t("span")}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioTransactionHistory;
