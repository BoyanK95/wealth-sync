import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";


const ShowMoreButton = ({
  showMore,
  toggleShowMore,
  remainingCount,
}: {
  showMore: boolean;
  toggleShowMore: () => void;
  remainingCount: number;
}) => {
  return (
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
  );
};

export default ShowMoreButton;
