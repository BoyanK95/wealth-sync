import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { auth } from "@/server/auth";
import Link from "next/link";
import { Routes } from "@/lib/constants/routes";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

const ActionSection = async () => {
  const t = await getTranslations("ActionSection");
  const session = await auth();

  return (
    <section className="flex w-full justify-center bg-green-700 dark:bg-green-900 py-12 text-white md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              {t("title")}
            </h2>
            <p className="max-w-[600px] text-green-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("description", { siteName: SITE_NAME })}
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50 cursor-pointer"
            >
              {session?.user ? (
                <Link href={Routes.DASHBOARD}>{t("goToDashboard")}</Link>
              ) : (
                <Link href={Routes.LOGIN}>{t("getStarted")}</Link>
              )}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionSection;
