"use client";

import { Input } from "@/components/ui/input";
import { DialogField } from "../DialogField";
import { useTranslations } from "next-intl";

type TickerFieldProps = {
  category: "crypto" | "stock";
};

export function TickerField({ category }: TickerFieldProps) {
  const t = useTranslations("AddOwnAssetPage.TickerField");
  const isCrypto = category === "crypto";

  return (
    <DialogField
      label="Ticker"
      hint={
        isCrypto
          ? t('cryptoExample')
          : t('stockExample')
      }
    >
      <Input
        name="ticker"
        required
        placeholder={isCrypto ? "BTC" : "AAPL"}
        maxLength={20}
      />
    </DialogField>
  );
}
