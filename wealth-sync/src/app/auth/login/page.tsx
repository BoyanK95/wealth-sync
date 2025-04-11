"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Routes } from "@/lib/constants/routes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (signInProvider: string) => {
    setIsLoading(true);
    try {
      const result = await signIn(signInProvider, {
        callbackUrl: Routes.DASHBOARD,
        redirect: true,
      });

      if (result?.error) {
        console.log(result.error);
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Enter your email below to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
          />
        </div>
        <Button className="w-full cursor-pointer">Sign In</Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full cursor-pointer hover:bg-neutral-400 hover:text-white"
          onClick={() => handleLogin("github")}
          type="button"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Signing in...
            </div>
          ) : (
            "GitHub"
          )}
        </Button>
        <Button
          variant="outline"
          className="w-full cursor-pointer hover:bg-blue-500 hover:text-white"
          onClick={() => handleLogin("facebook")}
          type="button"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Signing in...
            </div>
          ) : (
            "Facebook"
          )}
        </Button>
        <Button
          variant="outline"
          className="w-full cursor-pointer hover:bg-red-700 hover:text-white"
          onClick={() => {
            // TODO: add google login
            console.log("google login");
          }}
        >
          Google
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground w-full text-center text-sm">
          <Link
            href={Routes.REGISTER}
            className="hover:text-primary underline underline-offset-4"
          >
            Don&apos;t have an account? Register here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
