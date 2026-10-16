import React from "react";
import { auth } from "@/server/auth";
import { getTranslations } from "next-intl/server";

import PremiumHero from "./PremiumHero";

const IntroductionSection = async () => {
  const t = await getTranslations("IntroductionSection");
  const session = await auth();

  return (
    <PremiumHero
      heading={t("heading")}
      title={t("title")}
      description={t("description")}
      getStarted={t("getStarted")}
      goToDashboard={t("goToDashboard")}
      exploreFeatures={t("exploreFeatures")}
      secure={t("features.secure")}
      realtime={t("features.realtime")}
      mobile={t("features.mobile")}
      welcomeBack={session?.user ? t("welcomeBack") : undefined}
      userName={session?.user?.name ?? null}
      isLoggedIn={Boolean(session?.user)}
    />
  );
};

export default IntroductionSection;
