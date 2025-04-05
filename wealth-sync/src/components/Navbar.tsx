import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import UserProfileButton from "./UserProfileButton";

export async function Navbar() {
  const session = await auth();
  console.log(session?.user);

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

        {session?.user ? (
          <UserProfileButton session={session} />
        ) : (
          <Button asChild variant="outline">
            <Link href="/auth/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
