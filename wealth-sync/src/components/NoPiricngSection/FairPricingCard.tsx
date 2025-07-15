import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart } from "lucide-react";

const FairPricingCard = () => {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
          <Heart className="h-6 w-6 text-orange-700" />
        </div>
        <CardTitle className="text-lg">Fair Pricing</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          When we do introduce pricing, it will be fair, transparent, and
          provide clear value for what you pay.
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default FairPricingCard;
