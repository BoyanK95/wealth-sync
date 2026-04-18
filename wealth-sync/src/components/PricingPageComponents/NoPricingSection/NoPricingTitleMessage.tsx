import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

const NoPricingTitleMessage = async () => {
  const t = await getTranslations("NoPricingSection");

  return (
    <div className="mt-18 space-y-4">
      <Badge
        variant="outline"
        className="border-green-700 px-6 py-3 text-green-700"
      >
        <Clock className="mr-2" />
        <p className="font-bold">{t("badge")}</p>
      </Badge>
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        {t("title")}
      </h1>
      <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
        {t("description", { siteName: SITE_NAME })}
      </p>
    </div>
  );
};

export default NoPricingTitleMessage;
