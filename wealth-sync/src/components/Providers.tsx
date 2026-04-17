"use client";

import { ToasterProvider } from "@/components/providers/toaster-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import "@/lib/i18next/i18n";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        {children}
        <ToasterProvider />
      </SessionProvider>
    </ThemeProvider>
  );
}
