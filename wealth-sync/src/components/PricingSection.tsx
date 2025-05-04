import React from "react";
import PricingCard from "@/components/PricingCard";

const PricingSection = () => {
  //TODO add Pricing logic with STRIPE
  const pricingPlans = [
    {
      title: "Basic",
      description: "For individual investors getting started",
      price: "$0",
      period: "/month",
      features: [
        { text: "Connect up to 2 exchanges" },
        { text: "Basic performance tracking" },
        { text: "Portfolio allocation view" },
        { text: "Daily updates" }
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    },
    {
      title: "Pro",
      description: "For active investors with multiple accounts",
      price: "$5.99",
      period: "/month",
      features: [
        { text: "Connect up to 10 exchanges" },
        { text: "Advanced performance metrics" },
        { text: "Portfolio allocation & analysis" },
        { text: "Real-time updates" },
        { text: "Mobile app access" }
      ],
      isPopular: true,
      buttonText: "Get Started",
      buttonVariant: "default" as const
    },
    {
      title: "Enterprise",
      description: "For professional investors and teams",
      price: "$17.99",
      period: "/month",
      features: [
        { text: "Unlimited exchange connections" },
        { text: "Professional analytics with custom AI agent" },
        { text: "Advanced risk assessment" },
        { text: "Real-time updates" },
        { text: "Team collaboration features" },
        { text: "Priority support" },
        { text: "Customizable dashboards" }
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const
    }
  ];

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
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
