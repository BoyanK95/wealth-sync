import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const NoPricingTitleMessage = () => {
  return (
    <div className="mt-18 space-y-4">
      <Badge
        variant="outline"
        className="border-green-700 px-6 py-3 text-green-700"
      >
        <Clock className="mr-2" />
        <p className="font-bold">No Pricing Yet</p>
      </Badge>
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        We&apos;re Still Figuring It Out
      </h1>
      <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
        WealthSync is completely free while we build the perfect product and
        determine fair pricing that works for everyone.
      </p>
    </div>
  );
};

export default NoPricingTitleMessage;
