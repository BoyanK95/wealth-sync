'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Routes } from "@/lib/constants/routes";

export default function Trading212ConnectPage() {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/platforms/trading212/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to Trading212');
      }

      toast.success('Successfully connected to Trading212');
      router.push(Routes.DASHBOARD);
    } catch (error) {
      toast.error('Failed to connect', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Connect Trading212</h1>
        <p className="text-muted-foreground mt-2">
          Connect your Trading212 account to start tracking your investments
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Image
              src="/platforms/trading-212-icon.png"
              alt="Trading212"
              width={48}
              height={48}
              className="rounded-full"
            />
            <CardTitle>Trading212 API Connection</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <Input
                type="password"
                placeholder="Enter your Trading212 API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
              <p className="text-muted-foreground text-xs">
                You can find your API key in Trading212 settings under the API
                section
              </p>
            </div>
            <Button 
              type="submit" 
              className="w-full cursor-pointer hover:bg-green-500"
              disabled={isLoading}
            >
              {isLoading ? 'Connecting...' : 'Connect Trading212'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to get your API key</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal space-y-2 pl-4">
            <li>Log in to your Trading212 account</li>
            <li>Go to Account Settings</li>
            <li>Navigate to the API section</li>
            <li>Click on &quot;Generate new API key&quot;</li>
            <li>Copy the generated key and paste it above</li>
          </ol>
        </CardContent>
      </Card>
    </>
  );
}
