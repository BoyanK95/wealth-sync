"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Settings } from "lucide-react";
import Link from "next/link";
import { Routes } from "@/lib/constants/routes";
import { useTranslations } from "next-intl";

const DashboardWelcomeHeader = ({ userName }: { userName: string }) => {
  const t = useTranslations("DashboardWelcomeHeader");

  const refreshPage = () => {
    window.location.reload();
  };

  // Use a specific locale and format options to ensure consistency
  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col space-y-2 pt-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("welcome", { name: userName })}
        </h1>
        <p className="text-muted-foreground">
          {t("description")} {formattedDate}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          onClick={refreshPage}
          variant="outline"
          size="sm"
          className="cursor-pointer"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          {t("refresh")}
        </Button>
        <Link href={Routes.SETTINGS}>
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            {t("setting")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardWelcomeHeader;
