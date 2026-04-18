"use client";

import type React from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralTab from "./GeneralTab";
import type { UserFormProps } from "./interfaces";
import SecurityTab from "./SecurityTab";
import { useTranslations } from "next-intl";

export default function ProfileForm({ user }: UserFormProps) {
  const t = useTranslations("ProfilePage.tabs");
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="general">{t("general")}</TabsTrigger>
        <TabsTrigger value="security">{t("security")}</TabsTrigger>
      </TabsList>
      <GeneralTab user={user} />
      <SecurityTab />
    </Tabs>
  );
}
