"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogField } from "../DialogField";
import { useTranslations } from "next-intl";

export function MetalFields({
  defaultMetal = "XAU",
  defaultUnit = "oz",
}: {
  defaultMetal?: string;
  defaultUnit?: string;
}) {
  const t = useTranslations("AddOwnAssetPage.metalFields");

  return (
    <div className="grid grid-cols-2 gap-3">
      <DialogField label={t("metal")}>
        <Select name="metal" defaultValue={defaultMetal}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="XAU">{t("gold")}</SelectItem>
            <SelectItem value="XAG">{t("silver")}</SelectItem>
            <SelectItem value="XPT">{t("platinum")}</SelectItem>
            <SelectItem value="XPD">{t("palladium")}</SelectItem>
          </SelectContent>
        </Select>
      </DialogField>

      <DialogField label={t("unit")}>
        <Select name="unit" defaultValue={defaultUnit}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oz">{t("troyOz")}</SelectItem>
            <SelectItem value="g">{t("gram")}</SelectItem>
            <SelectItem value="kg">{t("kilogram")}</SelectItem>
          </SelectContent>
        </Select>
      </DialogField>
    </div>
  );
}
