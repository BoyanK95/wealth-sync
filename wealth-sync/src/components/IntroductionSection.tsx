import React from "react";
import {
  ArrowRight,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image"

const IntroductionSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Your complete financial portfolio in one place
              </h1>
              <p className="text-muted-foreground max-w-[600px] md:text-xl">
                Connect to multiple exchanges, track your investments, and
                analyze your performance with powerful charts and insights.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-green-700 hover:bg-green-800">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-green-700" />
                <span className="text-xs sm:text-sm">Secure Connections</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4 text-green-700" />
                <span className="text-xs sm:text-sm">Real-time Updates</span>
              </div>
              <div className="flex items-center space-x-1">
                <Smartphone className="h-4 w-4 text-green-700" />
                <span className="text-xs sm:text-sm">Mobile App</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-background relative w-full overflow-hidden rounded-lg p-2 sm:h-[400px] lg:h-[500px]">
              <Image
                src="/calculatior.png"
                alt="Dashboard Preview"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
