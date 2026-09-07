import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const NotificationsSettingsTab = () => {
  const t = useTranslations("SettingsPage.notifications");
  return (
    <TabsContent value="notifications" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {t("push.title")}
          </CardTitle>
          <CardDescription>
            {t("push.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="price-alerts">{t("push.items.priceAlerts")}</Label>
            <Switch id="price-alerts" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="portfolio-updates">{t("push.items.portfolioUpdates")}</Label>
            <Switch id="portfolio-updates" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="security-alerts">{t("push.items.securityAlerts")}</Label>
            <Switch id="security-alerts" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {t("email.title")}
          </CardTitle>
          <CardDescription>
            {t("email.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="weekly-summary">{t("email.items.weeklySummary")}</Label>
            <Switch id="weekly-summary" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="market-news">{t("email.items.marketNews")}</Label>
            <Switch id="market-news" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="account-activity">{t("email.items.accountActivity")}</Label>
            <Switch id="account-activity" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default NotificationsSettingsTab;
