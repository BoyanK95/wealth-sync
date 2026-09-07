import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Positions = ({ positions }: { positions: number }) => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="ml-15 inline-block cursor-default space-y-2">
              <p className="text-muted-foreground text-sm">Positions</p>
              <p className="text-2xl font-bold">{positions}</p>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="center"
            className="dark:bg-background dark:text-foreground p-3 font-bold"
          >
            <p>The total number of open positions in your portfolio.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Positions;
