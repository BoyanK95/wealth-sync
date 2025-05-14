import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PortfolioValue = ({ totalValue }: { totalValue: number }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="space-y-2">
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
        <TooltipContent className="dark:bg-background dark:text-foreground">
          <p>Total value of all your open positions.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PortfolioValue;
