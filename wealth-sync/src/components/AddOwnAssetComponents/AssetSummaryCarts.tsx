import { Card, CardContent } from "@/components/ui/card";
import { signedPercent, signedUsd, trendColor, usd } from "./format";

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
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <SummaryCard label="Total value" value={usd(totalValue)} />
      <SummaryCard
        label="Total gain / loss"
        value={signedUsd(gainLoss)}
        valueClassName={trendColor(gainLoss)}
        sub={
          gainLossPercent !== null
            ? `${signedPercent(gainLossPercent)} vs. what you paid`
            : undefined
        }
      />
      <SummaryCard
        label="Assets tracked"
        value={String(assetCount)}
        sub="Across all categories"
      />
    </div>
  );
}
