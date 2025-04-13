import { Routes } from "@/lib/constants/routes";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2 text-lg font-bold">
          <span className="text-primary">Wealth</span>
          <span className="text-green-800">Sync</span>
          <span className="text-primary">App</span>
        </div>
        <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
          © 2023 WealthSync. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link
            href={Routes.TERMS}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Terms
          </Link>
          <Link
            href={Routes.PRIVACY}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Privacy
          </Link>
          <Link
            href={Routes.CONTACT}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Contact
          </Link>
          <Link
            href={Routes.DOCS}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Docs
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
