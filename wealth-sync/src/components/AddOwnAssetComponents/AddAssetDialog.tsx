"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AssetForm, type AddAssetFormData } from "./AssetForm";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  createOwnAsset,
  getOwnAssets,
  updateOwnAsset,
} from "@/server/actions/assets";
import type { Asset } from "./types";
import ErrorState from "../Common/ErrorState";
import { toast } from "sonner";

type AddAssetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssetAdded?: (assets: Asset[]) => void;
  asset?: Asset | null;
};

export default function AddAssetDialog({
  open,
  onOpenChange,
  onAssetAdded,
  asset = null,
}: AddAssetDialogProps) {
  const t = useTranslations("AddOwnAssetPage.Dialog");

  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const details = asset?.details ?? {};
  const initialValues: Record<string, string> = asset
    ? {
        name: asset.name,
        ticker: asset.symbol ?? "",
        metal: asset.symbol ?? "XAU",
        quantity: String(asset.quantity),
        unit: asset.unit,
        buyPrice: String(asset.buyPrice),
        currentValue: String(asset.quantity * asset.currentPrice),
        purchaseDate: asset.purchaseDate ?? "",
        notes: asset.notes ?? "",
        accountType: details.accountType ?? "savingsAccount",
        institution: asset.name,
        currency: details.currency ?? asset.unit,
        balance: String(asset.buyPrice),
        interestRate: String(asset.interestRate ?? ""),
        maturityDate: details.maturityDate ?? "",
      }
    : {};

  async function handleSubmit(data: AddAssetFormData) {
    setPending(true);
    setError(null);
    try {
      const values = {
        category: data.category,
        values: Object.fromEntries(
          Object.entries(data.values).map(([key, value]) => [
            key,
            typeof value === "object" && value !== null
              ? JSON.stringify(value)
              : String(value),
          ]),
        ),
      };
      const result = asset
        ? await updateOwnAsset(asset.id, values)
        : await createOwnAsset(values);

      if (!result.success) {
        setError(result.error);
        toast.error(`An error occurred ${result.error}`);
        setPending(false);
        return;
      }

      onOpenChange(false);
      try {
        onAssetAdded?.(await getOwnAssets());
        toast.success(
          asset ? "Asset updated successfully!" : "Asset added successfully!",
        );
      } catch (refreshError) {
        console.error("Asset list refresh failed:", refreshError);
      }
    } catch (error) {
      toast.error(`An error occurred: ${String(error)}`);
      setError(
        asset
          ? "Unable to update asset. Please try again."
          : "Unable to add asset. Please try again!",
      );
      console.error(
        asset ? "Update asset failed" : "Create asset failed",
        error,
      );
    } finally {
      setPending(false);
    }
  }

  /**
   * reset Dialog error state
   * @param next - boolean
   */
  function handleOpenChange(next: boolean) {
    if (!next) setError(null);
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{asset ? t("editTitle") : t("title")}</DialogTitle>
          <DialogDescription>
            {asset ? t("editDescription") : t("description")}
          </DialogDescription>
        </DialogHeader>

        <AssetForm
          key={open ? (asset?.id ?? "new-asset") : "closed"}
          onCancel={() => handleOpenChange(false)}
          onSubmit={handleSubmit}
          pending={pending}
          initialCategory={asset?.category}
          initialValues={initialValues}
          submitLabel={asset ? t("saveChanges") : undefined}
        />
        {error && <ErrorState title={error} />}
      </DialogContent>
    </Dialog>
  );
}
