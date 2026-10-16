const usdStandard = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const usdPrecise = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 6,
});
const quantityFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 8,
});

export const usd = (n: number) =>
  Math.abs(n) > 0 && Math.abs(n) < 1
    ? usdPrecise.format(n)
    : usdStandard.format(n);

export const signedUsd = (n: number) => `${n > 0 ? "+" : ""}${usd(n)}`;

export const signedPercent = (n: number) =>
  `${n > 0 ? "+" : ""}${n.toFixed(2)}%`;

export const formatQuantity = (n: number) => quantityFormat.format(n);

/** Green for up, red for down, muted for flat. */
export const trendColor = (n: number) =>
  n > 0
    ? "text-emerald-600 dark:text-emerald-400"
    : n < 0
      ? "text-rose-600 dark:text-rose-400"
      : "text-muted-foreground";
