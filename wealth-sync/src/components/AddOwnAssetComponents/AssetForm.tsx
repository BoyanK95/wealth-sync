"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
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
import { AssetFormFields } from "./DialogFields/AssetFormFields";
import { useTranslations } from "next-intl";
import LoadingCircle from "../Common/LoadingCircle";

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
  onSubmit: (data: AddAssetFormData) => void | Promise<void>;
  pending?: boolean;
  initialCategory?: AssetCategory;
  initialValues?: Record<string, string>;
  submitLabel?: string;
};

export function AssetForm({
  onCancel,
  onSubmit,
  pending = false,
  initialCategory = "crypto",
  initialValues = {},
  submitLabel,
}: AssetFormProps) {
  const t = useTranslations("AddOwnAssetPage.AssetForm");

  const [category, setCategory] = useState<AssetCategory>(initialCategory);
  const [savings, setSavings] = useState<SavingsFormValues>(() => ({
    ...initialSavings,
    accountType: initialValues.accountType ?? initialSavings.accountType,
    institution: initialValues.institution ?? initialSavings.institution,
    currency: initialValues.currency ?? initialSavings.currency,
    balance: initialValues.balance ?? initialSavings.balance,
    interestRate: initialValues.interestRate ?? initialSavings.interestRate,
    maturityDate: initialValues.maturityDate ?? initialSavings.maturityDate,
  }));

  const isSavings = category === "savings";
  const isTicker = category === "crypto" || category === "stock";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSavings) {
      if (!savings.balance || Number(savings.balance) < 0) return;

      try {
        await onSubmit({
          category,
          values: { ...savings },
        });
        return;
      } catch (error) {
        throw error;
      }
    }

    const formData = new FormData(e.currentTarget);
    try {
      await onSubmit({
        category,
        values: Object.fromEntries(formData.entries()),
      });
    } catch (error) {
      throw error;
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <DialogField label={t("categoryLabel")}>
        <Select
          value={category}
          onValueChange={(value) => setCategory(value as AssetCategory)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((item) => (
              <SelectItem className="hover:bg-muted/70" key={item} value={item}>
                {CATEGORY_LABELS[item].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </DialogField>

      {isTicker && (
        <TickerField category={category} defaultValue={initialValues.ticker} />
      )}

      {isSavings && <SavingsFields values={savings} onChange={setSavings} />}

      {category === "metal" && (
        <MetalFields
          defaultMetal={initialValues.metal}
          defaultUnit={initialValues.unit}
        />
      )}

      {!isSavings && (
        <AssetFormFields category={category} initialValues={initialValues} />
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t("cancelButton")}
        </Button>
        <Button
          type="submit"
          disabled={pending}
          className={
            pending
              ? "bg-gray-400 disabled:cursor-not-allowed"
              : "bg-green-700 hover:bg-green-800 hover:text-white"
          }
        >
          {pending && <LoadingCircle />}
          {submitLabel ?? t("addAssetButton")}
        </Button>
      </div>
    </form>
  );
}
