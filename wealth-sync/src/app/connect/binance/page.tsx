import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function BinanceConnectPage() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Connect Binance Wallet</h1>
        <p className="text-muted-foreground mt-2">
          Connect your Binance account to track your crypto portfolio
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src="/platforms/binance-logo.png"
                alt="Binance"
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <CardTitle>Binance API Connection </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <Input type="password" placeholder="Enter your Binance API key" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">API Secret</label>
              <Input
                type="password"
                placeholder="Enter your Binance API secret"
              />
              <p className="text-muted-foreground text-xs">
                Make sure to use read-only API keys for security
              </p>
            </div>
            <Button className="w-full">Connect Binance</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to get your API credentials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal space-y-2 pl-4">
            <li>Log in to your Binance account</li>
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
