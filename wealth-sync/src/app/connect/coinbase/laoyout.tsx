import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect Coinbase | WealthSync",
  description:
    "Securely connect your Coinbase account to track your cryptocurrency investments in WealthSync.",
};

export default function CoinbaseConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
