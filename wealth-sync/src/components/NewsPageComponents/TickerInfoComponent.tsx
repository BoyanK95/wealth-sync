import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TickerInfoType } from "./types";
import Image from "next/image";

export default function TickerInfoComponent({
  result,
}: {
  result: TickerInfoType;
}) {
  return (
    <Card className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
      <CardHeader className="text-xl font-semibold">
        {result.name ?? result.symbol ?? "Asset info"}
        {result.logo && (
          <Image
            src={result.logo ?? "/default-image.png"}
            alt={result.name ?? result.symbol ?? "Asset image"}
            width={64}
            height={64}
            className="ml-4 rounded-full"
          />
        )}
      </CardHeader>
      <CardDescription className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {result.description ?? "No description available."}
        {result.price && (
          <p className="mt-4 text-lg font-medium">
            Current price: {result.price}
          </p>
        )}
        {result.ipo && (
          <p className="mt-2 text-sm text-slate-500">
            IPO Date: {new Date(result.ipo).toLocaleDateString()}
          </p>
        )}
      </CardDescription>
    </Card>
  );
}
