import { Routes } from "@/lib/constants/routes";
import React from "react";
import { LocalizedLink } from "../Link/LocalizedLink";

const NavbarLinks = () => {
  return (
    <div className="hidden items-center space-x-6 md:flex">
      <LocalizedLink
        href={Routes.FEATURES}
        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
      >
        Features
      </LocalizedLink>
      <LocalizedLink
        href={Routes.INTEGRATIONS}
        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
      >
        Integrations
      </LocalizedLink>
      <LocalizedLink
        href={Routes.PRICING}
        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
      >
        Pricing
      </LocalizedLink>
    </div>
  );
};

export default NavbarLinks;
