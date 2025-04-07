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

const NotificationsSettingsTab = () => {
  return (
    <TabsContent value="notifications" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Configure your notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="price-alerts">Price Alerts</Label>
            <Switch id="price-alerts" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="portfolio-updates">Portfolio Updates</Label>
            <Switch id="portfolio-updates" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="security-alerts">Security Alerts</Label>
            <Switch id="security-alerts" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>
            Manage your email notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="weekly-summary">Weekly Summary</Label>
            <Switch id="weekly-summary" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="market-news">Market News</Label>
            <Switch id="market-news" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="account-activity">Account Activity</Label>
            <Switch id="account-activity" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default NotificationsSettingsTab;
