import React from "react";
import { Platforms } from "@/lib/constants/platforms";
import Image from "next/image";
import Link from "next/link";

const IntegrationPlatformsGrid = () => {
  const displayedPlatforms = Platforms.slice(0, 6);

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-3 lg:grid-cols-6">
      {displayedPlatforms.map((platform) => (
        <Link
          href={platform.connetUrl ?? "/"}
          key={platform.id}
          className="group relative flex flex-col items-center space-y-2 rounded-lg border p-6 transition-all hover:border-green-700 hover:shadow-md"
        >
          <div
            key={platform.id}
            className="flex flex-col items-center space-y-2 rounded-lg border p-6"
          >
            <div className="bg-muted rounded-full">
              {platform.logo && (
                <Image
                  src={platform.logo}
                  alt={platform.name}
                  width={48}
                  height={48}
                />
              )}
            </div>
            <span className="text-sm font-medium">{platform.name}</span>
          </div>
        </Link>
      ))}
      {
        //TODO make dynamic show more button
        Platforms.length > 6 && (
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <span className="text-sm font-medium">
              +{Platforms.length - 6} Show more
            </span>
          </div>
        )
      }
    </div>
  );
};

export default IntegrationPlatformsGrid;
