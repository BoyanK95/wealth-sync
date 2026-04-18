import React from "react";
import { getTranslations } from "next-intl/server";
import IntegrationPlatformsGrid from "./IntegrationPlatformsGrid";

const IntegrationSection = async () => {
  const t = await getTranslations("IntegrationSection");

  return (
    <section
      id="integrations"
      className="flex w-full flex-col justify-center align-middle py-8"
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center p-2">
        <div className="space-y-2">
          <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
            {t("badge")}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t("description")}
          </p>
        </div>
      </div>
      <IntegrationPlatformsGrid />
    </section>
  );
};

export default IntegrationSection;
