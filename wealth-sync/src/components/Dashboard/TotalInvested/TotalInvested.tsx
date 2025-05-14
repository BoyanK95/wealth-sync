import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TotalInvested = ({ totalInvested }: { totalInvested: number }) => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="ml-15 inline-block cursor-default space-y-2">
              <p className="text-muted-foreground text-sm">Total Invested</p>
              <p className="text-2xl font-bold">
                $
                {totalInvested.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="center"
            className="dark:bg-background dark:text-foreground p-3 font-bold"
          >
            <p>Total amount of money you have invested.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TotalInvested;
