"use client";

import { Routes } from "@/lib/constants/routes";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavbarLinks = () => {
  const t = useTranslations("NavbarLinks");
  const { data: session } = useSession();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

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
      {session?.user && !isDashboard && (
        <Link
          className="text-muted-foreground w-full text-xl hover:text-green-700 hover:shadow dark:hover:text-green-600"
          href={Routes.DASHBOARD}
        >
          {t("goToDashboard")}
        </Link>
      )}
    </div>
  );
};

export default NavbarLinks;
