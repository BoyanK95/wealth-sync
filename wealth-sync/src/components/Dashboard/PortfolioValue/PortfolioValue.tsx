import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PortfolioValue = ({ totalValue }: { totalValue: number }) => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="ml-15 inline-block cursor-default space-y-2">
              <p className="text-muted-foreground text-sm">Portfolio Value</p>
              <p className="text-2xl font-bold">
                $
                {totalValue.toLocaleString(undefined, {
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
            <p>Total value of all your open positions.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PortfolioValue;
