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

export const metadata = {
  title: "Coming Soon | WealthSync",
  description:
    "This feature is currently under development. Stay tuned for updates!",
};

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
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
                  Under Construction
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                Coming Soon
              </h1>

              <p className="text-muted-foreground mx-auto max-w-lg text-xl">
                We&apos;re working hard to bring you this feature. Our team is
                building something amazing that will enhance your WealthSync
                experience.
              </p>
            </div>

            <div className="mt-12 grid w-full max-w-3xl gap-4 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <CardTitle className="text-lg">Enhanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Advanced portfolio insights and performance metrics coming
                    your way.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <span className="text-2xl">🔗</span>
                  </div>
                  <CardTitle className="text-lg">More Integrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Connect with even more exchanges and investment platforms.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <span className="text-2xl">📱</span>
                  </div>
                  <CardTitle className="text-lg">Mobile App</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Native mobile apps for iOS and Android are in development.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Bell className="h-5 w-5 text-green-700" />
                  <span>Get Notified</span>
                </CardTitle>
                <CardDescription>
                  Be the first to know when this feature launches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    className="cursor-pointer bg-green-700 hover:bg-green-800 dark:bg-green-500 dark:hover:bg-green-600"
                  >
                    Notify Me
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4 pt-8 sm:flex-row">
              <Button variant="outline" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <Button
                className="bg-green-700 hover:bg-green-800 dark:bg-green-500 dark:hover:bg-green-600"
                asChild
              >
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>

            {/* Timeline */}
            <div className="w-full max-w-2xl pt-12">
              <h3 className="mb-6 text-xl font-semibold">
                Development Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-4 w-4 flex-shrink-0 rounded-full bg-green-700"></div>
                  <div className="flex-1">
                    <p className="font-medium">Phase 1: Core Features</p>
                    <p className="text-muted-foreground text-sm">
                      Basic portfolio tracking and analytics - Completed
                    </p>
                  </div>
                  <span className="text-sm font-medium text-green-700">
                    ✓ Done
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-4 w-4 flex-shrink-0 rounded-full bg-green-700"></div>
                  <div className="flex-1">
                    <p className="font-medium">
                      Phase 2: Enhanced Integrations
                    </p>
                    <p className="text-muted-foreground text-sm">
                      More exchange connections and data sources - In Progress
                    </p>
                  </div>
                  <span className="text-sm font-medium text-yellow-600">
                    🔄 In Progress
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-muted h-4 w-4 flex-shrink-0 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Phase 3: Advanced Features</p>
                    <p className="text-muted-foreground text-sm">
                      AI insights, mobile app, and premium analytics - Coming
                      Soon
                    </p>
                  </div>
                  <span className="text-muted-foreground text-sm font-medium">
                    ⏳ Planned
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
