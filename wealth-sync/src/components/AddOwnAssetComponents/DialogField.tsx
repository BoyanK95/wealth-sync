import { useId, type ReactNode } from "react";
import { Label } from "@/components/ui/label";

type FieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

export function DialogField({ label, hint, children }: FieldProps) {
  const id = useId();

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
    </div>
  );
}
