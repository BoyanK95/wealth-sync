import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Routes } from "@/lib/constants/routes";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md border-0 shadow-none">
        <div className="space-y-6 p-6 text-center">
          <p className="text-muted-foreground text-6xl font-bold">404</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Page Not Found
          </h1>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="flex flex-col gap-2 pt-4">
            <Button asChild className="bg-green-600">
              <Link href={Routes.HOME}>Return Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={Routes.CONTACT}>Contact Support</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
