"use client";

import { Card, CardContent } from "@/components/ui/card";
import { signedPercent, signedUsd, trendColor, usd } from "./format";
import { useTranslations } from "next-intl";

interface AssetSummaryCardsProps {
  totalValue: number;
  gainLoss: number;
  gainLossPercent: number | null;
  assetCount: number;
}

function SummaryCard({
  label,
  value,
  sub,
  valueClassName = "",
}: {
  label: string;
  value: string;
  sub?: string;
  valueClassName?: string;
}) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          {label}
        </div>
        <div className={`mt-1.5 text-2xl font-semibold ${valueClassName}`}>
          {value}
        </div>
        {sub && (
          <div className="text-muted-foreground mt-0.5 text-xs">{sub}</div>
        )}
      </CardContent>
    </Card>
  );
}

export default function AssetSummaryCards({
  totalValue,
  gainLoss,
  gainLossPercent,
  assetCount,
}: AssetSummaryCardsProps) {
  const t = useTranslations("AddOwnAssetPage.SummaryCard");

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <SummaryCard label={t("totalValue")} value={usd(totalValue)} />
      <SummaryCard
        label={t("totalValueLoss")}
        value={signedUsd(gainLoss)}
        valueClassName={trendColor(gainLoss)}
        sub={
          gainLossPercent !== null
            ? `${signedPercent(gainLossPercent)} ${t("vsWhatYouPayed")}`
            : undefined
        }
      />
      <SummaryCard
        label={t("assetsTracked")}
        value={String(assetCount)}
        sub={t("accrosAllCategories")}
      />
    </div>
  );
}
