import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LineChart } from "lucide-react";

const PortfolioChart = () => {
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
        <CardDescription>Your portfolio value over time</CardDescription>
      </CardHeader>
      <CardContent className="bg-muted/20 flex h-[300px] w-full items-center justify-center">
        <LineChart className="text-muted h-8 w-8" />
        <span className="text-muted ml-2">
          Portfolio chart will appear here
        </span>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          1D
        </Button>
        <Button variant="outline" size="sm">
          1W
        </Button>
        <Button variant="outline" size="sm">
          1M
        </Button>
        <Button variant="outline" size="sm">
          3M
        </Button>
        <Button variant="outline" size="sm">
          1Y
        </Button>
        <Button variant="outline" size="sm">
          All
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PortfolioChart;
