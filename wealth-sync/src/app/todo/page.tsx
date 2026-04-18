import { type Metadata } from "next";
import { AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Routes } from "@/lib/constants/routes";
import { auth } from "@/server/auth";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Coming Soon | WealthSync",
  description: "This feature is currently under development.",
};

export default async function TodoPage() {
  const t = await getTranslations("TodoPage");
  const session = await auth();

  return (
    <div className="container mt-10 space-y-12 py-12">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-lg">{t("description")}</p>
      </div>

      {/* Status indicator */}
      <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
        <Clock className="h-4 w-4" />
        {t("status")}
      </div>

      {/* Main content */}
      <div className="bg-card mx-auto max-w-3xl rounded-lg border p-8 shadow-sm">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900">
            <AlertCircle className="h-8 w-8 text-amber-600 dark:text-amber-300" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{t("card.title")}</h2>
            <p className="text-muted-foreground">
              {t("card.description", { siteName: SITE_NAME })}
            </p>
          </div>

          <div className="grid w-full max-w-sm gap-4">
            {session && (
              <Button asChild>
                <Link href={Routes.DASHBOARD}>{t("returnToDashboard")}</Link>
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href={Routes.HOME}>{t("goHome")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
