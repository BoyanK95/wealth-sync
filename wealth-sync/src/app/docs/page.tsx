import { type Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GettingStartedDocs from "@/components/DocsPageComponents/GettingStartedDocs";
import ApiDocs from "@/components/DocsPageComponents/ApiDocs";
import IntegrationDocs from "@/components/DocsPageComponents/IntegrationDocs";
import TroubleshootingDocs from "@/components/DocsPageComponents/TroubleshootingDocs";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Documentation | WealthSync",
  description: "Learn how to use and integrate with WealthSync",
};

export default async function DocsPage() {
  const t = await getTranslations("DocsPage");

  return (
    <div className="container mt-10 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground text-lg">
            {t("description", { siteName: SITE_NAME })}
          </p>
        </div>

        <Tabs defaultValue="getting-started" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="getting-started">{t("tabs.gettingStarted")}</TabsTrigger>
            <TabsTrigger value="api">{t("tabs.api")}</TabsTrigger>
            <TabsTrigger value="integrations">{t("tabs.integrations")}</TabsTrigger>
            <TabsTrigger value="troubleshooting">{t("tabs.troubleshooting")}</TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started">
            <GettingStartedDocs />
          </TabsContent>

          <TabsContent value="api">
            <ApiDocs />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationDocs />
          </TabsContent>

          <TabsContent value="troubleshooting">
            <TroubleshootingDocs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
