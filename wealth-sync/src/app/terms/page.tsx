import { ScrollText, AlertCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

export default async function TermsPage() {
  const t = await getTranslations("TermsPage");
  return (
    <div className="container mt-10 space-y-12 py-12">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-lg">
          {t("description", { siteName: SITE_NAME })}
        </p>
      </div>

      {/* Last Updated */}
      <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
        <ScrollText className="h-4 w-4" />
        {t("lastUpdated")}
      </div>

      {/* Terms Content */}
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Agreement */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("sections.agreement.title")}</h2>
          <p className="text-muted-foreground">{t("sections.agreement.description", { siteName: SITE_NAME })}</p>
        </section>

        {/* Service Description */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("sections.service.title")}</h2>
          <p className="text-muted-foreground">{t("sections.service.description", { siteName: SITE_NAME })}</p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>{t("sections.service.items.one")}</li>
            <li>{t("sections.service.items.two")}</li>
            <li>{t("sections.service.items.three")}</li>
            <li>{t("sections.service.items.four")}</li>
          </ul>
        </section>

        {/* Account Terms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("sections.account.title")}</h2>
          <p className="text-muted-foreground">{t("sections.account.description", { siteName: SITE_NAME })}</p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>{t("sections.account.items.one")}</li>
            <li>{t("sections.account.items.two")}</li>
            <li>{t("sections.account.items.three")}</li>
            <li>{t("sections.account.items.four")}</li>
            <li>{t("sections.account.items.five")}</li>
          </ul>
        </section>

        {/* API Usage */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {t("sections.apiUsage.title")}
          </h2>
          <p className="text-muted-foreground">{t("sections.apiUsage.description", { siteName: SITE_NAME })}</p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>{t("sections.apiUsage.items.one")}</li>
            <li>{t("sections.apiUsage.items.two")}</li>
            <li>{t("sections.apiUsage.items.three")}</li>
            <li>{t("sections.apiUsage.items.four")}</li>
          </ul>
        </section>

        {/* Limitations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("sections.limitations.title")}</h2>
          <p className="text-muted-foreground">{t("sections.limitations.description", { siteName: SITE_NAME })}</p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>{t("sections.limitations.items.one")}</li>
            <li>{t("sections.limitations.items.two")}</li>
            <li>{t("sections.limitations.items.three")}</li>
            <li>{t("sections.limitations.items.four")}</li>
          </ul>
        </section>

        {/* Data Usage */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("sections.dataUsage.title")}</h2>
          <p className="text-muted-foreground">{t("sections.dataUsage.description")}</p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>{t("sections.dataUsage.items.one")}</li>
            <li>{t("sections.dataUsage.items.two")}</li>
            <li>{t("sections.dataUsage.items.three")}</li>
            <li>{t("sections.dataUsage.items.four")}</li>
          </ul>
        </section>

        {/* Termination */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("sections.termination.title")}</h2>
          <p className="text-muted-foreground">{t("sections.termination.description")}</p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>{t("sections.termination.items.one")}</li>
            <li>{t("sections.termination.items.two")}</li>
            <li>{t("sections.termination.items.three")}</li>
          </ul>
        </section>

        {/* Changes to Terms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("sections.changes.title")}</h2>
          <p className="text-muted-foreground">{t("sections.changes.description")}</p>
        </section>

        {/* Contact Information */}
        <section className="bg-muted/30 mt-12 rounded-lg p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertCircle className="text-primary h-5 w-5" />
            <h2 className="text-xl font-semibold">{t("contact.title")}</h2>
          </div>
          <p className="text-muted-foreground">
            {t("contact.description")}{" "}
            <a
              href="mailto:b.koychev95@gmail.com"
              className="text-primary hover:underline"
            >
              support@wealthsync.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
