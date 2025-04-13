import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TroubleshootingDocs() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Common Issues</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Connection Issues</h3>
            <p className="text-muted-foreground">
              If you&apos;re experiencing connection problems:
              <br />
              1. Verify your API keys are valid
              <br />
              2. Check if the platform is operational
              <br />
              3. Ensure you have the correct permissions
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Data Sync Delays</h3>
            <p className="text-muted-foreground">
              Data updates may be delayed due to:
              <br />
              • API rate limits
              <br />
              • Platform maintenance
              <br />
              • Network connectivity issues
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Contact Support</h3>
            <p className="text-muted-foreground">
              If you need additional help:
              <br />
              • Email: support@wealth-sync.com
              <br />
              • Discord: Join our community
              <br />
              • GitHub: Report technical issues
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}