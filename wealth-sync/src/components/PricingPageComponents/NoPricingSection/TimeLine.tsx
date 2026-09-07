import React from "react";
import { getTranslations } from "next-intl/server";

const TimeLine = async () => {
  const t = await getTranslations("NoPricingSection.timeline");

  return (
    <div className="w-full max-w-2xl space-y-4">
      <h3 className="text-xl font-semibold">{t("title")}</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-700">
            <span className="text-xs font-bold text-white">1</span>
          </div>
          <div>
            <p className="font-medium">{t("steps.one.title")}</p>
            <p className="text-muted-foreground text-sm">
              {t("steps.one.description")}
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="bg-muted -shrink- -shrink- mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            <span className="text-muted-foreground text-xs font-bold">2</span>
          </div>
          <div>
            <p className="font-medium">{t("steps.two.title")}</p>
            <p className="text-muted-foreground text-sm">
              {t("steps.two.description")}
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="bg-muted -shrink- -shrink- mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            <span className="text-muted-foreground text-xs font-bold">3</span>
          </div>
          <div>
            <p className="font-medium">{t("steps.three.title")}</p>
            <p className="text-muted-foreground text-sm">
              {t("steps.three.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
