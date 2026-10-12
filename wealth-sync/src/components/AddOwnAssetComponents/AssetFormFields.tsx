import { Input } from "@/components/ui/input";
import { DialogField } from "./DialogField";
import { numberInput, type AssetCategory } from "./types";

type AssetFormFieldsProps = {
  category: AssetCategory;
};

export function AssetFormFields({ category }: AssetFormFieldsProps) {
  const isManual = category === "realEstate" || category === "other";
  const isSavings = category === "savings";

  if (isSavings) return null;

  return (
    <div className="space-y-4">
      <DialogField
        label={isManual ? "Name" : "Name (optional)"}
        hint={isManual ? undefined : "Defaults to the ticker or asset name."}
      >
        <Input
          name="name"
          required={isManual}
          maxLength={100}
          placeholder={isManual ? "e.g. Apartment in Sofia" : "e.g. Bitcoin"}
        />
      </DialogField>

      <div className="grid grid-cols-2 gap-3">
        <DialogField
          label={
            category === "stock"
              ? "Shares"
              : category === "metal"
                ? "Amount"
                : isManual
                  ? "Quantity"
                  : "Amount"
          }
        >
          <Input
            {...numberInput}
            name="quantity"
            required
            placeholder={isManual ? "1" : "0.5"}
          />
        </DialogField>

        <DialogField label="Buy price (USD)">
          <Input {...numberInput} name="buyPrice" required placeholder="0.00" />
        </DialogField>
      </div>

      {isManual && (
        <DialogField
          label="Current value (USD)"
          hint="Update this value to keep your portfolio totals accurate."
        >
          <Input
            {...numberInput}
            name="currentValue"
            required
            placeholder="0.00"
          />
        </DialogField>
      )}

      <DialogField label="Purchase date (optional)">
        <Input name="purchaseDate" type="date" />
      </DialogField>

      <DialogField label="Notes (optional)">
        <Input name="notes" maxLength={500} placeholder="Add a note..." />
      </DialogField>
    </div>
  );
}
