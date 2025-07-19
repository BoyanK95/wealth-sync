"use client";

import { useState } from "react";
import { Platforms, type Platform } from "@/lib/constants/platforms";
import IntegrationPlatformCard from "./IntegrationPlatformCard";
import ShowMoreButton from "../ShowMoreButton";

interface IntegrationPlatformsGridProps {
  initialDisplayCount?: number;
  className?: string;
}

const IntegrationPlatformsGrid = ({
  initialDisplayCount = 6,
  className = "",
}: IntegrationPlatformsGridProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);

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
          <IntegrationPlatformCard key={platform.id} platform={platform} />
        ))}

        {hasMorePlatforms && (
          <div className="col-span-2 mt-4 flex justify-center sm:col-span-3 md:col-span-4 lg:col-span-6 xl:col-span-6">
            <ShowMoreButton
              showMore={showMore}
              toggleShowMore={toggleShowMore}
              remainingCount={remainingCount}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegrationPlatformsGrid;
