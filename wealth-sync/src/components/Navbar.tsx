import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/server/auth";

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session.user.image ?? ""}
                    alt={session.user.name ?? ""}
                  />
                  <AvatarFallback>
                    {session.user.name?.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button type="submit" className="w-full text-left">
                    Log out
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild variant="outline">
            <Link href="/auth/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
