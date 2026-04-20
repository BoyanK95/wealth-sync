'use client";';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Platforms } from "@/lib/constants/platforms";
import { Wallet } from "lucide-react";
import { useTranslations } from "next-intl";

export const ConnectedPlatformsSection = ({
  connectedPlatforms,
}: {
  connectedPlatforms: number;
}) => {
  const t = useTranslations("ConnectedPlatformsSection");
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{t("title")}</CardTitle>
        <Wallet className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{connectedPlatforms}</div>
        <p className="text-muted-foreground text-xs">
          {t("description", { platformCount: Platforms.length })}
        </p>
      </CardContent>
    </Card>
  );
};
