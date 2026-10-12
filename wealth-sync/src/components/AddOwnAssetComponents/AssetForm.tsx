"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CATEGORIES, CATEGORY_LABELS, type AssetCategory } from "./types";
import {
  SavingsFields,
  type SavingsFormValues,
} from "./DialogFields/SavingsFields";
import { DialogField } from "./DialogField";
import { TickerField } from "./DialogFields/TickerFields";
import { MetalFields } from "./DialogFields/MetalFields";
import { AssetFormFields } from "./AssetFormFields";

const initialSavings: SavingsFormValues = {
  accountType: "savingsAccount",
  institution: "",
  currency: "EUR",
  balance: "",
  interestRate: "",
  maturityDate: "",
};

export type AddAssetFormData = {
  category: AssetCategory;
  values: Record<string, FormDataEntryValue | string>;
};

type AssetFormProps = {
  onCancel: () => void;
  onSubmit: (data: AddAssetFormData) => void;
};

export function AssetForm({ onCancel, onSubmit }: AssetFormProps) {
  const [category, setCategory] = useState<AssetCategory>("crypto");
  const [savings, setSavings] = useState<SavingsFormValues>(initialSavings);

  const isSavings = category === "savings";
  const isTicker = category === "crypto" || category === "stock";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSavings) {
      if (!savings.balance || Number(savings.balance) < 0) return;

      onSubmit({
        category,
        values: { ...savings },
      });
      return;
    }

    const formData = new FormData(e.currentTarget);

    onSubmit({
      category,
      values: Object.fromEntries(formData.entries()),
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <DialogField label="Category">
        <Select
          value={category}
          onValueChange={(value) => setCategory(value as AssetCategory)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((item) => (
              <SelectItem key={item} value={item}>
                {CATEGORY_LABELS[item].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </DialogField>

      {isTicker && <TickerField category={category} />}

      {isSavings && <SavingsFields values={savings} onChange={setSavings} />}

      {category === "metal" && <MetalFields />}

      {!isSavings && <AssetFormFields category={category} />}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-green-700 hover:bg-green-800">
          Add asset
        </Button>
      </div>
    </form>
  );
}
