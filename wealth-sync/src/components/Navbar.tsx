import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="bg-background/70 fixed top-0 z-50 w-full">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-primary flex items-center gap-2 text-2xl font-bold"
        >
          <span>Wealth</span>
          <span className="text-green-800">Sync</span>
        </Link>

        <Button asChild variant="outline">
            {/* TODO add login page */}
          <Link href="/auth/signin">Login</Link>
        </Button>
      </div>
    </nav>
  );
}
