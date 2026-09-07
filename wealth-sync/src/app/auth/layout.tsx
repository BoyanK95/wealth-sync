import { Routes } from "@/lib/constants/routes";
import Link from "next/link";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect(Routes.HOME);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1">
        <div className="flex min-h-screen flex-1 flex-col justify-center bg-gradient-to-b from-[#66e37d] to-[#1f4923] px-6 py-12 lg:px-8 dark:bg-gradient-to-b dark:from-[#409e55] dark:to-[#000f01]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center text-2xl font-bold tracking-tight text-white">
              <Link href={Routes.HOME} className="flex items-center gap-2">
                <span>Wealth</span>
                <span className="text-[hsl(118,35%,19%)] dark:text-gray-800">Sync</span>
              </Link>
            </div>
            <p className="bold mt-2 text-center text-xl text-emerald-100 shadow-2xl">
              The calculator for your financial future.
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {children}
          </div>

          <div className="mt-10 text-center text-white">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Take charge of your financial future with Wealth Sync -
                where smart money management meets simplicity.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </main>
    </div>
  );
}
