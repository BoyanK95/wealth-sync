import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { PlatformConnectionProvider } from "@/lib/contexts/PlatformConnectionContext";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "Wealth Sync",
  description: "Wealth Calculator App that helps you manage your finances",
  icons: [{ rel: "icon", url: "/dollar-app-logo.jpeg" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <PlatformConnectionProvider>{children}</PlatformConnectionProvider>
        </Providers>
      </body>
    </html>
  );
}
