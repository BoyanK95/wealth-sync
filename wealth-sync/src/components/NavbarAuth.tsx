'use client';

import { useSession } from "next-auth/react";
import UserProfileButton from "./UserProfileButton";
import SignUpButton from "./SignUpButton";

export function NavbarAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />;
  }

  return session?.user ? (
    <UserProfileButton session={session} />
  ) : (
    <div className="flex items-center gap-2">
      <SignUpButton />
    </div>
  );
}