"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TickerInfoType } from "./types";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function TickerInfoComponent({
  result,
}: {
  result: TickerInfoType;
}) {
  const t = useTranslations("NewsPage.TickerInfo");

  return (
    <Card className="rounded-3xl border border-gray-200 bg-white/80 p-6 text-center shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
      <CardHeader className="flex flex-col-reverse items-center justify-center text-xl font-semibold">
        <CardTitle>{result.name ?? result.symbol ?? t("title")}</CardTitle>
        {result.logo && (
          <Image
            src={result.logo ?? "/default-image.png"}
            alt={result.name ?? result.symbol ?? t("assetLogo")}
            width={64}
            height={64}
            className="m-4 rounded-full bg-gray-100 object-contain dark:bg-gray-700"
          />
        )}
      </CardHeader>
      <CardDescription className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
        <p>{result.description ?? "No description available."}</p>
        {result.price && (
          <p className="mt-4 text-lg font-medium">
            {t("currentPrice")}: {result.price}
          </p>
        )}
        {result.quote && (
          <div className="mt-4 space-y-2">
            {result.quote.d !== undefined && (
              <p
                className={`text-sm font-medium ${
                  result.quote.d < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {t("dailyChange")}: {result.quote.d > 0 ? "+" : ""}
                {result.quote.d} ({result.quote.dp?.toFixed(2)}%)
              </p>
            )}
            {result.quote.h && result.quote.l && (
              <p className="text-sm text-slate-500">
                {t("high")}: ${result.quote.h.toFixed(2)} | {t("low")}: $
                {result.quote.l.toFixed(2)}
              </p>
            )}
            {result.quote.o && result.quote.o !== null && (
              <p className="text-sm text-slate-500">
                {t("open")}: ${result.quote.o.toFixed(2)}
              </p>
            )}
            {result.quote.pc && result.quote.pc !== null && (
              <p className="text-sm text-slate-500">
                {t("previousClose")}: ${result.quote.pc.toFixed(2)}
              </p>
            )}
          </div>
        )}
        {result.ipo && (
          <p className="mt-2 text-sm text-slate-500">
            {t("ipoDate")}: {new Date(result.ipo).toLocaleDateString()}
          </p>
        )}
      </CardDescription>
    </Card>
  );
}
