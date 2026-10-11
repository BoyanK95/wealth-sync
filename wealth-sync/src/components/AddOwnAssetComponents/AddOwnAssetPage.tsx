"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetSummaryCards from "./AssetSummaryCarts";
import { CATEGORIES, CATEGORY_LABELS, type Asset, type AssetCategory } from "./types";
import { MOCK_ASSETS } from "./mockData";
import AssetsEmptyState from "./AssetEmptyState";
import AssetRow from "./AssetRow";
import AddAssetDialog from "./AddAssetDialog";

type Tab = "all" | AssetCategory;

export default function AddYourOwnAssetPage({
  assets = MOCK_ASSETS,
}: {
  assets?: Asset[];
}) {
  const [tab, setTab] = useState<Tab>("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const visible =
    tab === "all" ? assets : assets.filter((a) => a.category === tab);

  const totalValue = visible.reduce((s, a) => s + a.quantity * a.currentPrice, 0) as number;
  const totalCost = visible.reduce((s, a) => s + a.quantity * a.buyPrice, 0) as number;
  const gainLoss = totalValue - totalCost;

  return (
    <div className="space-y-6 mt-23">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My assets</h1>
          <p className="text-muted-foreground mt-1">
            Track crypto, stocks, precious metals, real estate and anything else
            you own.
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="cursor-pointer bg-green-700 hover:bg-green-800 dark:hover:text-white "
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Add asset
        </Button>
      </div>

      {assets.length > 0 && (
        <AssetSummaryCards
          totalValue={totalValue}
          gainLoss={gainLoss}
          gainLossPercent={totalCost > 0 ? (gainLoss / totalCost) * 100 : null}
          assetCount={visible.length}
        />
      )}

      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
        <TabsList className="h-auto flex-wrap justify-start">
          <TabsTrigger value="all" className="cursor-pointer">
            All ({assets.length})
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
    </div>
  );
}