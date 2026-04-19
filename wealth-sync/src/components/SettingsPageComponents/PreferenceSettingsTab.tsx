'use client';

import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const PreferenceSettingsTab = () => {
  const t = useTranslations("SettingsPage.preferences");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  if (!mounted) {
    return null;
  }

  return (
    <TabsContent value="preferences" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            {t("appearance.title")}
          </CardTitle>
          <CardDescription>
            {t("appearance.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t("appearance.theme")}</Label>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger className="cursor-pointer">
                <SelectValue placeholder={t("appearance.selectTheme")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="light">{t("appearance.themeOptions.light")}</SelectItem>
                <SelectItem className="cursor-pointer" value="dark">{t("appearance.themeOptions.dark")}</SelectItem>
                <SelectItem className="cursor-pointer" value="system">{t("appearance.themeOptions.system")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            {t("display.title")}
          </CardTitle>
          <CardDescription>{t("display.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t("display.defaultDashboardView")}</Label>
            <Select defaultValue="overview">
              <SelectTrigger>
                <SelectValue placeholder={t("display.selectDefaultView")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">{t("display.viewOptions.overview")}</SelectItem>
                <SelectItem value="assets">{t("display.viewOptions.assets")}</SelectItem>
                <SelectItem value="transactions">{t("display.viewOptions.transactions")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default PreferenceSettingsTab;
