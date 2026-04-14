import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Linkedin, Instagram, Facebook, Github, Mail } from "lucide-react";
import Link from "next/link";

const SocialMediaLinksCard = () => {
  return (
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
          <div className="rounded-full bg-gradient-to-r from-[#ac7ecb] via-[#5b2076] to-[#1d0338] p-2 text-white transition-opacity hover:opacity-90">
            <Github className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Github</p>
            <Link
              href="https://github.com/BoyanK95"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground text-sm hover:text-green-700"
            >
              github.com/BoyanK95
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
              href="mailto:b.koychev95@gmail.com"
              className="text-muted-foreground text-sm hover:text-green-700"
            >
              Send an email
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaLinksCard;
