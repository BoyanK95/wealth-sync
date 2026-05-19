'use client';

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
    <Card className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
      <CardHeader className="text-xl font-semibold">
        <CardTitle>{result.name ?? result.symbol ?? "Asset info"}</CardTitle>
        {result.logo && (
          <Image
            src={result.logo ?? "/default-image.png"}
            alt={result.name ?? result.symbol ?? "Asset image"}
            width={64}
            height={64}
            className="ml-4 rounded-full"
          />
        )}
      </CardHeader>
      <CardDescription className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {result.description ?? "No description available."}
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
                Daily % change :{result.quote.d > 0 ? "+" : ""}
                {result.quote.d} ({result.quote.dp?.toFixed(2)}%)
              </p>
            )}
            {result.quote.h && result.quote.l && (
              <p className="text-sm text-slate-500">
                High: ${result.quote.h.toFixed(2)} | Low: $
                {result.quote.l.toFixed(2)}
              </p>
            )}
            {result.quote.o && result.quote.o !== null && (
              <p className="text-sm text-slate-500">
                Open: ${result.quote.o.toFixed(2)}
              </p>
            )}
            {result.quote.pc && result.quote.pc !== null && (
              <p className="text-sm text-slate-500">
                Previous Close: ${result.quote.pc.toFixed(2)}
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
