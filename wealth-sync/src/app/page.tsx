import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import IntroductionSection from "@/components/IntroductionSection";
import FeaturesSection from "@/components/FeaturesSection";
import IntegrationSection from "@/components/IntegrationSection";
import PricingSection from "@/components/PricingSection";
import WealcomeSection from "@/components/WealcomeSection";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main content starts with padding for the fixed navbar */}
      <main className="flex-1 pt-16">
        <IntroductionSection />
        <FeaturesSection />
        <IntegrationSection />
        <section className="bg-muted/50 w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Powerful analytics at your fingertips
                  </h2>
                  <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Visualize your investment performance with interactive
                    charts and detailed metrics. Identify trends, track growth,
                    and make informed decisions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-green-700 hover:bg-green-800">
                    Try it now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <div className="flex flex-col gap-4">
                    <div className="bg-background rounded-lg border p-2">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="Chart Preview"
                        width={400}
                        height={300}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="bg-background rounded-lg border p-2">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="Chart Preview"
                        width={400}
                        height={300}
                        className="rounded-md object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="bg-background rounded-lg border p-2">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="Chart Preview"
                        width={400}
                        height={300}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="bg-background rounded-lg border p-2">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="Chart Preview"
                        width={400}
                        height={300}
                        className="rounded-md object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <PricingSection />
        <WealcomeSection />
      </main>
      <Footer />
    </div>
  );
}
