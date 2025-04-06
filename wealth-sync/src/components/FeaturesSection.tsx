import React from "react";
import {
  BarChart3,
  LineChart,
  PieChart,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="bg-muted/50 w-full py-12 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need to track your investments
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              WealthSync provides powerful tools to help you understand your
              portfolio performance across multiple platforms.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <LineChart className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold">Performance Tracking</h3>
            <p className="text-muted-foreground text-center">
              Track your investment performance over time with detailed charts
              and metrics.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <PieChart className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold">Portfolio Allocation</h3>
            <p className="text-muted-foreground text-center">
              Visualize your asset allocation across different exchanges and
              investment types.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <BarChart3 className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold">Advanced Analytics</h3>
            <p className="text-muted-foreground text-center">
              Gain insights with advanced analytics including profit/loss, ROI,
              and risk assessment.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <Shield className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold">Secure Connections</h3>
            <p className="text-muted-foreground text-center">
              Connect securely to your exchanges with read-only API access and
              bank-level encryption.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <Zap className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold">Real-time Updates</h3>
            <p className="text-muted-foreground text-center">
              Get real-time updates on your portfolio value and individual asset
              performance.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <Smartphone className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold">Mobile Access</h3>
            <p className="text-muted-foreground text-center">
              Access your portfolio data on the go with our mobile app for iOS
              and Android.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
