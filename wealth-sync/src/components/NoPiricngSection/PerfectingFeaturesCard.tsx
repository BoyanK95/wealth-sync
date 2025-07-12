import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap } from "lucide-react";

const PerfectingFeaturesCard = () => {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
          <Zap className="h-6 w-6 text-purple-700" />
        </div>
        <CardTitle className="text-lg">Perfecting Features</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          We&apos;re focused on building the best possible product. Pricing will
          come when we deliver exceptional value.
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default PerfectingFeaturesCard;
