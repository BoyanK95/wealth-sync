import { ScrollText, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container mt-10 space-y-12 py-12">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-muted-foreground text-lg">
          Please read these terms carefully before using WealthSync
        </p>
      </div>

      {/* Last Updated */}
      <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
        <ScrollText className="h-4 w-4" />
        Last updated: Aprill 2025
      </div>

      {/* Terms Content */}
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Agreement */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
          <p className="text-muted-foreground">
            By accessing or using WealthSync, you agree to be bound by these
            Terms of Service. If you disagree with any part of the terms, you
            may not access the service.
          </p>
        </section>

        {/* Service Description */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Description of Service</h2>
          <p className="text-muted-foreground">
            WealthSync is a portfolio tracking platform that allows users to
            connect multiple investment accounts and view their consolidated
            performance. We provide this service through:
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>
              Integration with various trading platforms via API connections
            </li>
            <li>Authentication through third-party providers</li>
            <li>Portfolio analytics and tracking tools</li>
            <li>Data visualization and reporting features</li>
          </ul>
        </section>

        {/* Account Terms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Account Terms</h2>
          <p className="text-muted-foreground">To use WealthSync, you must:</p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>Be at least 18 years old</li>
            <li>Register using valid authentication credentials</li>
            <li>Provide accurate and complete information</li>
            <li>Be responsible for maintaining account security</li>
            <li>Promptly notify us of any security breaches</li>
          </ul>
        </section>

        {/* API Usage */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. API Usage and Data Access
          </h2>
          <p className="text-muted-foreground">
            When connecting trading platforms to WealthSync:
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>
              We only use official API endpoints provided by the platforms
            </li>
            <li>API access is limited to read-only operations</li>
            <li>We cannot execute trades or withdraw funds</li>
            <li>
              You maintain full control over API access and can revoke it at any
              time
            </li>
          </ul>
        </section>

        {/* Limitations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Limitations of Service</h2>
          <p className="text-muted-foreground">
            WealthSync is for informational purposes only. We do not:
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>Provide financial advice or recommendations</li>
            <li>Guarantee the accuracy of third-party data</li>
            <li>Execute trades or manage investments</li>
            <li>Store or have access to your trading platform credentials</li>
          </ul>
        </section>

        {/* Data Usage */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Data Usage and Privacy</h2>
          <p className="text-muted-foreground">
            We handle your data in accordance with our Privacy Policy. Key
            points include:
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>Data is encrypted and stored securely</li>
            <li>We only collect necessary information for service operation</li>
            <li>You can request data deletion at any time</li>
            <li>We do not sell or share your personal information</li>
          </ul>
        </section>

        {/* Termination */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Account Termination</h2>
          <p className="text-muted-foreground">
            You may terminate your account at any time. Upon termination:
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>All API connections will be removed</li>
            <li>Your data will be deleted from our systems</li>
            <li>You can request a copy of your data before deletion</li>
          </ul>
        </section>

        {/* Changes to Terms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
          <p className="text-muted-foreground">
            We reserve the right to modify these terms at any time. We will
            notify users of any material changes via email or through the
            platform.
          </p>
        </section>

        {/* Contact Information */}
        <section className="bg-muted/30 mt-12 rounded-lg p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertCircle className="text-primary h-5 w-5" />
            <h2 className="text-xl font-semibold">
              Questions About Our Terms?
            </h2>
          </div>
          <p className="text-muted-foreground">
            If you have any questions about these Terms of Service, please
            contact us at{" "}
            <a
              href="mailto:b.koychev95@gmail.com"
              className="text-primary hover:underline"
            >
              support@wealthsync.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
