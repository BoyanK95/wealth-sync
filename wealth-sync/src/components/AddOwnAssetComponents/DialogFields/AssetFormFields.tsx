"use client";

import { Input } from "@/components/ui/input";
import { DialogField } from "../DialogField";
import { numberInput, type AssetCategory } from "../types";
import { useTranslations } from "next-intl";

type AssetFormFieldsProps = {
  category: AssetCategory;
  initialValues?: Record<string, string>;
};

export function AssetFormFields({
  category,
  initialValues = {},
}: AssetFormFieldsProps) {
  const t = useTranslations("AddOwnAssetPage.AssetFormFields");

  const isManual = category === "realEstate" || category === "other";
  const isSavings = category === "savings";

  if (isSavings) return null;

  return (
    <div className="space-y-4">
      <DialogField
        label={isManual ? t("manualLabel") : t("notManualLabel")}
        hint={isManual ? undefined : t("notManualHint")}
      >
        <Input
          name="name"
          required={isManual}
          maxLength={100}
          defaultValue={initialValues.name}
          placeholder={
            isManual
              ? t("manualInputPlaceholder")
              : t("notManualInputPlaceholder")
          }
        />
      </DialogField>

      <div className="grid grid-cols-2 gap-3">
        <DialogField
          label={
            category === "stock"
              ? t("shares")
              : category === "metal"
                ? t("amount")
                : isManual
                  ? t("quantity")
                  : t("amount")
          }
        >
          <Input
            {...numberInput}
            name="quantity"
            required
            defaultValue={initialValues.quantity}
            placeholder={isManual ? "1" : "0.5"}
          />
        </DialogField>

        <DialogField label={t("buyPriceLabel")}>
          <Input
            {...numberInput}
            name="buyPrice"
            required
            defaultValue={initialValues.buyPrice}
            placeholder="0.00"
          />
        </DialogField>
      </div>

      {isManual && (
        <DialogField
          label={t("currentValueLabel")}
          hint={t("currentValueHint")}
        >
          <Input
            {...numberInput}
            name="currentValue"
            required
            defaultValue={initialValues.currentValue}
            placeholder="0.00"
          />
        </DialogField>
      )}

      <DialogField label={t("purchaseDateLabel")}>
        <Input
          name="purchaseDate"
          type="date"
          defaultValue={initialValues.purchaseDate}
        />
      </DialogField>

      <DialogField label={t("notesLabel")}>
        <Input
          name="notes"
          maxLength={500}
          defaultValue={initialValues.notes}
          placeholder={t("notesPlaceholder")}
        />
      </DialogField>
    </div>
  );
}
