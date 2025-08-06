"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Routes } from "@/lib/constants/routes";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ExternalLink, Shield, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export default function CoinbaseConnectPage() {
  const [apiKey, setApiKey] = useState<string>("");
  const [apiSecret, setApiSecret] = useState<string>("");
  const [passphrase, setPassphrase] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { refreshConnections, getApiKey } = usePlatformConnection();

  useEffect(() => {
    const existingApiKey = getApiKey("coinbase");
    if (existingApiKey) {
      setApiKey(existingApiKey);
    }
  }, [getApiKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch("/api/platforms/coinbase/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey, apiSecret, passphrase }),
      });

      await refreshConnections();
      toast.success("Successfully connected to Coinbase");
      router.push(Routes.DASHBOARD);
    } catch (error) {
      setApiKey("");
      setApiSecret("");
      setPassphrase("");
      toast.error("Failed to connect", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-16 pb-12">
        <div className="container max-w-2xl space-y-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Connect Coinbase Pro</h1>
            <p className="text-muted-foreground mt-2">
              Connect your Coinbase Pro account to track your crypto portfolio
            </p>
          </div>

          {/* Security Notice */}
          <Alert className="border-green-200 bg-green-50">
            <Shield className="h-4 w-4 text-green-700" />
            <AlertTitle className="text-green-800">
              Secure Connection
            </AlertTitle>
            <AlertDescription className="text-green-700">
              We only request read-only permissions. Your funds and trading
              capabilities remain secure.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0052FF]">
                    <span className="text-lg font-bold text-white">CB</span>
                  </div>
                </div>
                <CardTitle>Coinbase Pro API Connection</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">API Key</label>
                  <Input
                    type="password"
                    placeholder="Enter your Coinbase Pro API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">API Secret</label>
                  <Input
                    type="password"
                    placeholder="Enter your Coinbase Pro API secret"
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Passphrase</label>
                  <Input
                    type="password"
                    placeholder="Enter your Coinbase Pro passphrase"
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    required
                  />
                  <p className="text-muted-foreground text-xs">
                    Make sure to use read-only API keys for security
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-[#0052FF] hover:bg-[#0052FF]/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Connecting..." : "Connect Coinbase Pro"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                How to get your API credentials
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href="https://pro.coinbase.com/profile/api"
                    target="_blank"
                  >
                    Open Coinbase Pro
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal space-y-3 pl-4">
                <li>
                  <strong>Log in to your Coinbase Pro account</strong>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Go to{" "}
                    <Link
                      href="https://pro.coinbase.com"
                      target="_blank"
                      className="text-[#0052FF] hover:underline"
                    >
                      pro.coinbase.com
                    </Link>{" "}
                    and sign in
                  </p>
                </li>
                <li>
                  <strong>Navigate to API Settings</strong>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Click on your profile → Settings → API
                  </p>
                </li>
                <li>
                  <strong>Create a new API key</strong>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Click &quot;New API Key&quot; and give it a descriptive name like
                    &quot;WealthSync&quot;
                  </p>
                </li>
                <li>
                  <strong>Set permissions to &quot;View&quot; only</strong>
                  <div className="text-muted-foreground mt-1 space-y-1 text-sm">
                    <p>
                      ✅ <strong>View</strong> - Enable this permission
                    </p>
                    <p>
                      ❌ <strong>Trade</strong> - Keep this disabled
                    </p>
                    <p>
                      ❌ <strong>Transfer</strong> - Keep this disabled
                    </p>
                  </div>
                </li>
                <li>
                  <strong>Create a passphrase</strong>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Enter a secure passphrase that you&apos;ll remember
                  </p>
                </li>
                <li>
                  <strong>Copy your credentials</strong>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Save the API Key, Secret, and Passphrase - you&apos;ll need all
                    three
                  </p>
                </li>
              </ol>

              <Alert className="mt-4 border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-700" />
                <AlertTitle className="text-yellow-800">
                  Important Security Note
                </AlertTitle>
                <AlertDescription className="text-yellow-700">
                  Never share your API credentials with anyone. WealthSync will
                  only use them to read your portfolio data - we cannot make
                  trades or transfer funds.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="text-sm font-medium">Connection failed</h4>
                <p className="text-muted-foreground text-xs">
                  Double-check that all three credentials (API Key, Secret, and
                  Passphrase) are correct and that the API key has &quot;View&quot;
                  permissions enabled.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Invalid API key error</h4>
                <p className="text-muted-foreground text-xs">
                  Make sure you&apos;re using Coinbase Pro (not regular Coinbase) API
                  credentials and that the key hasn&apos;t expired.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Data not syncing</h4>
                <p className="text-muted-foreground text-xs">
                  It may take a few minutes for your portfolio data to appear.
                  Try refreshing your dashboard.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Back button */}
          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/integrations">← Back to Integrations</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
