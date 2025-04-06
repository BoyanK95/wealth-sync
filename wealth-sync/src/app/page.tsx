import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, ChevronRight, LineChart, PieChart, Shield, Smartphone, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import Footer from "@/components/Footer"
import IntroductionSection from "@/components/IntroductionSection"
import FeaturesSection from "@/components/FeaturesSection"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main content starts with padding for the fixed navbar */}
      <main className="flex-1 pt-16">
        <IntroductionSection />
        <FeaturesSection />
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Powerful analytics at your fingertips
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Visualize your investment performance with interactive charts and detailed metrics. Identify trends,
                    track growth, and make informed decisions.
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
                    <div className="rounded-lg border bg-background p-2">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="Chart Preview"
                        width={400}
                        height={300}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="rounded-lg border bg-background p-2">
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
                    <div className="rounded-lg border bg-background p-2">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="Chart Preview"
                        width={400}
                        height={300}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="rounded-lg border bg-background p-2">
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
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, transparent pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that&apos;s right for you and start tracking your investments today.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Basic</h3>
                  <p className="text-muted-foreground">For individual investors getting started</p>
                </div>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $0<span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
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
                  <p className="text-muted-foreground">For active investors with multiple accounts</p>
                </div>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $9.99<span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
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
                <Button className="mt-8 bg-green-700 hover:bg-green-800">Get Started</Button>
              </div>
              <div className="flex flex-col rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-muted-foreground">For professional investors and teams</p>
                </div>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $29.99<span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to take control of your investments?
                </h2>
                <p className="max-w-[600px] text-green-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of investors who use WealthSync to track and analyze their portfolios.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-green-800">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

