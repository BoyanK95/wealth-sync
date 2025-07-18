"use client";

import { useState } from "react";
import { Platforms, type Platform } from "@/lib/constants/platforms";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface IntegrationPlatformsGridProps {
  initialDisplayCount?: number;
  className?: string;
}

const IntegrationPlatformsGrid = ({
  initialDisplayCount = 6,
  className = "",
}: IntegrationPlatformsGridProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  // Dynamic logic to determine displayed platforms
  const displayedPlatforms = showMore
    ? Platforms
    : Platforms.slice(0, initialDisplayCount);

  const hasMorePlatforms = Platforms.length > initialDisplayCount;
  const remainingCount = Platforms.length - initialDisplayCount;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
        {displayedPlatforms.map((platform: Platform) => (
          <PlatformCard key={platform.id} platform={platform} />
        ))}

        {/* Show More/Less Button - Only show if there are more platforms */}
        {hasMorePlatforms && (
          <div className="col-span-2 mt-4 flex justify-center sm:col-span-3 md:col-span-4 lg:col-span-6 xl:col-span-6">
            <Button
              onClick={toggleShowMore}
              variant="outline"
              className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-6 py-3 transition-all duration-200 hover:border-green-500 hover:bg-green-50"
            >
              {showMore ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  <span className="text-sm font-medium">Show Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Show {remainingCount} More Platform
                    {remainingCount !== 1 ? "s" : ""}
                  </span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const PlatformCard = ({ platform }: { platform: Platform }) => {
  return (
    <Link
      href={platform.connetUrl ?? "/"}
      className="group relative flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:scale-105 hover:border-green-500 hover:shadow-lg"
    >
      {/* Connection Status Indicator */}
      {platform.isConnected && (
        <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-sm" />
      )}

      {/* Platform Logo */}
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 transition-colors duration-200 group-hover:bg-green-50">
        {platform.logo ? (
          <Image
            src={platform.logo}
            alt={`${platform.name} logo`}
            width={32}
            height={32}
            className="rounded-full object-contain"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
            <span className="text-xs font-bold text-gray-600">
              {platform.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <span className="text-center text-sm leading-tight font-medium text-gray-900">
        {platform.name}
      </span>
      <span
        className={`mt-1 text-xs ${
          platform.isConnected ? "font-medium text-green-600" : "text-gray-500"
        }`}
      >
        {platform.isConnected ? "Connected" : "Connect"}
      </span>
    </Link>
  );
};

export default IntegrationPlatformsGrid;
