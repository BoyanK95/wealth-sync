import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

export default async function IntegrationDocs() {
  const t = await getTranslations("DocsPage.integrations");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Trading212</h3>
            <p className="text-muted-foreground">
              {t("trading212.one")}
              <br />
              {t("trading212.two")}
              <br />
              {t("trading212.three")}
              <br />
              {t("trading212.four", { siteName: SITE_NAME })}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Binance</h3>
            <p className="text-muted-foreground">
              {t("binance.one")}
              <br />
              {t("binance.two")}
              <br />
              {t("binance.three")}
              <br />
              {t("binance.four", { siteName: SITE_NAME })}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">{t("supportedFeatures.title")}</h3>
            <p className="text-muted-foreground">
              {t("supportedFeatures.one")}
              <br />
              {t("supportedFeatures.two")}
              <br />
              {t("supportedFeatures.three")}
              <br />
              {t("supportedFeatures.four")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
