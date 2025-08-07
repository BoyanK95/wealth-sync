import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect MetaMask | WealthSync",
  description:
    "Connect your MetaMask wallet to track your Ethereum and token holdings in WealthSync.",
};

export default function MetaMaskConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
