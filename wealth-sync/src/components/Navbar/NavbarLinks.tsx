import { Routes } from "@/lib/constants/routes";
import Link from "next/link";
import React from "react";

const NavbarLinks = () => {
  return (
    <div className="hidden items-center space-x-6 md:flex">
      <Link
        href={Routes.FEATURES}
        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
      >
        Features
      </Link>
      <Link
        href={Routes.INTEGRATIONS}
        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
      >
        Integrations
      </Link>
      <Link
        href={Routes.PRICING}
        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
      >
        Pricing
      </Link>
    </div>
  );
};

export default NavbarLinks;
