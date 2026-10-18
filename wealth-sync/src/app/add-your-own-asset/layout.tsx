import { Routes } from "@/lib/constants/routes";
import { auth } from "@/server/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type React from "react";

export const metadata: Metadata = {
  title: "Add Your Own Assets | WealthSync",
  description:
    "Add, edit and delete your own custom asset so you can track their performance",
};

export default async function AddYourOwnAssetLayout({
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
