"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingText from "@/components/Common/LoadingText";
import { signIn } from "next-auth/react";
import { Routes } from "@/lib/constants/routes";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const LoginProviderButton = ({
  providerLogo,
  providerName,
}: {
  providerLogo: React.ReactNode;
  providerName: string;
}) => {
  const t = useTranslations("LoginPage.providerButton");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (signInProvider: string) => {
    setIsLoading(true);
    try {
      const result = await signIn(signInProvider, {
        callbackUrl: Routes.DASHBOARD,
        redirect: true,
      });

      if (result?.error) {
        toast.error(t("failed"));
      }
    } catch (error) {
      toast.error(t("failed"), {
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
      {isLoading ? <LoadingText text={t("signingIn")} /> : <p>{providerName}</p>}
    </Button>
  );
};

export default LoginProviderButton;
