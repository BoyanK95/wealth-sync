import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import UserProfileButton from "./UserProfileButton";
import LogoHomeButton from "./LogoHomeButton";
import { Routes } from "@/lib/constants/routes";
import { ThemeModeToggle } from "./ThemeModeToggle";
import NavbarLinks from "./NavbarLinks";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="bg-background/70 supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <LogoHomeButton />
          <NavbarLinks />
        </div>

        <div className="flex items-center gap-4">
          <ThemeModeToggle />
          {session?.user ? (
            <UserProfileButton session={session} />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                asChild
                size="sm"
                variant={"default"}
                className="hidden hover:bg-green-700 sm:flex"
              >
                <Link href={Routes.LOGIN}>Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
