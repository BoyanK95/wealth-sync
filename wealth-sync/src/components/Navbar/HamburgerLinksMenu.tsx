"use client";

import React, { useState } from "react";
import { Routes } from "@/lib/constants/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import type { User } from "@/lib/constants/user";

type HamburgerLinksMenuProps = {
  user?: User;
  isDashboard: boolean;
  linkClass: string;
};

function HamburgerLinksMenu({
  user,
  isDashboard,
  linkClass,
}: HamburgerLinksMenuProps) {
  const t = useTranslations("NavbarLinks");

  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  return (
    <>
      <Button
        className="text-foreground border md:hidden"
        onClick={() => setHamburgerMenu((prev) => !prev)}
        aria-label="Toggle menu"
        variant={"ghost"}
      >
        {hamburgerMenu ? <X size={22} /> : <Menu size={22} />}
      </Button>

      {hamburgerMenu && (
        <div className="bg-background absolute top-16 right-0 z-50 w-full border shadow-md md:hidden">
          <div className="flex flex-col space-y-4 p-4">
            <Link
              href={Routes.FEATURES}
              className={linkClass}
              onClick={() => setHamburgerMenu(false)}
            >
              {t("features")}
            </Link>

            <Link
              href={Routes.INTEGRATIONS}
              className={linkClass}
              onClick={() => setHamburgerMenu(false)}
            >
              {t("integrations")}
            </Link>

            <Link
              href={Routes.PRICING}
              className={linkClass}
              onClick={() => setHamburgerMenu(false)}
            >
              {t("pricing")}
            </Link>

            <Link
              href={Routes.NEWS}
              className={linkClass}
              onClick={() => setHamburgerMenu(false)}
            >
              {t("news")}
            </Link>

            {user && !isDashboard && (
              <Link
                className="text-muted-foreground text-sm hover:font-bold hover:text-green-700 dark:hover:text-green-600"
                href={Routes.DASHBOARD}
                onClick={() => setHamburgerMenu(false)}
              >
                {t("goToDashboard")}
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default HamburgerLinksMenu;
