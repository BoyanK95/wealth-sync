import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export default async function ApiDocs() {
  const t = await getTranslations("DocsPage.api");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">{t("authentication.title")}</h3>
            <p className="text-muted-foreground">{t("authentication.description")}</p>
            <pre className="bg-muted mt-2 rounded-md p-4">
              <code>Authorization: Bearer YOUR_API_KEY</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">{t("rateLimits.title")}</h3>
            <p className="text-muted-foreground">
              {t("rateLimits.free")}
              <br />
              {t("rateLimits.pro")}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">{t("endpoints.title")}</h3>
            <p className="text-muted-foreground">{t("endpoints.baseUrl")}</p>
            <pre className="bg-muted mt-2 rounded-md p-4">
              <code>
                GET /portfolio
                <br />
                GET /transactions
                <br />
                GET /assets
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
