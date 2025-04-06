import type React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { Routes } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "Profile | WealthSync",
  description:
    "Manage your WealthSync profile settings and account information.",
};

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect(Routes.LOGIN);
  }

  return <>{children}</>;
}
