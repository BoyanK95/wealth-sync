import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProfitAndLoss = ({
  totalProfitLoss,
  profitLossPercentage,
  profitLossTitle,
  tooltipText,
}: {
  totalProfitLoss: number;
  profitLossPercentage: number;
  profitLossTitle: string;
  tooltipText: string;
}) => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="ml-15 inline-block cursor-default space-y-2">
              <p className="text-muted-foreground text-sm">{profitLossTitle}</p>
              <p
                className={`text-2xl font-bold ${totalProfitLoss >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                $
                {totalProfitLoss.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                <span className="ml-1 text-sm">
                  ({profitLossPercentage.toFixed(2)}%)
                </span>
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="center"
            className="dark:bg-background dark:text-foreground p-3 font-bold"
          >
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ProfitAndLoss;
