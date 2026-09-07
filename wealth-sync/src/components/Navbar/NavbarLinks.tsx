"use client";

import { Routes } from "@/lib/constants/routes";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HamburgerLinksMenu from "./HamburgerLinksMenu";
import type { User } from "@/lib/constants/user";

const NavbarLinks = () => {
  const t = useTranslations("NavbarLinks");
  const { data: session } = useSession();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  const linkClass =
    "text-muted-foreground hover:text-foreground text-sm font-medium transition-colors";

  return (
    <>
      <div className="hidden items-center space-x-6 md:flex">
        <Link href={Routes.FEATURES} className={linkClass}>
          {t("features")}
        </Link>
        <Link href={Routes.INTEGRATIONS} className={linkClass}>
          {t("integrations")}
        </Link>
        <Link href={Routes.PRICING} className={linkClass}>
          {t("pricing")}
        </Link>
        <Link href={Routes.NEWS} className={linkClass}>
          {t("news")}
        </Link>

        {session?.user && !isDashboard && (
          <Link
            className="text-muted-foreground text-sm transition-colors hover:font-bold hover:text-green-700 dark:hover:text-green-600"
            href={Routes.DASHBOARD}
          >
            {t("goToDashboard")}
          </Link>
        )}
      </div>

      <HamburgerLinksMenu
        user={session?.user as User}
        isDashboard={isDashboard}
        linkClass={linkClass}
      />
    </>
  );
};

export default NavbarLinks;
