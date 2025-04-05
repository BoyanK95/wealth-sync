import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";

export function Navbar() {
  const session = auth();
//   console.log(session);
  console.log("user" + session?.user);

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
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    </nav>
  );
}
