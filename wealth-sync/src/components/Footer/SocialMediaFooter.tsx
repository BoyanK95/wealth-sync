// src/components/LandingPage/SocialMediaFooter.tsx
import React from "react";
import Link from "next/link";
import { socialLinks } from "@/lib/constants/socialMedialLinks";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

const SocialMediaFooter = async () => {
  const t = await getTranslations("Footer");

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm pt-7 text-slate-400">{t("followUs")}</p>
        <div className="flex gap-6">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="transition-colors dark:text-white/70 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon size={24} />
            </Link>
          ))}
        </div>
        <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
          {t("copyright", { year: "2023", siteName: SITE_NAME })}
        </p>
      </div>
    </div>
  );
};

export default SocialMediaFooter;
