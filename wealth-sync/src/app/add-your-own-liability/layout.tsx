import { Routes } from "@/lib/constants/routes";
import { auth } from "@/server/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type React from "react";

export const metadata: Metadata = {
  title: "Add Your Own Liability | WealthSync",
  description:
    "Add, edit and delete your own liability so you can track them",
};

export default async function AddYourOwnLiabilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect(Routes.LOGIN);
  }

  return <div className="flex min-h-screen flex-col">{children}</div>;
}
