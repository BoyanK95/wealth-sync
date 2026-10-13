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
};

export function CollapsibleSection({
  title,
  description,
  headerChildren,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="hover:bg-muted/50 flex w-full items-center justify-between rounded-md border p-3 text-left">
        <div>
          {headerChildren ? (
            headerChildren
          ) : (
            <>
              <p className="text-sm font-medium">{title}</p>
              {description && (
                <p className="text-muted-foreground text-xs">{description}</p>
              )}
            </>
          )}
        </div>

        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="pt-4">{children}</CollapsibleContent>
    </Collapsible>
  );
}
