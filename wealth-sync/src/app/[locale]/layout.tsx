import { CookieConsentDialog } from "@/components/CookiesConsent/CookiesConsent";
import { Navbar } from "@/components/Navbar/Navbar";
import { Providers } from "@/components/Providers";
import { PlatformConnectionProvider } from "@/lib/contexts/PlatformConnectionContext";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Wealth Sync",
  description: "Wealth Calculator App that helps you manage your finances",
  icons: [{ rel: "icon", url: "/dollar-app-logo.jpeg" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const messages = await getMessages();

  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <PlatformConnectionProvider>
              {children}
              <CookieConsentDialog />
            </PlatformConnectionProvider>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
