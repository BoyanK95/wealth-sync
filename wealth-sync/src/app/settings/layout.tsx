import type React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { Routes } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "Settings | WealthSync",
  description:
    "Settings for your WealthSync account",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect(Routes.LOGIN);
  }

  return <div className="flex min-h-screen flex-col">{children}</div>;
}
