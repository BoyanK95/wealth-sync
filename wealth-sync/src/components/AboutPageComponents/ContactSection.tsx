import React from "react";
import SendEmailComponent from "./SendEmailComponent";
import SocialMediaLinksCard from "./SocialMediaLinksCard";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

const ContactSection = async () => {
  const t = await getTranslations("ContactPage.contactSection");

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
      <p className="text-muted-foreground">
        {t("description", { siteName: SITE_NAME })}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <SendEmailComponent />
        <SocialMediaLinksCard />
      </div>
    </div>
  );
};

export default ContactSection;
