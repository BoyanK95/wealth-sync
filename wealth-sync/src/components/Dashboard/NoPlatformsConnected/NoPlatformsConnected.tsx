'use client";';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IntegrationPlatformsGrid from "@/components/IntegrationPlatformsSection/IntegrationPlatformsGrid";
import Image from "next/image";
import { useTranslations } from "next-intl";
import DynamicText from "@/components/Common/DynamicHeader";

const NoPlatformsConnected = () => {
  const t = useTranslations("NoPlatformsConnected");

  return (
    <Card className="mt-7 w-full text-center">
      <CardHeader>
        <CardTitle>
          <DynamicText text={t("title")} className="text-2xl font-bold" />
        </CardTitle>
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
          <DynamicText
            text={t("description")}
            className="mx-auto max-w-2xl text-center text-lg"
          />
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
