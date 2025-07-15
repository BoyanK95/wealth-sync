import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/server/auth";
import { Routes } from "@/lib/constants/routes";

const NoPricingCurrentStatusCard = async () => {
  const session = await auth();

  return (
    <Card className="w-full max-w-2xl border-2 border-green-700">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Heart className="h-8 w-8 text-green-700" />
        </div>
        <CardTitle className="text-2xl">100% Free Right Now</CardTitle>
        <CardDescription className="text-lg">
          All features, no limits, no credit card required
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 rounded-full bg-green-700"></div>
            <span className="text-sm">Unlimited portfolio tracking</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 rounded-full bg-green-700"></div>
            <span className="text-sm">All exchange integrations</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 rounded-full bg-green-700"></div>
            <span className="text-sm">Advanced analytics</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 rounded-full bg-green-700"></div>
            <span className="text-sm">Full customer support</span>
          </div>
        </div>

        <div className="pt-4">
          <Button
            size="lg"
            className="w-full bg-green-700 hover:bg-green-800 dark:hover:text-white"
            asChild
          >
            {session?.user ? (
              <Link href={Routes.DASHBOARD}>Go to Dashboard</Link>
            ) : (
              <Link href={Routes.REGISTER}>Get Started Free</Link>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoPricingCurrentStatusCard;
