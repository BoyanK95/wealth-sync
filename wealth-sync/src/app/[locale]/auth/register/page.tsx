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

export default function RegisterPage() {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <RegisterForm />
      <CardFooter>
        <p className="text-muted-foreground w-full text-center text-sm">
          <Link
            href={Routes.LOGIN}
            className="hover:text-primary underline underline-offset-4"
          >
            Already have an account? Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
