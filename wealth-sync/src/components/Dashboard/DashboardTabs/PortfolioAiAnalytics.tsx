import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const PortfolioAiAnalytics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
        <CardDescription>
          Advanced AI analytics and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/20 flex h-[400px] w-full items-center justify-center">
          <BarChart3 className="text-muted h-8 w-8" />
          <span className="text-muted ml-2">Insights will appear here</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioAiAnalytics;
