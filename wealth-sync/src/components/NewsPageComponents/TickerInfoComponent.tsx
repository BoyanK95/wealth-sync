import React from "react";
import type { TickerInfoType } from "./types";

export default function TickerInfoComponent({
  result,
}: {
  result: TickerInfoType;
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
      <h2 className="text-xl font-semibold">
        {result.name ?? result.symbol ?? "Asset info"}
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {result.description ?? "No description available."}
      </p>
      {result.price && (
        <p className="mt-4 text-lg font-medium">
          Current price: {result.price}
        </p>
      )}
    </div>
  );
}
