"use client";

import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bitcoin,
  Gem,
  Home,
  LineChart,
  Package,
  Banknote,
  Pencil,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_LABELS, type Asset, type AssetCategory } from "./types";
import {
  formatQuantity,
  signedPercent,
  signedUsd,
  trendColor,
  usd,
} from "./format";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { deleteOwnAsset } from "@/server/actions/assets";

const ICONS: Record<AssetCategory, LucideIcon> = {
  crypto: Bitcoin,
  stock: LineChart,
  metal: Gem,
  realEstate: Home,
  savings: Banknote,
  other: Package,
};

export default function AssetRow({
  asset,
  onDeleted,
  onEdit,
}: {
  asset: Asset;
  onDeleted?: (id: string) => void;
  onEdit?: (asset: Asset) => void;
}) {
  const t = useTranslations("AddOwnAssetPage.AssetRow");

  const [loading, setLoading] = useState(false);

  const Icon = ICONS[asset.category];
  const value = asset.quantity * asset.currentPrice;
  const cost = asset.quantity * asset.buyPrice;
  const gainLoss = value - cost;
  const gainLossPercent = cost > 0 ? (gainLoss / cost) * 100 : null;
  const hasChange = asset.changePercent !== null;
  const TrendIcon =
    (asset.changePercent ?? 0) < 0 ? ArrowDownRight : ArrowUpRight;

  async function deleteAsset() {
    setLoading(true);
    try {
      const result = await deleteOwnAsset(asset.id);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      onDeleted?.(asset.id);
      toast.success("Asset deleted!");
    } catch (error) {
      console.error("Delete asset failed:", error);
      toast.error("Unable to delete asset");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Card className="rounded-2xl">
        <CardContent className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1fr)_auto] sm:items-center">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50">
              <Icon className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="truncate font-semibold">{asset.name}</span>
                <Badge variant="secondary">
                  {CATEGORY_LABELS[asset.category].label}
                </Badge>
                {asset.symbol && (
                  <Badge variant="outline">{asset.symbol}</Badge>
                )}
              </div>
              <p className="text-muted-foreground mt-0.5 text-sm">
                {formatQuantity(asset.quantity)} {asset.unit}{" "}
                {asset.purchaseDate && t("boughtAt")}
                {asset.purchaseDate &&
                  new Date(asset.purchaseDate).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
              </p>
            </div>
          </div>

          <div className="text-sm">
            <div className="text-muted-foreground text-xs">{t("buyPrice")}</div>
            <div className="font-medium">{usd(asset.buyPrice)}</div>
          </div>

          {/* CurrentPrice */}
          <div className="text-sm">
            <div className="text-muted-foreground text-xs">{t("price")}</div>
            <div className="font-medium">{usd(asset.currentPrice)}</div>
            {hasChange ? (
              <span
                className={`inline-flex items-center gap-1 text-sm font-medium ${trendColor(asset.changePercent ?? 0)}`}
              >
                <TrendIcon className="h-4 w-4" />
                {signedPercent(asset.changePercent ?? 0)}
                {asset.changeLabel && (
                  <span className="text-muted-foreground text-xs font-normal">
                    {asset.changeLabel}
                  </span>
                )}
              </span>
            ) : (
              <span className="text-muted-foreground text-xs">
                {asset.category === "metal"
                  ? t("spotPrice")
                  : t("valueSetByYou")}
              </span>
            )}
          </div>

          {/* value + gain/loss */}
          <div className="text-sm sm:text-right">
            <div className="text-muted-foreground text-xs">Value</div>
            <div className="text-lg font-semibold">{usd(value)}</div>
            <span className={`text-xs font-medium ${trendColor(gainLoss)}`}>
              {signedUsd(gainLoss)}
              {gainLossPercent !== null &&
                ` (${signedPercent(gainLossPercent)})`}{" "}
              <span className="text-muted-foreground font-normal">
                {t("allTime")}
              </span>
            </span>
          </div>

          <div className="flex justify-end gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Edit ${asset.name}`}
              className="cursor-pointer"
              onClick={() => onEdit?.(asset)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Delete ${asset.name}`}
              className="text-muted-foreground cursor-pointer hover:text-rose-600"
              onClick={deleteAsset}
              disabled={loading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
