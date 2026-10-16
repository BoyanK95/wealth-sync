"use client";

import React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, Loader2, LogOut, Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Routes } from "@/lib/constants/routes";
import { signOut } from "next-auth/react";
import type { UserFormProps } from "./interfaces";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { getProfileImageUrl, updateProfile } from "@/server/actions/user";

const readImageAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      typeof reader.result === "string"
        ? resolve(reader.result)
        : reject(new Error("Could not read profile image"));
    reader.onerror = () => reject(new Error("Could not read profile image"));
    reader.readAsDataURL(file);
  });

const GeneralTab = ({ user }: UserFormProps) => {
  const t = useTranslations("ProfilePage.general");
  const router = useRouter();
  const { update: updateSession } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(user.name ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.image as string | null,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const displayableProfileImage = profileImage?.startsWith("neon-s3://")
    ? null
    : profileImage;

  useEffect(() => {
    if (!profileImage?.startsWith("neon-s3://")) return;

    let isCurrent = true;
    getProfileImageUrl()
      .then((imageUrl) => {
        if (isCurrent) setProfileImage(imageUrl);
      })
      .catch(() => {
        if (isCurrent) setProfileImage(null);
      });

    return () => {
      isCurrent = false;
    };
  }, [profileImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const supportedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!supportedTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
        toast.error("Choose a JPEG, PNG, WebP, or GIF image smaller than 5 MB");
        e.target.value = "";
        return;
      }
      setImageFile(file);
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateProfile({
        name,
        email,
        ...(imageFile ? { image: await readImageAsDataUrl(imageFile) } : {}),
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      setName(result.user.name!);
      setEmail(result.user.email!);
      setProfileImage(result.user.image);
      setImageFile(null);
      try {
        await updateSession();
      } catch (error) {
        toast.error(t("Error occured in updating session"));
        throw error;
      }

      toast.success(t("success"));
      router.refresh();
    } catch {
      toast.error(t("errors.updateFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut({
        callbackUrl: Routes.HOME,
      });
    } catch (error) {
      toast.error(t("errors.logoutFailed"), {
        description:
          error instanceof Error ? error.message : t("errors.unknown"),
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TabsContent value="general" className="mt-6">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleProfileUpdate} className="space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-32 w-32">
                <div className="bg-muted flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-green-700">
                  {displayableProfileImage ? (
                    <Image
                      src={displayableProfileImage}
                      alt="Profile"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <User className="text-muted-foreground h-16 w-16" />
                  )}
                </div>
                <label
                  htmlFor="profile-image"
                  className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-green-700 p-2 text-white transition-colors hover:bg-green-800"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">{t("uploadProfilePicture")}</span>
                </label>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">
                  {name || t("userFallback")}
                </h3>
                <p className="text-muted-foreground text-sm">{email}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("fullName")}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("fullNamePlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("emailAddress")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                disabled={isLoading}
                className="cursor-pointer hover:bg-red-600 hover:text-white dark:hover:bg-red-800"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                {t("logOut")}
              </Button>

              <Button
                variant="default"
                className="cursor-pointer hover:bg-green-800 dark:hover:text-white"
              >
                <Link href={Routes.DASHBOARD}>{t("goToDashboard")}</Link>
              </Button>
              <Button
                type="submit"
                className="cursor-pointer bg-green-700 hover:bg-green-800 dark:hover:text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {t("saveChanges")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default GeneralTab;
