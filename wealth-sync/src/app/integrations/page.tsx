import IntegrationSection from "@/components/IntegrationSection";
import { Routes } from "@/lib/constants/routes";
import { ArrowRight, Shield, RefreshCw, LineChart } from "lucide-react";
import Link from "next/link";
import { auth } from "@/server/auth";

const IntegrationPage = async () => {
  const session = await auth();

  return (
    <div className="flex w-full flex-col justify-center pt-24">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Connect Your Investment Platforms
        </h1>
        <p className="text-muted-foreground pb-2 text-lg">
          WealthSync seamlessly integrates with major trading platforms, giving
          you a unified view of all your investments in one secure dashboard.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        <div className="space-y-3 rounded-lg border p-6">
          <div className="bg-primary/10 w-fit rounded-lg p-3">
            <Shield className="text-primary h-6 w-6" />
          </div>
          <h3 className="font-semibold">Secure Connections</h3>
          <p className="text-muted-foreground text-sm">
            Read-only API access ensures your accounts remain secure while
            syncing data.
          </p>
        </div>

        <div className="space-y-3 rounded-lg border p-6">
          <div className="bg-primary/10 w-fit rounded-lg p-3">
            <RefreshCw className="text-primary h-6 w-6" />
          </div>
          <h3 className="font-semibold">Real-Time Updates</h3>
          <p className="text-muted-foreground text-sm">
            Get live updates of your portfolio performance across all connected
            platforms.
          </p>
        </div>

        <div className="space-y-3 rounded-lg border p-6">
          <div className="bg-primary/10 w-fit rounded-lg p-3">
            <LineChart className="text-primary h-6 w-6" />
          </div>
          <h3 className="font-semibold">Unified Analytics</h3>
          <p className="text-muted-foreground text-sm">
            View comprehensive analytics of your entire investment portfolio in
            one place.
          </p>
        </div>
      </div>

      <IntegrationSection />

      {/* CTA Section */}
      <div className="bg-muted/30 mx-auto max-w-3xl rounded-lg p-8 text-center">
        <h3 className="mb-4 text-xl font-semibold">
          Ready to consolidate your investments?
        </h3>
        <p className="text-muted-foreground mb-6">
          Start tracking all your investments in one place. More integrations
          are added regularly.
        </p>
        {session?.user ? (
          <Link
            href={Routes.DASHBOARD}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 transition-colors"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href={Routes.LOGIN}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 transition-colors"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default IntegrationPage;
