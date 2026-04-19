import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart } from "lucide-react";
import { getTranslations } from "next-intl/server";

const FairPricingCard = async () => {
  const t = await getTranslations("NoPricingSection.cards.pricing");

  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
          <Heart className="h-6 w-6 text-orange-700" />
        </div>
        <CardTitle className="text-lg">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{t("description")}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FairPricingCard;
