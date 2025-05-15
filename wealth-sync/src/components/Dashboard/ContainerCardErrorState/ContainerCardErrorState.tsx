import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ContainerCardErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ContainerCardErrorState = ({
  error,
  onRetry,
}: ContainerCardErrorStateProps) => {
  return (
    <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Failed to load data</h3>
            <p className="text-muted-foreground text-sm">{error}</p>
          </div>
          <Button
            onClick={onRetry}
            variant="outline"
            className="mt-4 cursor-pointer border-red-200 bg-white hover:bg-red-50 dark:border-red-800 dark:bg-red-950/50"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContainerCardErrorState;
