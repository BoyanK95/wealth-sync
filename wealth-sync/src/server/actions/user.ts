"use server";

import { db } from "@/server/db";
import { auth } from "@/server/auth";
import {
  resolveProfileImage,
  uploadProfileImage,
} from "@/server/storage/profileImages";
import { updateProfileSchema } from "./schema";

export type UpdateProfileInput = {
  name: string;
  email: string;
  image?: string | null;
};

export async function getProfileImageUrl() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { image: true },
  });

  return resolveProfileImage(user?.image ?? null);
}

export async function updateProfile(data: UpdateProfileInput) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false as const, error: "Unauthorized" };
  }

  const parsed = updateProfileSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.issues[0]?.message ?? "Invalid profile details",
    };
  }

  try {
    const emailOwner = await db.user.findUnique({
      where: { email: parsed.data.email },
      select: { id: true },
    });

    if (emailOwner && emailOwner.id !== session.user.id) {
      return { success: false as const, error: "Email already in use" };
    }

    const uploadedImage = parsed.data.image
      ? await uploadProfileImage(session.user.id, parsed.data.image)
      : null;

    const user = await db.user.update({
      where: { id: session.user.id },
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        ...(uploadedImage ? { image: uploadedImage.imageRef } : {}),
      },
      select: { id: true, name: true, email: true, image: true },
    });

    return {
      success: true as const,
      user: {
        ...user,
        image: uploadedImage?.imageUrl ?? user.image,
      },
    };
  } catch (error) {
    console.error("Profile update error:", error);
    return { success: false as const, error: "Failed to update profile" };
  }
}

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
