import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export default async function TroubleshootingDocs() {
  const t = await getTranslations("DocsPage.troubleshooting");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">{t("connectionIssues.title")}</h3>
            <p className="text-muted-foreground">
              {t("connectionIssues.lead")}
              <br />
              {t("connectionIssues.one")}
              <br />
              {t("connectionIssues.two")}
              <br />
              {t("connectionIssues.three")}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">{t("syncDelays.title")}</h3>
            <p className="text-muted-foreground">
              {t("syncDelays.lead")}
              <br />
              {t("syncDelays.one")}
              <br />
              {t("syncDelays.two")}
              <br />
              {t("syncDelays.three")}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">{t("contactSupport.title")}</h3>
            <p className="text-muted-foreground">
              {t("contactSupport.lead")}
              <br />
              {t("contactSupport.one")}
              <br />
              {t("contactSupport.two")}
              <br />
              {t("contactSupport.three")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
