"use client";

import React from "react";

import { useState } from "react";
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

const GeneralTab = ({ user }: UserFormProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(user.name ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.image as string | null,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
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
      //TODO : Implement profile update logic
      // In a real application, you would upload the image and update profile info
      // This is a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      toast.success("Profile updated successfully");

      // Refresh the page to show updated data
      router.refresh();
    } catch (error) {
      toast.error("Failed to update profile");
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
      toast.error("Failed to logout", {
        description: error instanceof Error ? error.message : "Unknown error",
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
                  {profileImage ? (
                    <Image
                      src={profileImage || "/profile-picture.png"}
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
                  <span className="sr-only">Upload profile picture</span>
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
                <h3 className="text-lg font-medium">{user.name ?? "User"}</h3>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
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
                Log Out
              </Button>

              <Button
                variant="default"
                className="cursor-pointer hover:bg-green-800 dark:hover:text-white"
              >
                <Link href={Routes.DASHBOARD}>Go to Dashboard</Link>
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
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default GeneralTab;
