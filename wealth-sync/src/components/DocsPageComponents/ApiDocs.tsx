import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApiDocs() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Reference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Authentication</h3>
            <p className="text-muted-foreground">
              All API requests require a valid API key in the Authorization header.
            </p>
            <pre className="bg-muted mt-2 rounded-md p-4">
              <code>Authorization: Bearer YOUR_API_KEY</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Rate Limits</h3>
            <p className="text-muted-foreground">
              Free tier: 100 requests/hour
              <br />
              Pro tier: 1000 requests/hour
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Endpoints</h3>
            <p className="text-muted-foreground">
              Base URL: https://api.wealth-sync.com/v1
            </p>
            <pre className="bg-muted mt-2 rounded-md p-4">
              <code>
                GET /portfolio
                <br />
                GET /transactions
                <br />
                GET /assets
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}