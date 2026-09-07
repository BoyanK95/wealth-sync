import React from "react";
import FeaturesSection from "@/components/LandingPageComponents/FeaturesSection";
import IntegrationSection from "@/components/IntegrationPlatformsSection/IntegrationSection";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

const FeaturesectionPage = async () => {
  const t = await getTranslations("FeaturesPage");

  return (
    <div className="mt-10 space-y-12">
      <div className="bg-muted/50 py-8">
        <div className="flex justify-center py-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              {t("title")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("description", { siteName: SITE_NAME })}
            </p>
            <div className="mt-8 grid gap-4 text-left md:grid-cols-2">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-green-800">
                  {t("supportedPlatforms.title")}
                </h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>{t("supportedPlatforms.items.one")}</li>
                  <li>{t("supportedPlatforms.items.two")}</li>
                  <li>{t("supportedPlatforms.items.three")}</li>
                  <li>{t("supportedPlatforms.items.four")}</li>
                </ul>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-green-800">
                  {t("benefits.title")}
                </h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>{t("benefits.items.one")}</li>
                  <li>{t("benefits.items.two")}</li>
                  <li>{t("benefits.items.three")}</li>
                  <li>{t("benefits.items.four")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <FeaturesSection />
        <IntegrationSection />
      </div>
    </div>
  );
};

export default FeaturesectionPage;
