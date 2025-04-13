import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GettingStartedDocs() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">1. Create an Account</h3>
            <p className="text-muted-foreground">
              Sign up using your email or social accounts. Verify your email
              address to activate your account.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">2. Connect Your Platforms</h3>
            <p className="text-muted-foreground">
              Navigate to the Integrations page and connect your preferred
              trading platforms using secure API keys.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">3. Configure Your Dashboard</h3>
            <p className="text-muted-foreground">
              Customize your dashboard layout and widgets to match your
              investment tracking needs.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">API Key Security</h3>
            <p className="text-muted-foreground">
              Always use read-only API keys. Never share your API keys or store
              them in unsecured locations.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Two-Factor Authentication</h3>
            <p className="text-muted-foreground">
              Enable 2FA on your account for an additional layer of security.
            </p>
            <p className="text-muted-foreground">
              This adds an extra layer of protection to your account.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
