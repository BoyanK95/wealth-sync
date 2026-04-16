import Footer from "@/components/Footer/Footer";
import IntroductionSection from "@/components/LandingPageComponents/IntroductionSection";
import FeaturesSection from "@/components/LandingPageComponents/FeaturesSection";
import IntegrationSection from "@/components/IntegrationPlatformsSection/IntegrationSection";
// import PricingSection from "@/components/PricingPageComponents/PricingSection";
import ChartPrievewSection from "@/components/LandingPageComponents/ChartPrievewSection";
import ActionSection from "@/components/LandingPageComponents/ActionSection";
import { NoPricingSection } from "@/components/PricingPageComponents/NoPricingSection/NoPricingSection";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-16">
        <IntroductionSection />
        <FeaturesSection />
        <IntegrationSection />
        <ChartPrievewSection />
        {/* TODO Change with PricingSection later */}
        <NoPricingSection />
        <ActionSection />
      </main>
      <Footer />
    </div>
  );
}
