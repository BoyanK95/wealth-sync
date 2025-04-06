import React from "react";
import FeaturesSection from "@/components/FeaturesSection";
import IntegrationSection from "@/components/IntegrationSection";

const FeaturesectionPage = () => {
  return (
    <div className="mt-10 space-y-12">
      <div className="bg-muted/50 py-12">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Connect Your Investment Accounts
            </h1>
            <p className="text-muted-foreground text-lg">
              WealthSync allows you to seamlessly connect and monitor your
              investment accounts from various stock exchanges and brokers in
              one place.
            </p>
            <div className="mt-8 grid gap-4 text-left md:grid-cols-2">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-green-800">Supported Platforms</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Trading212</li>
                  <li>• Binance</li>
                  <li>• Interactive Brokers</li>
                  <li>• More coming soon...</li>
                </ul>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-green-800">Key Benefits</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• View all your investments in one dashboard</li>
                  <li>• Track performance across platforms</li>
                  <li>• Secure read-only API connections</li>
                  <li>• Real-time portfolio updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <FeaturesSection />
        <IntegrationSection />
      </div>
    </div>
  );
};

export default FeaturesectionPage;
