import Link from "next/link";
import { Clock, Heart, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function NoPricingSection() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center space-y-8 text-center mt-7">
      {/* Main Message */}
      <div className="space-y-4">
        <Badge
          variant="outline"
          className="border-green-700 px-4 py-2 text-green-700"
        >
          <Clock className="mr-2 h-4 w-4" />
          No Pricing Yet
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          We&apos;re Still Figuring It Out
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          WealthSync is completely free while we build the perfect product and
          determine fair pricing that works for everyone.
        </p>
      </div>

      {/* Current Status */}
      <Card className="w-full max-w-2xl border-2 border-green-700">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Heart className="h-8 w-8 text-green-700" />
          </div>
          <CardTitle className="text-2xl">100% Free Right Now</CardTitle>
          <CardDescription className="text-lg">
            All features, no limits, no credit card required
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-green-700"></div>
              <span className="text-sm">Unlimited portfolio tracking</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-green-700"></div>
              <span className="text-sm">All exchange integrations</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-green-700"></div>
              <span className="text-sm">Advanced analytics</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-green-700"></div>
              <span className="text-sm">Full customer support</span>
            </div>
          </div>

          <div className="pt-4">
            <Button
              size="lg"
              className="w-full bg-green-700 hover:bg-green-800"
              asChild
            >
              <Link href="/auth/register">Get Started Free</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Why No Pricing */}
      <div className="grid w-full gap-6 md:grid-cols-3">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-blue-700" />
            </div>
            <CardTitle className="text-lg">Building Community</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              We want to build a strong user base and understand what features
              matter most before introducing pricing.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Zap className="h-6 w-6 text-purple-700" />
            </div>
            <CardTitle className="text-lg">Perfecting Features</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              We&apos;re focused on building the best possible product. Pricing will
              come when we deliver exceptional value.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <Heart className="h-6 w-6 text-orange-700" />
            </div>
            <CardTitle className="text-lg">Fair Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              When we do introduce pricing, it will be fair, transparent, and
              provide clear value for what you pay.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <div className="w-full max-w-2xl space-y-4">
        <h3 className="text-xl font-semibold">Our Approach</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-700">
              <span className="text-xs font-bold text-white">1</span>
            </div>
            <div>
              <p className="font-medium">Build & Learn</p>
              <p className="text-muted-foreground text-sm">
                Keep everything free while we develop features and learn from
                user feedback
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-muted mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
              <span className="text-muted-foreground text-xs font-bold">2</span>
            </div>
            <div>
              <p className="font-medium">Research & Plan</p>
              <p className="text-muted-foreground text-sm">
                Study user needs and market conditions to design fair pricing
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-muted mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
              <span className="text-muted-foreground text-xs font-bold">3</span>
            </div>
            <div>
              <p className="font-medium">Transparent Launch</p>
              <p className="text-muted-foreground text-sm">
                Announce pricing well in advance with grandfathered benefits for
                early users
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Us Decide */}
      <Card className="w-full max-w-2xl border-green-200 bg-green-50">
        <CardHeader className="text-center">
          <CardTitle className="text-green-800">
            Help Us Shape Our Pricing
          </CardTitle>
          <CardDescription className="text-green-700">
            Your input matters! Let us know what you think about pricing for
            investment tracking tools.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              className="flex-1 border-green-700 bg-transparent text-green-700 hover:bg-green-50"
              asChild
            >
              <Link href="/about">Share Feedback</Link>
            </Button>
            <Button className="flex-1 bg-green-700 hover:bg-green-800" asChild>
              <Link href="/auth/register">Start Using Free</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Promise */}
      <div className="bg-muted/50 w-full max-w-2xl rounded-lg p-6">
        <h3 className="mb-2 font-semibold">Our Promise</h3>
        <p className="text-muted-foreground text-sm">
          When we do introduce pricing, early users will receive advance notice,
          grandfathered rates, and special benefits. We believe in rewarding the
          people who help us build WealthSync.
        </p>
      </div>
    </div>
  );
}
