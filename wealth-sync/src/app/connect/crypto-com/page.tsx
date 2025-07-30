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

export default function CryptoComConnectPage() {
  const [apiKey, setApiKey] = useState<string>("");
  const [apiSecret, setApiSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { refreshConnections, getApiKey } = usePlatformConnection();

  useEffect(() => {
    const existingApiKey = getApiKey("crypto-com");
    if (existingApiKey) {
      setApiKey(existingApiKey);
    }
  }, [getApiKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        //TODO : Add crypto.com connect request
      await fetch("/api/platforms/crypto-com/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey, apiSecret }),
      });

      await refreshConnections();
      toast.success("Successfully connected to Crypto.com");
      router.push(Routes.DASHBOARD);
    } catch (error) {
      setApiKey("");
      setApiSecret("");
      toast.error("Failed to connect", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mt-7">
        <h1 className="text-3xl font-bold">Connect Crypto.com</h1>
        <p className="text-muted-foreground mt-2">
          Connect your Crypto.com account to track your crypto portfolio
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src="/platforms/crypto-com-logo.png"
                alt="Crypto.com"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <CardTitle>Crypto.com API Connection</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <Input
                type="password"
                placeholder="Enter your Crypto.com API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">API Secret</label>
              <Input
                type="password"
                placeholder="Enter your Crypto.com API secret"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                required
              />
              <p className="text-muted-foreground text-xs">
                Make sure to use read-only API keys for security. Your
                credentials are encrypted and stored securely.
              </p>
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer hover:bg-green-500"
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Connect Crypto.com"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to get your API credentials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal space-y-2 pl-4">
            <li>
              <a
                href="https://crypto.com/exchange"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 hover:underline"
              >
                Log in to your Crypto.com Exchange account
              </a>
            </li>
            <li>Navigate to Settings → API Management</li>
            <li>Click &quot;Create API Key&quot;</li>
            <li>
              Set the following permissions:
              <ul className="mt-1 ml-4 list-disc space-y-1">
                <li>Read - Account and Balance</li>
                <li>Read - Spot Trading</li>
                <li>Read - Margin Trading (if applicable)</li>
              </ul>
            </li>
            <li>Add your IP address to the whitelist (recommended)</li>
            <li>Copy both the API key and secret key</li>
            <li>Paste them in the form above</li>
          </ol>

          <div className="mt-4 rounded-md border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Security Note:</strong> Never grant withdrawal or trading
              permissions to API keys used with third-party applications. Only
              enable read permissions for portfolio tracking.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
