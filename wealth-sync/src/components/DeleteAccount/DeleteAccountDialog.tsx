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
  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await deleteAccount();
      await signOut({ callbackUrl: Routes.HOME });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to delete account", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove all your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:cursor-pointer hover:text-white dark:hover:bg-red-800"
          >
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountDialog;
