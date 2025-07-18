import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Routes } from "@/lib/constants/routes";
import IntegrationPlatformsGrid from "./IntegrationPlatformsGrid";

const IntegrationSection = () => {
  return (
    <section
      id="integrations"
      className="flex w-full flex-col justify-center align-middle py-8"
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
            Integrations
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Connect with your favorite platforms
          </h2>
          <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            WealthSync integrates with major stock exchanges, crypto platforms,
            and brokerages.
          </p>
        </div>
      </div>
      <IntegrationPlatformsGrid />
      <div className="flex justify-center">
        <Link
          href={Routes.INTEGRATIONS}
          className="group inline-flex items-center text-sm font-medium text-green-700 hover:text-green-800"
        >
          View all supported platforms
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
};

export default IntegrationSection;
