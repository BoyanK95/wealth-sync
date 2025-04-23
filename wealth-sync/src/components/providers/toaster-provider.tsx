"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
          fontSize: "1rem",
          padding: "1rem",
          width: "400px",
        },
        className: "toaster-custom",
      }}
    />
  );
}
