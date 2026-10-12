import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogField } from "../DialogField";

export function MetalFields() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <DialogField label="Metal">
        <Select name="metal" defaultValue="XAU">
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
      </DialogField>

      <DialogField label="Unit">
        <Select name="unit" defaultValue="oz">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oz">Troy oz</SelectItem>
            <SelectItem value="g">Grams</SelectItem>
            <SelectItem value="kg">Kilograms</SelectItem>
          </SelectContent>
        </Select>
      </DialogField>
    </div>
  );
}
