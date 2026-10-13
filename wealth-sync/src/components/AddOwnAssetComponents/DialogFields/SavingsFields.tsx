"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogField } from "../DialogField";
import { numberInput } from "../types";
import { useTranslations } from "next-intl";

const SAVINGS_TYPES = [
  { value: "cash", label: "Cash savings" },
  { value: "savingsAccount", label: "Savings account" },
  { value: "termDeposit", label: "Term deposit" },
  { value: "moneyMarket", label: "Money market account" },
] as const;

const CURRENCIES = ["USD", "EUR", "BGN", "GBP"] as const;

export type SavingsFormValues = {
  accountType: string;
  institution: string;
  currency: string;
  balance: string;
  interestRate: string;
  maturityDate: string;
};

type SavingsFieldsProps = {
  values: SavingsFormValues;
  onChange: (values: SavingsFormValues) => void;
};

export function SavingsFields({ values, onChange }: SavingsFieldsProps) {
  const t = useTranslations("AddOwnAssetPage.SavingsFields");

  const handleUpdate = (patch: Partial<SavingsFormValues>) =>
    onChange({ ...values, ...patch });

  const isTermDeposit = values.accountType === "termDeposit";

  return (
    <div className="space-y-4">
      <DialogField label={t("savingsType")}>
        <Select
          value={values.accountType}
          onValueChange={(accountType) =>
            handleUpdate({ accountType, maturityDate: "" })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("chooseSavingsType")} />
          </SelectTrigger>
          <SelectContent>
            {SAVINGS_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </DialogField>

      <DialogField label={t("institution")} hint={t("institutionHint")}>
        <Input
          name="institution"
          value={values.institution}
          onChange={(e) => handleUpdate({ institution: e.target.value })}
          placeholder={t("institutionPlaceholder")}
          maxLength={100}
        />
      </DialogField>

      <div className="grid grid-cols-2 gap-3">
        <DialogField label={t("currency")}>
          <Select
            value={values.currency}
            onValueChange={(currency) => handleUpdate({ currency })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DialogField>

        <DialogField label={t("currentBalance")} hint={t("currentBalanceHint")}>
          <Input
            {...numberInput}
            name="balance"
            required
            value={values.balance}
            onChange={(e) => handleUpdate({ balance: e.target.value })}
            placeholder={t("currentBalancePlaceholder")}
          />
        </DialogField>
      </div>

      <DialogField
        label={t("annualInterestRate")}
        hint={t("annualInterestRateHint")}
      >
        <Input
          {...numberInput}
          name="interestRate"
          value={values.interestRate}
          onChange={(e) => handleUpdate({ interestRate: e.target.value })}
          placeholder={t("annualInterestRatePlaceholder")}
        />
      </DialogField>

      {isTermDeposit && (
        <DialogField label={t("maturityDate")} hint={t("maturityDateHint")}>
          <Input
            type="date"
            name="maturityDate"
            value={values.maturityDate}
            onChange={(e) => handleUpdate({ maturityDate: e.target.value })}
          />
        </DialogField>
      )}
    </div>
  );
}
