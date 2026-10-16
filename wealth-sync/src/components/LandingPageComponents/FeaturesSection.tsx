import React from "react";
import { getTranslations } from "next-intl/server";

import { SITE_NAME } from "@/lib/constants/site";
import PremiumFeatures from "./PremiumFeatures";

const FeaturesSection = async () => {
  const t = await getTranslations("FeaturesSection");

  const featureItems = [
    {
      title: t("items.performance.title"),
      description: t("items.performance.description"),
      icon: "line" as const,
    },
    {
      title: t("items.allocation.title"),
      description: t("items.allocation.description"),
      icon: "pie" as const,
    },
    {
      title: t("items.analytics.title"),
      description: t("items.analytics.description"),
      icon: "bar" as const,
    },
    {
      title: t("items.security.title"),
      description: t("items.security.description"),
      icon: "shield" as const,
    },
    {
      title: t("items.realtime.title"),
      description: t("items.realtime.description"),
      icon: "zap" as const,
    },
    {
      title: t("items.mobile.title"),
      description: t("items.mobile.description"),
      icon: "mobile" as const,
    },
  ];

  return (
    <PremiumFeatures
      badge={t("badge")}
      title={t("title")}
      description={t("description", { siteName: SITE_NAME })}
      items={featureItems}
    />
  );
};

export default FeaturesSection;
