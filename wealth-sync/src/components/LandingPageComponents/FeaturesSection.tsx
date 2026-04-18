import React from "react";
import {
  BarChart3,
  LineChart,
  PieChart,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

const FeaturesSection = async () => {
  const t = await getTranslations("FeaturesSection");

  return (
    <section
      id="features"
      className="bg-muted/50 flex w-full justify-center py-8"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
              {t("badge")}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              {t("title")}
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("description")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <LineChart className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold">{t("items.performance.title")}</h3>
            <p className="text-muted-foreground text-center">
              {t("items.performance.description")}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <PieChart className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold">{t("items.allocation.title")}</h3>
            <p className="text-muted-foreground text-center">
              {t("items.allocation.description")}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <BarChart3 className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold">{t("items.analytics.title")}</h3>
            <p className="text-muted-foreground text-center">
              {t("items.analytics.description")}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <Shield className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold">{t("items.security.title")}</h3>
            <p className="text-muted-foreground text-center">
              {t("items.security.description")}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <Zap className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold">{t("items.realtime.title")}</h3>
            <p className="text-muted-foreground text-center">
              {t("items.realtime.description")}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <Smartphone className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold">{t("items.mobile.title")}</h3>
            <p className="text-muted-foreground text-center">
              {t("items.mobile.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
