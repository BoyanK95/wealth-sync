'use client"';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { useTranslations } from "next-intl";

const PortfolioAiAnalytics = () => {
  const t = useTranslations("PortfolioAiAnalytics");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/20 flex h-100 w-full items-center justify-center">
          <BarChart3 className="text-muted h-8 w-8" />
          {/* TODO create portfolio AI analytics component with real data */}
          <span className="text-muted ml-2">{t("span")}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioAiAnalytics;
