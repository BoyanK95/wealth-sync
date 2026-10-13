export const CATEGORIES = [
  "crypto",
  "stock",
  "metal",
  "realEstate",
  "savings",
  "other",
] as const;
export type AssetCategory = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<
  AssetCategory,
  { label: string; tab: string }
> = {
  crypto: { label: "Crypto", tab: "Crypto" },
  stock: { label: "Stock / ETF", tab: "Stocks" },
  metal: { label: "Precious metal", tab: "Metals" },
  realEstate: { label: "Real estate", tab: "Real estate" },
  savings: { label: "Savings", tab: "Savings" },
  other: { label: "Other", tab: "Other" },
};

export const numberInput = {
  type: "number",
  inputMode: "decimal" as const,
  step: "any",
  min: "0",
};

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  /** Ticker or metal code. Empty for manually valued assets. */
  symbol?: string;
  quantity: number;
  unit: string;
  buyPrice: number;
  currentPrice: number;
  interestRate?: number;
  /** Null when the asset has no live price (real estate, other). */
  changePercent: number | null;
  /** What the change covers, e.g. "24h". */
  changeLabel?: string;
}
