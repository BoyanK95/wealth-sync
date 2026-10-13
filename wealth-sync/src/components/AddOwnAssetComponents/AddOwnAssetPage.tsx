"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetSummaryCards from "./AssetSummaryCards";
import { CATEGORIES, CATEGORY_LABELS, type Asset } from "./types";
import { MOCK_ASSETS } from "./mockData";
import AssetsEmptyState from "./AssetEmptyState";
import AssetRow from "./AssetRow";
import AddAssetDialog from "./AddAssetDialog";
import { useTranslations } from "next-intl";
import { CollapsibleSection } from "../Common/CollapsibleSection";

type Tab = "all" | Asset["category"];

export default function AddYourOwnAssetPage({
  assets = MOCK_ASSETS,
}: {
  assets?: Asset[];
}) {
  const t = useTranslations("AddOwnAssetPage");

  const [tab, setTab] = useState<Tab>("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const visible =
    tab === "all" ? assets : assets.filter((a) => a.category === tab);

  const totalValue = visible.reduce<number>(
    (s, a) => s + a.quantity * a.currentPrice,
    0,
  );
  const totalCost = visible.reduce<number>(
    (s, a) => s + a.quantity * a.buyPrice,
    0,
  );
  const gainLoss = totalValue - totalCost;

  return (
    <div className="mt-23 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("description")}</p>
        </div>
        {assets.length > 0 && (
          <Button
            onClick={() => setDialogOpen(true)}
            className="cursor-pointer bg-green-700 hover:bg-green-800 dark:hover:text-white"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            {t("addAssetButton")}
          </Button>
        )}
      </div>

      {assets.length > 0 && (
        <CollapsibleSection
          headerChildren={
            <AssetSummaryCards
              totalValue={totalValue}
              gainLoss={gainLoss}
              gainLossPercent={
                totalCost > 0 ? (gainLoss / totalCost) * 100 : null
              }
              assetCount={visible.length}
            />
          }
        >
          <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
            <TabsList className="h-auto flex-wrap justify-start">
              <TabsTrigger value="all" className="cursor-pointer">
                {t("tabsTrigerHeader", { assetCount: assets.length })}
              </TabsTrigger>
              {CATEGORIES.map((c) => (
                <TabsTrigger key={c} value={c} className="cursor-pointer">
                  {CATEGORY_LABELS[c].tab} (
                  {assets.filter((a) => a.category === c).length})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {visible.length === 0 ? (
            <AssetsEmptyState
              hasAnyAssets={assets.length > 0}
              onAdd={() => setDialogOpen(true)}
            />
          ) : (
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {visible.map((asset) => (
                  <AssetRow key={asset.id} asset={asset} />
                ))}
              </AnimatePresence>
            </div>
          )}

          <AddAssetDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </CollapsibleSection>
      )}

      {assets.length === 0 && (
        <AssetsEmptyState
          hasAnyAssets={assets.length > 0}
          onAdd={() => setDialogOpen(true)}
        />
      )}
    </div>
  );
}
