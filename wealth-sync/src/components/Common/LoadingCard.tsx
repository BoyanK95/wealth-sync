import React from "react";
import { Card } from "../ui/card";

export default function LoadingCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
      <div className="mb-4 h-6 w-1/3 rounded bg-gray-300 dark:bg-gray-700"></div>
      <Card className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
        ))}
      </Card>
    </div>
  );
}
