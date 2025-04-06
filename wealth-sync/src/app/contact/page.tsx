import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Github,
  Mail,
  MessageSquare,
} from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import CreatorInfo from "@/components/AboutPageComponents/CreatorInfo";
import MyStory from "@/components/AboutPageComponents/MyStory";
import ContactSection from "@/components/AboutPageComponents/ContactSection";

export const metadata = {
  title: "About Boyan | WealthSync",
  description: "Learn about the creator of WealthSync and get in touch.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-16 pb-12">
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-8">
            <CreatorInfo />
            <Separator />
            <MyStory />
            <Separator />
            <ContactSection />

            {/* CTA section */}
            <div className="mt-8 space-y-4 rounded-lg border border-green-100 bg-green-50 p-6 text-center">
              <h3 className="text-xl font-bold text-green-800">
                Ready to simplify your investment tracking?
              </h3>
              <p className="mx-auto max-w-2xl text-green-700">
                WealthSync brings all your investments together in one place,
                giving you the complete picture of your financial portfolio.
              </p>
              <Button className="bg-green-700 hover:bg-green-800">
                Get Started with WealthSync
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
