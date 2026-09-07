import { Shield, Lock, Key, Database } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

export default async function PrivacyPage() {
  const t = await getTranslations("PrivacyPage");
  return (
    <div className="container py-12 space-y-12 mt-10">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("description", { siteName: SITE_NAME })}
        </p>
      </div>

      {/* Security Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="space-y-4 p-6 rounded-lg border">
          <div className="bg-primary/10 w-fit p-3 rounded-lg">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">{t("cards.authentication.title")}</h3>
          <p className="text-muted-foreground">{t("cards.authentication.description")}</p>
        </div>

        <div className="space-y-4 p-6 rounded-lg border">
          <div className="bg-primary/10 w-fit p-3 rounded-lg">
            <Key className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">{t("cards.connections.title")}</h3>
          <p className="text-muted-foreground">{t("cards.connections.description")}</p>
        </div>

        <div className="space-y-4 p-6 rounded-lg border">
          <div className="bg-primary/10 w-fit p-3 rounded-lg">
            <Database className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">{t("cards.storage.title")}</h3>
          <p className="text-muted-foreground">{t("cards.storage.description")}</p>
        </div>

        <div className="space-y-4 p-6 rounded-lg border">
          <div className="bg-primary/10 w-fit p-3 rounded-lg">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">{t("cards.access.title")}</h3>
          <p className="text-muted-foreground">{t("cards.access.description")}</p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-muted/30 rounded-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {t("dataHandling.title")}
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>{t("dataHandling.description", { siteName: SITE_NAME })}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("dataHandling.items.one")}</li>
            <li>{t("dataHandling.items.two")}</li>
            <li>{t("dataHandling.items.three")}</li>
            <li>{t("dataHandling.items.four")}</li>
            <li>{t("dataHandling.items.five")}</li>
            <li>{t("dataHandling.items.six")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
