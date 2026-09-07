import React from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import Link from "next/link";
import { Routes } from "@/lib/constants/routes";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

const ContactFooter = async () => {
  const t = await getTranslations("ContactPage.footer");
  const session = await auth();

  return (
    <div className="mt-8 space-y-4 rounded-lg border border-green-100 bg-green-50 p-6 text-center dark:bg-green-800">
      <h3 className="text-xl font-bold text-green-800 dark:text-gray-100">
        {t("title")}
      </h3>
      <p className="mx-auto max-w-2xl text-green-700 dark:text-gray-300">
        {t("description", { siteName: SITE_NAME })}
      </p>
      {session?.user ? (
        <Button className="bg-green-700 hover:bg-green-800 dark:bg-gray-200 dark:hover:text-white dark:hover:bg-green-900 border border-white ">
          <Link href={Routes.DASHBOARD}>{t("goToDashboard")}</Link>
        </Button>
      ) : (
        <Button className="bg-green-700 hover:bg-green-800">
          <Link href={Routes.LOGIN}>{t("getStarted", { siteName: SITE_NAME })}</Link>
        </Button>
      )}
    </div>
  );
};

export default ContactFooter;
