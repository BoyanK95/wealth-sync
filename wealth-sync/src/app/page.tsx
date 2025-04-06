import Footer from "@/components/Footer";
import IntroductionSection from "@/components/IntroductionSection";
import FeaturesSection from "@/components/FeaturesSection";
import IntegrationSection from "@/components/IntegrationSection";
import PricingSection from "@/components/PricingSection";
import WealcomeSection from "@/components/WealcomeSection";
import ChartPrievewSection from "@/components/AboutPageComponents/ChartPrievewSection";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-16">
        <IntroductionSection />
        <FeaturesSection />
        <IntegrationSection />
        <ChartPrievewSection />
        <PricingSection />
        <WealcomeSection />
      </main>
      <Footer />
    </div>
  );
}
