"use client";

import { Input } from "@/components/ui/input";
import { DialogField } from "../DialogField";
import { useTranslations } from "next-intl";

type TickerFieldProps = {
  category: "crypto" | "stock";
  defaultValue?: string;
};

export function TickerField({ category, defaultValue }: TickerFieldProps) {
  const t = useTranslations("AddOwnAssetPage.TickerField");
  const isCrypto = category === "crypto";

  return (
    <DialogField
      label={t("ticker")}
      hint={isCrypto ? t("cryptoExample") : t("stockExample")}
    >
      <Input
        name="ticker"
        required
        defaultValue={defaultValue}
        placeholder={isCrypto ? "BTC" : "AAPL"}
        maxLength={20}
      />
    </DialogField>
  );
}
