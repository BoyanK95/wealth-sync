"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingText from "@/components/LoadingText";
import { signIn } from "next-auth/react";
import { Routes } from "@/lib/constants/routes";
import { toast } from "sonner";

const LoginProviderButton = ({
  providerLogo,
  providerName,
}: {
  providerLogo: React.ReactNode;
  providerName: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (signInProvider: string) => {
    console.log(signInProvider);
    
    setIsLoading(true);
    try {
      const result = await signIn(signInProvider, {
        callbackUrl: Routes.DASHBOARD,
        redirect: true,
      });

      if (result?.error) {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error("Login failed", {
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant="outline"
      className="w-full cursor-pointer hover:bg-neutral-400 hover:text-white"
      onClick={() => handleLogin(providerName.toLowerCase())}
      type="button"
      disabled={isLoading}
    >
      {providerLogo}
      {isLoading ? <LoadingText text="Signing in..." /> : <p>{providerName}</p>}
    </Button>
  );
};

export default LoginProviderButton;
