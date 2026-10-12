"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AssetForm, type AddAssetFormData } from "./AssetForm";

type AddAssetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddAssetDialog({
  open,
  onOpenChange,
}: AddAssetDialogProps) {
  function handleSubmit(data: AddAssetFormData) {
    // TODO: Validate and persist the asset through your server action/API.
    console.log("Submitting asset:", data);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add an asset</DialogTitle>
          <DialogDescription>
            Choose an asset category and enter its details.
          </DialogDescription>
        </DialogHeader>

        <AssetForm
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
