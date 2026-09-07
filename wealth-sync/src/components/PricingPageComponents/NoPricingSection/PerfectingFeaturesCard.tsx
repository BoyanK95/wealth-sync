import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";

const PerfectingFeaturesCard = async () => {
  const t = await getTranslations("NoPricingSection.cards.features");

  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
          <Zap className="h-6 w-6 text-purple-700" />
        </div>
        <CardTitle className="text-lg">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{t("description")}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default PerfectingFeaturesCard;
