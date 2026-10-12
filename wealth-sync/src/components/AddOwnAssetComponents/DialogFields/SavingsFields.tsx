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
  const update = (patch: Partial<SavingsFormValues>) =>
    onChange({ ...values, ...patch });

  const isTermDeposit = values.accountType === "termDeposit";

  return (
    <div className="space-y-4">
      <DialogField label="Savings type">
        <Select
          value={values.accountType}
          onValueChange={(accountType) =>
            update({ accountType, maturityDate: "" })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose savings type" />
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

      <DialogField label="Bank / institution" hint="Optional for cash savings.">
        <Input
          name="institution"
          value={values.institution}
          onChange={(e) => update({ institution: e.target.value })}
          placeholder="e.g. Revolut, Wise, DSK Bank"
          maxLength={100}
        />
      </DialogField>

      <div className="grid grid-cols-2 gap-3">
        <DialogField label="Currency">
          <Select
            value={values.currency}
            onValueChange={(currency) => update({ currency })}
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

        <DialogField label="Current balance">
          <Input
            {...numberInput}
            name="balance"
            required
            value={values.balance}
            onChange={(e) => update({ balance: e.target.value })}
            placeholder="e.g. 10000"
          />
        </DialogField>
      </div>

      <DialogField
        label="Annual interest rate (%)"
        hint="Enter the annual rate offered by your bank, e.g. 2.5."
      >
        <Input
          {...numberInput}
          name="interestRate"
          value={values.interestRate}
          onChange={(e) => update({ interestRate: e.target.value })}
          placeholder="e.g. 2.5"
        />
      </DialogField>

      {isTermDeposit && (
        <DialogField label="Maturity date" hint="When the deposit term ends.">
          <Input
            type="date"
            name="maturityDate"
            value={values.maturityDate}
            onChange={(e) => update({ maturityDate: e.target.value })}
          />
        </DialogField>
      )}
    </div>
  );
}
