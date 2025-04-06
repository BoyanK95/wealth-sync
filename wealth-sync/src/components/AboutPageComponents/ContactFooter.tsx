import React from "react";
import { Button } from "@/components/ui/button";

const ContactFooter = () => {
  return (
    <div className="mt-8 space-y-4 rounded-lg border border-green-100 bg-green-50 p-6 text-center">
      <h3 className="text-xl font-bold text-green-800">
        Ready to simplify your investment tracking?
      </h3>
      <p className="mx-auto max-w-2xl text-green-700">
        WealthSync brings all your investments together in one place, giving you
        the complete picture of your financial portfolio.
      </p>
      <Button className="bg-green-700 hover:bg-green-800">
        Get Started with WealthSync
      </Button>
    </div>
  );
};

export default ContactFooter;
