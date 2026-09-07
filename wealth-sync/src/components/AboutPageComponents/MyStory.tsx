import React from "react";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

const MyStory = async () => {
  const t = await getTranslations("ContactPage.story");

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
      <div className="prose max-w-none">
        <p>{t("paragraphs.one")}</p>
        <p>{t("paragraphs.two")}</p>
        <p>{t("paragraphs.three")}</p>
        <p>{t("paragraphs.four")}</p>
        <p>{t("paragraphs.five", { siteName: SITE_NAME })}</p>
        <p>{t("paragraphs.six", { siteName: SITE_NAME })}</p>
      </div>
    </div>
  );
};

export default MyStory;
