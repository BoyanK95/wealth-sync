import { Routes } from "@/lib/constants/routes";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1">
        <div className="flex min-h-screen flex-1 flex-col justify-center bg-gradient-to-b from-[#026d32] to-[#15162c] px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center text-2xl font-bold tracking-tight text-white">
              <Link href={Routes.HOME} className="flex items-center gap-2">
                <span>Wealth</span>
                <span className="text-[hsl(128,35%,78%)]">Sync</span>
              </Link>
            </div>
            <p className="mt-2 text-center bold shadow-2xl text-xl text-emerald-200">The calculator for your financial future.</p>
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
