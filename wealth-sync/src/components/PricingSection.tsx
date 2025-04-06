import React from "react";
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react";

const PricingSection = () => {
    //TODO Add pricing logic
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that&apos;s right for you and start tracking your
              investments today.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          <div className="flex flex-col rounded-lg border p-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Basic</h3>
              <p className="text-muted-foreground">
                For individual investors getting started
              </p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold">
              $0
              <span className="text-muted-foreground ml-1 text-base font-medium">
                /month
              </span>
            </div>
            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Connect up to 2 exchanges
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Basic performance tracking
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Portfolio allocation view
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Daily updates
              </li>
            </ul>
            <Button className="mt-8" variant="outline">
              Get Started
            </Button>
          </div>
          <div className="flex flex-col rounded-lg border border-green-700 p-6 shadow-sm">
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Popular
              </div>
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="text-muted-foreground">
                For active investors with multiple accounts
              </p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold">
              $9.99
              <span className="text-muted-foreground ml-1 text-base font-medium">
                /month
              </span>
            </div>
            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Connect up to 10 exchanges
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Advanced performance metrics
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Portfolio allocation & analysis
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Real-time updates
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Mobile app access
              </li>
            </ul>
            <Button className="mt-8 bg-green-700 hover:bg-green-800">
              Get Started
            </Button>
          </div>
          <div className="flex flex-col rounded-lg border p-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="text-muted-foreground">
                For professional investors and teams
              </p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold">
              $19.99
              <span className="text-muted-foreground ml-1 text-base font-medium">
                /month
              </span>
            </div>
            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Unlimited exchange connections
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Professional analytics suite
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Advanced risk assessment
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Real-time updates
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Team collaboration features
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
                Priority support
              </li>
            </ul>
            <Button className="mt-8" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
