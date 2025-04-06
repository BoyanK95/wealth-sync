import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const IntegrationSection = () => {
  return (
    <section id="integrations" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
              Integrations
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Connect with your favorite platforms
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              WealthSync integrates with major stock exchanges, crypto
              platforms, and brokerages.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-3 lg:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center space-y-2 rounded-lg border p-6"
            >
              <div className="bg-muted h-12 w-12 rounded-full"></div>
              <span className="text-sm font-medium">
                {i === 1
                  ? "Trading212"
                  : i === 2
                    ? "Binance"
                    : i === 3
                      ? "Coinbase"
                      : i === 4
                        ? "Robinhood"
                        : i === 5
                          ? "Interactive Brokers"
                          : "E*TRADE"}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="#"
            className="group inline-flex items-center text-sm font-medium text-green-700 hover:text-green-800"
          >
            View all supported platforms
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
