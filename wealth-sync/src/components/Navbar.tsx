import { auth } from "@/server/auth";
import UserProfileButton from "./UserProfileButton";
import LogoHomeButton from "./LogoHomeButton";
import { ThemeModeToggle } from "./ThemeModeToggle";
import NavbarLinks from "./NavbarLinks";
import SignUpButton from "./SignUpButton";

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
              <SignUpButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
