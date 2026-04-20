import { Routes } from "@/lib/constants/routes";
import { auth } from "@/server/auth";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

const NavbarLinks = async () => {
  const t = await getTranslations("NavbarLinks");
  const session = await auth();

  return (
    <div className="hidden items-center space-x-6 md:flex">
      <Link
        href={Routes.FEATURES}
        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
      >
        {t("features")}
      </Link>
      <Link
        href={Routes.INTEGRATIONS}
        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
      >
        {t("integrations")}
      </Link>
      <Link
        href={Routes.PRICING}
        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
      >
        {t("pricing")}
      </Link>
      {session?.user && (
        <Link
          className="text-muted-foreground text-xl hover:shadow w-full hover:text-green-700 dark:hover:text-green-600"
          href={Routes.DASHBOARD}
        >
          {t("goToDashboard")}
        </Link>
      )}
    </div>
  );
};

export default NavbarLinks;
