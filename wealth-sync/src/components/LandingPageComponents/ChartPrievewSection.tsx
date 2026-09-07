import React from "react";
import {
  ChartArea,
  ChartNoAxesCombined,
  ChartPie,
  ChartScatter,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

const ChartPrievewSection = async () => {
  const t = await getTranslations("ChartPreviewSection");

  return (
    <section className="bg-muted/50 w-full py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                {t("title")}
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("description")}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row"></div>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="flex flex-col gap-4">
                <div className="bg-background rounded-lg border p-2">
                  <ChartArea height={200} width={200} />
                </div>
                <div className="bg-background rounded-lg border p-2">
                  <ChartPie height={200} width={200} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-background rounded-lg border p-2">
                  <ChartNoAxesCombined height={200} width={200} />
                </div>
                <div className="bg-background rounded-lg border p-2">
                  <ChartScatter height={200} width={200} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartPrievewSection;
