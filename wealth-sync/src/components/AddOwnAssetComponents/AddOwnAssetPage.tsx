"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetSummaryCards from "./AssetSummaryCards";
import { CATEGORIES, CATEGORY_LABELS, type Asset } from "./types";
import AssetsEmptyState from "./AssetEmptyState";
import AssetRow from "./AssetRow";
import AddAssetDialog from "./AddAssetDialog";
import { useTranslations } from "next-intl";
import { CollapsibleSection } from "../Common/CollapsibleSection";
import { Card } from "../ui/card";

type Tab = "all" | Asset["category"];

export default function AddYourOwnAssetPage({
  assets,
  showStats,
}: {
  assets: Asset[];
  showStats?: boolean;
}) {
  const t = useTranslations("AddOwnAssetPage");

  const [assetList, setAssetList] = useState(assets);
  const [tab, setTab] = useState<Tab>("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const visible =
    tab === "all" ? assetList : assetList.filter((a) => a.category === tab);

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
    <Card className="mt-23 space-y-6 p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("description")}</p>
        </div>
        {assetList.length > 0 && (
          <Button
            onClick={() => setDialogOpen(true)}
            className="cursor-pointer bg-green-700 hover:bg-green-800 dark:hover:text-white"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            {t("addAssetButton")}
          </Button>
        )}
      </div>

      {assetList.length > 0 && (
        <CollapsibleSection
          enabled={showStats}
          headerChildren={
            <AssetSummaryCards
              showStats={showStats}
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
                {t("tabsTrigerHeader", { assetCount: assetList.length })}
              </TabsTrigger>
              {CATEGORIES.map((c) => (
                <TabsTrigger key={c} value={c} className="cursor-pointer">
                  {CATEGORY_LABELS[c].tab} (
                  {assetList.filter((a) => a.category === c).length})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {visible.length === 0 ? (
            <AssetsEmptyState
              hasAnyAssets={assetList.length > 0}
              onAdd={() => setDialogOpen(true)}
            />
          ) : (
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {visible.map((asset) => (
                  <AssetRow
                    key={asset.id}
                    asset={asset}
                    onDeleted={(id) =>
                      setAssetList((current) =>
                        current.filter((item) => item.id !== id),
                      )
                    }
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </CollapsibleSection>
      )}

      {assetList.length === 0 && (
        <AssetsEmptyState
          hasAnyAssets={assetList.length > 0}
          onAdd={() => setDialogOpen(true)}
        />
      )}
      <AddAssetDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAssetAdded={setAssetList}
      />
    </Card>
  );
}
