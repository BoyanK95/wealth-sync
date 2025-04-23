import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function IBConnectPage() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Connect Interactive Brokers</h1>
        <p className="text-muted-foreground mt-2">
          Connect your Interactive Brokers account to track your investments
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Image
              src="/platforms/ib-logo-icon.png"
              alt="Interactive Brokers"
              width={48}
              height={48}
              className="rounded-full"
            />
            <CardTitle>Interactive Brokers Connection</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Client Portal API Token
              </label>
              <Input type="password" placeholder="Enter your IB API token" />
            </div>
            <Button className="w-full cursor-pointer hover:bg-green-500">
              Connect Interactive Brokers
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal space-y-2 pl-4">
            <li>Log in to IBKR Client Portal</li>
            <li>Go to Settings → API Settings</li>
            <li>Enable API access</li>
            <li>Generate and copy your API token</li>
          </ol>
        </CardContent>
      </Card>
    </>
  );
}
