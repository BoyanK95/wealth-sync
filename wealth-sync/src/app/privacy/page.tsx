import { Shield, Lock, Key, Database } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="container py-12 space-y-12 mt-10">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">
          Your Security is Our Priority
        </h1>
        <p className="text-muted-foreground text-lg">
          WealthSync is built with security and privacy at its core. We ensure your financial data remains protected and private.
        </p>
      </div>

      {/* Security Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="space-y-4 p-6 rounded-lg border">
          <div className="bg-primary/10 w-fit p-3 rounded-lg">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Secure Authentication</h3>
          <p className="text-muted-foreground">
            We use trusted third-party authentication providers like Facebook and Google. 
            We never store or have access to your passwords.
          </p>
        </div>

        <div className="space-y-4 p-6 rounded-lg border">
          <div className="bg-primary/10 w-fit p-3 rounded-lg">
            <Key className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Exchange Connections</h3>
          <p className="text-muted-foreground">
            When connecting to trading platforms, we only use official API keys with read-only access. 
            We cannot make trades or withdraw funds on your behalf.
          </p>
        </div>

        <div className="space-y-4 p-6 rounded-lg border">
          <div className="bg-primary/10 w-fit p-3 rounded-lg">
            <Database className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Data Storage</h3>
          <p className="text-muted-foreground">
            Your data is encrypted and stored securely. We only collect the necessary information 
            to provide you with portfolio tracking and analytics.
          </p>
        </div>

        <div className="space-y-4 p-6 rounded-lg border">
          <div className="bg-primary/10 w-fit p-3 rounded-lg">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Limited Access</h3>
          <p className="text-muted-foreground">
            Our platform operates on a read-only basis. We can only view the data necessary 
            to display your portfolio information and cannot perform any actions on your accounts.
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-muted/30 rounded-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          How We Handle Your Data
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            WealthSync is designed to be a secure bridge between your various investment platforms. 
            Here&apos;s how we handle your data:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Authentication is handled through trusted providers (Facebook, Google)</li>
            <li>Exchange connections use read-only API keys</li>
            <li>We never store or have access to your exchange passwords</li>
            <li>Data is encrypted both in transit and at rest</li>
            <li>We only collect data necessary for portfolio tracking</li>
            <li>You can delete your account and data at any time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}