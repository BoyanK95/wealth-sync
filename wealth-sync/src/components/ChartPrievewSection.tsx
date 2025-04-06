import React from "react";
import {
  ChartArea,
  ChartNoAxesCombined,
  ChartPie,
  ChartScatter,
} from "lucide-react";

const ChartPrievewSection = () => {
  return (
    <section className="bg-muted/50 w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Powerful analytics at your fingertips
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Visualize your investment performance of all your aggragated
                stock exchange accounts, with interactive charts and detailed
                metrics. Identify trends, track growth, and make informed
                decisions!
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row"></div>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="flex flex-col gap-4">
                <div className="bg-background rounded-lg border p-2">
                  <ChartArea height={200} width={200} />
                </div>
                <div className="bg-background rounded-lg border p-2">
                  <ChartPie height={200} width={200} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-background rounded-lg border p-2">
                  <ChartNoAxesCombined height={200} width={200} />
                </div>
                <div className="bg-background rounded-lg border p-2">
                  <ChartScatter height={200} width={200} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartPrievewSection;
