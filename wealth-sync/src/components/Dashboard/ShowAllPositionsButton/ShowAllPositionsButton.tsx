import { Button } from "@/components/ui/button";
import React from "react";

const ShowAllPositionsButton = ({
  showAllPositions,
  toggleShowAllPositions,
}: {
  showAllPositions: boolean;
  toggleShowAllPositions: () => void;
}) => {
  return (
    <div className="mt-4 flex justify-center">
      <Button onClick={toggleShowAllPositions} className="cursor-pointer">
        {showAllPositions ? "Show Less" : "View All Positions"}
      </Button>
    </div>
  );
};

export default ShowAllPositionsButton;
