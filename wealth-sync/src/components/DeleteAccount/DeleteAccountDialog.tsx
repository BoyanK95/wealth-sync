"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { Routes } from "@/lib/constants/routes";
import { deleteAccount } from "@/server/actions/user";
import { useTranslations } from "next-intl";

interface IDeleteAccountProps {
  showDeleteDialog: boolean;
  setShowDeleteDialog: (showDeleteDialog: boolean) => void;
  isLoading?: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const DeleteAccountDialog = ({
  showDeleteDialog,
  setShowDeleteDialog,
  setIsLoading,
}: IDeleteAccountProps) => {
  const t = useTranslations("SettingsPage.deleteAccountDialog");
  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await deleteAccount();
      await signOut({ callbackUrl: Routes.HOME });
    } catch (error) {
      setIsLoading(false);
      toast.error(t("failed"), {
        description:
          error instanceof Error ? error.message : t("tryAgain"),
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:cursor-pointer hover:text-white dark:hover:bg-red-800"
          >
            {t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountDialog;
