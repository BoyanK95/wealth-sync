import type React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { Routes } from "@/lib/constants/routes";
import { PlatformConnectionProvider } from "@/lib/contexts/PlatformConnectionContext";

export const metadata: Metadata = {
  title: "Dashboard | WealthSync",
  description:
    "Manage and track your investment portfolio across multiple platforms.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect(Routes.LOGIN);
  }

  return (
    <PlatformConnectionProvider>
      <div className="flex min-h-screen flex-col">{children}</div>
    </PlatformConnectionProvider>
  );
}
