import React from "react";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/constants/routes";
import Link from "next/link";

const SignUpButton = () => {
  return (
    <Button
      asChild
      size="sm"
      variant={"default"}
      className="hidden hover:bg-green-700 sm:flex dark:hover:text-white"
    >
      <Link href={Routes.LOGIN}>Sign Up</Link>
    </Button>
  );
};

export default SignUpButton;
