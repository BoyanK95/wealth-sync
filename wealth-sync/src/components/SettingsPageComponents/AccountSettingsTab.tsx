"use client";

import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Settings2, Shield, User } from "lucide-react";
import type { Session } from "next-auth";
import DeleteAccountDialog from "../DeleteAccount/DeleteAccountDialog";
import { useTranslations } from "next-intl";
import GeneralTab from "../ProfilePageComponents/GeneralTab";

const AccountSettingsTab = ({ session }: { session: Session }) => {
  const t = useTranslations("SettingsPage.account");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <TabsContent value="general" className="space-y-6">
      <Card>
        <GeneralTab user={session.user} />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t("security.title")}
          </CardTitle>
          <CardDescription>{t("security.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="2fa">{t("security.twoFactor")}</Label>
            <Switch id="2fa" />
          </div>
          <Button className="cursor-pointer" variant="outline">
            {t("security.changePassword")}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            {t("danger.title")}
          </CardTitle>
          <CardDescription>{t("danger.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="cursor-pointer"
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              t("danger.deleteAccount")
            )}
          </Button>
        </CardContent>
      </Card>

      <DeleteAccountDialog
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        setIsLoading={setIsLoading}
      />
    </TabsContent>
  );
};

export default AccountSettingsTab;
