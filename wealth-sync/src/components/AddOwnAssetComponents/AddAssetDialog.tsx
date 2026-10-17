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

      onAssetAdded?.(await getOwnAssets());
      toast.success('Asset added successfully!')
      onOpenChange(false);
    } catch (error) {
      setError(`An error occured  ${String(error)}`);
      toast.error(`An error occured ${String(error)}`)
      throw error;
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <AssetForm
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
          pending={pending}
        />
        {error && <ErrorState title={error} />}
      </DialogContent>
    </Dialog>
  );
}
