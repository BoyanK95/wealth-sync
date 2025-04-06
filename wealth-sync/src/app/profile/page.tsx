import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import ProfileForm from "@/components/ProfilePageComponents/ProfileForm";
// import ProfileForm from "@/components/profile/profile-form";

export const metadata: Metadata = {
  title: "Your Profile | WealthSync",
  description:
    "Manage your WealthSync profile settings and account information.",
};

export default async function ProfilePage() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-16 pb-12">
        <div className="container max-w-3xl py-12">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Your Profile
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your account settings and profile information
              </p>
            </div>

            <ProfileForm user={session.user} />
          </div>
        </div>
      </main>
    </div>
  );
}
