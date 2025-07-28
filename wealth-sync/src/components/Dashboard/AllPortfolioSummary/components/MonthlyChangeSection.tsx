"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, BarChart3 } from "lucide-react";

export const MonthlyChangeSection = ({ showStats }: { showStats: boolean }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Monthly Change</CardTitle>
      <BarChart3 className="text-muted-foreground h-4 w-4" />
    </CardHeader>
    <CardContent>
      {showStats ? (
        <>
          <div className="text-2xl font-bold">+4.3%</div>
          <div className="flex items-center pt-1">
            <ArrowUp className="mr-1 h-4 w-4 text-green-700" />
            <span className="text-green-700">+$5,120.45</span>
          </div>
        </>
      ) : (
        <div className="text-2xl font-bold">
          <h3>******</h3>
        </div>
      )}
    </CardContent>
  </Card>
);
