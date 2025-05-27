"use client";

import { SessionProvider } from "next-auth/react";
import { ToasterProvider } from "@/components/providers/toaster-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <ToasterProvider />
    </SessionProvider>
  );
}
