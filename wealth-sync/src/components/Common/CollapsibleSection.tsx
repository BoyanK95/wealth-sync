"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

type CollapsibleSectionProps = {
  title?: string;
  description?: string;
  headerChildren?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  enabled?: boolean;
};

export function CollapsibleSection({
  title,
  description,
  headerChildren,
  children,
  defaultOpen = false,
  enabled = true,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  const isOpen = enabled && open;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={(nextOpen) => {
        if (enabled) setOpen(nextOpen);
      }}
    >
      <CollapsibleTrigger
        disabled={!enabled}
        className="hover:bg-muted/50 flex w-full cursor-pointer items-center justify-between rounded-md border p-3 text-left disabled:cursor-not-allowed disabled:opacity-50"
      >
        <div className="min-w-0 flex-1 space-y-1">
          {headerChildren ?? (
            <>
              <p className="text-sm font-medium">{title}</p>
              {description && (
                <p className="text-muted-foreground text-xs">{description}</p>
              )}
            </>
          )}
        </div>

        <ChevronDown
          className={`h-7 w-7 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="pt-4">{children}</CollapsibleContent>
    </Collapsible>
  );
}
