// src/components/LandingPage/SocialMediaFooter.tsx
import React from "react";
import Link from "next/link";
import { socialLinks } from "@/lib/constants/socialMedialLinks";

const SocialMediaFooter = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm pt-7 text-slate-400">Follow us on social media</p>
        <div className="flex gap-6">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="transition-colors dark:text-white/70 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon size={24} />
            </Link>
          ))}
        </div>
        <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
          © 2023 WealthSync. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SocialMediaFooter;
