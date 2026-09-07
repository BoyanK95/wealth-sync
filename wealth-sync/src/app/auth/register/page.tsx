import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Routes } from "@/lib/constants/routes";
import Link from "next/link";
import RegisterForm from "@/components/RegisterPageComponents/RegisterForm";
import { getTranslations } from "next-intl/server";

export default async function RegisterPage() {
  const t = await getTranslations("RegisterPage");

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription>
          {t("description")}
        </CardDescription>
      </CardHeader>
      <RegisterForm />
      <CardFooter>
        <p className="text-muted-foreground w-full text-center text-sm">
          <Link
            href={Routes.LOGIN}
            className="hover:text-primary underline underline-offset-4"
          >
            {t("loginLink")}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
