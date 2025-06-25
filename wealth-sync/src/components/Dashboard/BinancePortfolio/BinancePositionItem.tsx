import type { BinancePosition } from "@/lib/constants/binanceAccounData.interface";
import React from "react";

const BinancePositionItem = ({ position }: { position: BinancePosition }) => {
    console.log(position);
    
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="font-medium">{position.symbol}</h3>
          <p className="text-muted-foreground text-sm">
            {position.quantity.toFixed(6)} {position.symbol}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">
          $
          {position.totalValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="text-muted-foreground text-sm">
          $
          {position.currentPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          })}
        </p>
      </div>
    </div>
  );
};

export default BinancePositionItem;
