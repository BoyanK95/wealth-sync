import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IntegrationDocs() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Platform Integration Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Trading212</h3>
            <p className="text-muted-foreground">
              1. Log in to your Trading212 account
              <br />
              2. Navigate to Settings → API
              <br />
              3. Generate a new read-only API key
              <br />
              4. Copy the API key to WealthSync
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Binance</h3>
            <p className="text-muted-foreground">
              1. Log in to your Binance account
              <br />
              2. Go to API Management
              <br />
              3. Create a new API key with read-only permissions
              <br />
              4. Enter the API key and secret in WealthSync
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Supported Features</h3>
            <p className="text-muted-foreground">
              • Real-time balance updates
              <br />
              • Transaction history
              <br />
              • Portfolio analytics
              <br />
              • Asset allocation tracking
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}