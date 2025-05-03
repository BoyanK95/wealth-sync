import type { PortfolioItem } from "@/lib/constants/portfolio212";
import React from "react";

const PositionItem = ({ item }: { item: PortfolioItem }) => {
  return (
    <div key={item.ticker} className="flex items-center justify-between">
      <div>
        <p className="font-medium">{item.ticker.split("_")[0]}</p>
        <p className="text-muted-foreground text-sm">
          {item.quantity.toFixed(2)} shares @ ${item.currentPrice}
        </p>
      </div>
      <div className="text-right">
        <p className="font-medium">
          $
          {(item.quantity * item.currentPrice).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p
          className={`text-sm ${item.ppl >= 0 ? "text-green-500" : "text-red-500"}`}
        >
          ${item.ppl.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default PositionItem;
