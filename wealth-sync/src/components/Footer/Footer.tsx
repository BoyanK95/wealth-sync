import { Routes } from "@/lib/constants/routes";
import { SITE_NAME } from "@/lib/constants/site";
import Link from "next/link";
import React from "react";
import { getTranslations } from "next-intl/server";
import SocialMediaFooter from "./SocialMediaFooter";

const Footer = async () => {
  const t = await getTranslations("Footer");

  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="mx-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="text-primary ml-2 flex items-center text-2xl font-bold">
          <span className="text-green-800 dark:text-green-600">{SITE_NAME}</span>
        </div>
        <SocialMediaFooter />
        <div className="flex gap-4">
          <Link
            href={Routes.TERMS}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            {t("links.terms")}
          </Link>
          <Link
            href={Routes.PRIVACY}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            {t("links.privacy")}
          </Link>
          <Link
            href={Routes.CONTACT}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            {t("links.contact")}
          </Link>
          <Link
            href={Routes.DOCS}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            {t("links.docs")}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
