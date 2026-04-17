import { type Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GettingStartedDocs from "@/components/DocsPageComponents/GettingStartedDocs";
import ApiDocs from "@/components/DocsPageComponents/ApiDocs";
import IntegrationDocs from "@/components/DocsPageComponents/IntegrationDocs";
import TroubleshootingDocs from "@/components/DocsPageComponents/TroubleshootingDocs";

export const metadata: Metadata = {
  title: "Documentation | WealthSync",
  description: "Learn how to use and integrate with WealthSync",
};

export default function DocsPage() {
  return (
    <div className="container mt-10 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about using and integrating with
            WealthSync
          </p>
        </div>

        <Tabs defaultValue="getting-started" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
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
