import type React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

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

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/auth/login");
  }

  return <div className="flex min-h-screen flex-col">{children}</div>;
}
