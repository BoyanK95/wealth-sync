"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ApiKeyStrings } from "@/lib/constants/apiKeyStrings";
import { Routes } from "@/lib/constants/routes";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MetaMaskConnectPage() {
  const [apiKey, setApiKey] = useState<string>("");
  const [apiSecret, setApiSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { refreshConnections, getApiKey } = usePlatformConnection();

  useEffect(() => {
    const existingApiKey = getApiKey(ApiKeyStrings.META_MASK);
    if (existingApiKey) {
      setApiKey(existingApiKey);
    }
  }, [getApiKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch("/api/platforms/meta-mask/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey, apiSecret }),
      });

      await refreshConnections();
      toast.success("Successfully connected to MetaMask");
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
      <div className="text-center">
        <h1 className="text-3xl font-bold">Connect Meta Mask Wallet</h1>
        <p className="text-muted-foreground mt-2">
          Connect your MetaMask account to track your crypto portfolio
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src="/platforms/meta-mask-logo.png"
                alt="MetaMask"
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <CardTitle>MetaMask API Connection </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <Input
                type="password"
                placeholder="Enter your MetaMask API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">API Secret</label>
              <Input
                type="password"
                placeholder="Enter your MetaMask API secret"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                required
              />
              <p className="text-muted-foreground text-xs">
                Make sure to use read-only API keys for security
              </p>
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer hover:bg-green-500"
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Connect MetaMask"}
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
            <li>Log in to your MetaMask account</li>
            <li>Go to API Management</li>
            <li>Click &quot;Create API&quot;</li>
            <li>Set permissions to &quot;Read Only&quot;</li>
            <li>Copy both the API key and secret</li>
          </ol>
        </CardContent>
      </Card>
    </>
  );
}
