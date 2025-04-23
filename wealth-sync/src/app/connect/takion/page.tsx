import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function TakionConnectPage() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Connect Takion</h1>
        <p className="text-muted-foreground mt-2">
          Connect your Takion account to track your investments
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Image
              src="/platforms/Takion.png"
              alt="Takion"
              width={48}
              height={48}
              className="rounded-full"
            />
            <CardTitle>Takion API Connection</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <Input type="password" placeholder="Enter your Takion API key" />
            </div>
            <Button className="w-full">Connect Takion</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to get your API key</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal space-y-2 pl-4">
            <li>Log in to your Takion account</li>
            <li>Navigate to Account Settings</li>
            <li>Find the API section</li>
            <li>Generate and copy your API key</li>
          </ol>
        </CardContent>
      </Card>
    </>
  );
}