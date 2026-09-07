import IntegrationSection from "@/components/IntegrationPlatformsSection/IntegrationSection";
import { Routes } from "@/lib/constants/routes";
import { ArrowRight, Shield, RefreshCw, LineChart } from "lucide-react";
import Link from "next/link";
import { auth } from "@/server/auth";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

const IntegrationPage = async () => {
  const t = await getTranslations("IntegrationsPage");
  const session = await auth();

  return (
    <div className="flex w-full flex-col justify-center pt-24">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground pb-2 text-lg">
          {t("description", { siteName: SITE_NAME })}
        </p>
      </div>

      {/* Features Grid */}
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        <div className="space-y-3 rounded-lg border p-6">
          <div className="bg-primary/10 w-fit rounded-lg p-3">
            <Shield className="text-primary h-6 w-6" />
          </div>
          <h3 className="font-semibold">{t("cards.security.title")}</h3>
          <p className="text-muted-foreground text-sm">
            {t("cards.security.description")}
          </p>
        </div>

        <div className="space-y-3 rounded-lg border p-6">
          <div className="bg-primary/10 w-fit rounded-lg p-3">
            <RefreshCw className="text-primary h-6 w-6" />
          </div>
          <h3 className="font-semibold">{t("cards.realtime.title")}</h3>
          <p className="text-muted-foreground text-sm">
            {t("cards.realtime.description")}
          </p>
        </div>

        <div className="space-y-3 rounded-lg border p-6">
          <div className="bg-primary/10 w-fit rounded-lg p-3">
            <LineChart className="text-primary h-6 w-6" />
          </div>
          <h3 className="font-semibold">{t("cards.analytics.title")}</h3>
          <p className="text-muted-foreground text-sm">
            {t("cards.analytics.description")}
          </p>
        </div>
      </div>

      <IntegrationSection />

      {/* CTA Section */}
      <div className="bg-muted/30 mx-auto max-w-3xl rounded-lg p-8 text-center">
        <h3 className="mb-4 text-xl font-semibold">
          {t("cta.title")}
        </h3>
        <p className="text-muted-foreground mb-6">
          {t("cta.description")}
        </p>
        {session?.user ? (
          <Link
            href={Routes.DASHBOARD}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 transition-colors"
          >
            {t("cta.goToDashboard")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href={Routes.LOGIN}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 transition-colors"
          >
            {t("cta.getStarted")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default IntegrationPage;
