import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Trading212ConnectPage() {
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
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <Input type="password" placeholder="Enter your Trading212 API key" />
              <p className="text-muted-foreground text-xs">
                You can find your API key in Trading212 settings under the API section
              </p>
            </div>
            <Button className="w-full">Connect Trading212</Button>
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