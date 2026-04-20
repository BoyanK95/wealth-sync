"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import type { User } from "next-auth";
import Link from "next/link";
import { Routes } from "@/lib/constants/routes";
import { useTranslations } from "next-intl";

const UserProfileButton = ({
  session,
}: {
  session: User & {
    user: {
      name?: string | null | undefined;
      image?: string | null | undefined;
    };
  };
}) => {
  const t = useTranslations("UserProfileButton");
  const [IsOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut({ callbackUrl: Routes.HOME });
  };

  return (
    <DropdownMenu open={IsOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 cursor-pointer rounded-full"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={
                session.user.image ??
                "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              }
              alt={session.user.name ?? "User"}
            />
            <AvatarFallback>
              {session.user.name?.charAt(0) ?? "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setIsOpen(false)}>
          <Link className="w-full" href={Routes.PROFILE}>
            {t("profile")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsOpen(false)}>
          <Link className="w-full" href={Routes.SETTINGS}>
            {t("settings")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsOpen(false)}>
          <Link
            className="w-full hover:text-green-700 dark:hover:text-green-600"
            href={Routes.DASHBOARD}
          >
            {t("goToDashboard")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          variant="destructive"
          onSelect={handleSignOut}
        >
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserProfileButton;
