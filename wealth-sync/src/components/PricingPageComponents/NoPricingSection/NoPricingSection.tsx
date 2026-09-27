import NoPricingTitleMessage from "./NoPricingTitleMessage";
import NoPricingCurrentStatusCard from "./NoPricingCurrentStatusCard";
import BuildingCommunityCard from "./BuildingCommunityCard";
import PerfectingFeaturesCard from "./PerfectingFeaturesCard";
import FairPricingCard from "./FairPricingCard";
import TimeLine from "./TimeLine";
import ShareFeedbackCard from "@/components/PricingPageComponents/NoPricingSection/ShareFeedbackCard";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

export async function NoPricingSection() {
  const t = await getTranslations("NoPricingSection");

  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.06),transparent_36%)]" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center space-y-8 text-center">
          <NoPricingTitleMessage />
          <NoPricingCurrentStatusCard />

          <div className="grid w-full gap-6 md:grid-cols-3">
            <BuildingCommunityCard />
            <PerfectingFeaturesCard />
            <FairPricingCard />
          </div>

          <TimeLine />
          <ShareFeedbackCard />

          <div className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-[0_18px_42px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70">
            <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
              {t("promise.title")}
            </h3>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              {t("promise.description", { siteName: SITE_NAME })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
