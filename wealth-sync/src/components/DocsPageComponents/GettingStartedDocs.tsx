import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export default async function GettingStartedDocs() {
  const t = await getTranslations("DocsPage.gettingStarted");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("quickStart.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">{t("quickStart.steps.one.title")}</h3>
            <p className="text-muted-foreground">{t("quickStart.steps.one.description")}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">{t("quickStart.steps.two.title")}</h3>
            <p className="text-muted-foreground">{t("quickStart.steps.two.description")}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">{t("quickStart.steps.three.title")}</h3>
            <p className="text-muted-foreground">{t("quickStart.steps.three.description")}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("security.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">{t("security.items.apiKey.title")}</h3>
            <p className="text-muted-foreground">{t("security.items.apiKey.description")}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">{t("security.items.twoFactor.title")}</h3>
            <p className="text-muted-foreground">{t("security.items.twoFactor.descriptionOne")}</p>
            <p className="text-muted-foreground">{t("security.items.twoFactor.descriptionTwo")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
