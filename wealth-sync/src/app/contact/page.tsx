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

            {/* My Story section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">My Story</h2>
              <div className="prose max-w-none">
                <p>
                  My journey into the world of finance began as a fixed-income
                  trader, where I spent years analyzing markets, managing
                  portfolios, and executing trades across various financial
                  instruments. During this time, I developed a deep
                  understanding of financial markets and investment strategies.
                </p>
                <p>
                  While I enjoyed the fast-paced environment of trading, I found
                  myself increasingly drawn to technology and software
                  development. The intersection of finance and technology
                  fascinated me, and I decided to pivot my career toward
                  software engineering.
                </p>
                <p>
                  Despite changing careers, I remained an active investor,
                  maintaining portfolios across multiple platforms including
                  traditional brokerages and cryptocurrency exchanges. As my
                  investments diversified, I faced a common challenge: keeping
                  track of everything in one place.
                </p>
                <p>
                  I found myself juggling between different apps and platforms,
                  manually tracking my overall portfolio performance in
                  spreadsheets. This fragmented approach was time-consuming and
                  prone to errors. I needed a solution that could aggregate all
                  my investment data in one place, providing a comprehensive
                  view of my financial position.
                </p>
                <p>
                  That&apos;s when the idea for WealthSync was born. I combined
                  my financial expertise with my software engineering skills to
                  create a platform that solves this exact problem. WealthSync
                  connects to multiple investment platforms, aggregates your
                  data, and provides powerful analytics to help you make
                  informed decisions.
                </p>
                <p>
                  Today, WealthSync is the tool I wish I had when I started my
                  investment journey. I&apos;m excited to share it with fellow
                  investors who face similar challenges in managing their
                  diversified portfolios.
                </p>
              </div>
            </div>

            <Separator />

            {/* Contact section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">
                Get in Touch
              </h2>
              <p className="text-muted-foreground">
                Have questions about WealthSync or want to share your feedback?
                I&apos;d love to hear from you!
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Send a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and I&apos;ll get back to you as
                      soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Your email address"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Your message"
                          rows={4}
                        />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    {/* TODO: Add a button to submit the form */}
                    <Button className="w-full bg-green-700 hover:bg-green-800">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Connect with Me</CardTitle>
                    <CardDescription>
                      Follow me on social media or reach out directly via email.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-[#0077B5] p-2 text-white">
                        <Linkedin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">LinkedIn</p>
                        <Link
                          href="https://www.linkedin.com/in/boyan-koychev-1369bb1b8/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground text-sm hover:text-green-700"
                        >
                          linkedin.com/in/boyan-koychev-1369bb1b8
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-[#1877F2] p-2 text-white">
                        <Facebook className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Facebook</p>
                        <Link
                          href="https://www.facebook.com/boyan.nikolaev.3"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground text-sm hover:text-green-700"
                        >
                          facebook.com/boyan.nikolaev.3
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] p-2 text-white">
                        <Instagram className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Instagram</p>
                        <Link
                          href="https://www.instagram.com/boyan_koychev_95/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground text-sm hover:text-green-700"
                        >
                          instagram.com/boyan_koychev_95
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-green-700 p-2 text-white">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <Link
                          href="mailto:contact@wealthsync.com"
                          className="text-muted-foreground text-sm hover:text-green-700"
                        >
                          contact@wealthsync.com
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

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
