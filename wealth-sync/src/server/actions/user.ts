"use server";

import { db } from "@/server/db";
import { auth } from "@/server/auth";
// import { redirect } from "next/navigation";
import { Routes } from "@/lib/constants/routes";
import { signOut } from "../auth";

export async function deleteAccount() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    await db.user.delete({
      where: {
        id: session.user.id,
      },
    });

    await signOut({ redirectTo: Routes.HOME });
  } catch (error) {
    console.error("Error deleting account:", error);
    throw new Error("Failed to delete account");
  }
}
