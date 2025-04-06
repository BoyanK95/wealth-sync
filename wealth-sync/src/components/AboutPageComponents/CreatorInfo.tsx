import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Github } from "lucide-react";

const CreatorInfo = () => {
  return (
    <>
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">About the Creator</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          The story behind WealthSync and how it came to be
        </p>
      </div>

      {/* Profile section */}
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div className="relative h-48 w-48 flex-shrink-0 overflow-hidden rounded-full border-4 border-green-700">
          <Image
            src="https://avatars.githubusercontent.com/u/92653208?v=4"
            alt="Creator profile"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-2xl font-bold text-green-800">Boyan Koychev</h2>
          <p className="text-muted-foreground">
            Former Fixed-Income Trader | Software Engineer | Investor
          </p>
          <div className="flex justify-center space-x-4 md:justify-start">
            <Link
              href="https://www.linkedin.com/in/boyan-koychev-1369bb1b8/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#0077B5] p-2 text-white transition-colors hover:bg-[#0077B5]/90"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://www.facebook.com/boyan.nikolaev.3"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#1877F2] p-2 text-white transition-colors hover:bg-[#1877F2]/90"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://www.instagram.com/boyan_koychev_95/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] p-2 text-white transition-opacity hover:opacity-90"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://github.com/BoyanK95"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-[#ac7ecb] via-[#5b2076] to-[#1d0338] p-2 text-white transition-opacity hover:opacity-90"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">Github</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorInfo;
