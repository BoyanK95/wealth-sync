import { getTranslations } from "next-intl/server";
import ChartPrievewSectionClient from "./ChartPrievewSectionClient";

const ChartPrievewSection = async () => {
  const t = await getTranslations("ChartPreviewSection");

  return (
    <ChartPrievewSectionClient
      title={t("title")}
      description={t("description")}
    />
  );
};

export default ChartPrievewSection;
