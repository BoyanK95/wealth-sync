"use server";

import { db } from "@/server/db";
import { auth } from "@/server/auth";

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
  } catch (error) {
    console.error("Error deleting account:", error);
    throw new Error("Failed to delete account");
  }
}
