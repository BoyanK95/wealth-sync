import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettingsTab from "@/components/SettingsPageComponents/AccountSettingsTab";
import PreferenceSettingsTab from "@/components/SettingsPageComponents/PreferenceSettingsTab";
import NotificationsSettingsTab from "@/components/SettingsPageComponents/NotificationsSettingsTab";
import { auth } from "@/server/auth";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className="container mt-10 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger className="cursor-pointer" value="account">
              Account
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="preferences">
              Preferences
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="notifications">
              Notifications
            </TabsTrigger>
          </TabsList>

          <AccountSettingsTab session={session!} />
          <PreferenceSettingsTab />
          <NotificationsSettingsTab />
        </Tabs>
      </div>
    </div>
  );
}
