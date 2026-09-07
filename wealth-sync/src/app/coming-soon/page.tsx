import Link from "next/link";
import { ArrowLeft, Bell, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeAwareImage } from "@/components/ThemeImage/ThemeAwareImage";
import { Routes } from "@/lib/constants/routes";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

export const metadata = {
  title: "Coming Soon | WealthSync",
  description:
    "This feature is currently under development. Stay tuned for updates!",
};

export default async function ComingSoonPage() {
  const t = await getTranslations("ComingSoonPage");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <main className="flex-1 pt-16 pb-12">
        <div className="container max-w-4xl py-12">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="relative h-64 w-full max-w-md md:h-80">
              <ThemeAwareImage
                lightImageSrc="/coming-soon-dark.png"
                darkImageSrc="/coming-soon-white.png"
                alt="Builder working on construction"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="max-w-2xl space-y-4">
              <div className="flex items-center justify-center space-x-2 text-green-700 dark:text-green-500">
                <Hammer className="h-6 w-6" />
                <span className="text-sm font-medium tracking-wide uppercase">
                  {t("badge")}
                </span>
              </div>

              <p className="text-muted-foreground mx-auto max-w-lg text-xl">
                {t("description", { siteName: SITE_NAME })}
              </p>
            </div>

            <div className="mt-12 grid w-full max-w-3xl gap-4 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <CardTitle className="text-lg">{t("cards.analytics.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {t("cards.analytics.description")}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <span className="text-2xl">🔗</span>
                  </div>
                  <CardTitle className="text-lg">{t("cards.integrations.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {t("cards.integrations.description")}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <span className="text-2xl">📱</span>
                  </div>
                  <CardTitle className="text-lg">{t("cards.mobile.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {t("cards.mobile.description")}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Bell className="h-5 w-5 text-green-700" />
                  <span>{t("notify.title")}</span>
                </CardTitle>
                <CardDescription>
                  {t("notify.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder={t("notify.placeholder")}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    className="cursor-pointer bg-green-700 hover:bg-green-800 dark:bg-green-500 dark:hover:bg-green-600"
                  >
                    {t("notify.button")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4 pt-8 sm:flex-row">
              <Button variant="outline" asChild>
                <Link href={Routes.HOME}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("backHome")}
                </Link>
              </Button>
              <Button
                className="bg-green-700 hover:bg-green-800 dark:bg-green-500 dark:hover:bg-green-600"
                asChild
              >
                <Link href={Routes.DASHBOARD}>{t("goToDashboard")}</Link>
              </Button>
            </div>
            <Card className="w-full max-w-2xl p-12">
              <CardHeader>
                <CardTitle className="mb-6 text-xl font-semibold">
                  {t("timeline.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-4 w-4 flex-shrink-0 rounded-full bg-green-700"></div>
                    <div className="flex-1">
                      <p className="font-medium">{t("timeline.phaseOne.title")}</p>
                      <p className="text-muted-foreground text-sm">
                        {t("timeline.phaseOne.description")}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-green-700">
                      {t("timeline.phaseOne.status")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-4 w-4 flex-shrink-0 rounded-full bg-green-700"></div>
                    <div className="flex-1">
                      <p className="font-medium">{t("timeline.phaseTwo.title")}</p>
                      <p className="text-muted-foreground text-sm">
                        {t("timeline.phaseTwo.description")}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-yellow-600">
                      {t("timeline.phaseTwo.status")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-muted h-4 w-4 flex-shrink-0 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">{t("timeline.phaseThree.title")}</p>
                      <p className="text-muted-foreground text-sm">
                        {t("timeline.phaseThree.description")}
                      </p>
                    </div>
                    <span className="text-muted-foreground text-sm font-medium">
                      {t("timeline.phaseThree.status")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
