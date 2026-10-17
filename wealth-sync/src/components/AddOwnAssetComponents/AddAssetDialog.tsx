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
import { createOwnAsset, getOwnAssets } from "@/server/actions/assets";
import type { Asset } from "./types";
import ErrorState from "../Common/ErrorState";
import { toast } from "sonner";

type AddAssetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssetAdded?: (assets: Asset[]) => void;
};

export default function AddAssetDialog({
  open,
  onOpenChange,
  onAssetAdded,
}: AddAssetDialogProps) {
  const t = useTranslations("AddOwnAssetPage.Dialog");

  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(data: AddAssetFormData) {
    setPending(true);
    setError(null);
    try {
      const result = await createOwnAsset({
        category: data.category,
        values: Object.fromEntries(
          Object.entries(data.values).map(([key, value]) => [
            key,
            typeof value === "object" && value !== null
              ? JSON.stringify(value)
              : String(value),
          ]),
        ),
      });

      if (!result.success) {
        setError(result.error);
        toast.error(`An error occurred ${result.error}`);
        setPending(false);
        return;
      }

      onOpenChange(false);
      try {
        onAssetAdded?.(await getOwnAssets());
        toast.success("Asset added successfully!");
      } catch (refreshError) {
        console.error("Asset list refresh failed:", refreshError);
      }
    } catch (error) {
      toast.error(`An error occured ${String(error)}`);
      setError("Unable to add asset. Please try again!");
      console.error("Create asset failed", error);
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
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <AssetForm
          onCancel={() => handleOpenChange(false)}
          onSubmit={handleSubmit}
          pending={pending}
        />
        {error && <ErrorState title={error} />}
      </DialogContent>
    </Dialog>
  );
}
