import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Routes } from "@/lib/constants/routes";
import Link from "next/link";
import { Facebook, Github } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import LoginProviderButton from "@/components/LoginPage/LoginProviderButton";
import LoginForm from "@/components/LoginPage/LoginForm";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations("LoginPage");

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription>
          {t("description")}
        </CardDescription>
      </CardHeader>
      <LoginForm />
      <CardContent className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              {t("orContinueWith")}
            </span>
          </div>
        </div>
        <LoginProviderButton providerLogo={<Github />} providerName="Github" />
        <LoginProviderButton
          providerLogo={<Facebook />}
          providerName="Facebook"
        />
        <LoginProviderButton
          providerLogo={<FaGoogle />}
          providerName="Google"
        />
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground w-full text-center text-sm">
          <Link
            href={Routes.REGISTER}
            className="hover:text-primary underline underline-offset-4"
          >
            {t("registerLink")}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
