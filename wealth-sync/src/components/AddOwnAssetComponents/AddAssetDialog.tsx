"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, CATEGORY_LABELS, type AssetCategory } from "./types";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
    </div>
  );
}

const numberInput = {
  type: "number",
  inputMode: "decimal" as const,
  step: "any",
  min: "0",
};

export default function AddAssetDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [category, setCategory] = useState<AssetCategory>("crypto");
  const isMetal = category === "metal";
  const isManual = category === "realEstate" || category === "other";
  const isTicker = category === "crypto" || category === "stock";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add an asset</DialogTitle>
          <DialogDescription>
            Pick a category and fill in what you own.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onOpenChange(false); // nothing is saved yet
          }}
        >
          <Field label="Category">
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as AssetCategory)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {CATEGORY_LABELS[c].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {isTicker && (
            <Field
              label="Ticker"
              hint={
                category === "crypto"
                  ? "For example BTC or ETH."
                  : "US-listed stocks and ETFs, for example AAPL."
              }
            >
              <Input placeholder={category === "crypto" ? "BTC" : "AAPL"} />
            </Field>
          )}

          {isMetal && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Metal">
                <Select defaultValue="XAU">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XAU">Gold</SelectItem>
                    <SelectItem value="XAG">Silver</SelectItem>
                    <SelectItem value="XPT">Platinum</SelectItem>
                    <SelectItem value="XPD">Palladium</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Unit">
                <Select defaultValue="oz">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oz">oz (troy)</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          )}

          <Field
            label={isManual ? "Name" : "Name (optional)"}
            hint={isManual ? undefined : "Defaults to the ticker."}
          >
            <Input
              placeholder={
                isManual ? "e.g. Apartment in Sofia" : "e.g. Bitcoin"
              }
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field
              label={
                category === "stock"
                  ? "Shares"
                  : isMetal
                    ? "Amount"
                    : isManual
                      ? "Quantity"
                      : "Amount"
              }
            >
              <Input {...numberInput} placeholder={isManual ? "1" : "0.5"} />
            </Field>
            <Field label="Buy price (USD)">
              <Input {...numberInput} />
            </Field>
          </div>

          {isManual && (
            <Field
              label="Current value (USD)"
              hint="Update this any time to keep your totals accurate."
            >
              <Input {...numberInput} />
            </Field>
          )}

          <Field label="Purchase date (optional)">
            <Input type="date" />
          </Field>

          <Field label="Notes (optional)">
            <Input maxLength={500} />
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer bg-green-700 hover:bg-green-800"
            >
              Add asset
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
