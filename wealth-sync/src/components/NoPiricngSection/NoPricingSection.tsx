import NoPricingTitleMessage from "./NoPricingTitleMessage";
import NoPricingCurrentStatusCard from "./NoPricingCurrentStatusCard";
import BuildingCommunityCard from "./BuildingCommunityCard";
import PerfectingFeaturesCard from "./PerfectingFeaturesCard";
import FairPricingCard from "./FairPricingCard";
import TimeLine from "./TimeLine";
import ShareFeedbackCard from "../ShareFeedbackCard";

export function NoPricingSection() {
  return (
    <div className="mx-auto mt-7 flex max-w-4xl flex-col items-center space-y-8 text-center">
      <NoPricingTitleMessage />
      <NoPricingCurrentStatusCard />

      <div className="grid w-full gap-6 md:grid-cols-3">
        <BuildingCommunityCard />
        <PerfectingFeaturesCard />
        <FairPricingCard />
      </div>

      <TimeLine />
      <ShareFeedbackCard />

      {/* Promise */}
      <div className="bg-muted/50 w-full max-w-2xl rounded-lg p-6">
        <h3 className="mb-2 font-semibold">Our Promise</h3>
        <p className="text-muted-foreground text-sm">
          When we do introduce pricing, early users will receive advance notice,
          grandfathered rates, and special benefits. We believe in rewarding the
          people who help us build WealthSync.
        </p>
      </div>
    </div>
  );
}
