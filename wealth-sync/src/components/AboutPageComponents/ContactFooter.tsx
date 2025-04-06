import React from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import Link from "next/link";
import { Routes } from "@/lib/constants/routes";

const ContactFooter = async () => {
  const session = await auth();

  return (
    <div className="mt-8 space-y-4 rounded-lg border border-green-100 bg-green-50 p-6 text-center">
      <h3 className="text-xl font-bold text-green-800">
        Ready to simplify your investment tracking?
      </h3>
      <p className="mx-auto max-w-2xl text-green-700">
        WealthSync brings all your investments together in one place, giving you
        the complete picture of your financial portfolio.
      </p>
      {session?.user ? (
        <Button className="bg-green-700 hover:bg-green-800">
          <Link href={Routes.DASHBOARD}>Go to Dashboard</Link>
        </Button>
      ) : (
        <Button className="bg-green-700 hover:bg-green-800">
          <Link href={Routes.LOGIN}>Get Started with WealthSync</Link>
        </Button>
      )}
    </div>
  );
};

export default ContactFooter;
