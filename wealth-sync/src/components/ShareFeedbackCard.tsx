import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Routes } from "@/lib/constants/routes";
import Link from "next/link";
import { auth } from "@/server/auth";

const ShareFeedbackCard = async () => {
  const session = await auth();

  return (
    <Card className="w-full max-w-2xl border-green-200 bg-green-50">
      <CardHeader className="text-center">
        <CardTitle className="text-green-800">
          Help Us Shape Our Pricing
        </CardTitle>
        <CardDescription className="text-green-700">
          Your input matters! Let us know what you think about pricing for
          investment tracking tools.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="flex-1 border-green-700 bg-transparent text-green-700 hover:bg-green-50 dark:hover:border-green-800"
            asChild
          >
            <Link
              className="dark:hover:bg-green-300 dark:hover:text-green-800"
              href={Routes.CONTACT}
            >
              Share Feedback
            </Link>
          </Button>
          <Button
            className="flex-1 bg-green-700 hover:bg-green-800 hover:text-white"
            asChild
          >
            {session?.user ? (
              <Link href={Routes.DASHBOARD}>Go to Dashboard</Link>
            ) : (
              <Link href={Routes.REGISTER}>Start Using for Free</Link>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareFeedbackCard;
