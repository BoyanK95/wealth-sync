import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import UserProfileButton from "./UserProfileButton";
import LogoHomeButton from "./LogoHomeButton";
import { Routes } from "@/lib/constants/routes";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="bg-background/70 supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <LogoHomeButton />

          <div className="hidden items-center space-x-6 md:flex">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="#integrations"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Integrations
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <UserProfileButton session={session} />
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant={'default'} className="hidden sm:flex hover:bg-green-700">
                <Link href={Routes.LOGIN}>Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
