"use client";
import type React from "react";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const SecurityTab = () => {
  const t = useTranslations("ProfilePage.security");
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error(t("errors.passwordMismatch"));
      return;
    }
    setIsLoading(true);
    try {
      //TODO : Implement password update logic
      // In a real application, you would verify the current password and update to the new one
      // This is a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      toast.success(t("success"));

      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(t("errors.updateFailed"), {
        description: t("errors.checkPassword"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TabsContent value="security" className="mt-6">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handlePasswordUpdate} className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">{t("newPassword")}</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t("newPasswordPlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t("confirmPasswordPlaceholder")}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-800 cursor-pointer disabled:cursor-not-allowed"
                disabled={
                  isLoading ||
                  !newPassword ||
                  !confirmPassword
                }
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {t("updatePassword")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SecurityTab;
