'use client";';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IntegrationPlatformsGrid from "@/components/IntegrationPlatformsSection/IntegrationPlatformsGrid";
import Image from "next/image";
import { useTranslations } from "next-intl";

const NoPlatformsConnected = () => {
  const t = useTranslations("NoPlatformsConnected");
  return (
    <Card className="mt-7 w-full text-center">
      <CardHeader>
        <CardTitle className="bold text-2xl">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Image
          src="/platforms/no-platforms-connected.png"
          alt="No platforms connected"
          width={400}
          height={400}
          className="mx-auto"
        />
        <div className="text-muted-foreground text-xl">
          <p>{t("description")}</p>
        </div>

        <div className="items-center justify-center space-y-3">
          <h3 className="text-xl font-medium">{t("availablePlatforms")}</h3>
          <p className="text-muted-foreground">{t("preferedPlatforms")}</p>
          <IntegrationPlatformsGrid />
        </div>
      </CardContent>
    </Card>
  );
};

export default NoPlatformsConnected;
