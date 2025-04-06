import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const WealcomeSection = () => {
  return (
    <section className="w-full bg-green-700 py-12 text-white md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to take control of your investments?
            </h2>
            <p className="max-w-[600px] text-green-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of investors who use WealthSync to track and
              analyze their portfolios.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50"
            >
              <Link href="/auth/login">Get Started for Free</Link>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WealcomeSection;
