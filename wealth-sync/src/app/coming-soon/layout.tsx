import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon | WealthSync",
  description:
    "This feature is currently under development. Stay tuned for updates!",
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
