"use client";

import type React from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralTab from "./GeneralTab";
import type { UserFormProps } from "./interfaces";
import SecurityTab from "./SecurityTab";

export default function ProfileForm({ user }: UserFormProps) {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <GeneralTab user={user} />
      <SecurityTab />
    </Tabs>
  );
}
