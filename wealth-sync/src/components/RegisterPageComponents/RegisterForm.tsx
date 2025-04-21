"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Routes } from "@/lib/constants/routes";
import { register } from "@/server/actions/auth";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string)?.toString().trim();
    const password = (formData.get("password") as string)?.toString().trim();
    const name = (formData.get("name") as string)?.toString().trim();
    const confirmPassword = (formData.get("repeat-password") as string)
      ?.toString()
      .trim();

    if (!email || !name || !password || !confirmPassword) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const data = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const result = await register(data);

      if (result.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      if (!result.error) {
        // Sign in the user directly with credentials
        const signInResult = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: Routes.DASHBOARD,
        });

        if (signInResult?.error) {
          setError("Failed to sign in after registration");
          setIsLoading(false);
          return;
        }
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <CardContent className="grid gap-4">
        {error && (
          <div className="text-destructive text-sm font-medium">{error}</div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            required
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            required
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="repeat-password">Repeat Password</Label>
          <Input
            id="repeat-password"
            name="repeat-password"
            type="password"
            autoComplete="repeat-password"
            required
            disabled={isLoading}
          />
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
      </CardContent>
    </form>
  );
};

export default RegisterForm;
