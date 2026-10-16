import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";
import IntegrationSectionClient from "./IntegrationSectionClient";

const IntegrationSection = async () => {
  const t = await getTranslations("IntegrationSection");

  return (
    <IntegrationSectionClient
      badge={t("badge")}
      title={t("title")}
      description={t("description", { siteName: SITE_NAME })}
    />
  );
};

export default IntegrationSection;
