import { Input } from "@/components/ui/input";
import { DialogField } from "../DialogField";

type TickerFieldProps = {
  category: "crypto" | "stock";
};

export function TickerField({ category }: TickerFieldProps) {
  const isCrypto = category === "crypto";

  return (
    <DialogField
      label="Ticker"
      hint={
        isCrypto
          ? "For example BTC or ETH."
          : "US-listed stocks and ETFs, for example AAPL."
      }
    >
      <Input
        name="ticker"
        required
        placeholder={isCrypto ? "BTC" : "AAPL"}
        maxLength={20}
      />
    </DialogField>
  );
}
