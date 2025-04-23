import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/constants/routes";

export default async function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect(Routes.LOGIN);
  }

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="w-full max-w-2xl space-y-8 py-12">
        {children}
      </div>
    </div>
  );
}
