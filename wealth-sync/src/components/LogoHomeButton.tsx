import { Routes } from "@/lib/constants/routes";
import Link from "next/link";
import React from "react";

const LogoHomeButton = () => {
  return (
    <Link
      href={Routes.HOME}
      className="text-primary flex items-center gap-2 text-2xl font-bold"
    >
      <span>Wealth</span>
      <span className="text-green-800 dark:text-green-600">Sync</span>
    </Link>
  );
};

export default LogoHomeButton;
