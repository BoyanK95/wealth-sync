'use client"';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LineChart } from "lucide-react";
import { useTranslations } from "next-intl";

const PortfolioChart = () => {
  const t = useTranslations("PortfolioChart");

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="bg-muted/20 flex h-[300px] w-full items-center justify-center">
        <LineChart className="text-muted h-8 w-8" />
        {/* TODO create portfolio chart component with real data */}
        <span className="text-muted ml-2">{t("span")}</span>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          1D
        </Button>
        <Button variant="outline" size="sm">
          1W
        </Button>
        <Button variant="outline" size="sm">
          1M
        </Button>
        <Button variant="outline" size="sm">
          3M
        </Button>
        <Button variant="outline" size="sm">
          1Y
        </Button>
        <Button variant="outline" size="sm">
          All
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PortfolioChart;
