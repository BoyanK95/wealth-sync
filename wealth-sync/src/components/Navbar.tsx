import LogoHomeButton from "./LogoHomeButton";
import { ThemeModeToggle } from "./ThemeModeToggle";
import NavbarLinks from "./NavbarLinks";
import { NavbarAuth } from "./NavbarAuth";
import { NotificationBellComponent } from "./Notification/NotificationBellComponent";

export function Navbar() {
  return (
    <nav className="bg-background/70 supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between">
        <div className="flex items-center gap-8">
          <LogoHomeButton />
          <NavbarLinks />
        </div>

        <div className="flex items-center gap-4 pr-2">
          <NotificationBellComponent />
          <ThemeModeToggle />
          <NavbarAuth />
        </div>
      </div>
    </nav>
  );
}
